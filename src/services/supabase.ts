/**
 * ==============================================================================
 * BLOOMS & TWIRL BY SHAIRA - SUPABASE CLOUD DATABASE & REALTIME CLIENT
 * ==============================================================================
 * Solves the device-isolation discrepancy between mobile and laptop.
 * Provides unified Postgres tables, live WebSockets, and global CDN asset hosting.
 * ==============================================================================
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  enabled: boolean;
}

const CONFIG_STORAGE_KEY = 'bt_supabase_config_v1';

export class SupabaseService {
  private static cachedConfig: SupabaseConfig | null = null;
  private static realtimeSocket: WebSocket | null = null;
  private static listeners: Set<(table: string, payload: any) => void> = new Set();
  private static reconnectTimer: any = null;

  /**
   * Retrieves active Supabase configuration
   */
  static getConfig(): SupabaseConfig {
    if (this.cachedConfig) return this.cachedConfig;

    try {
      // 1. Check window override
      if (typeof window !== 'undefined' && (window as any).BT_SUPABASE_CONFIG) {
        this.cachedConfig = (window as any).BT_SUPABASE_CONFIG;
        return this.cachedConfig!;
      }

      // 2. Check localStorage
      const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (raw) {
        this.cachedConfig = JSON.parse(raw);
        return this.cachedConfig!;
      }
    } catch (e) {
      console.warn('Could not read Supabase config from storage:', e);
    }

    // Default configuration (placeholder until Shaira enters her project keys)
    this.cachedConfig = {
      url: 'https://hflykqdooymfgtkbnsra.supabase.co',
      anonKey: '',
      enabled: false
    };
    return this.cachedConfig;
  }

  /**
   * Saves updated Supabase connection configuration
   */
  static saveConfig(config: SupabaseConfig): void {
    this.cachedConfig = { ...config };
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(this.cachedConfig));
    } catch (e) {
      console.warn('Could not save Supabase config:', e);
    }

    if (config.enabled && config.url && config.anonKey) {
      this.initRealtime();
    } else if (this.realtimeSocket) {
      this.realtimeSocket.close();
      this.realtimeSocket = null;
    }
  }

  static isConfigured(): boolean {
    const config = this.getConfig();
    return Boolean(config.enabled && config.url && config.anonKey && config.url.startsWith('https://'));
  }

  /**
   * Performs an authenticated fetch to Supabase REST API
   */
  private static async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const config = this.getConfig();
    if (!this.isConfigured()) {
      throw new Error('Supabase is not configured. Please enter your Project URL and Anon Key in Settings.');
    }

    const cleanUrl = config.url.replace(/\/+$/, '');
    const url = `${cleanUrl}/rest/v1/${endpoint.replace(/^\/+/, '')}`;

    const headers: Record<string, string> = {
      'apikey': config.anonKey,
      'Authorization': `Bearer ${config.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...(options.headers as Record<string, string> || {})
    };

    const res = await fetch(url, {
      ...options,
      headers
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Supabase error [${res.status}]: ${errText || res.statusText}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    return null;
  }

  /**
   * Tests connectivity to Supabase
   */
  static async testConnection(): Promise<{ success: boolean; message: string; tableCount?: number }> {
    try {
      const config = this.getConfig();
      if (!config.url || !config.anonKey) {
        return { success: false, message: 'Please provide both the Project URL and Anon Key.' };
      }
      const data = await this.request('arrangements?select=id&limit=1', { method: 'GET' });
      return {
        success: true,
        message: 'Successfully connected to Supabase PostgreSQL & Realtime Engine!',
        tableCount: Array.isArray(data) ? data.length : 0
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Connection test failed.' };
    }
  }

  // ============================================================================
  // 1. ARRANGEMENTS (PRODUCTS & BOUQUETS)
  // ============================================================================

  static async getArrangements(): Promise<any[] | null> {
    if (!this.isConfigured()) return null;
    try {
      const data = await this.request('arrangements?select=*&order=created_at.desc', { method: 'GET' });
      return (data || []).map((row: any) => ({
        id: row.id,
        name: row.name,
        tag: row.tag || 'Signature',
        category: row.category || 'Signature',
        price: Number(row.price || 0),
        coldRoomCount: row.cold_room_count ?? 5,
        sold30d: row.sold_30d ?? 0,
        rating: Number(row.rating || 5.0),
        image: row.image,
        description: row.description,
        stems: Array.isArray(row.stems) ? row.stems : (typeof row.stems === 'string' ? JSON.parse(row.stems || '[]') : []),
        isFeatured: Boolean(row.is_featured),
        isLowStock: Boolean(row.is_low_stock),
        productType: row.product_type || 'arranged'
      }));
    } catch (e) {
      console.warn('Supabase getArrangements failed, fallback to local:', e);
      return null;
    }
  }

  static async upsertArrangement(item: any): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const payload = {
        id: item.id,
        name: item.name,
        tag: item.tag || 'Signature',
        category: item.category || 'Signature',
        price: item.price,
        cold_room_count: item.coldRoomCount,
        sold_30d: item.sold30d || 0,
        rating: item.rating || 5.0,
        image: item.image,
        description: item.description,
        stems: item.stems || [],
        is_featured: Boolean(item.isFeatured),
        is_low_stock: Boolean(item.isLowStock),
        product_type: item.productType || 'arranged',
        updated_at: new Date().toISOString()
      };

      await this.request('arrangements', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify(payload)
      });
      return true;
    } catch (e) {
      console.error('Supabase upsertArrangement error:', e);
      return false;
    }
  }

  static async deleteArrangement(id: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      await this.request(`arrangements?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
      return true;
    } catch (e) {
      console.error('Supabase deleteArrangement error:', e);
      return false;
    }
  }

  // ============================================================================
  // 2. ORDERS (LIVE METRO MANILA & REGIONAL ORDERS)
  // ============================================================================

  static async getOrders(): Promise<any[] | null> {
    if (!this.isConfigured()) return null;
    try {
      const data = await this.request('orders?select=*&order=created_at.desc', { method: 'GET' });
      return (data || []).map((o: any) => ({
        id: o.id,
        date: o.date,
        customerName: o.customer_name,
        email: o.email,
        phone: o.phone,
        region: o.region,
        provinceCity: o.province_city,
        barangay: o.barangay,
        street: o.street,
        address: o.address,
        arrangementName: o.arrangement_name,
        items: o.items || [],
        total: Number(o.total || 0),
        paymentMethod: o.payment_method,
        paymentStatus: o.payment_status,
        status: o.status,
        trackingStep: o.tracking_step || 1,
        courierName: o.courier_name,
        dueTime: o.due_time,
        deliverySlot: o.delivery_slot,
        cardMessage: o.card_message,
        notes: o.notes,
        channel: o.channel
      }));
    } catch (e) {
      console.warn('Supabase getOrders failed, fallback to local:', e);
      return null;
    }
  }

  static async createOrder(order: any): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const payload = {
        id: order.id,
        date: order.date || new Date().toISOString(),
        customer_name: order.customerName,
        email: order.email || '',
        phone: order.phone || '',
        region: order.region || 'Cordillera (CAR)',
        province_city: order.provinceCity || '',
        barangay: order.barangay || '',
        street: order.street || '',
        address: order.address || '',
        arrangement_name: order.arrangementName || 'Bespoke Bouquet',
        items: order.items || [],
        total: order.total || 0,
        payment_method: order.paymentMethod || 'GCash',
        payment_status: order.paymentStatus || 'Paid',
        status: order.status || 'Order Received',
        tracking_step: order.trackingStep || 1,
        courier_name: order.courierName || '',
        due_time: order.dueTime || 'today',
        delivery_slot: order.deliverySlot || 'Afternoon Slot (1:00 PM - 5:00 PM)',
        card_message: order.cardMessage || '',
        notes: order.notes || '',
        channel: order.channel || 'Online Storefront',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await this.request('orders', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify(payload)
      });
      return true;
    } catch (e) {
      console.error('Supabase createOrder error:', e);
      return false;
    }
  }

  static async updateOrderStatus(orderId: string, status: string, trackingStep?: number, courierName?: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const payload: Record<string, any> = {
        status,
        updated_at: new Date().toISOString()
      };
      if (trackingStep !== undefined) payload.tracking_step = trackingStep;
      if (courierName !== undefined) payload.courier_name = courierName;

      await this.request(`orders?id=eq.${encodeURIComponent(orderId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
      });
      return true;
    } catch (e) {
      console.error('Supabase updateOrderStatus error:', e);
      return false;
    }
  }

  // ============================================================================
  // 3. STORAGE BUCKET (FLOWER PHOTOGRAPHY CDN)
  // ============================================================================

  /**
   * Uploads an image to Supabase Storage bucket 'bouquet-images'
   * Returns permanent global CDN URL accessible from both phone and laptop!
   */
  static async uploadBouquetImage(dataUrlOrBlob: string | Blob, fileName: string): Promise<string | null> {
    const config = this.getConfig();
    if (!this.isConfigured()) return null;

    try {
      let blob: Blob;
      let contentType = 'image/jpeg';

      if (typeof dataUrlOrBlob === 'string' && dataUrlOrBlob.startsWith('data:')) {
        const parts = dataUrlOrBlob.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        contentType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const byteCharacters = atob(parts[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          byteArrays.push(new Uint8Array(byteNumbers));
        }
        blob = new Blob(byteArrays, { type: contentType });
      } else if (dataUrlOrBlob instanceof Blob) {
        blob = dataUrlOrBlob;
        contentType = blob.type || 'image/jpeg';
      } else {
        return null;
      }

      const cleanUrl = config.url.replace(/\/+$/, '');
      const cleanPath = `bouquets/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const uploadUrl = `${cleanUrl}/storage/v1/object/bouquet-images/${cleanPath}`;

      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
          'Content-Type': contentType,
          'x-upsert': 'true'
        },
        body: blob
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Upload error [${res.status}]: ${txt}`);
      }

      // Return public permanent URL
      return `${cleanUrl}/storage/v1/object/public/bouquet-images/${cleanPath}`;
    } catch (e) {
      console.error('Supabase uploadBouquetImage error:', e);
      return null;
    }
  }

  // ============================================================================
  // 4. REALTIME WEBSOCKET SUBSCRIPTION (INSTANT MOBILE <-> LAPTOP SYNC)
  // ============================================================================

  static subscribe(listener: (table: string, payload: any) => void): () => void {
    this.listeners.add(listener);
    if (!this.realtimeSocket && this.isConfigured()) {
      this.initRealtime();
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static initRealtime(): void {
    const config = this.getConfig();
    if (!this.isConfigured()) return;

    try {
      if (this.realtimeSocket) {
        this.realtimeSocket.close();
      }

      const wsUrl = config.url
        .replace(/^http:/, 'ws:')
        .replace(/^https:/, 'wss:')
        .replace(/\/+$/, '') + `/realtime/v1/websocket?apikey=${encodeURIComponent(config.anonKey)}&vsn=1.0.0`;

      const ws = new WebSocket(wsUrl);
      this.realtimeSocket = ws;

      ws.onopen = () => {
        // Join realtime channel for postgres_changes
        const joinMsg = {
          topic: 'realtime:public',
          event: 'phx_join',
          payload: {
            config: {
              postgres_changes: [
                { event: '*', schema: 'public', table: 'orders' },
                { event: '*', schema: 'public', table: 'arrangements' },
                { event: '*', schema: 'public', table: 'inventory' }
              ]
            }
          },
          ref: '1'
        };
        ws.send(JSON.stringify(joinMsg));

        // Heartbeat timer every 30s
        const heartbeat = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: 'hb' }));
          } else {
            clearInterval(heartbeat);
          }
        }, 30000);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.event === 'postgres_changes') {
            const table = msg.payload?.data?.table;
            this.listeners.forEach((fn) => fn(table, msg.payload?.data));
          }
        } catch (e) {}
      };

      ws.onclose = () => {
        this.realtimeSocket = null;
        clearTimeout(this.reconnectTimer);
        // Attempt reconnect after 5s if still configured
        this.reconnectTimer = setTimeout(() => {
          if (this.isConfigured()) this.initRealtime();
        }, 5000);
      };

      ws.onerror = (e) => {
        console.warn('Supabase Realtime socket error:', e);
      };
    } catch (e) {
      console.warn('Could not initialize Supabase Realtime socket:', e);
    }
  }

  // ============================================================================
  // 5. ONE-CLICK LOCAL TO SUPABASE MIGRATION
  // ============================================================================

  static async migrateLocalToSupabase(): Promise<{ arrangements: number; orders: number }> {
    if (!this.isConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    let arrCount = 0;
    let ordCount = 0;

    try {
      // 1. Migrate Arrangements
      const rawArr = localStorage.getItem('bt_arrangements_v2');
      if (rawArr) {
        const arrList = JSON.parse(rawArr);
        if (Array.isArray(arrList)) {
          for (const item of arrList) {
            const ok = await this.upsertArrangement(item);
            if (ok) arrCount++;
          }
        }
      }

      // 2. Migrate Orders
      const rawOrd = localStorage.getItem('bt_orders_v2');
      if (rawOrd) {
        const ordList = JSON.parse(rawOrd);
        if (Array.isArray(ordList)) {
          for (const order of ordList) {
            const ok = await this.createOrder(order);
            if (ok) ordCount++;
          }
        }
      }
    } catch (e) {
      console.error('Migration error:', e);
    }

    return { arrangements: arrCount, orders: ordCount };
  }
}

// Global attachment for easy access across bundled and unbundled scripts
if (typeof window !== 'undefined') {
  (window as any).SupabaseService = SupabaseService;
}
