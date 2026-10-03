import { 
  Arrangement, 
  Order, 
  InventoryItem, 
  DeliveryRun, 
  Customer, 
  Promotion, 
  Review, 
  ReportItem, 
  StaffMember, 
  ShopSettings,
  StudioDiaryEntry 
} from '../types';

export const INITIAL_ARRANGEMENTS: Arrangement[] = [
  {
    id: 'arr-1',
    name: 'Petal Parade',
    tag: 'Signature',
    category: 'Signature',
    price: 2450,
    coldRoomCount: 14,
    sold30d: 96,
    image: 'https://images.unsplash.com/photo-1587556930799-8dca6a737e5e?auto=format&fit=crop&w=800&q=80',
    description: 'Our iconic signature bouquet featuring garden roses in blushing peach and porcelain cream, accented with white astilbe and sweet Italian ruscus.',
    stems: ['Garden roses', 'Peach ranunculus', 'Cream astilbe', 'Italian ruscus'],
    rating: 4.9,
    isLowStock: false
  },
  {
    id: 'arr-2',
    name: 'Fuchsia Fable',
    tag: 'Statement',
    category: 'Statement',
    price: 1990,
    coldRoomCount: 5,
    sold30d: 78,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    description: 'An unapologetically vibrant burst of lush deep magenta peonies, ruby ranunculus, and silvery seeded eucalyptus in satin-finish wraps.',
    stems: ['Peonies', 'Ruby ranunculus', 'Seeded eucalyptus'],
    rating: 4.8,
    isLowStock: true
  },
  {
    id: 'arr-3',
    name: 'Dusk & Dried',
    tag: 'Dried',
    category: 'Dried',
    price: 1640,
    coldRoomCount: 3,
    sold30d: 51,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    description: 'An everlasting artisanal arrangement crafted from naturally preserved dusty rose, feathery pampas grass, lavender, and terracotta accents in a blush ceramic vase.',
    stems: ['Dusty rose', 'Pampas grass', 'Terracotta blooms', 'Preserved bunny tails'],
    rating: 4.7,
    isLowStock: true
  },
  {
    id: 'arr-4',
    name: 'Twirl Orchid',
    tag: 'Houseplant',
    category: 'Houseplant',
    price: 3290,
    coldRoomCount: 8,
    sold30d: 34,
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
    description: 'Two cascading spikes of pure white and blush Phalaenopsis orchids potted in our signature handcrafted rose-clay ceramic bowl.',
    stems: ['Double-stem Phalaenopsis', 'Sphagnum moss', 'Natural willow support'],
    rating: 5.0,
    isLowStock: false
  },
  {
    id: 'arr-5',
    name: 'Sweet Blush Box',
    tag: 'Box',
    category: 'Box',
    price: 2850,
    coldRoomCount: 6,
    sold30d: 62,
    image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted luxury round hatbox brimming with Dutch white hydrangeas, cappuccino roses, and blush carnations.',
    stems: ['White hydrangeas', 'Cappuccino roses', 'Blush spray carnations'],
    rating: 4.9,
    isLowStock: false
  },
  {
    id: 'arr-6',
    name: 'Bridal Serenade',
    tag: 'Bridal',
    category: 'Bridal',
    price: 4800,
    coldRoomCount: 4,
    sold30d: 29,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Ethereal couture bridal bouquet composed of cascading White O’Hara garden roses, fragrant sweet peas, and pure silk streamers.',
    stems: ['White O’Hara roses', 'Sweet peas', 'White calla lilies', 'Trailing jasmine'],
    rating: 5.0,
    isLowStock: true
  },
  {
    id: 'arr-7',
    name: 'Sunny Gerbera',
    tag: 'Cheerful',
    category: 'Cheerful',
    price: 1550,
    coldRoomCount: 11,
    sold30d: 84,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    description: 'Sun-drenched golden gerbera daisies, coral spray roses, and fresh chamomile buds to brighten any space in Metro Manila.',
    stems: ['Golden gerberas', 'Coral spray roses', 'Chamomile daisies'],
    rating: 4.8,
    isLowStock: false
  },
  {
    id: 'arr-8',
    name: 'Velvet Romance',
    tag: 'Signature',
    category: 'Signature',
    price: 3100,
    coldRoomCount: 9,
    sold30d: 40,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    description: 'Two dozen deep red velvet Ecuadorian roses wrapped in black and blush bespoke papers with a double-faced crimson ribbon.',
    stems: ['Ecuadorian red roses', 'Eucalyptus gunnii', 'Hypericum berries'],
    rating: 4.9,
    isLowStock: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BT-2041',
    customerName: 'Marisol Reyes',
    customerInitials: 'MR',
    email: 'marisol.reyes@gmail.com',
    phone: '+63 917 888 2391',
    address: 'One Serendra, 32nd St, BGC, Taguig',
    arrangementName: 'Petal Parade bridal bouquet',
    arrangementId: 'arr-1',
    channel: 'Online',
    total: 8450,
    dueTime: '12:30',
    status: 'Arranging',
    date: '2026-10-01 09:12',
    courier: 'Jom',
    cardMessage: 'To the love of my life on our wedding day. Can’t wait to see you walk down the aisle.',
    itemsCount: 1
  },
  {
    id: 'BT-2040',
    customerName: 'Kaito Nakamura',
    customerInitials: 'KN',
    email: 'kaito@nakamura.design',
    phone: '+63 920 445 1190',
    address: 'Rockwell Center, Poblacion, Makati',
    arrangementName: 'Fuchsia Fable hand-tied + vase',
    arrangementId: 'arr-2',
    channel: 'Instagram',
    total: 4180,
    dueTime: '14:00',
    status: 'Fresh',
    date: '2026-10-01 08:54',
    itemsCount: 2
  },
  {
    id: 'BT-2039',
    customerName: 'Santo Tomas Cafe',
    customerInitials: 'ST',
    email: 'orders@santotomas.ph',
    phone: '+63 918 333 9920',
    address: 'Tomas Morato Ave, Tomas, Batangas / QC',
    arrangementName: 'Table blooms × 6 (weekly)',
    arrangementId: 'arr-7',
    channel: 'Phone',
    total: 12600,
    dueTime: '10:00',
    status: 'In transit',
    date: '2026-09-30 17:20',
    courier: 'Marisol',
    itemsCount: 6
  },
  {
    id: 'BT-2038',
    customerName: 'Andrea Villanueva',
    customerInitials: 'AV',
    email: 'andrea.v@outlook.com',
    phone: '+63 917 554 9021',
    address: '45 Gilmore Ave, New Manila, Quezon City',
    arrangementName: 'Dusk & Dried bespoke',
    arrangementId: 'arr-3',
    channel: 'Online',
    total: 2740,
    dueTime: '17:30',
    status: 'Delivered',
    date: '2026-09-30 15:41',
    courier: 'Nino',
    itemsCount: 1
  },
  {
    id: 'BT-2037',
    customerName: 'Grace Chu',
    customerInitials: 'GC',
    email: 'grace.chu@intercorp.com',
    phone: '+63 928 112 3445',
    address: 'Palacio del Gobernador, Intramuros, Manila',
    arrangementName: 'Twirl Orchid premium',
    arrangementId: 'arr-4',
    channel: 'Online',
    total: 3290,
    dueTime: '13:05',
    status: 'Delivered',
    date: '2026-09-30 13:05',
    courier: 'Nino',
    itemsCount: 1
  },
  {
    id: 'BT-2036',
    customerName: 'Balmores Hotel',
    customerInitials: 'BH',
    email: 'events@balmores.ph',
    phone: '+63 917 100 2000',
    address: 'Roxas Blvd, Ermita, Manila',
    arrangementName: 'Lobby arrangements × 3',
    arrangementId: 'arr-5',
    channel: 'Phone',
    total: 18500,
    dueTime: '16:00',
    status: 'Delivered',
    date: '2026-09-30 11:18',
    courier: 'Jom',
    itemsCount: 3
  },
  {
    id: 'BT-2035',
    customerName: 'Dra. Cristina Alegre',
    customerInitials: 'CA',
    email: 'dr.cristina@alegreclinic.com',
    phone: '+63 919 444 8832',
    address: 'BF Resort Village, Las Piñas',
    arrangementName: 'Bridal Serenade centerpiece',
    arrangementId: 'arr-6',
    channel: 'Online',
    total: 4800,
    dueTime: '12:00',
    status: 'Delivered',
    date: '2026-09-29 16:30',
    courier: 'Nino',
    itemsCount: 1
  },
  {
    id: 'BT-2034',
    customerName: 'Yuna Park',
    customerInitials: 'YP',
    email: 'yuna.park@gmail.com',
    phone: '+63 917 222 3341',
    address: 'Boni Serrano Ave, Makati',
    arrangementName: 'Petal Parade pastel edition',
    arrangementId: 'arr-1',
    channel: 'Online',
    total: 2450,
    dueTime: '09:30',
    status: 'Delivered',
    date: '2026-09-29 14:10',
    courier: 'Nino',
    itemsCount: 1
  },
  {
    id: 'BT-2033',
    customerName: 'Carlo Mendoza',
    customerInitials: 'CM',
    email: 'carlo.m@horizon.com',
    phone: '+63 922 777 6655',
    address: 'Salcedo Village, Makati',
    arrangementName: 'Sweet Blush Box luxury',
    arrangementId: 'arr-5',
    channel: 'Online',
    total: 2850,
    dueTime: '11:00',
    status: 'Delivered',
    date: '2026-09-29 10:20',
    courier: 'Marisol',
    itemsCount: 1
  },
  {
    id: 'BT-2032',
    customerName: 'Paolo Cruz',
    customerInitials: 'PC',
    email: 'paolo.cruz@creative.ph',
    phone: '+63 915 999 1234',
    address: 'Kapitolyo, Pasig City',
    arrangementName: 'Sunny Gerbera smile',
    arrangementId: 'arr-7',
    channel: 'Instagram',
    total: 1550,
    dueTime: '15:30',
    status: 'Delivered',
    date: '2026-09-28 16:45',
    courier: 'Nino',
    itemsCount: 1
  },
  {
    id: 'BT-2031',
    customerName: 'Bea Santos',
    customerInitials: 'BS',
    email: 'bea.santos@gmail.com',
    phone: '+63 917 654 3210',
    address: 'Greenhills East, San Juan',
    arrangementName: 'Velvet Romance two-dozen',
    arrangementId: 'arr-8',
    channel: 'Online',
    total: 3100,
    dueTime: '18:00',
    status: 'Arranging',
    date: '2026-09-28 14:00',
    courier: 'Bea',
    itemsCount: 1
  },
  {
    id: 'BT-2030',
    customerName: 'Rafael Diaz',
    customerInitials: 'RD',
    email: 'rdiaz@lawcorp.ph',
    phone: '+63 918 200 4567',
    address: 'White Plains, Quezon City',
    arrangementName: 'Special sympathy wreath',
    channel: 'Phone',
    total: 4900,
    dueTime: '08:30',
    status: 'Cancelled',
    date: '2026-09-28 08:30',
    itemsCount: 1
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Garden rose, blush', type: 'stem', inStock: 24, needed: 40, unit: 'stems', isLow: true },
  { id: 'inv-2', name: 'Peony, coral', type: 'stem', inStock: 8, needed: 30, unit: 'stems', isLow: true },
  { id: 'inv-3', name: 'Pink tulip', type: 'stem', inStock: 60, needed: 50, unit: 'stems', isLow: false },
  { id: 'inv-4', name: 'Hydrangea, white', type: 'stem', inStock: 18, needed: 20, unit: 'heads', isLow: false },
  { id: 'inv-5', name: 'Eucalyptus, seeded', type: 'stem', inStock: 5, needed: 18, unit: 'bunches', isLow: true },
  { id: 'inv-6', name: 'Ranunculus, peach', type: 'stem', inStock: 46, needed: 40, unit: 'stems', isLow: false },
  { id: 'inv-7', name: 'Phalaenopsis stems', type: 'stem', inStock: 14, needed: 12, unit: 'stems', isLow: false },
  { id: 'inv-8', name: 'Blush ceramic vase', type: 'vase', inStock: 32, needed: 25, unit: 'vases', isLow: false },
  { id: 'inv-9', name: 'Matte terracotta pot', type: 'vase', inStock: 18, needed: 20, unit: 'pots', isLow: false },
  { id: 'inv-10', name: 'Luxury hatboxes (round)', type: 'vase', inStock: 68, needed: 40, unit: 'boxes', isLow: false },
  { id: 'inv-11', name: 'Dusky pink tissue wraps', type: 'wrap', inStock: 12, needed: 15, unit: 'rolls', isLow: false },
  { id: 'inv-12', name: 'Satin ribbons (magenta)', type: 'wrap', inStock: 14, needed: 20, unit: 'spools', isLow: false }
];

export const INITIAL_DELIVERIES: DeliveryRun[] = [
  { id: 'del-1', time: '09:30', recipient: 'Yuna Park', location: 'Boni Serrano, Makati', courier: 'Nino', status: 'Done', orderId: 'BT-2034' },
  { id: 'del-2', time: '10:00', recipient: 'Santo Tomas Cafe', location: 'Tomas, Batangas', courier: 'Marisol', status: 'Rolling', orderId: 'BT-2039' },
  { id: 'del-3', time: '11:15', recipient: 'Reyes wedding', location: 'Quezon City', courier: 'Bea', status: 'Queued' },
  { id: 'del-4', time: '12:00', recipient: 'Dra. Cristina Alegre', location: 'Las Piñas', courier: 'Nino', status: 'Rolling', orderId: 'BT-2035' },
  { id: 'del-5', time: '12:30', recipient: 'Marisol Reyes', location: 'BGC, Taguig', courier: 'Jom', status: 'Queued', orderId: 'BT-2041' },
  { id: 'del-6', time: '13:00', recipient: 'Lim residence', location: 'Pasig', courier: 'Nino', status: 'Queued' },
  { id: 'del-7', time: '15:30', recipient: 'Acme Corp lobby', location: 'Ortigas', courier: 'Marisol', status: 'Queued' },
  { id: 'del-8', time: '16:00', recipient: 'Balmores Hotel', location: 'Ermita, Manila', courier: 'Jom', status: 'Queued', orderId: 'BT-2036' },
  { id: 'del-9', time: '17:30', recipient: 'Andrea Villanueva', location: 'New Manila, QC', courier: 'Nino', status: 'Queued', orderId: 'BT-2038' }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Marisol Reyes',
    initials: 'MR',
    email: 'marisol.reyes@gmail.com',
    phone: '+63 917 888 2391',
    segment: 'Bride',
    ordersCount: 6,
    lifetimeValue: 34180,
    lastOrderDate: '2026-10-01',
    customerSinceDate: '2025-11-04'
  },
  {
    id: 'cust-2',
    name: 'Balmores Hotel',
    initials: 'BH',
    email: 'events@balmores.ph',
    phone: '+63 917 100 2000',
    segment: 'Corporate',
    ordersCount: 22,
    lifetimeValue: 218400,
    lastOrderDate: '2026-09-30',
    customerSinceDate: '2024-06-19'
  },
  {
    id: 'cust-3',
    name: 'Yuna Park',
    initials: 'YP',
    email: 'yuna.park@gmail.com',
    phone: '+63 917 222 3341',
    segment: 'Subscriber',
    ordersCount: 31,
    lifetimeValue: 74950,
    lastOrderDate: '2026-09-29',
    customerSinceDate: '2024-02-08'
  },
  {
    id: 'cust-4',
    name: 'Kaito Nakamura',
    initials: 'KN',
    email: 'kaito@nakamura.design',
    phone: '+63 920 445 1190',
    segment: 'Weekend',
    ordersCount: 4,
    lifetimeValue: 14800,
    lastOrderDate: '2026-10-01',
    customerSinceDate: '2026-01-15'
  },
  {
    id: 'cust-5',
    name: 'Santo Tomas Cafe',
    initials: 'ST',
    email: 'orders@santotomas.ph',
    phone: '+63 918 333 9920',
    segment: 'Corporate',
    ordersCount: 48,
    lifetimeValue: 384000,
    lastOrderDate: '2026-09-30',
    customerSinceDate: '2023-08-10'
  },
  {
    id: 'cust-6',
    name: 'Andrea Villanueva',
    initials: 'AV',
    email: 'andrea.v@outlook.com',
    phone: '+63 917 554 9021',
    segment: 'Bride',
    ordersCount: 8,
    lifetimeValue: 52300,
    lastOrderDate: '2026-09-30',
    customerSinceDate: '2025-05-12'
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  { id: 'promo-1', code: 'ALLSAINTS15', description: 'All Saints’ seasonal special', discountDisplay: '15% off · ends Nov 2', status: 'Live', usesCount: 98 },
  { id: 'promo-2', code: 'TWIRLFIRST', description: 'Welcome voucher for new studio clients', discountDisplay: '₱200 off first order', status: 'Live', usesCount: 141 },
  { id: 'promo-3', code: 'BRIDE2027', description: 'Advance booking bridal perks', discountDisplay: 'Free consult + 10%', status: 'Live', usesCount: 24 },
  { id: 'promo-4', code: 'MOMDAY', description: 'Mother’s Day celebratory bundle', discountDisplay: 'Mother’s Day bundle', status: 'Ended', usesCount: 49 }
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 'rev-1', customerName: 'Yuna Park', quote: 'The tulips lasted ten days!', rating: 5, badge: 'New', date: '2026-10-01' },
  { id: 'rev-2', customerName: 'Carlo Mendoza', quote: 'Hatbox was stunning, courier was late.', rating: 4, badge: 'Reply', date: '2026-09-30' },
  { id: 'rev-3', customerName: 'Andrea Lim', quote: 'My bridal bouquet was a dream.', rating: 5, date: '2026-09-28' },
  { id: 'rev-4', customerName: 'Paolo Cruz', quote: 'Sunny Gerbera made her day.', rating: 5, date: '2026-09-27' },
  { id: 'rev-5', customerName: 'Dra. Cristina Alegre', quote: 'Exceptional fresh stems every time. Our clinic lobby always feels welcoming.', rating: 5, date: '2026-09-25' }
];

export const INITIAL_REPORTS: ReportItem[] = [
  { id: 'rep-1', title: 'Monthly sales summary', period: 'Sept 2026 · PDF', fileType: 'PDF', summaryValue: '₱1.42M' },
  { id: 'rep-2', title: 'Arrangement margins', period: 'Q3 2026 · CSV', fileType: 'CSV', summaryValue: '56%' },
  { id: 'rep-3', title: 'Channel performance', period: 'Sept 2026', fileType: 'Metric', summaryValue: 'Online 48%' },
  { id: 'rep-4', title: 'Courier on-time', period: 'Sept 2026', fileType: 'Metric', summaryValue: '94%' }
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: 'st-1', name: 'Shaira', role: 'Owner & head florist', accessTier: 'Admin', scope: 'Full access', onShift: true, hoursThisWeek: 42 },
  { id: 'st-2', name: 'Jom', role: 'Arranger', accessTier: 'Staff', scope: 'Orders, stock', onShift: true, hoursThisWeek: 38 },
  { id: 'st-3', name: 'Bea', role: 'Bridal florist', accessTier: 'Staff', scope: 'Orders, customers', onShift: true, hoursThisWeek: 40 },
  { id: 'st-4', name: 'Nino', role: 'Courier', accessTier: 'Staff', scope: 'Deliveries', onShift: true, hoursThisWeek: 44 },
  { id: 'st-5', name: 'Marisol', role: 'Courier', accessTier: 'Staff', scope: 'Deliveries', onShift: false, hoursThisWeek: 36 },
  { id: 'st-6', name: 'Anya', role: 'Studio apprentice', accessTier: 'Staff', scope: 'Inventory, prep', onShift: false, hoursThisWeek: 12 }
];

export const INITIAL_SETTINGS: ShopSettings = {
  shopName: 'Bloom&Twirl by Shaira',
  tagline: 'Flower studio · Metro Manila',
  deliveryFee: 150,
  operatingHours: '08:00–20:00',
  phone: '+63 917 555 0142',
  payments: {
    gcash: true,
    maya: true,
    card: true,
    cod: true
  },
  orderNotifications: true,
  coldRoomTemp: '4°C',
  coldRoomAlert: '24 garden roses left. Two bridal consults before noon.',
  googleSheetId: '',
  googleAppsScriptUrl: 'https://script.google.com/macros/s/AKfycbxng-dNluRmPHqTpf2S14FZHSzIcdvPyuA-0d2fCl5affjBg6UMOLnkVM3SVALGSukb/exec',
  googleDriveFolderId: '',
  isGoogleConnected: true
};

export const INITIAL_DIARY: StudioDiaryEntry[] = [
  {
    id: 'diary-1',
    time: '09:12',
    title: 'New bridal order BT-2041',
    description: 'Petal Parade bouquet for a BGC ceremony, 12:30 pickup.'
  },
  {
    id: 'diary-2',
    time: '08:54',
    title: 'Instagram DM converted',
    description: 'Kaito booked two Fuchsia Fable hand-ties via story reply.'
  },
  {
    id: 'diary-3',
    time: '08:20',
    title: 'Cold room restocked',
    description: '46 ranunculus stems checked in, 8 peonies flagged low.'
  },
  {
    id: 'diary-4',
    time: 'YESTERDAY',
    title: 'Subscription batch sent',
    description: '24 weekly bouquets queued for Monday morning runs.',
    isYesterday: true
  }
];
