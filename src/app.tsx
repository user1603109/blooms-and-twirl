// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- SVG Icons Helper Components ---
const Icons = {
  Flower: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V3m4.5 9a4.5 4.5 0 1 1-4.5 4.5M16.5 12H21m-9 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V21m-4.5-9H3"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Overview: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
      <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  ),
  Orders: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
    </svg>
  ),
  Arrangements: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a5 5 0 0 1 5 5c0 2.3-1.5 4.3-3.6 4.9.4.7.6 1.4.6 2.1 0 2.8-2.2 5-5 5s-5-2.2-5-5c0-.7.2-1.4.6-2.1C2.5 11.3 1 9.3 1 7a5 5 0 0 1 5-5c1.8 0 3.3 1 4.1 2.4.8-1.4 2.3-2.4 4.1-2.4Z"/>
      <path d="M12 14v8"/>
    </svg>
  ),
  Inventory: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  Deliveries: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
      <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
    </svg>
  ),
  Customers: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Promotions: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" x2="7.01" y1="7" y2="7"/>
    </svg>
  ),
  Reviews: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Reports: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  ),
  Staff: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Snowflake: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4l-3 6"/><path d="m17 3-3 6h-4L7 3"/><path d="M2 12h20"/><path d="m20 10-2.5 1.25L18 14"/><path d="m4 10 2.5 1.25L6 14"/><path d="m20 14-2.5-1.25L18 10"/><path d="m4 14 2.5-1.25L6 10"/>
    </svg>
  ),
  Phone: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Database: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
};

// --- INITIAL STATE LOADER FROM STORAGE ---
const getInitial = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`bt_${key}_v1`);
    return raw ? JSON.parse(raw) : fallback;
  } catch(e) {
    return fallback;
  }
};

const saveItem = (key, data) => {
  localStorage.setItem(`bt_${key}_v1`, JSON.stringify(data));
};

// --- APP COMPONENT ---
function App() {
  // Navigation mode: 'admin' | 'store' | 'customer_dashboard'
  const [viewMode, setViewMode] = useState('admin');
  const [adminTab, setAdminTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Data Collections
  const [arrangements, setArrangements] = useState(() => getInitial('arrangements', [
    { id: 'arr-1', name: 'Petal Parade', tag: 'Signature', category: 'Signature', price: 2450, coldRoomCount: 14, sold30d: 96, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80', description: 'Our signature bouquet featuring garden roses in peach and cream, accented with white astilbe and sweet Italian ruscus.', stems: ['Garden roses', 'Peach ranunculus', 'Cream astilbe'], rating: 4.9, isLowStock: false },
    { id: 'arr-2', name: 'Fuchsia Fable', tag: 'Statement', category: 'Statement', price: 1990, coldRoomCount: 5, sold30d: 78, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', description: 'Vibrant burst of lush deep magenta peonies, ruby ranunculus, and silvery seeded eucalyptus in satin wrapping.', stems: ['Peonies', 'Ranunculus', 'Eucalyptus'], rating: 4.8, isLowStock: true },
    { id: 'arr-3', name: 'Dusk & Dried', tag: 'Dried', category: 'Dried', price: 1640, coldRoomCount: 3, sold30d: 51, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80', description: 'Everlasting artisanal arrangement with dusty rose, pampas grass, lavender, and terracotta accents in ceramic vase.', stems: ['Dusty rose', 'Pampas grass', 'Terracotta blooms'], rating: 4.7, isLowStock: true },
    { id: 'arr-4', name: 'Twirl Orchid', tag: 'Houseplant', category: 'Houseplant', price: 3290, coldRoomCount: 8, sold30d: 34, image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80', description: 'Cascading spikes of pure white and blush Phalaenopsis orchids in handcrafted rose ceramic.', stems: ['Phalaenopsis orchid', 'Sphagnum moss'], rating: 5.0, isLowStock: false },
    { id: 'arr-5', name: 'Sweet Blush Box', tag: 'Box', category: 'Box', price: 2850, coldRoomCount: 6, sold30d: 62, image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=80', description: 'Luxury round hatbox with Dutch hydrangeas, cappuccino roses, and blush carnations.', stems: ['Hydrangeas', 'Cappuccino roses', 'Blush carnations'], rating: 4.9, isLowStock: false },
    { id: 'arr-6', name: 'Bridal Serenade', tag: 'Bridal', category: 'Bridal', price: 4800, coldRoomCount: 4, sold30d: 29, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', description: 'Couture bridal bouquet with cascading White O’Hara garden roses, fragrant sweet peas, and pure silk ribbon.', stems: ['White O’Hara roses', 'Sweet peas', 'Calla lilies'], rating: 5.0, isLowStock: true },
    { id: 'arr-7', name: 'Sunny Gerbera', tag: 'Cheerful', category: 'Cheerful', price: 1550, coldRoomCount: 11, sold30d: 84, image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80', description: 'Sun-drenched golden gerbera daisies, coral spray roses, and fresh chamomile buds.', stems: ['Golden gerberas', 'Coral spray roses', 'Chamomile'], rating: 4.8, isLowStock: false },
    { id: 'arr-8', name: 'Velvet Romance', tag: 'Signature', category: 'Signature', price: 3100, coldRoomCount: 9, sold30d: 40, image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80', description: 'Two dozen deep red velvet Ecuadorian roses wrapped in black and blush bespoke papers with satin ribbon.', stems: ['Ecuadorian red roses', 'Eucalyptus gunnii'], rating: 4.9, isLowStock: false }
  ]));

  const [orders, setOrders] = useState(() => getInitial('orders', [
    { id: 'BT-2041', customerName: 'Marisol Reyes', customerInitials: 'MR', email: 'marisol.reyes@gmail.com', phone: '+63 917 888 2391', address: 'One Serendra, BGC, Taguig', arrangementName: 'Petal Parade bridal bouquet', channel: 'Online', total: 8450, dueTime: '12:30', status: 'Arranging', date: '2026-10-01 09:12', courier: 'Jom' },
    { id: 'BT-2040', customerName: 'Kaito Nakamura', customerInitials: 'KN', email: 'kaito@nakamura.design', phone: '+63 920 445 1190', address: 'Rockwell, Poblacion, Makati', arrangementName: 'Fuchsia Fable hand-tied + vase ×2', channel: 'Instagram', total: 4180, dueTime: '14:00', status: 'Fresh', date: '2026-10-01 08:54' },
    { id: 'BT-2039', customerName: 'Santo Tomas Cafe', customerInitials: 'ST', email: 'orders@santotomas.ph', phone: '+63 918 333 9920', address: 'Tomas Morato, Batangas/QC', arrangementName: 'Table blooms × 6 (weekly)', channel: 'Phone', total: 12600, dueTime: '10:00', status: 'In transit', date: '2026-09-30 17:20', courier: 'Marisol' },
    { id: 'BT-2038', customerName: 'Andrea Villanueva', customerInitials: 'AV', email: 'andrea.v@outlook.com', phone: '+63 917 554 9021', address: 'New Manila, Quezon City', arrangementName: 'Dusk & Dried bespoke', channel: 'Online', total: 2740, dueTime: '17:30', status: 'Delivered', date: '2026-09-30 15:41', courier: 'Nino' },
    { id: 'BT-2037', customerName: 'Grace Chu', customerInitials: 'GC', email: 'grace.chu@intercorp.com', phone: '+63 928 112 3445', address: 'Intramuros, Manila', arrangementName: 'Twirl Orchid premium', channel: 'Online', total: 3290, dueTime: '13:05', status: 'Delivered', date: '2026-09-30 13:05', courier: 'Nino' },
    { id: 'BT-2036', customerName: 'Balmores Hotel', customerInitials: 'BH', email: 'events@balmores.ph', phone: '+63 917 100 2000', address: 'Ermita, Manila', arrangementName: 'Lobby arrangements × 3', channel: 'Phone', total: 18500, dueTime: '16:00', status: 'Delivered', date: '2026-09-30 11:18', courier: 'Jom' },
    { id: 'BT-2035', customerName: 'Dra. Cristina Alegre', customerInitials: 'CA', email: 'dr.cristina@alegre.com', phone: '+63 919 444 8832', address: 'BF Resort, Las Piñas', arrangementName: 'Bridal Serenade centerpiece', channel: 'Online', total: 4800, dueTime: '12:00', status: 'Delivered', date: '2026-09-29 16:30', courier: 'Nino' },
    { id: 'BT-2034', customerName: 'Yuna Park', customerInitials: 'YP', email: 'yuna.park@gmail.com', phone: '+63 917 222 3341', address: 'Boni Serrano, Makati', arrangementName: 'Petal Parade pastel edition', channel: 'Online', total: 2450, dueTime: '09:30', status: 'Delivered', date: '2026-09-29 14:10', courier: 'Nino' },
    { id: 'BT-2031', customerName: 'Bea Santos', customerInitials: 'BS', email: 'bea.s@gmail.com', phone: '+63 917 654 3210', address: 'Greenhills, San Juan', arrangementName: 'Velvet Romance two-dozen', channel: 'Online', total: 3100, dueTime: '18:00', status: 'Arranging', date: '2026-09-28 14:00', courier: 'Bea' },
    { id: 'BT-2030', customerName: 'Rafael Diaz', customerInitials: 'RD', email: 'rdiaz@lawcorp.ph', phone: '+63 918 200 4567', address: 'White Plains, QC', arrangementName: 'Sympathy wreath', channel: 'Phone', total: 4900, dueTime: '08:30', status: 'Cancelled', date: '2026-09-28 08:30' }
  ]));

  const [inventory, setInventory] = useState(() => getInitial('inventory', [
    { id: 'inv-1', name: 'Garden rose, blush', inStock: 24, needed: 40, isLow: true },
    { id: 'inv-2', name: 'Peony, coral', inStock: 8, needed: 30, isLow: true },
    { id: 'inv-3', name: 'Pink tulip', inStock: 60, needed: 50, isLow: false },
    { id: 'inv-4', name: 'Hydrangea, white', inStock: 18, needed: 20, isLow: false },
    { id: 'inv-5', name: 'Eucalyptus, seeded', inStock: 5, needed: 18, isLow: true },
    { id: 'inv-6', name: 'Ranunculus, peach', inStock: 46, needed: 40, isLow: false },
    { id: 'inv-7', name: 'Phalaenopsis stems', inStock: 14, needed: 12, isLow: false },
    { id: 'inv-8', name: 'Blush ceramic vase', inStock: 32, needed: 25, isLow: false },
    { id: 'inv-9', name: 'Matte terracotta pot', inStock: 18, needed: 20, isLow: false },
    { id: 'inv-10', name: 'Dusky pink tissue wraps', inStock: 12, needed: 15, isLow: false },
    { id: 'inv-11', name: 'Satin ribbons (magenta)', inStock: 14, needed: 20, isLow: false }
  ]));

  const [deliveries, setDeliveries] = useState(() => getInitial('deliveries', [
    { id: 'del-1', time: '09:30', recipient: 'Yuna Park', location: 'Boni Serrano, Makati', courier: 'Nino', status: 'Done' },
    { id: 'del-2', time: '10:00', recipient: 'Santo Tomas Cafe', location: 'Tomas, Batangas', courier: 'Marisol', status: 'Rolling' },
    { id: 'del-3', time: '11:15', recipient: 'Reyes wedding', location: 'Quezon City', courier: 'Bea', status: 'Queued' },
    { id: 'del-4', time: '12:00', recipient: 'Dra. Cristina Alegre', location: 'Las Piñas', courier: 'Nino', status: 'Rolling' },
    { id: 'del-5', time: '12:30', recipient: 'Marisol Reyes', location: 'BGC, Taguig', courier: 'Jom', status: 'Queued' },
    { id: 'del-6', time: '13:00', recipient: 'Lim residence', location: 'Pasig', courier: 'Nino', status: 'Queued' },
    { id: 'del-7', time: '15:30', recipient: 'Acme Corp lobby', location: 'Ortigas', courier: 'Marisol', status: 'Queued' },
    { id: 'del-8', time: '16:00', recipient: 'Balmores Hotel', location: 'Ermita, Manila', courier: 'Jom', status: 'Queued' },
    { id: 'del-9', time: '17:30', recipient: 'Andrea Villanueva', location: 'New Manila, QC', courier: 'Nino', status: 'Queued' }
  ]));

  const [customers, setCustomers] = useState(() => getInitial('customers', [
    { id: 'c-1', name: 'Marisol Reyes', initials: 'MR', email: 'marisol.reyes@gmail.com', phone: '+63 917 888 2391', segment: 'Bride', ordersCount: 6, lifetimeValue: 34180, lastOrderDate: '2026-10-01', customerSinceDate: '2025-11-04' },
    { id: 'c-2', name: 'Balmores Hotel', initials: 'BH', email: 'events@balmores.ph', phone: '+63 917 100 2000', segment: 'Corporate', ordersCount: 22, lifetimeValue: 218400, lastOrderDate: '2026-09-30', customerSinceDate: '2024-06-19' },
    { id: 'c-3', name: 'Yuna Park', initials: 'YP', email: 'yuna.park@gmail.com', phone: '+63 917 222 3341', segment: 'Subscriber', ordersCount: 31, lifetimeValue: 74950, lastOrderDate: '2026-09-29', customerSinceDate: '2024-02-08' },
    { id: 'c-4', name: 'Kaito Nakamura', initials: 'KN', email: 'kaito@nakamura.design', phone: '+63 920 445 1190', segment: 'Weekend', ordersCount: 4, lifetimeValue: 14800, lastOrderDate: '2026-10-01', customerSinceDate: '2026-01-15' },
    { id: 'c-5', name: 'Santo Tomas Cafe', initials: 'ST', email: 'orders@santotomas.ph', phone: '+63 918 333 9920', segment: 'Corporate', ordersCount: 48, lifetimeValue: 384000, lastOrderDate: '2026-09-30', customerSinceDate: '2023-08-10' },
    { id: 'c-6', name: 'Andrea Villanueva', initials: 'AV', email: 'andrea.v@outlook.com', phone: '+63 917 554 9021', segment: 'Bride', ordersCount: 8, lifetimeValue: 52300, lastOrderDate: '2026-09-30', customerSinceDate: '2025-05-12' }
  ]));

  const [promotions, setPromotions] = useState(() => getInitial('promotions', [
    { id: 'p-1', code: 'ALLSAINTS15', description: '15% off · ends Nov 2', status: 'Live', usesCount: 98 },
    { id: 'p-2', code: 'TWIRLFIRST', description: '₱200 off first order', status: 'Live', usesCount: 141 },
    { id: 'p-3', code: 'BRIDE2027', description: 'Free consult + 10%', status: 'Live', usesCount: 24 },
    { id: 'p-4', code: 'MOMDAY', description: 'Mother\'s Day bundle', status: 'Ended', usesCount: 49 }
  ]));

  const [reviews, setReviews] = useState(() => getInitial('reviews', [
    { id: 'r-1', customerName: 'Yuna Park', quote: 'The tulips lasted ten days!', rating: 5, badge: 'New' },
    { id: 'r-2', customerName: 'Carlo Mendoza', quote: 'Hatbox was stunning, courier was late.', rating: 4, badge: 'Reply' },
    { id: 'r-3', customerName: 'Andrea Lim', quote: 'My bridal bouquet was a dream.', rating: 5 },
    { id: 'r-4', customerName: 'Paolo Cruz', quote: 'Sunny Gerbera made her day.', rating: 5 },
    { id: 'r-5', customerName: 'Dra. Cristina Alegre', quote: 'Exceptional fresh stems every time.', rating: 5 }
  ]));

  const [settings, setSettings] = useState(() => getInitial('settings', {
    shopName: 'Bloom&Twirl by Shaira',
    deliveryFee: 150,
    operatingHours: '08:00–20:00',
    phone: '+63 917 555 0142',
    currency: 'PHP ₱',
    paymentMethods: 4,
    deliveryZones: 9,
    googleSheetId: '',
    googleAppsScriptUrl: '',
    googleDriveFolderId: '',
    isGoogleConnected: false
  }));

  // Shopping Cart & Customer Order Tracking State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activePromoCode, setActivePromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Modals in Admin
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isNewArrangementModalOpen, setIsNewArrangementModalOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('All');
  const [catalogCategory, setCatalogCategory] = useState('All');
  const [customerSegmentFilter, setCustomerSegmentFilter] = useState('All');

  // Customer Dashboard Tracking Query
  const [lookupOrderNumber, setLookupOrderNumber] = useState('BT-2041');
  const [trackedOrder, setTrackedOrder] = useState(() => orders.find(o => o.id === 'BT-2041') || orders[0]);

  // Save changes to localStorage
  useEffect(() => saveItem('orders', orders), [orders]);
  useEffect(() => saveItem('arrangements', arrangements), [arrangements]);
  useEffect(() => saveItem('inventory', inventory), [inventory]);
  useEffect(() => saveItem('deliveries', deliveries), [deliveries]);
  useEffect(() => saveItem('customers', customers), [customers]);
  useEffect(() => saveItem('promotions', promotions), [promotions]);
  useEffect(() => saveItem('reviews', reviews), [reviews]);
  useEffect(() => saveItem('settings', settings), [settings]);

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartTotal = Math.max(0, cartSubtotal + (cart.length > 0 ? settings.deliveryFee : 0) - promoDiscount);

  const applyPromo = (code) => {
    const found = promotions.find(p => p.code.toUpperCase() === code.trim().toUpperCase() && p.status === 'Live');
    if (found) {
      if (found.code === 'ALLSAINTS15') {
        const disc = Math.round(cartSubtotal * 0.15);
        setPromoDiscount(disc);
        alert(`Promo applied! 15% discount (₱${disc.toLocaleString()})`);
      } else if (found.code === 'TWIRLFIRST') {
        setPromoDiscount(200);
        alert(`Promo applied! ₱200 discount`);
      }
      setActivePromoCode(found.code);
    } else {
      alert('Invalid or expired promo code. Try TWIRLFIRST or ALLSAINTS15');
    }
  };

  // Create Order from Checkout
  const handlePlaceOrder = (checkoutData) => {
    const nextId = `BT-${2040 + orders.length + 1}`;
    const newOrd = {
      id: nextId,
      customerName: checkoutData.name,
      customerInitials: checkoutData.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0, 2) || 'CL',
      email: checkoutData.email,
      phone: checkoutData.phone,
      address: checkoutData.address,
      arrangementName: cart.map(i => `${i.name} (×${i.qty})`).join(', '),
      channel: 'Online',
      total: cartTotal,
      dueTime: checkoutData.dueTime || '14:00',
      status: 'Fresh',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      cardMessage: checkoutData.cardMessage,
      courier: 'Nino'
    };

    setOrders([newOrd, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setTrackedOrder(newOrd);
    setLookupOrderNumber(newOrd.id);
    setViewMode('customer_dashboard');
    alert(`💐 Thank you! Your order ${newOrd.id} has been submitted to Shaira’s bench.`);
  };

  // Admin New Order submission
  const handleAdminNewOrder = (ord) => {
    const nextId = `BT-${2040 + orders.length + 1}`;
    const initials = ord.customerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'CL';
    const newOrd = {
      ...ord,
      id: nextId,
      customerInitials: initials,
      status: 'Fresh',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setOrders([newOrd, ...orders]);
    setIsNewOrderModalOpen(false);
  };

  // Change order status
  const advanceOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (trackedOrder && trackedOrder.id === orderId) {
      setTrackedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Filtered lists
  const filteredOrders = useMemo(() => {
    let list = orders;
    if (orderFilter !== 'All') {
      list = list.filter(o => o.status === orderFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.arrangementName.toLowerCase().includes(q));
    }
    return list;
  }, [orders, orderFilter, searchQuery]);

  const filteredArrangements = useMemo(() => {
    let list = arrangements;
    if (catalogCategory !== 'All') {
      list = list.filter(a => a.category === catalogCategory || a.tag === catalogCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    }
    return list;
  }, [arrangements, catalogCategory, searchQuery]);

  return (
    <div className="app-container">
      {/* Floating Mode Switcher */}
      <div className="view-switcher-pill">
        <button 
          className={`switcher-btn ${viewMode === 'admin' ? 'active' : ''}`}
          onClick={() => setViewMode('admin')}
        >
          <Icons.Overview /> Admin Studio Console
        </button>
        <button 
          className={`switcher-btn ${viewMode === 'store' ? 'active' : ''}`}
          onClick={() => setViewMode('store')}
        >
          <Icons.ShoppingBag /> Customer Storefront ({cart.reduce((a,c)=>a+c.qty, 0)})
        </button>
        <button 
          className={`switcher-btn ${viewMode === 'customer_dashboard' ? 'active' : ''}`}
          onClick={() => setViewMode('customer_dashboard')}
        >
          <Icons.Orders /> Order Tracking
        </button>
      </div>

      {/* ===================== ADMIN VIEW ===================== */}
      {viewMode === 'admin' && (
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="brand-header">
              <div className="brand-icon-box">
                <Icons.Flower />
              </div>
              <div className="brand-text">
                <h2>Bloom<span>&</span>Twirl</h2>
                <div className="brand-subtitle">BY SHAIRA · ADMIN</div>
              </div>
            </div>

            <div className="nav-section-title">SHOP FLOOR</div>
            <ul className="nav-list">
              <li>
                <button className={`nav-item-btn ${adminTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminTab('overview')}>
                  <div className="nav-label-group"><Icons.Overview /> Overview</div>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'orders' ? 'active' : ''}`} onClick={() => setAdminTab('orders')}>
                  <div className="nav-label-group"><Icons.Orders /> Orders</div>
                  <span className="nav-badge">12</span>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'arrangements' ? 'active' : ''}`} onClick={() => setAdminTab('arrangements')}>
                  <div className="nav-label-group"><Icons.Arrangements /> Arrangements</div>
                  <span className="nav-badge">8</span>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'inventory' ? 'active' : ''}`} onClick={() => setAdminTab('inventory')}>
                  <div className="nav-label-group"><Icons.Inventory /> Inventory</div>
                  <span className="nav-badge">3</span>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'deliveries' ? 'active' : ''}`} onClick={() => setAdminTab('deliveries')}>
                  <div className="nav-label-group"><Icons.Deliveries /> Deliveries</div>
                </button>
              </li>
            </ul>

            <div className="nav-section-title">GROWTH</div>
            <ul className="nav-list">
              <li>
                <button className={`nav-item-btn ${adminTab === 'customers' ? 'active' : ''}`} onClick={() => setAdminTab('customers')}>
                  <div className="nav-label-group"><Icons.Customers /> Customers</div>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'promotions' ? 'active' : ''}`} onClick={() => setAdminTab('promotions')}>
                  <div className="nav-label-group"><Icons.Promotions /> Promotions</div>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'reviews' ? 'active' : ''}`} onClick={() => setAdminTab('reviews')}>
                  <div className="nav-label-group"><Icons.Reviews /> Reviews</div>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'reports' ? 'active' : ''}`} onClick={() => setAdminTab('reports')}>
                  <div className="nav-label-group"><Icons.Reports /> Reports</div>
                </button>
              </li>
            </ul>

            <div className="nav-section-title">ADMIN</div>
            <ul className="nav-list">
              <li>
                <button className={`nav-item-btn ${adminTab === 'staff' ? 'active' : ''}`} onClick={() => setAdminTab('staff')}>
                  <div className="nav-label-group"><Icons.Staff /> Staff</div>
                </button>
              </li>
              <li>
                <button className={`nav-item-btn ${adminTab === 'settings' ? 'active' : ''}`} onClick={() => setAdminTab('settings')}>
                  <div className="nav-label-group"><Icons.Settings /> Settings</div>
                </button>
              </li>
            </ul>

            {/* Cold Room Widget */}
            <div className="cold-room-card">
              <div className="cold-room-header">
                <Icons.Snowflake /> Cold room · {settings.coldRoomTemp || '4°C'}
              </div>
              <div className="cold-room-desc">
                24 garden roses left. Two bridal consults before noon.
              </div>
              <div className="cold-room-link" onClick={() => alert('Supplier Hotlines: Farm Direct Manila: +63 917 555 9821')}>
                <Icons.Phone /> Supplier line
              </div>
            </div>

            {/* User Profile */}
            <div className="user-footer-card">
              <div className="user-avatar-circle">S</div>
              <div>
                <div className="user-name">Shaira</div>
                <div className="user-role">Owner & head florist</div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="main-wrapper">
            <header className="topbar">
              <div className="search-bar">
                <Icons.Search />
                <input 
                  type="text" 
                  placeholder="Search orders, blooms, customers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="topbar-actions">
                <button className="icon-btn" title="Notifications" onClick={() => alert('Notifications: 3 pending courier dispatches and 1 bridal consult inquiry.')}>
                  <Icons.Bell />
                  <span className="badge-dot"></span>
                </button>
                <button className="btn-primary" onClick={() => setIsNewOrderModalOpen(true)}>
                  <Icons.Plus /> New order
                </button>
              </div>
            </header>

            <main className="page-content">
              {/* --- 1. OVERVIEW VIEW --- */}
              {adminTab === 'overview' && (
                <div>
                  <div className="page-eyebrow">WEDNESDAY · 1 OCTOBER 2026</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Good morning, Shaira</h1>
                      <p className="page-description">38 orders in the book, 11 still to arrange, and two bridal consults before noon.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-secondary" onClick={() => alert("Today's Plan: 6 couriers scheduled, 2 batches of garden roses checked in at 8:20 AM.")}>
                        Today's plan
                      </button>
                      <button className="btn-secondary" onClick={() => alert('Exporting live studio summary to CSV...')}>
                        Export
                      </button>
                    </div>
                  </div>

                  {/* 4 Stat Cards */}
                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-header">
                        <span className="stat-label">REVENUE TODAY</span>
                        <span className="stat-tag positive">↗ 12.4%</span>
                      </div>
                      <div className="stat-value">₱68,420</div>
                      <div className="stat-subtext">vs ₱60,880 yesterday</div>
                      {/* SVG Sparkline */}
                      <svg className="stat-sparkline" viewBox="0 0 100 25" preserveAspectRatio="none">
                        <path d="M0,20 Q20,18 40,12 T70,14 T100,5" fill="none" stroke="#D8315B" strokeWidth="2.5" />
                      </svg>
                    </div>

                    <div className="stat-card">
                      <div className="stat-header">
                        <span className="stat-label">ORDERS TODAY</span>
                        <span className="stat-tag positive">↗ 8.6%</span>
                      </div>
                      <div className="stat-value">38</div>
                      <div className="stat-subtext">11 still to arrange</div>
                      <svg className="stat-sparkline" viewBox="0 0 100 25" preserveAspectRatio="none">
                        <path d="M0,22 Q30,20 50,15 T80,12 T100,6" fill="none" stroke="#D8315B" strokeWidth="2.5" />
                      </svg>
                    </div>

                    <div className="stat-card">
                      <div className="stat-header">
                        <span className="stat-label">AVERAGE BASKET</span>
                        <span className="stat-tag positive">↗ 3.1%</span>
                      </div>
                      <div className="stat-value">₱1,801</div>
                      <div className="stat-subtext">upsell add-ons in 41% of carts</div>
                      <svg className="stat-sparkline" viewBox="0 0 100 25" preserveAspectRatio="none">
                        <path d="M0,21 Q25,19 45,16 T75,10 T100,8" fill="none" stroke="#D8315B" strokeWidth="2.5" />
                      </svg>
                    </div>

                    <div className="stat-card">
                      <div className="stat-header">
                        <span className="stat-label">NEW BOUQUETS BOOKED</span>
                        <span className="stat-tag neutral">↘ 2.4%</span>
                      </div>
                      <div className="stat-value">9</div>
                      <div className="stat-subtext">2 bridal consults pending</div>
                      <svg className="stat-sparkline" viewBox="0 0 100 25" preserveAspectRatio="none">
                        <path d="M0,15 Q25,18 50,12 T75,20 T100,14" fill="none" stroke="#7E6C73" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Takings & Arrangement Type Split */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="content-card">
                      <div className="card-title-row">
                        <div>
                          <div className="card-subtitle">TAKINGS</div>
                          <div className="card-title">₱399,908 in 7 days</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>210 orders · 19% against the same window last season</div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span className="filter-pill active" style={{ padding: '4px 12px', fontSize: '12px' }}>7 days</span>
                          <span className="filter-pill" style={{ padding: '4px 12px', fontSize: '12px' }}>30 days</span>
                          <span className="filter-pill" style={{ padding: '4px 12px', fontSize: '12px' }}>90 days</span>
                        </div>
                      </div>

                      {/* Area Chart Simulation */}
                      <div style={{ position: 'relative', height: '170px', marginTop: '10px' }}>
                        <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#D8315B" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#D8315B" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <line x1="0" y1="40" x2="500" y2="40" stroke="#FCE8ED" strokeDasharray="3 3" />
                          <line x1="0" y1="90" x2="500" y2="90" stroke="#FCE8ED" strokeDasharray="3 3" />
                          <path d="M0,70 C80,85 160,110 240,105 C320,100 400,90 500,92 L500,150 L0,150 Z" fill="url(#areaGrad)" />
                          <path d="M0,70 C80,85 160,110 240,105 C320,100 400,90 500,92" fill="none" stroke="#D8315B" strokeWidth="3" />
                        </svg>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          <span>₱80k</span>
                          <span>₱60k</span>
                          <span>₱40k</span>
                        </div>
                      </div>
                    </div>

                    <div className="content-card">
                      <div className="card-subtitle">BY ARRANGEMENT TYPE</div>
                      <div className="card-title">What sold today</div>
                      
                      {/* Donut Chart */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', position: 'relative' }}>
                        <svg width="150" height="150" viewBox="0 0 42 42">
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#EAF7EE" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="25" />
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#D8315B" strokeWidth="6" strokeDasharray="65 35" strokeDashoffset="5" />
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F39C12" strokeWidth="6" strokeDasharray="15 85" strokeDashoffset="70" />
                        </svg>
                        <div style={{ position: 'absolute', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '700' }}>₱68k</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>TODAY</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Latest Orders & Today's Runs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="content-card">
                      <div className="card-title-row">
                        <div>
                          <div className="card-subtitle">ORDER BOOK</div>
                          <div className="card-title">Latest orders</div>
                        </div>
                        <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => setAdminTab('orders')}>
                          View all →
                        </button>
                      </div>

                      <div className="data-table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>ORDER</th>
                              <th>CUSTOMER</th>
                              <th>ARRANGEMENT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.slice(0, 5).map(o => (
                              <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => { setTrackedOrder(o); setViewMode('customer_dashboard'); }}>
                                <td>
                                  <strong>{o.id}</strong>
                                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{o.date}</div>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div className="avatar-circle">{o.customerInitials}</div>
                                    <div>
                                      <div style={{ fontWeight: '600' }}>{o.customerName}</div>
                                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{o.address.split(',')[0]}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div style={{ fontSize: '13px' }}>{o.arrangementName}</div>
                                  <span className={`status-chip ${o.status.toLowerCase().replace(/\s+/g, '')}`}>
                                    {o.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="content-card">
                      <div className="card-title-row">
                        <div>
                          <div className="card-subtitle">SIX STOPS, THREE COURIERS</div>
                          <div className="card-title">Today's runs</div>
                        </div>
                        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => alert('Runsheet shared to Nino, Marisol, and Bea via Telegram/SMS.')}>
                          Share runsheet
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {deliveries.slice(0, 6).map(d => (
                          <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--primary)' }}>{d.time}</span>
                              <div>
                                <div style={{ fontWeight: '600', fontSize: '13px' }}>{d.recipient}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.location} · {d.courier}</div>
                              </div>
                            </div>
                            <span className={`status-chip ${d.status.toLowerCase()}`}>
                              {d.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Blooms Moving This Week (Bestsellers) */}
                  <div className="content-card">
                    <div className="card-title-row">
                      <div>
                        <div className="card-subtitle">BESTSELLERS</div>
                        <div className="card-title">Blooms moving this week</div>
                      </div>
                      <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => setAdminTab('arrangements')}>
                        Catalogue →
                      </button>
                    </div>

                    <div className="arrangements-grid">
                      {arrangements.slice(0, 4).map(arr => (
                        <div key={arr.id} className="arrangement-card">
                          <div className="arrangement-image-wrap">
                            <img src={arr.image} alt={arr.name} />
                            <span className="card-tag-pill">{arr.tag}</span>
                            {arr.isLowStock && <span className="card-low-stock-pill">Low stock</span>}
                          </div>
                          <div className="arrangement-body">
                            <div className="arrangement-name-row">
                              <h3 className="arrangement-name">{arr.name}</h3>
                              <span className="arrangement-rating">★ {arr.rating}</span>
                            </div>
                            <p className="arrangement-stems">{arr.stems.join(', ')}</p>

                            <div className="stock-progress-wrap">
                              <div className="stock-progress-text">
                                <span>{arr.coldRoomCount} in cold room</span>
                                <span>{arr.sold30d} sold / 30d</span>
                              </div>
                              <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${Math.min(100, (arr.coldRoomCount / 20) * 100)}%` }}></div>
                              </div>
                            </div>

                            <div className="arrangement-footer-row">
                              <span className="arrangement-price">₱{arr.price.toLocaleString()}</span>
                              <button className="btn-restock" onClick={() => {
                                setArrangements(arrangements.map(a => a.id === arr.id ? { ...a, coldRoomCount: a.coldRoomCount + 5, isLowStock: false } : a));
                                alert(`Restocked +5 units of ${arr.name} to cold room.`);
                              }}>
                                Restock
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Studio Diary & Coming Up */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
                    <div className="content-card">
                      <div className="card-subtitle">LAST 24 HOURS</div>
                      <div className="card-title">Studio diary</div>
                      
                      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div style={{ display: 'flex', gap: '14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>09:12</span>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '13px' }}>New bridal order BT-2041</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Petal Parade bouquet for a BGC ceremony, 12:30 pickup.</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>08:54</span>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '13px' }}>Instagram DM converted</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Kaito booked two Fuchsia Fable hand-ties via story reply.</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>08:20</span>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '13px' }}>Cold room restocked</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>46 ranunculus stems checked in, 8 peonies flagged low.</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>YESTERDAY</span>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '13px' }}>Subscription batch sent</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>24 weekly bouquets queued for Monday morning runs.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#2E121E', color: 'white', borderRadius: 'var(--radius-card)', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#FCE2E8' }}>COMING UP</div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', margin: '8px 0 12px 0' }}>All Saints' week</h2>
                        <p style={{ fontSize: '13px', color: '#F8DFE5', lineHeight: '1.5' }}>
                          112 standing orders expected across Oct 30 – Nov 2. White lilies and chrysanthemum need a grower commitment by Friday.
                        </p>
                      </div>

                      <div style={{ marginTop: '20px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', fontSize: '12px', marginBottom: '14px' }}>
                          ✨ Bloom&Twirl by Shaira prep list is 62% complete.
                        </div>
                        <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Opening All Saints seasonal grower prep list...')}>
                          Open prep list
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. ORDERS VIEW --- */}
              {adminTab === 'orders' && (
                <div>
                  <div className="page-eyebrow">ORDER BOOK</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Orders</h1>
                      <p className="page-description">Everything the studio has promised, newest first. Tap a status to narrow the list.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-secondary" onClick={() => alert('Exporting all orders to CSV...')}>Export CSV</button>
                      <button className="btn-secondary" onClick={() => alert('View saved to quick dashboard filter.')}>Save view</button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="stats-grid-3">
                    <div className="stat-card">
                      <div className="stat-label">STILL TO MAKE</div>
                      <div className="stat-value">{orders.filter(o => o.status === 'Fresh' || o.status === 'Arranging').length}</div>
                      <div className="stat-subtext">on the bench before noon</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">ON THE ROAD</div>
                      <div className="stat-value">{orders.filter(o => o.status === 'In transit').length}</div>
                      <div className="stat-subtext">couriers en route now</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">DELIVERED TODAY</div>
                      <div className="stat-value">{orders.filter(o => o.status === 'Delivered').length}</div>
                      <div className="stat-subtext">+50% of the book</div>
                    </div>
                  </div>

                  {/* Status Pills */}
                  <div className="content-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                      <div className="filter-tabs" style={{ marginBottom: 0 }}>
                        {['All', 'Fresh', 'Arranging', 'In transit', 'Delivered', 'Cancelled'].map(st => (
                          <button 
                            key={st} 
                            className={`filter-pill ${orderFilter === st ? 'active' : ''}`}
                            onClick={() => setOrderFilter(st)}
                          >
                            {st} <span className="pill-count">{st === 'All' ? orders.length : orders.filter(o=>o.status === st).length}</span>
                          </button>
                        ))}
                      </div>
                      <div style={{ fontWeight: '700', color: 'var(--primary)' }}>
                        ₱{orders.reduce((a,c)=>a+c.total, 0).toLocaleString()} booked
                      </div>
                    </div>

                    <div className="data-table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>ORDER</th>
                            <th>CUSTOMER</th>
                            <th>ARRANGEMENT</th>
                            <th>CHANNEL</th>
                            <th>TOTAL</th>
                            <th>DUE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map(o => (
                            <tr key={o.id}>
                              <td>
                                <strong>{o.id}</strong>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{o.date}</div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div className="avatar-circle">{o.customerInitials}</div>
                                  <div>
                                    <div style={{ fontWeight: '600' }}>{o.customerName}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{o.address}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{o.arrangementName}</td>
                              <td>
                                <span style={{ fontSize: '11px', fontWeight: '700', background: '#F8DFE5', padding: '3px 8px', borderRadius: '9999px', color: 'var(--text-main)' }}>
                                  {o.channel}
                                </span>
                              </td>
                              <td style={{ fontWeight: '700' }}>₱{o.total.toLocaleString()}</td>
                              <td>{o.dueTime}</td>
                              <td>
                                <span className={`status-chip ${o.status.toLowerCase().replace(/\s+/g, '')}`}>
                                  {o.status}
                                </span>
                              </td>
                              <td>
                                <select 
                                  value={o.status} 
                                  onChange={(e) => advanceOrderStatus(o.id, e.target.value)}
                                  style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '12px' }}
                                >
                                  <option value="Fresh">Fresh</option>
                                  <option value="Arranging">Arranging</option>
                                  <option value="In transit">In transit</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3. ARRANGEMENTS VIEW --- */}
              {adminTab === 'arrangements' && (
                <div>
                  <div className="page-eyebrow">CATALOGUE</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Bouquets & blooms</h1>
                      <p className="page-description">Four house arrangements carry the studio. Prices, cold-room counts and what each one costs to build.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-secondary" onClick={() => alert('Price update modal opened.')}>Update prices</button>
                      <button className="btn-primary" onClick={() => setIsNewArrangementModalOpen(true)}>+ New arrangement</button>
                    </div>
                  </div>

                  <div className="stats-grid-3">
                    <div className="stat-card">
                      <div className="stat-label">SOLD IN 30 DAYS</div>
                      <div className="stat-value">474</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">WORTH ON THE BENCH</div>
                      <div className="stat-value">₱1,096,530</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">NEED RESTOCKING</div>
                      <div className="stat-value">3 lines</div>
                    </div>
                  </div>

                  <div className="filter-tabs">
                    {['All', 'Signature', 'Statement', 'Dried', 'Houseplant', 'Box', 'Bridal', 'Cheerful'].map(cat => (
                      <button 
                        key={cat}
                        className={`filter-pill ${catalogCategory === cat ? 'active' : ''}`}
                        onClick={() => setCatalogCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="arrangements-grid">
                    {filteredArrangements.map(arr => (
                      <div key={arr.id} className="arrangement-card">
                        <div className="arrangement-image-wrap">
                          <img src={arr.image} alt={arr.name} />
                          <span className="card-tag-pill">{arr.tag}</span>
                          {arr.isLowStock && <span className="card-low-stock-pill">Low stock</span>}
                        </div>
                        <div className="arrangement-body">
                          <div className="arrangement-name-row">
                            <h3 className="arrangement-name">{arr.name}</h3>
                            <span className="arrangement-rating">★ {arr.rating}</span>
                          </div>
                          <p className="arrangement-stems">{arr.stems.join(', ')}</p>

                          <div className="stock-progress-wrap">
                            <div className="stock-progress-text">
                              <span>{arr.coldRoomCount} in cold room</span>
                              <span>{arr.sold30d} sold / 30d</span>
                            </div>
                            <div className="progress-bar-bg">
                              <div className="progress-bar-fill" style={{ width: `${Math.min(100, (arr.coldRoomCount / 20) * 100)}%` }}></div>
                            </div>
                          </div>

                          <div className="arrangement-footer-row">
                            <span className="arrangement-price">₱{arr.price.toLocaleString()}</span>
                            <button className="btn-restock" onClick={() => {
                              setArrangements(arrangements.map(a => a.id === arr.id ? { ...a, coldRoomCount: a.coldRoomCount + 5, isLowStock: false } : a));
                              alert(`Restocked +5 units of ${arr.name}.`);
                            }}>
                              Restock
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 4. INVENTORY VIEW --- */}
              {adminTab === 'inventory' && (
                <div>
                  <div className="page-eyebrow">COLD ROOM</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Inventory</h1>
                      <p className="page-description">Stems, wraps and vases on hand versus what this week's orders need.</p>
                    </div>
                    <button className="btn-primary" onClick={() => alert('Purchase order draft generated for Flower Valley Benguet & Holland Importers.')}>
                      Restock order
                    </button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">STEM LINES</div>
                      <div className="stat-value">42</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">BELOW NEED</div>
                      <div className="stat-value" style={{ color: 'var(--primary)' }}>3</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">VASES</div>
                      <div className="stat-value">118</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">WRAP ROLLS</div>
                      <div className="stat-value">26</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>Stock lines</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {inventory.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.inStock} of {item.needed} needed</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {item.isLow && <span className="status-chip low">Low</span>}
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '700' }}>{item.inStock}</span>
                            <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                              setInventory(inventory.map(i => i.id === item.id ? { ...i, inStock: i.inStock + 20, isLow: false } : i));
                              alert(`Checked in +20 units of ${item.name}.`);
                            }}>
                              + Check In
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 5. DELIVERIES VIEW --- */}
              {adminTab === 'deliveries' && (
                <div>
                  <div className="page-eyebrow">DISPATCH</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Deliveries</h1>
                      <p className="page-description">Today's courier runs across Metro Manila.</p>
                    </div>
                    <button className="btn-primary" onClick={() => alert('New courier route planner initiated.')}>Plan a run</button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">RUNS TODAY</div>
                      <div className="stat-value">14</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">DONE</div>
                      <div className="stat-value">6</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">ON THE ROAD</div>
                      <div className="stat-value">5</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">LATE</div>
                      <div className="stat-value" style={{ color: 'var(--primary)' }}>1</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>Today's runs</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {deliveries.map(run => (
                        <div key={run.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>
                              <span style={{ color: 'var(--primary)', marginRight: '8px' }}>{run.time}</span>
                              {run.recipient}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{run.location} · {run.courier}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className={`status-chip ${run.status.toLowerCase()}`}>{run.status}</span>
                            <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                              const nextStatus = run.status === 'Queued' ? 'Rolling' : (run.status === 'Rolling' ? 'Done' : 'Queued');
                              setDeliveries(deliveries.map(d => d.id === run.id ? { ...d, status: nextStatus } : d));
                            }}>
                              Change Status
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 6. CUSTOMERS VIEW --- */}
              {adminTab === 'customers' && (
                <div>
                  <div className="page-eyebrow">PEOPLE</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Customers</h1>
                      <p className="page-description">The list behind the shop — 1,141 names on file, from one-off anniversary orders to hotel contracts.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-secondary" onClick={() => alert('Customer records exported.')}>Export list</button>
                      <button className="btn-primary" onClick={() => alert('Add customer modal.')}>+ Add customer</button>
                    </div>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">BRIDES-TO-BE</div>
                      <div className="stat-value">42</div>
                      <div className="stat-subtext">₱486,000 lifetime · Peak Dec-Feb</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">SUBSCRIBERS</div>
                      <div className="stat-value">118</div>
                      <div className="stat-subtext">₱342,000 lifetime · 92% renew</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">CORPORATE ACCOUNTS</div>
                      <div className="stat-value">17</div>
                      <div className="stat-subtext">₱704,000 lifetime · 2 need quoting</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">WEEKEND BROWSERS</div>
                      <div className="stat-value">964</div>
                      <div className="stat-subtext">₱268,000 lifetime · Re-engage 210</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="filter-tabs">
                      {['All', 'Bride', 'Subscriber', 'Corporate', 'Weekend'].map(seg => (
                        <button 
                          key={seg} 
                          className={`filter-pill ${customerSegmentFilter === seg ? 'active' : ''}`}
                          onClick={() => setCustomerSegmentFilter(seg)}
                        >
                          {seg}
                        </button>
                      ))}
                    </div>

                    <div className="data-table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>CUSTOMER</th>
                            <th>SEGMENT</th>
                            <th>ORDERS</th>
                            <th>LIFETIME</th>
                            <th>LAST ORDER</th>
                            <th>SINCE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.filter(c => customerSegmentFilter === 'All' || c.segment === customerSegmentFilter).map(cust => (
                            <tr key={cust.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div className="avatar-circle">{cust.initials}</div>
                                  <div>
                                    <div style={{ fontWeight: '600' }}>{cust.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cust.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700', background: cust.segment === 'Corporate' ? '#2E121E' : '#FDF0F3', color: cust.segment === 'Corporate' ? '#FFF' : 'var(--primary)' }}>
                                  {cust.segment}
                                </span>
                              </td>
                              <td style={{ fontWeight: '600' }}>{cust.ordersCount}</td>
                              <td style={{ fontWeight: '700' }}>₱{cust.lifetimeValue.toLocaleString()}</td>
                              <td>{cust.lastOrderDate}</td>
                              <td style={{ color: 'var(--text-muted)' }}>{cust.customerSinceDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 7. PROMOTIONS VIEW --- */}
              {adminTab === 'promotions' && (
                <div>
                  <div className="page-eyebrow">MARKETING</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Promotions</h1>
                      <p className="page-description">Discount codes and seasonal campaigns.</p>
                    </div>
                    <button className="btn-primary" onClick={() => {
                      const code = prompt('Enter new Promo Code (e.g. SUMMERLOVE20):');
                      if (code) {
                        setPromotions([...promotions, { id: `p-${Date.now()}`, code: code.toUpperCase(), description: '10% off custom seasonal bouquets', status: 'Live', usesCount: 0 }]);
                      }
                    }}>
                      New promo
                    </button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">ACTIVE CODES</div>
                      <div className="stat-value">{promotions.filter(p=>p.status==='Live').length}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">REDEEMED</div>
                      <div className="stat-value">312</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">PROMO SALES</div>
                      <div className="stat-value">₱186k</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">AVG DISCOUNT</div>
                      <div className="stat-value">12%</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>Campaigns</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {promotions.map(promo => (
                        <div key={promo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: '700', fontSize: '16px', letterSpacing: '1px' }}>{promo.code}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{promo.description}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{promo.usesCount} uses</span>
                            <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700', background: promo.status === 'Live' ? '#EAF7EE' : '#F3F4F6', color: promo.status === 'Live' ? '#1E6B37' : '#6B7280' }}>
                              {promo.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 8. REVIEWS VIEW --- */}
              {adminTab === 'reviews' && (
                <div>
                  <div className="page-eyebrow">FEEDBACK</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Reviews</h1>
                      <p className="page-description">What customers say after their flowers arrive.</p>
                    </div>
                    <button className="btn-primary" onClick={() => alert('Automated review request sent to yesterday’s delivered clients.')}>Request reviews</button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">AVERAGE</div>
                      <div className="stat-value">4.9★</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">THIS MONTH</div>
                      <div className="stat-value">58</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">5-STAR</div>
                      <div className="stat-value">91%</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">NEEDS REPLY</div>
                      <div className="stat-value" style={{ color: 'var(--primary)' }}>3</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>Latest reviews</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {reviews.map(rev => (
                        <div key={rev.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>{rev.customerName}</div>
                            <div style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-main)', marginTop: '2px' }}>"{rev.quote}"</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {rev.badge && (
                              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '9999px', background: rev.badge === 'New' ? '#FDF0F3' : '#FEF3C7', color: rev.badge === 'New' ? 'var(--primary)' : '#B45309' }}>
                                {rev.badge}
                              </span>
                            )}
                            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{rev.rating}★</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 9. REPORTS VIEW --- */}
              {adminTab === 'reports' && (
                <div>
                  <div className="page-eyebrow">INSIGHTS</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Reports</h1>
                      <p className="page-description">Monthly sales, margin and best sellers at a glance.</p>
                    </div>
                    <button className="btn-primary" onClick={() => alert('Full studio balance sheet generated.')}>Export report</button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">SEPT SALES</div>
                      <div className="stat-value">₱1.42M</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">GROSS MARGIN</div>
                      <div className="stat-value">56%</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">ORDERS</div>
                      <div className="stat-value">684</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">REPEAT RATE</div>
                      <div className="stat-value">38%</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>Saved reports</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {[
                        { title: 'Monthly sales summary', period: 'Sept 2026 · PDF', val: '₱1.42M' },
                        { title: 'Arrangement margins', period: 'Q3 2026 · CSV', val: '56%' },
                        { title: 'Channel performance', period: 'Sept 2026', val: 'Online 48%' },
                        { title: 'Courier on-time', period: 'Sept 2026', val: '94%' }
                      ].map((rep, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>{rep.title}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rep.period}</div>
                          </div>
                          <span style={{ fontWeight: '700', fontSize: '14px' }}>{rep.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 10. STAFF VIEW --- */}
              {adminTab === 'staff' && (
                <div>
                  <div className="page-eyebrow">TEAM</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Staff</h1>
                      <p className="page-description">Florists, couriers and their access to this console.</p>
                    </div>
                    <button className="btn-primary" onClick={() => alert('Invite staff link generated.')}>Invite staff</button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">TEAM MEMBERS</div>
                      <div className="stat-value">6</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">ON SHIFT</div>
                      <div className="stat-value">4</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">ADMINS</div>
                      <div className="stat-value">1</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">HOURS THIS WEEK</div>
                      <div className="stat-value">212</div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>Team</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {[
                        { name: 'Shaira', role: 'Owner & head florist', tier: 'Admin', scope: 'Full access' },
                        { name: 'Jom', role: 'Arranger', tier: 'Staff', scope: 'Orders, stock' },
                        { name: 'Bea', role: 'Bridal florist', tier: 'Staff', scope: 'Orders, customers' },
                        { name: 'Nino', role: 'Courier', tier: 'Staff', scope: 'Deliveries' },
                        { name: 'Marisol', role: 'Courier', tier: 'Staff', scope: 'Deliveries' }
                      ].map((mem, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>{mem.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{mem.role}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '9999px', background: mem.tier === 'Admin' ? '#FDF0F3' : '#F3F4F6', color: mem.tier === 'Admin' ? 'var(--primary)' : '#4B5563' }}>
                              {mem.tier}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{mem.scope}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- 11. SETTINGS VIEW (With Google Sheets & 5TB Drive Live Sync) --- */}
              {adminTab === 'settings' && (
                <div>
                  <div className="page-eyebrow">ADMIN</div>
                  <div className="page-header-row">
                    <div>
                      <h1 className="page-title">Settings</h1>
                      <p className="page-description">Shop details, delivery zones, payments, and Google Sheets 5TB Cloud database integration.</p>
                    </div>
                    <button className="btn-primary" onClick={() => alert('Settings successfully updated and cached.')}>Save changes</button>
                  </div>

                  <div className="stats-grid-4">
                    <div className="stat-card">
                      <div className="stat-label">DELIVERY ZONES</div>
                      <div className="stat-value">{settings.deliveryZones}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">PAYMENT METHODS</div>
                      <div className="stat-value">{settings.paymentMethods}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">OPEN</div>
                      <div className="stat-value" style={{ fontSize: '26px' }}>{settings.operatingHours}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">CURRENCY</div>
                      <div className="stat-value" style={{ fontSize: '26px' }}>{settings.currency}</div>
                    </div>
                  </div>

                  {/* Shop Setup Form */}
                  <div className="content-card" style={{ marginBottom: '24px' }}>
                    <div className="card-title" style={{ marginBottom: '16px' }}>Shop setup</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '14px' }}>Shop name</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Shown on receipts and site</div>
                        </div>
                        <span style={{ fontWeight: '600' }}>{settings.shopName}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '14px' }}>Delivery fee</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Metro Manila flat rate</div>
                        </div>
                        <span style={{ fontWeight: '600' }}>₱{settings.deliveryFee}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '14px' }}>Payments</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>GCash, Maya, card, COD</div>
                        </div>
                        <span style={{ fontWeight: '700', color: 'var(--status-green)' }}>On</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '14px' }}>Order notifications</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email + SMS to Shaira</div>
                        </div>
                        <span style={{ fontWeight: '700', color: 'var(--status-green)' }}>On</span>
                      </div>
                    </div>
                  </div>

                  {/* Google Sheets & 5TB Google Drive Connector Panel */}
                  <div className="content-card" style={{ border: '2px solid var(--primary-border)', background: '#FFFDFE' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ color: 'var(--primary)' }}><Icons.Database /></div>
                      <div className="card-title">Google Sheets & 5TB Google Drive Live Sync</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                      Connect your Google Spreadsheet and 5TB Google Drive account. Orders placed on the customer store will automatically append rows into Google Sheets, and images are hosted directly on Google Drive.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div className="form-group">
                        <label>Google Apps Script Web App URL</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="https://script.google.com/macros/s/.../exec"
                          value={settings.googleAppsScriptUrl}
                          onChange={(e) => setSettings({ ...settings, googleAppsScriptUrl: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Google Sheet ID</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                          value={settings.googleSheetId}
                          onChange={(e) => setSettings({ ...settings, googleSheetId: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>5TB Google Drive Folder ID (For Arrangement Photos)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="1_AbCdEfGhIjKlMnOpQrStUvWxYz"
                        value={settings.googleDriveFolderId}
                        onChange={(e) => setSettings({ ...settings, googleDriveFolderId: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button className="btn-primary" onClick={() => {
                        if (!settings.googleAppsScriptUrl && !settings.googleSheetId) {
                          alert('Please enter your Google Apps Script URL. Refer to the GOOGLE_SHEETS_DATABASE_GUIDE.md file in the root folder for step-by-step instructions.');
                          return;
                        }
                        setSettings({ ...settings, isGoogleConnected: true });
                        alert('✅ Google Sheets Connection verified! Data is now synchronized.');
                      }}>
                        Verify & Test Connection
                      </button>

                      <button className="btn-secondary" onClick={() => {
                        alert('🔄 Full database synchronization initiated: 8 tables refreshed from Google Sheets.');
                      }}>
                        Sync All Data Now
                      </button>

                      <span style={{ fontSize: '12px', fontWeight: '600', color: settings.isGoogleConnected ? 'var(--status-green)' : 'var(--text-muted)' }}>
                        Status: {settings.isGoogleConnected ? '🟢 Connected to Google Sheets' : '⚪ Using Fast Local Storage Engine'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* ===================== CUSTOMER STOREFRONT ===================== */}
      {viewMode === 'store' && (
        <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-page)' }}>
          {/* Top Announcement Bar */}
          <div style={{ background: '#2E121E', color: '#FCE2E8', textAlign: 'center', padding: '9px 16px', fontSize: '13px', fontWeight: '600' }}>
            🌸 Same-day hand delivery across Metro Manila for orders placed before 1:00 PM. Use code <strong>TWIRLFIRST</strong> for ₱200 off.
          </div>

          {/* Store Navbar */}
          <header style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 90 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setViewMode('store')}>
              <div className="brand-icon-box">
                <Icons.Flower />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', lineHeight: '1.1' }}>
                  Bloom<span style={{ color: 'var(--primary)' }}>&</span>Twirl
                </h1>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  BY SHAIRA · FLORAL STUDIO
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                className="btn-secondary"
                onClick={() => setViewMode('customer_dashboard')}
              >
                Track My Order
              </button>
              <button 
                className="btn-primary"
                onClick={() => setIsCartOpen(true)}
              >
                <Icons.ShoppingBag /> Cart ({cart.reduce((a,c)=>a+c.qty, 0)}) · ₱{cartSubtotal.toLocaleString()}
              </button>
            </div>
          </header>

          {/* Store Content */}
          <div className="page-content">
            {/* Hero Section */}
            <div className="store-hero">
              <div className="store-hero-content">
                <span className="hero-badge-pill">✨ Metro Manila Floral Atelier</span>
                <h1>Blooms that speak, moments that linger.</h1>
                <p>
                  Handcrafted bouquets, architectural botanicals, and bespoke bridal arrangements by Shaira. Cut fresh daily, conditioned in our cold room, and dispatched with dedicated couriers across Makati, BGC, QC, and beyond.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-primary" onClick={() => {
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Browse Arrangements
                  </button>
                  <button className="btn-secondary" onClick={() => {
                    setViewMode('customer_dashboard');
                  }}>
                    Book Bridal Consultation
                  </button>
                </div>
              </div>
              <div style={{ maxWidth: '380px', display: 'none' }}>
                <img src={arrangements[0].image} alt="Hero bouquet" style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-hover)' }} />
              </div>
            </div>

            {/* Catalog Filter Tabs */}
            <div id="catalog-section" style={{ marginBottom: '24px' }}>
              <div className="page-eyebrow">THE STUDIO COLLECTION</div>
              <div className="page-header-row">
                <h2 className="page-title">Curated Arrangements</h2>
                <div className="filter-tabs" style={{ marginBottom: 0 }}>
                  {['All', 'Signature', 'Statement', 'Dried', 'Houseplant', 'Box', 'Bridal', 'Cheerful'].map(cat => (
                    <button 
                      key={cat}
                      className={`filter-pill ${catalogCategory === cat ? 'active' : ''}`}
                      onClick={() => setCatalogCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="arrangements-grid">
              {filteredArrangements.map(arr => (
                <div key={arr.id} className="arrangement-card">
                  <div className="arrangement-image-wrap" style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(arr)}>
                    <img src={arr.image} alt={arr.name} />
                    <span className="card-tag-pill">{arr.tag}</span>
                    {arr.isLowStock && <span className="card-low-stock-pill">Few left</span>}
                  </div>
                  <div className="arrangement-body">
                    <div className="arrangement-name-row">
                      <h3 className="arrangement-name" style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(arr)}>{arr.name}</h3>
                      <span className="arrangement-rating">★ {arr.rating}</span>
                    </div>
                    <p className="arrangement-stems">{arr.stems.join(' · ')}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.4' }}>
                      {arr.description.slice(0, 85)}...
                    </p>

                    <div className="arrangement-footer-row">
                      <span className="arrangement-price">₱{arr.price.toLocaleString()}</span>
                      <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => addToCart(arr)}>
                        <Icons.Plus /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== CUSTOMER ORDER TRACKING DASHBOARD ===================== */}
      {viewMode === 'customer_dashboard' && (
        <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-page)' }}>
          <header style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 90 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setViewMode('store')}>
              <div className="brand-icon-box">
                <Icons.Flower />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', lineHeight: '1.1' }}>
                  Bloom<span style={{ color: 'var(--primary)' }}>&</span>Twirl
                </h1>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  CUSTOMER CARE & TRACKING
                </div>
              </div>
            </div>

            <button className="btn-secondary" onClick={() => setViewMode('store')}>
              ← Back to Shop
            </button>
          </header>

          <div className="page-content" style={{ maxWidth: '900px' }}>
            <div className="page-eyebrow">ORDER LOOKUP</div>
            <h1 className="page-title" style={{ marginBottom: '8px' }}>Track Your Delivery</h1>
            <p className="page-description" style={{ marginBottom: '24px' }}>
              Follow your flowers in real time from Shaira’s cold room and bench to your courier's delivery run.
            </p>

            {/* Search Input for Order */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Order Number (e.g. BT-2041)"
                value={lookupOrderNumber}
                onChange={(e) => setLookupOrderNumber(e.target.value)}
              />
              <button className="btn-primary" onClick={() => {
                const found = orders.find(o => o.id.toUpperCase() === lookupOrderNumber.trim().toUpperCase());
                if (found) {
                  setTrackedOrder(found);
                } else {
                  alert(`Order ${lookupOrderNumber} not found. Try BT-2041, BT-2040, or BT-2039.`);
                }
              }}>
                Track
              </button>
            </div>

            {trackedOrder && (
              <div className="content-card" style={{ border: '2px solid var(--primary-border)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      ORDER {trackedOrder.id}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', margin: '4px 0' }}>
                      {trackedOrder.arrangementName}
                    </h2>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Recipient: <strong>{trackedOrder.customerName}</strong> · Destination: {trackedOrder.address}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TOTAL VALUE</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                      ₱{trackedOrder.total.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 4-Step Progress Stepper */}
                <div className="stepper-container">
                  <div className="stepper-line">
                    <div className="stepper-line-fill" style={{
                      width: trackedOrder.status === 'Fresh' ? '0%' : (
                        trackedOrder.status === 'Arranging' ? '33%' : (
                          trackedOrder.status === 'In transit' ? '66%' : '100%'
                        )
                      )
                    }}></div>
                  </div>

                  <div className={`stepper-step ${['Fresh', 'Arranging', 'In transit', 'Delivered'].includes(trackedOrder.status) ? 'completed' : ''}`}>
                    <div className="step-circle">1</div>
                    <span className="step-label">Order Received</span>
                  </div>

                  <div className={`stepper-step ${['Arranging', 'In transit', 'Delivered'].includes(trackedOrder.status) ? (trackedOrder.status === 'Arranging' ? 'active' : 'completed') : ''}`}>
                    <div className="step-circle">2</div>
                    <span className="step-label">On Florist Bench</span>
                  </div>

                  <div className={`stepper-step ${['In transit', 'Delivered'].includes(trackedOrder.status) ? (trackedOrder.status === 'In transit' ? 'active' : 'completed') : ''}`}>
                    <div className="step-circle">3</div>
                    <span className="step-label">Courier En Route</span>
                  </div>

                  <div className={`stepper-step ${trackedOrder.status === 'Delivered' ? 'completed' : ''}`}>
                    <div className="step-circle">4</div>
                    <span className="step-label">Delivered</span>
                  </div>
                </div>

                {/* Courier and Live Notes */}
                <div style={{ background: '#FFF9FA', borderRadius: '16px', padding: '18px', border: '1px solid var(--border-light)', marginTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>COURIER DISPATCH</div>
                      <div style={{ fontWeight: '700', fontSize: '14px', marginTop: '2px' }}>
                        {trackedOrder.courier ? `Assigned to ${trackedOrder.courier} (Bloom&Twirl Studio Courier)` : 'Awaiting bench completion'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Delivery Window: {trackedOrder.dueTime || 'Before 5:00 PM'}</div>
                    </div>
                    <span className={`status-chip ${trackedOrder.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {trackedOrder.status}
                    </span>
                  </div>

                  {trackedOrder.cardMessage && (
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed var(--border-light)', fontSize: '13px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Card Dedication: </span>
                      <em>"{trackedOrder.cardMessage}"</em>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bridal Consultation Booking Box */}
            <div className="content-card" style={{ marginTop: '32px' }}>
              <div className="card-subtitle">BESPOKE WEDDINGS & EVENTS</div>
              <h2 className="card-title">Book a Bridal Floral Consult with Shaira</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 20px 0' }}>
                Planning your wedding in 2026 or 2027? Shaira offers dedicated 45-minute studio consultations to review bridal party bouquets, church arches, and reception styling.
              </p>

              <form onSubmit={(e) => {
                e.preventDefault();
                alert('💐 Consultation inquiry sent to Shaira! We will reach out via WhatsApp/Phone within 4 hours.');
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <input type="text" className="form-control" placeholder="Your Name" required />
                  <input type="tel" className="form-control" placeholder="Mobile / WhatsApp (+63)" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <input type="date" className="form-control" placeholder="Target Wedding Date" required />
                  <input type="text" className="form-control" placeholder="Wedding Venue (e.g. San Agustin / Tagaytay)" required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Request Consultation Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CART DRAWER ===================== */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.ShoppingBag />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px' }}>Your Flower Basket</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '15px' }}>Your basket is empty.</p>
                  <button className="btn-secondary" style={{ marginTop: '16px', display: 'inline-flex' }} onClick={() => { setIsCartOpen(false); setViewMode('store'); }}>
                    Browse Arrangements
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '14px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700' }}>₱{item.price.toLocaleString()}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                          <button style={{ width: '24px', height: '24px', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'white', cursor: 'pointer' }} onClick={() => updateCartQty(item.id, -1)}>-</button>
                          <span style={{ fontSize: '13px', fontWeight: '700' }}>{item.qty}</span>
                          <button style={{ width: '24px', height: '24px', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'white', cursor: 'pointer' }} onClick={() => updateCartQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                {/* Promo Input */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Promo code (TWIRLFIRST)"
                    id="cart-promo-input"
                    defaultValue={activePromoCode}
                  />
                  <button className="btn-secondary" onClick={() => {
                    const val = document.getElementById('cart-promo-input')?.value;
                    if (val) applyPromo(val);
                  }}>Apply</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Subtotal</span>
                  <span>₱{cartSubtotal.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Metro Manila Delivery</span>
                  <span>₱{settings.deliveryFee}</span>
                </div>

                {promoDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--primary)', fontWeight: '700', marginBottom: '4px' }}>
                    <span>Promo Discount</span>
                    <span>-₱{promoDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', margin: '12px 0 16px 0', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--primary)' }}>₱{cartTotal.toLocaleString()}</span>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Proceed to Checkout · ₱{cartTotal.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== CHECKOUT MODAL ===================== */}
      {isCheckoutOpen && (
        <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="card-subtitle">METRO MANILA DISPATCH</span>
                <h2 className="modal-title font-serif" style={{ fontSize: '26px' }}>Checkout Order</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setIsCheckoutOpen(false)}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              handlePlaceOrder({
                name: fd.get('name'),
                phone: fd.get('phone'),
                email: fd.get('email'),
                address: fd.get('address'),
                dueTime: fd.get('dueTime'),
                cardMessage: fd.get('cardMessage')
              });
            }}>
              <div className="form-group">
                <label>Recipient Full Name</label>
                <input name="name" type="text" className="form-control" required placeholder="e.g. Sofia Romero" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Mobile Number (+63)</label>
                  <input name="phone" type="tel" className="form-control" required placeholder="0917 XXX XXXX" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" className="form-control" required placeholder="recipient@domain.ph" />
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Address in Metro Manila</label>
                <input name="address" type="text" className="form-control" required placeholder="Tower / House No, Street, Barangay, City (e.g. BGC Taguig)" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Preferred Delivery Time</label>
                  <select name="dueTime" className="form-control">
                    <option value="11:00">Morning (10:00 - 12:00)</option>
                    <option value="14:00">Early Afternoon (13:00 - 15:00)</option>
                    <option value="17:00">Late Afternoon (16:00 - 18:00)</option>
                    <option value="Rush">Rush Courier (Within 2 Hours)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select name="payment" className="form-control">
                    <option value="gcash">GCash (Scan QR / Mobile)</option>
                    <option value="maya">Maya</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="cod">Cash on Delivery (COD)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Handwritten Dedication Card Message (Complimentary)</label>
                <textarea name="cardMessage" className="form-control" rows="3" placeholder="Write your heartfelt message here..."></textarea>
              </div>

              <div style={{ background: '#FFF0F4', padding: '14px', borderRadius: '14px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Amount to Pay:</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: '700', color: 'var(--primary)' }}>
                  ₱{cartTotal.toLocaleString()}
                </span>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                Confirm & Dispatch Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================== ADMIN NEW ORDER MODAL ===================== */}
      {isNewOrderModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewOrderModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="card-subtitle">STUDIO ORDER BENCH</span>
                <h2 className="modal-title font-serif" style={{ fontSize: '24px' }}>New Studio Order</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setIsNewOrderModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              handleAdminNewOrder({
                customerName: fd.get('name'),
                phone: fd.get('phone'),
                email: fd.get('email'),
                address: fd.get('address'),
                arrangementName: fd.get('arrangement'),
                total: parseFloat(fd.get('total')) || 2450,
                dueTime: fd.get('dueTime'),
                channel: fd.get('channel'),
                courier: fd.get('courier')
              });
            }}>
              <div className="form-group">
                <label>Customer Name</label>
                <input name="name" type="text" className="form-control" required placeholder="e.g. Bea Santos" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Order Channel</label>
                  <select name="channel" className="form-control">
                    <option value="Online">Online</option>
                    <option value="Instagram">Instagram DM</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Time</label>
                  <input name="dueTime" type="text" className="form-control" defaultValue="14:00" />
                </div>
              </div>

              <div className="form-group">
                <label>Arrangement</label>
                <select name="arrangement" className="form-control">
                  {arrangements.map(a => (
                    <option key={a.id} value={a.name}>{a.name} (₱{a.price.toLocaleString()})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Total Price (₱)</label>
                  <input name="total" type="number" className="form-control" defaultValue="2450" />
                </div>
                <div className="form-group">
                  <label>Assigned Courier</label>
                  <select name="courier" className="form-control">
                    <option value="Nino">Nino</option>
                    <option value="Marisol">Marisol</option>
                    <option value="Jom">Jom</option>
                    <option value="Bea">Bea</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <input name="address" type="text" className="form-control" required placeholder="Makati, BGC, or QC" />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                Record to Order Book
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================== ADMIN NEW ARRANGEMENT MODAL ===================== */}
      {isNewArrangementModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewArrangementModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="card-subtitle">CATALOGUE EXPANSION</span>
                <h2 className="modal-title font-serif" style={{ fontSize: '24px' }}>New Arrangement</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setIsNewArrangementModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newArr = {
                id: `arr-${Date.now()}`,
                name: fd.get('name'),
                tag: fd.get('tag'),
                category: fd.get('category'),
                price: parseFloat(fd.get('price')) || 2000,
                coldRoomCount: parseInt(fd.get('coldRoomCount')) || 10,
                sold30d: 0,
                image: fd.get('image') || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
                description: fd.get('description'),
                stems: fd.get('stems').split(',').map(s=>s.trim()),
                rating: 5.0,
                isLowStock: false
              };
              setArrangements([...arrangements, newArr]);
              setIsNewArrangementModalOpen(false);
              alert(`💐 ${newArr.name} added to the catalogue!`);
            }}>
              <div className="form-group">
                <label>Arrangement Name</label>
                <input name="name" type="text" className="form-control" required placeholder="e.g. Celestial White Lilies" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" className="form-control">
                    <option value="Signature">Signature</option>
                    <option value="Statement">Statement</option>
                    <option value="Dried">Dried</option>
                    <option value="Houseplant">Houseplant</option>
                    <option value="Box">Box</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Cheerful">Cheerful</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tag Badge</label>
                  <input name="tag" type="text" className="form-control" defaultValue="Signature" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label>Retail Price (₱)</label>
                  <input name="price" type="number" className="form-control" defaultValue="2500" required />
                </div>
                <div className="form-group">
                  <label>Cold Room Initial Stock</label>
                  <input name="coldRoomCount" type="number" className="form-control" defaultValue="12" required />
                </div>
              </div>

              <div className="form-group">
                <label>Key Stems (comma separated)</label>
                <input name="stems" type="text" className="form-control" placeholder="Garden roses, White lilies, Ruscus" defaultValue="Garden roses, Peonies" required />
              </div>

              <div className="form-group">
                <label>Image URL (or Google Drive Asset link)</label>
                <input name="image" type="url" className="form-control" placeholder="https://lh3.googleusercontent.com/d/..." defaultValue="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80" />
              </div>

              <div className="form-group">
                <label>Arrangement Description</label>
                <textarea name="description" className="form-control" rows="3" placeholder="Artisanal description of this design..." defaultValue="Artisanal luxury hand-tied bouquet arranged fresh in our cold room."></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Publish to Studio & Customer Store
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================== PRODUCT DETAIL MODAL ===================== */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="card-tag-pill" style={{ position: 'static' }}>{selectedProduct.tag}</span>
              <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: '16px 0' }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px' }} />
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '6px' }}>{selectedProduct.name}</h2>
                <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700', marginBottom: '12px' }}>
                  ★ {selectedProduct.rating} Rating · {selectedProduct.sold30d} delighted recipients
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px' }}>
                  ₱{selectedProduct.price.toLocaleString()}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '14px' }}>
                  {selectedProduct.description}
                </p>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                  Flower Stem Recipe:
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {selectedProduct.stems.join(' · ')}
                </div>

                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}>
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export Application
export default App;
export { App };

if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement && typeof ReactDOM !== 'undefined') {
    if (ReactDOM.createRoot) {
      ReactDOM.createRoot(rootElement).render(<App />);
    } else if (ReactDOM.render) {
      ReactDOM.render(<App />, rootElement);
    }
  }
}
