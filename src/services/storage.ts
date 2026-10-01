import {
  Arrangement,
  Order,
  InventoryItem,
  DeliveryRun,
  Customer,
  Promotion,
  Review,
  ShopSettings,
  StudioDiaryEntry
} from '../types';
import {
  INITIAL_ARRANGEMENTS,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_DELIVERIES,
  INITIAL_CUSTOMERS,
  INITIAL_PROMOTIONS,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS,
  INITIAL_DIARY
} from '../data/initialData';

const STORAGE_KEYS = {
  ARRANGEMENTS: 'bt_arrangements_v1',
  ORDERS: 'bt_orders_v1',
  INVENTORY: 'bt_inventory_v1',
  DELIVERIES: 'bt_deliveries_v1',
  CUSTOMERS: 'bt_customers_v1',
  PROMOTIONS: 'bt_promotions_v1',
  REVIEWS: 'bt_reviews_v1',
  SETTINGS: 'bt_settings_v1',
  DIARY: 'bt_diary_v1'
};

export class StorageService {
  static getArrangements(): Arrangement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ARRANGEMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ARRANGEMENTS, JSON.stringify(INITIAL_ARRANGEMENTS));
      return INITIAL_ARRANGEMENTS;
    }
    return JSON.parse(raw);
  }

  static saveArrangements(arrangements: Arrangement[]): void {
    localStorage.setItem(STORAGE_KEYS.ARRANGEMENTS, JSON.stringify(arrangements));
    this.triggerSyncIfConfigured('arrangements', arrangements);
  }

  static getOrders(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  }

  static saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.triggerSyncIfConfigured('orders', orders);
  }

  static addOrder(newOrder: Omit<Order, 'id' | 'date'> & { id?: string }): Order {
    const orders = this.getOrders();
    const nextNum = 2040 + orders.length + 1;
    const orderId = newOrder.id || `BT-${nextNum}`;
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const order: Order = {
      ...newOrder,
      id: orderId,
      date: dateFormatted
    };

    const updated = [order, ...orders];
    this.saveOrders(updated);

    // Also add to diary
    this.addDiaryEntry({
      id: `diary-${Date.now()}`,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      title: `New order ${order.id}`,
      description: `${order.arrangementName} for ${order.customerName}, due ${order.dueTime || 'today'}.`
    });

    // Also auto-record customer if new
    this.recordCustomerFromOrder(order);

    return order;
  }

  static updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    this.saveOrders(updated);
  }

  static getInventory(): InventoryItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
      return INITIAL_INVENTORY;
    }
    return JSON.parse(raw);
  }

  static saveInventory(inventory: InventoryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    this.triggerSyncIfConfigured('inventory', inventory);
  }

  static getDeliveries(): DeliveryRun[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DELIVERIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(INITIAL_DELIVERIES));
      return INITIAL_DELIVERIES;
    }
    return JSON.parse(raw);
  }

  static saveDeliveries(deliveries: DeliveryRun[]): void {
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(deliveries));
    this.triggerSyncIfConfigured('deliveries', deliveries);
  }

  static getCustomers(): Customer[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    }
    return JSON.parse(raw);
  }

  static saveCustomers(customers: Customer[]): void {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    this.triggerSyncIfConfigured('customers', customers);
  }

  static recordCustomerFromOrder(order: Order): void {
    const customers = this.getCustomers();
    const existing = customers.find(c => c.email.toLowerCase() === order.email.toLowerCase() || c.name.toLowerCase() === order.customerName.toLowerCase());
    const today = new Date().toISOString().split('T')[0];

    if (existing) {
      existing.ordersCount += 1;
      existing.lifetimeValue += order.total;
      existing.lastOrderDate = today;
      this.saveCustomers(customers);
    } else {
      const initials = order.customerName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: order.customerName,
        initials: initials || 'CL',
        email: order.email || `${order.customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: order.phone || '+63 900 000 0000',
        segment: 'Weekend',
        ordersCount: 1,
        lifetimeValue: order.total,
        lastOrderDate: today,
        customerSinceDate: today
      };
      this.saveCustomers([newCust, ...customers]);
    }
  }

  static getPromotions(): Promotion[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(INITIAL_PROMOTIONS));
      return INITIAL_PROMOTIONS;
    }
    return JSON.parse(raw);
  }

  static savePromotions(promotions: Promotion[]): void {
    localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions));
    this.triggerSyncIfConfigured('promotions', promotions);
  }

  static getReviews(): Review[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(raw);
  }

  static saveReviews(reviews: Review[]): void {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    this.triggerSyncIfConfigured('reviews', reviews);
  }

  static getSettings(): ShopSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return JSON.parse(raw);
  }

  static saveSettings(settings: ShopSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    this.triggerSyncIfConfigured('settings', settings);
  }

  static getDiary(): StudioDiaryEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DIARY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(INITIAL_DIARY));
      return INITIAL_DIARY;
    }
    return JSON.parse(raw);
  }

  static addDiaryEntry(entry: StudioDiaryEntry): void {
    const list = this.getDiary();
    localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify([entry, ...list.slice(0, 19)]));
  }

  // Google Sheets integration bridge
  private static async triggerSyncIfConfigured(entityType: string, payload: any): Promise<void> {
    const settings = this.getSettings();
    if (!settings.isGoogleConnected || !settings.googleAppsScriptUrl) {
      return;
    }
    try {
      await fetch(settings.googleAppsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_entity',
          entityType,
          payload,
          timestamp: new Date().toISOString()
        })
      });
    } catch (e) {
      console.warn('Google Sheets background sync failed:', e);
    }
  }

  // Reset to screenshot defaults
  static resetToDefault(): void {
    localStorage.clear();
    window.location.reload();
  }
}
