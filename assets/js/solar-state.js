/**
 * Dary J Solar World - Synchronized State Engine
 * Connects Customer Storefront, Client Portal, and Admin Operations in real time.
 */

const STORAGE_KEY_INVENTORY = 'daryj_solar_inventory_v1';
const STORAGE_KEY_ORDERS = 'daryj_solar_orders_v1';
const STORAGE_KEY_CLIENT = 'daryj_solar_current_client_v1';

// Default Hardware Inventory Seed
const DEFAULT_INVENTORY = [
  {
    id: 'inv-35kva',
    name: '3.5kVA / 24V MPPT Pure Sine Hybrid Inverter',
    category: 'inverters',
    sku: 'DJS-INV-3524',
    stock: 5,
    minThreshold: 2,
    unitPrice: 580000,
    costPrice: 460000
  },
  {
    id: 'inv-50kva',
    name: '5.0kVA / 48V MPPT Hybrid Solar Inverter',
    category: 'inverters',
    sku: 'DJS-INV-5048',
    stock: 7,
    minThreshold: 3,
    unitPrice: 850000,
    costPrice: 690000
  },
  {
    id: 'inv-100kva',
    name: '10.0kVA / 48V High-Yield Commercial Inverter',
    category: 'inverters',
    sku: 'DJS-INV-10048',
    stock: 3,
    minThreshold: 2,
    unitPrice: 1950000,
    costPrice: 1600000
  },
  {
    id: 'bat-512kwh',
    name: '5.12kWh / 51.2V 100Ah LiFePO4 Lithium Wallpack',
    category: 'batteries',
    sku: 'DJS-BAT-512',
    stock: 4,
    minThreshold: 3,
    unitPrice: 1650000,
    costPrice: 1350000
  },
  {
    id: 'bat-1024kwh',
    name: '10.24kWh / 51.2V 200Ah High-Density LiFePO4 Battery',
    category: 'batteries',
    sku: 'DJS-BAT-1024',
    stock: 2,
    minThreshold: 2,
    unitPrice: 3100000,
    costPrice: 2550000
  },
  {
    id: 'pv-550w',
    name: '550W Tier-1 Monocrystalline PV Solar Panel',
    category: 'panels',
    sku: 'DJS-PV-550M',
    stock: 38,
    minThreshold: 12,
    unitPrice: 125000,
    costPrice: 98000
  },
  {
    id: 'bos-cables',
    name: 'Balance of System: DC Breakers, SPD & 16mm Cables Kit',
    category: 'accessories',
    sku: 'DJS-BOS-KIT',
    stock: 14,
    minThreshold: 5,
    unitPrice: 280000,
    costPrice: 195000
  }
];

// Seed Sample Client & Historical Installation Orders
const DEFAULT_CLIENT = {
  name: 'Chief Adeleke Babatunde',
  email: 'adeleke.babatunde@gmail.com',
  phone: '08137148009',
  address: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

const DEFAULT_ORDERS = [
  {
    id: 'DJS-8842',
    date: '2026-11-16T10:30:00Z',
    clientName: 'Chief Adeleke Babatunde',
    clientEmail: 'adeleke.babatunde@gmail.com',
    clientPhone: '08137148009',
    installationAddress: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos',
    packageTitle: '3.5kVA / 5.12kWh Executive Home Solar System',
    packageTier: '3.5kVA',
    totalAmount: 3850000,
    amountPaid: 2695000, // 70% deposit
    balanceDue: 1155000, // 30% on handover
    paymentStatus: 'partially_paid',
    paymentMethod: 'Paystack Bank Transfer',
    paymentRef: 'pstk_live_884299104',
    currentStage: 3, // 1 to 5
    assignedEngineer: 'Engr. Tobi Alabi (Lead Field Engineer)',
    engineerPhone: '09043778846',
    estimatedCompletion: '2026-11-20',
    bom: [
      { itemId: 'inv-35kva', name: '3.5kVA MPPT Inverter', qty: 1 },
      { itemId: 'bat-512kwh', name: '5.12kWh LiFePO4 Lithium Battery', qty: 1 },
      { itemId: 'pv-550w', name: '550W Tier-1 Mono Panels', qty: 4 },
      { itemId: 'bos-cables', name: 'Surge Protection & DC Cabling Kit', qty: 1 }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Order Confirmed & 70% Deposit Received',
        date: 'Nov 16, 2026 - 10:45 AM',
        status: 'completed',
        note: 'Paystack verified ₦2,695,000 via Dedicated Virtual NUBAN Account.'
      },
      {
        stage: 2,
        title: 'Site Energy Audit & Roof Structural Survey',
        date: 'Nov 17, 2026 - 02:15 PM',
        status: 'completed',
        note: 'Completed by Engr. Tobi. Roof orientation 18° South-facing, DB board separated.'
      },
      {
        stage: 3,
        title: 'Equipment Dispatch & Inverter Staging',
        date: 'Nov 18, 2026 - 09:30 AM',
        status: 'in_progress',
        note: 'Tier-1 panels and 5.12kWh LiFePO4 tested in warehouse; transit to Lekki underway.'
      },
      {
        stage: 4,
        title: 'Roof Mounting, Inverter Wiring & Earthing',
        date: 'Scheduled: Nov 19, 2026',
        status: 'pending',
        note: 'Rail fixtures, DC combiner box and 100A changeover installation.'
      },
      {
        stage: 5,
        title: 'Testing, Commissioning & Warranty Handover',
        date: 'Scheduled: Nov 20, 2026',
        status: 'pending',
        note: 'Load run test, final 30% milestone sign-off and 5-Year Tier-1 Warranty Issuance.'
      }
    ]
  },
  {
    id: 'DJS-8790',
    date: '2026-10-24T14:15:00Z',
    clientName: 'Dr. Amina Bello',
    clientEmail: 'amina.bello@lagosmed.org',
    clientPhone: '08023456789',
    installationAddress: '12 Isaac John Street, GRA Ikeja, Lagos',
    packageTitle: '10kVA / 10.24kWh Commercial Medical Clinic System',
    packageTier: '10kVA',
    totalAmount: 8900000,
    amountPaid: 8900000,
    balanceDue: 0,
    paymentStatus: 'paid_in_full',
    paymentMethod: 'Paystack Corporate Transfer',
    paymentRef: 'pstk_live_879011452',
    currentStage: 5,
    assignedEngineer: 'Engr. Daniel Okafor',
    engineerPhone: '08137148009',
    estimatedCompletion: 'Completed',
    bom: [
      { itemId: 'inv-100kva', name: '10.0kVA Commercial Inverter', qty: 1 },
      { itemId: 'bat-1024kwh', name: '10.24kWh LiFePO4 Battery', qty: 1 },
      { itemId: 'pv-550w', name: '550W Tier-1 Mono Panels', qty: 12 }
    ],
    timeline: [
      { stage: 1, title: 'Order Confirmed', date: 'Oct 24, 2026', status: 'completed', note: 'Paid in full.' },
      { stage: 2, title: 'Site Energy Audit', date: 'Oct 25, 2026', status: 'completed', note: 'Audit passed.' },
      { stage: 3, title: 'Equipment Dispatch', date: 'Oct 26, 2026', status: 'completed', note: 'Dispatched to Ikeja.' },
      { stage: 4, title: 'Roof & Battery Mounting', date: 'Oct 28, 2026', status: 'completed', note: 'Mounted and grounded.' },
      { stage: 5, title: 'Energized & Handed Over', date: 'Oct 30, 2026', status: 'completed', note: 'Warranty active (5-year).' }
    ]
  }
];

class DaryJSolarState {
  constructor() {
    this.broadcast = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcast = new BroadcastChannel('daryj_solar_sync_channel');
      this.broadcast.onmessage = (event) => {
        if (event.data && event.data.type) {
          window.dispatchEvent(new CustomEvent('daryj:state_updated', { detail: event.data }));
        }
      };
    }
  }

  // --- Inventory Methods ---
  getInventory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INVENTORY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(DEFAULT_INVENTORY));
        return DEFAULT_INVENTORY;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_INVENTORY;
    }
  }

  saveInventory(inventory) {
    try {
      localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
      this.notifyChange('inventory_updated', { inventory });
    } catch (e) {}
  }

  updateStock(itemId, delta) {
    const inv = this.getInventory();
    const item = inv.find(i => i.id === itemId);
    if (item) {
      item.stock = Math.max(0, item.stock + delta);
      this.saveInventory(inv);
      return item.stock;
    }
    return 0;
  }

  setStock(itemId, quantity) {
    const inv = this.getInventory();
    const item = inv.find(i => i.id === itemId);
    if (item) {
      item.stock = Math.max(0, quantity);
      this.saveInventory(inv);
      return item.stock;
    }
    return 0;
  }

  // --- Orders Methods ---
  getOrders() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(DEFAULT_ORDERS));
        return DEFAULT_ORDERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  }

  saveOrders(orders) {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      this.notifyChange('orders_updated', { orders });
    } catch (e) {}
  }

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase().trim());
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    const orderId = 'DJS-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    
    const newOrder = {
      id: orderId,
      date: now.toISOString(),
      clientName: orderData.clientName || 'Valued Solar Client',
      clientEmail: orderData.clientEmail || 'client@example.com',
      clientPhone: orderData.clientPhone || '08000000000',
      installationAddress: orderData.installationAddress || 'Nigeria',
      packageTitle: orderData.packageTitle || 'Custom Solar System',
      packageTier: orderData.packageTier || '3.5kVA',
      totalAmount: orderData.totalAmount || 3850000,
      amountPaid: orderData.amountPaid || orderData.totalAmount * 0.7,
      balanceDue: orderData.totalAmount - (orderData.amountPaid || orderData.totalAmount * 0.7),
      paymentStatus: orderData.amountPaid >= orderData.totalAmount ? 'paid_in_full' : 'partially_paid',
      paymentMethod: orderData.paymentMethod || 'Paystack Instant Checkout',
      paymentRef: 'pstk_' + Math.random().toString(36).substring(2, 12),
      currentStage: 1,
      assignedEngineer: 'Engr. Tobi Alabi (Lead Field Engineer)',
      engineerPhone: '09043778846',
      estimatedCompletion: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      bom: orderData.bom || [
        { itemId: 'inv-35kva', name: '3.5kVA MPPT Inverter', qty: 1 },
        { itemId: 'bat-512kwh', name: '5.12kWh LiFePO4 Battery', qty: 1 },
        { itemId: 'pv-550w', name: '550W Tier-1 Panels', qty: 4 }
      ],
      timeline: [
        {
          stage: 1,
          title: 'Order Confirmed & Payment Received',
          date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'completed',
          note: `Paystack confirmed ₦${(orderData.amountPaid || orderData.totalAmount * 0.7).toLocaleString()}. Warehouse allocated equipment.`
        },
        {
          stage: 2,
          title: 'Site Energy Audit & Roof Structural Survey',
          date: 'Scheduled within 24 hours',
          status: 'in_progress',
          note: 'Engineer dispatched for roof load assessment & DB board isolation plan.'
        },
        {
          stage: 3,
          title: 'Equipment Dispatch & Inverter Staging',
          date: 'Pending Audit',
          status: 'pending',
          note: 'Tested Tier-1 panels & lithium storage prepared in warehouse.'
        },
        {
          stage: 4,
          title: 'Roof Mounting, DC Cabling & Earthing',
          date: 'Pending Dispatch',
          status: 'pending',
          note: 'Inverter connection & battery wall-mount configuration.'
        },
        {
          stage: 5,
          title: 'Testing, Commissioning & Warranty Handover',
          date: 'Pending Mount',
          status: 'pending',
          note: 'System energizing & 5-year certificate issuance.'
        }
      ]
    };

    // Deduct stock from inventory
    if (newOrder.bom && Array.isArray(newOrder.bom)) {
      newOrder.bom.forEach(b => {
        if (b.itemId) {
          this.updateStock(b.itemId, -(b.qty || 1));
        }
      });
    }

    orders.unshift(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  updateOrderStatus(orderId, nextStage, engineerNote = '') {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.currentStage = nextStage;
    if (order.timeline && order.timeline[nextStage - 1]) {
      order.timeline[nextStage - 1].status = 'completed';
      if (engineerNote) {
        order.timeline[nextStage - 1].note = engineerNote;
      }
      order.timeline[nextStage - 1].date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (nextStage < 5 && order.timeline[nextStage]) {
      order.timeline[nextStage].status = 'in_progress';
    }

    this.saveOrders(orders);
    return order;
  }

  // --- Client Profile Methods ---
  getClientProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CLIENT);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_CLIENT, JSON.stringify(DEFAULT_CLIENT));
        return DEFAULT_CLIENT;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_CLIENT;
    }
  }

  saveClientProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY_CLIENT, JSON.stringify(profile));
      this.notifyChange('client_updated', { profile });
    } catch (e) {}
  }

  // Broadcast cross-tab synchronization
  notifyChange(type, payload) {
    if (this.broadcast) {
      try {
        this.broadcast.postMessage({ type, ...payload, timestamp: Date.now() });
      } catch (e) {}
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('daryj:state_updated', { detail: { type, ...payload } }));
    }
  }
}

// Global Singleton Instance
if (typeof window !== 'undefined') {
  window.daryjState = new DaryJSolarState();
}
