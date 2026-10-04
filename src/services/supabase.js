/**
 * ==============================================================================
 * BLOOMS & TWIRL BY SHAIRA - SUPABASE CLOUD DATABASE & REALTIME CLIENT (VANILLA JS)
 * ==============================================================================
 * Connects directly to Supabase REST and WebSocket endpoints.
 * Synchronizes orders, arrangements, inventory, and images across mobile & laptop.
 * ==============================================================================
 */

(function (window) {
  var CONFIG_STORAGE_KEY = 'bt_supabase_config_v1';

  var SupabaseService = {
    cachedConfig: null,
    realtimeSocket: null,
    listeners: [],
    reconnectTimer: null,

    getConfig: function () {
      if (this.cachedConfig) return this.cachedConfig;
      try {
        if (window.BT_SUPABASE_CONFIG) {
          this.cachedConfig = window.BT_SUPABASE_CONFIG;
          return this.cachedConfig;
        }
        var raw = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (raw) {
          this.cachedConfig = JSON.parse(raw);
          return this.cachedConfig;
        }
      } catch (e) {
        console.warn('Error reading Supabase config:', e);
      }
      this.cachedConfig = { url: 'https://hflykqdooymfgtkbnsra.supabase.co', anonKey: '', enabled: false };
      return this.cachedConfig;
    },

    saveConfig: function (config) {
      this.cachedConfig = Object.assign({}, config);
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(this.cachedConfig));
      } catch (e) {
        console.warn('Could not save Supabase config to storage:', e);
      }
      if (config.enabled && config.url && config.anonKey) {
        this.initRealtime();
      } else if (this.realtimeSocket) {
        this.realtimeSocket.close();
        this.realtimeSocket = null;
      }
    },

    isConfigured: function () {
      var cfg = this.getConfig();
      return Boolean(cfg.enabled && cfg.url && cfg.anonKey && cfg.url.indexOf('https://') === 0);
    },

    request: async function (endpoint, options) {
      options = options || {};
      var cfg = this.getConfig();
      if (!this.isConfigured()) {
        throw new Error('Supabase is not configured.');
      }
      var cleanUrl = cfg.url.replace(/\/+$/, '');
      var url = cleanUrl + '/rest/v1/' + endpoint.replace(/^\/+/, '');
      var headers = Object.assign({
        'apikey': cfg.anonKey,
        'Authorization': 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }, options.headers || {});

      var res = await fetch(url, Object.assign({}, options, { headers: headers }));
      if (!res.ok) {
        var errTxt = await res.text();
        throw new Error('Supabase error [' + res.status + ']: ' + (errTxt || res.statusText));
      }
      var ct = res.headers.get('content-type') || '';
      if (ct.indexOf('application/json') !== -1) {
        return await res.json();
      }
      return null;
    },

    testConnection: async function () {
      try {
        var cfg = this.getConfig();
        if (!cfg.url || !cfg.anonKey) {
          return { success: false, message: 'Please provide both Project URL and Anon Key.' };
        }
        var data = await this.request('arrangements?select=id&limit=1', { method: 'GET' });
        return {
          success: true,
          message: 'Connected to Supabase PostgreSQL & Realtime engine successfully!',
          count: Array.isArray(data) ? data.length : 0
        };
      } catch (err) {
        return { success: false, message: err.message || 'Connection test failed.' };
      }
    },

    // 1. ARRANGEMENTS
    getArrangements: async function () {
      if (!this.isConfigured()) return null;
      try {
        var data = await this.request('arrangements?select=*&order=created_at.desc', { method: 'GET' });
        if (!Array.isArray(data)) return null;
        return data.map(function (row) {
          var stems = [];
          if (Array.isArray(row.stems)) stems = row.stems;
          else if (typeof row.stems === 'string') {
            try { stems = JSON.parse(row.stems); } catch (e) { stems = []; }
          }
          return {
            id: row.id,
            name: row.name,
            tag: row.tag || 'Signature',
            category: row.category || 'Signature',
            price: Number(row.price || 0),
            coldRoomCount: row.cold_room_count != null ? row.cold_room_count : 5,
            sold30d: row.sold_30d || 0,
            rating: Number(row.rating || 5.0),
            image: row.image,
            description: row.description,
            stems: stems,
            isFeatured: Boolean(row.is_featured),
            isLowStock: Boolean(row.is_low_stock),
            productType: row.product_type || 'arranged'
          };
        });
      } catch (e) {
        console.warn('Supabase getArrangements failed, fallback to local:', e);
        return null;
      }
    },

    upsertArrangement: async function (item) {
      if (!this.isConfigured()) return false;
      try {
        var payload = {
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
    },

    deleteArrangement: async function (id) {
      if (!this.isConfigured()) return false;
      try {
        await this.request('arrangements?id=eq.' + encodeURIComponent(id), { method: 'DELETE' });
        return true;
      } catch (e) {
        console.error('Supabase deleteArrangement error:', e);
        return false;
      }
    },

    // 2. ORDERS
    getOrders: async function () {
      if (!this.isConfigured()) return null;
      try {
        var data = await this.request('orders?select=*&order=created_at.desc', { method: 'GET' });
        if (!Array.isArray(data)) return null;
        return data.map(function (o) {
          return {
            id: o.id,
            date: o.date,
            customerName: o.customer_name,
            customerInitials: (o.customer_name || 'CL').split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().slice(0, 2),
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
          };
        });
      } catch (e) {
        console.warn('Supabase getOrders failed, fallback to local:', e);
        return null;
      }
    },

    createOrder: async function (order) {
      if (!this.isConfigured()) return false;
      try {
        var payload = {
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
          courier_name: order.courier || order.courierName || '',
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
    },

    updateOrderStatus: async function (orderId, status, trackingStep, courierName) {
      if (!this.isConfigured()) return false;
      try {
        var payload = {
          status: status,
          updated_at: new Date().toISOString()
        };
        if (trackingStep != null) payload.tracking_step = trackingStep;
        if (courierName != null) payload.courier_name = courierName;
        await this.request('orders?id=eq.' + encodeURIComponent(orderId), {
          method: 'PATCH',
          body: JSON.stringify(payload)
        });
        return true;
      } catch (e) {
        console.error('Supabase updateOrderStatus error:', e);
        return false;
      }
    },

    // 3. STORAGE UPLOAD FOR FLOWER PHOTOGRAPHY
    uploadBouquetImage: async function (dataUrlOrBlob, fileName) {
      var cfg = this.getConfig();
      if (!this.isConfigured()) return null;
      try {
        var blob;
        var contentType = 'image/jpeg';
        if (typeof dataUrlOrBlob === 'string' && dataUrlOrBlob.indexOf('data:') === 0) {
          var parts = dataUrlOrBlob.split(',');
          var mimeMatch = parts[0].match(/:(.*?);/);
          contentType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
          var bstr = atob(parts[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          blob = new Blob([u8arr], { type: contentType });
        } else if (dataUrlOrBlob instanceof Blob) {
          blob = dataUrlOrBlob;
          contentType = blob.type || 'image/jpeg';
        } else {
          return null;
        }

        var cleanUrl = cfg.url.replace(/\/+$/, '');
        var cleanPath = 'bouquets/' + Date.now() + '_' + (fileName || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
        var uploadUrl = cleanUrl + '/storage/v1/object/bouquet-images/' + cleanPath;

        var res = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'apikey': cfg.anonKey,
            'Authorization': 'Bearer ' + cfg.anonKey,
            'Content-Type': contentType,
            'x-upsert': 'true'
          },
          body: blob
        });

        if (!res.ok) {
          var txt = await res.text();
          throw new Error('Upload error [' + res.status + ']: ' + txt);
        }

        return cleanUrl + '/storage/v1/object/public/bouquet-images/' + cleanPath;
      } catch (e) {
        console.error('Supabase uploadBouquetImage error:', e);
        return null;
      }
    },

    // 4. REALTIME WEBSOCKET SUBSCRIPTION
    subscribe: function (listener) {
      this.listeners.push(listener);
      if (!this.realtimeSocket && this.isConfigured()) {
        this.initRealtime();
      }
      var self = this;
      return function () {
        self.listeners = self.listeners.filter(function (l) { return l !== listener; });
      };
    },

    initRealtime: function () {
      var cfg = this.getConfig();
      if (!this.isConfigured()) return;
      var self = this;
      try {
        if (this.realtimeSocket) {
          this.realtimeSocket.close();
        }
        var wsUrl = cfg.url
          .replace(/^http:/, 'ws:')
          .replace(/^https:/, 'wss:')
          .replace(/\/+$/, '') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(cfg.anonKey) + '&vsn=1.0.0';

        var ws = new WebSocket(wsUrl);
        this.realtimeSocket = ws;

        ws.onopen = function () {
          ws.send(JSON.stringify({
            topic: 'realtime:public',
            event: 'phx_join',
            payload: {
              config: {
                postgres_changes: [
                  { event: '*', schema: 'public', table: 'orders' },
                  { event: '*', schema: 'public', table: 'arrangements' }
                ]
              }
            },
            ref: '1'
          }));

          var hb = setInterval(function () {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: 'hb' }));
            } else {
              clearInterval(hb);
            }
          }, 30000);
        };

        ws.onmessage = function (ev) {
          try {
            var msg = JSON.parse(ev.data);
            if (msg.event === 'postgres_changes') {
              var table = msg.payload && msg.payload.data ? msg.payload.data.table : '';
              self.listeners.forEach(function (fn) { fn(table, msg.payload.data); });
            }
          } catch (e) {}
        };

        ws.onclose = function () {
          self.realtimeSocket = null;
          clearTimeout(self.reconnectTimer);
          self.reconnectTimer = setTimeout(function () {
            if (self.isConfigured()) self.initRealtime();
          }, 5000);
        };
      } catch (e) {
        console.warn('Realtime init failed:', e);
      }
    },

    // 5. MIGRATION FROM LOCAL STORAGE TO SUPABASE
    migrateLocalToSupabase: async function () {
      if (!this.isConfigured()) {
        throw new Error('Supabase is not configured.');
      }
      var arrCount = 0;
      var ordCount = 0;
      try {
        var rawArr = localStorage.getItem('bt_arrangements_v2');
        if (rawArr) {
          var arrList = JSON.parse(rawArr);
          if (Array.isArray(arrList)) {
            for (var i = 0; i < arrList.length; i++) {
              var okA = await this.upsertArrangement(arrList[i]);
              if (okA) arrCount++;
            }
          }
        }
        var rawOrd = localStorage.getItem('bt_orders_v2');
        if (rawOrd) {
          var ordList = JSON.parse(rawOrd);
          if (Array.isArray(ordList)) {
            for (var j = 0; j < ordList.length; j++) {
              var okO = await this.createOrder(ordList[j]);
              if (okO) ordCount++;
            }
          }
        }
      } catch (e) {
        console.error('Migration error:', e);
      }
      return { arrangements: arrCount, orders: ordCount };
    }
  };

  window.SupabaseService = SupabaseService;
})(typeof window !== 'undefined' ? window : this);
