export type ArrangementCategory = 
  | 'All' 
  | 'Signature' 
  | 'Statement' 
  | 'Dried' 
  | 'Houseplant' 
  | 'Box' 
  | 'Bridal' 
  | 'Cheerful';

export type ProductType = 'arranged' | 'flowers_only';

export interface Arrangement {
  id: string;
  name: string;
  tag: string; // e.g. "Signature", "Statement", "Dried", "Houseplant", "Fresh Cut"
  category: ArrangementCategory | string;
  price: number;
  unit?: string; // e.g. "per stem", "per bunch (10 stems)", "per dozen"
  productType?: ProductType;
  coldRoomCount: number;
  sold30d: number;
  image: string;
  description: string;
  stems: string[]; // e.g. ["Garden roses", "Peach", "Cream"]
  rating: number;
  isLowStock?: boolean;
}

export type OrderStatus = 'Fresh' | 'Arranging' | 'In transit' | 'Delivered' | 'Cancelled';
export type OrderChannel = 'Online' | 'Instagram' | 'Phone';

export interface Order {
  id: string; // e.g. "BT-2041"
  customerName: string;
  customerInitials: string;
  email: string;
  phone: string;
  address: string;
  arrangementName: string;
  arrangementId?: string;
  channel: OrderChannel;
  total: number;
  dueTime: string; // e.g. "12:30"
  status: OrderStatus;
  date: string; // e.g. "2026-10-01 09:12"
  courier?: string;
  cardMessage?: string;
  itemsCount?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'stem' | 'vase' | 'wrap';
  inStock: number;
  needed: number;
  unit: string;
  isLow: boolean;
}

export type DeliveryStatus = 'Done' | 'Rolling' | 'Queued' | 'Late';

export interface DeliveryRun {
  id: string;
  time: string; // e.g. "09:30"
  recipient: string;
  location: string;
  courier: string;
  status: DeliveryStatus;
  orderId?: string;
}

export type CustomerSegment = 'Bride' | 'Subscriber' | 'Corporate' | 'Weekend';

export interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  segment: CustomerSegment;
  ordersCount: number;
  lifetimeValue: number;
  lastOrderDate: string;
  customerSinceDate: string;
}

export interface Promotion {
  id: string;
  code: string;
  description: string;
  discountDisplay: string; // e.g. "15% off · ends Nov 2" or "₱200 off first order"
  status: 'Live' | 'Ended';
  usesCount: number;
}

export interface Review {
  id: string;
  customerName: string;
  quote: string;
  rating: number;
  badge?: 'New' | 'Reply' | 'Replied';
  date: string;
}

export interface ReportItem {
  id: string;
  title: string;
  period: string;
  fileType: 'PDF' | 'CSV' | 'Metric';
  summaryValue: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string; // e.g. "Owner & head florist", "Arranger", "Bridal florist", "Courier"
  accessTier: 'Admin' | 'Staff';
  scope: string; // e.g. "Full access", "Orders, stock", "Deliveries"
  onShift: boolean;
  hoursThisWeek: number;
}

export interface ShopSettings {
  shopName: string;
  tagline: string;
  deliveryFee: number;
  operatingHours: string;
  phone: string;
  payments: {
    gcash: boolean;
    maya: boolean;
    card: boolean;
    cod: boolean;
  };
  orderNotifications: boolean;
  coldRoomTemp: string;
  coldRoomAlert: string;
  // Google Sheets & Drive Cloud Integration
  googleSheetId: string;
  googleAppsScriptUrl: string;
  googleDriveFolderId: string;
  isGoogleConnected: boolean;
  lastSyncedAt?: string;
}

export interface StudioDiaryEntry {
  id: string;
  time: string;
  title: string;
  description: string;
  isYesterday?: boolean;
}
