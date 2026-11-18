/**
 * Dary J Solar World - Synchronized State & ERP Engine
 * Connects Customer Storefront, Client Portal, and Admin Operations in real time.
 */

const STORAGE_KEY_INVENTORY = 'daryj_solar_inventory_v1';
const STORAGE_KEY_ORDERS = 'daryj_solar_orders_v1';
const STORAGE_KEY_CLIENT = 'daryj_solar_current_client_v1';
const STORAGE_KEY_CLIENTS = 'daryj_solar_clients_v1';
const STORAGE_KEY_EXPENSES = 'daryj_solar_expenses_v1';
const STORAGE_KEY_ENGINEERS = 'daryj_solar_engineers_v1';

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

const DEFAULT_ENGINEERS = [
  {
    id: 'eng-1',
    name: 'Engr. Tobi Alabi',
    initials: 'TA',
    role: 'Lead Electromechanical Engr.',
    phone: '09043778846',
    specialty: 'Hybrid Inverters & Lithium Storage',
    status: 'On Site',
    color: 'bg-blue-600'
  },
  {
    id: 'eng-2',
    name: 'Engr. Daniel Okafor',
    initials: 'DO',
    role: 'PV High-Voltage Specialist',
    phone: '08137148009',
    specialty: 'Commercial 10kVA+ & Three-Phase',
    status: 'Available',
    color: 'bg-amber-600'
  },
  {
    id: 'eng-3',
    name: 'Engr. Ibrahim Musa',
    initials: 'IM',
    role: 'Roofing & Structural Rigging Lead',
    phone: '08055123490',
    specialty: 'Roof Mounting, Earthing & DC Combiner',
    status: 'On Site',
    color: 'bg-emerald-600'
  }
];

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
    assignedEngineer: 'Engr. Tobi Alabi',
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
      { itemId: 'pv-550w', name: '550W Tier-1 Mono Panels', qty: 12 },
      { itemId: 'bos-cables', name: 'Surge Protection & DC Cabling Kit', qty: 2 }
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

const DEFAULT_EXPENSES = [
  {
    id: 'EXP-1001',
    date: '2026-11-17',
    type: 'project',
    projectId: 'DJS-8842',
    category: 'Logistics & Haulage',
    description: 'Flatbed delivery of panels & battery to Lekki Phase 1',
    amount: 85000
  },
  {
    id: 'EXP-1002',
    date: '2026-11-17',
    type: 'project',
    projectId: 'DJS-8842',
    category: 'Mounting & Civil Materials',
    description: 'Aluminum roof rails, L-feet & waterproof sealant',
    amount: 145000
  },
  {
    id: 'EXP-1003',
    date: '2026-10-27',
    type: 'project',
    projectId: 'DJS-8790',
    category: 'Field Labor & Rigging',
    description: '3-man rigging crew & 100A changeover fabrication (Ikeja GRA)',
    amount: 320000
  },
  {
    id: 'EXP-1004',
    date: '2026-10-28',
    type: 'project',
    projectId: 'DJS-8790',
    category: 'Logistics & Haulage',
    description: 'Commercial van dispatch & earthing copper rods',
    amount: 110000
  },
  {
    id: 'EXP-2001',
    date: '2026-11-01',
    type: 'general',
    projectId: null,
    category: 'Warehouse & Office Rent',
    description: 'Monthly warehouse & showroom lease (Lekki/Ajah)',
    amount: 450000
  },
  {
    id: 'EXP-2002',
    date: '2026-11-05',
    type: 'general',
    projectId: null,
    category: 'Staff Salaries',
    description: 'Engineering & admin base payroll (November)',
    amount: 850000
  },
  {
    id: 'EXP-2003',
    date: '2026-11-12',
    type: 'general',
    projectId: null,
    category: 'Fuel & Fleet Maintenance',
    description: 'Service van diesel & warehouse generator fuel',
    amount: 125000
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

  addInventoryItem(itemData) {
    const inv = this.getInventory();
    const newItem = {
      id: 'item-' + Date.now().toString(36),
      name: itemData.name,
      category: itemData.category || 'accessories',
      sku: itemData.sku || ('DJS-' + Math.floor(1000 + Math.random() * 9000)),
      stock: Number(itemData.stock) || 0,
      minThreshold: Number(itemData.minThreshold) || 2,
      unitPrice: Number(itemData.unitPrice) || 0,
      costPrice: Number(itemData.costPrice) || 0
    };
    inv.push(newItem);
    this.saveInventory(inv);
    return newItem;
  }

  updateInventoryItem(itemId, updates) {
    const inv = this.getInventory();
    const idx = inv.findIndex(i => i.id === itemId);
    if (idx === -1) return null;
    inv[idx] = { ...inv[idx], ...updates };
    this.saveInventory(inv);
    return inv[idx];
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
    const totalAmount = Number(orderData.totalAmount) || 3850000;
    const amountPaid = orderData.amountPaid !== undefined ? Number(orderData.amountPaid) : Math.round(totalAmount * 0.7);
    const balanceDue = Math.max(0, totalAmount - amountPaid);

    const newOrder = {
      id: orderId,
      date: now.toISOString(),
      clientName: orderData.clientName || 'Valued Solar Client',
      clientEmail: orderData.clientEmail || 'client@example.com',
      clientPhone: orderData.clientPhone || '08000000000',
      installationAddress: orderData.installationAddress || 'Nigeria',
      packageTitle: orderData.packageTitle || 'Custom Solar System',
      packageTier: orderData.packageTier || '3.5kVA',
      totalAmount,
      amountPaid,
      balanceDue,
      paymentStatus: balanceDue === 0 ? 'paid_in_full' : (amountPaid > 0 ? 'partially_paid' : 'unpaid'),
      paymentMethod: orderData.paymentMethod || 'Paystack Instant Checkout',
      paymentRef: 'pstk_' + Math.random().toString(36).substring(2, 12),
      currentStage: 1,
      assignedEngineer: orderData.assignedEngineer || 'Engr. Tobi Alabi',
      engineerPhone: orderData.engineerPhone || '09043778846',
      estimatedCompletion: orderData.estimatedCompletion || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      bom: orderData.bom || [
        { itemId: 'inv-35kva', name: '3.5kVA MPPT Inverter', qty: 1 },
        { itemId: 'bat-512kwh', name: '5.12kWh LiFePO4 Battery', qty: 1 },
        { itemId: 'pv-550w', name: '550W Tier-1 Panels', qty: 4 },
        { itemId: 'bos-cables', name: 'Surge Protection & DC Cabling Kit', qty: 1 }
      ],
      timeline: [
        {
          stage: 1,
          title: 'Order Confirmed & Payment Received',
          date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'completed',
          note: `Confirmed ₦${amountPaid.toLocaleString()} payment. Warehouse allocated equipment.`
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
    if (nextStage >= 5) {
      order.estimatedCompletion = 'Completed';
    }

    this.saveOrders(orders);
    return order;
  }

  recordOrderPayment(orderId, amount) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    const pay = Math.max(0, Number(amount) || 0);
    order.amountPaid = Math.min(order.totalAmount, (order.amountPaid || 0) + pay);
    order.balanceDue = Math.max(0, order.totalAmount - order.amountPaid);
    order.paymentStatus = order.balanceDue === 0 ? 'paid_in_full' : 'partially_paid';

    this.saveOrders(orders);
    return order;
  }

  assignOrderEngineer(orderId, engineerName, engineerPhone) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.assignedEngineer = engineerName;
    if (engineerPhone) order.engineerPhone = engineerPhone;
    this.saveOrders(orders);
    return order;
  }

  // --- Clients Directory Methods ---
  getClients() {
    const orders = this.getOrders();
    let storedClients = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLIENTS);
      if (raw) storedClients = JSON.parse(raw);
    } catch (e) {}

    const map = new Map();

    // Seed from stored clients first
    storedClients.forEach(c => {
      const key = (c.email || c.phone || c.name).toLowerCase().trim();
      map.set(key, {
        id: c.id || 'CLT-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
        name: c.name,
        email: c.email || '',
        phone: c.phone || '',
        address: c.address || '',
        company: c.company || '',
        notes: c.notes || '',
        orders: [],
        totalContracted: 0,
        totalPaid: 0,
        balanceDue: 0
      });
    });

    // Aggregate from all orders
    orders.forEach(ord => {
      const key = (ord.clientEmail || ord.clientPhone || ord.clientName).toLowerCase().trim();
      if (!map.has(key)) {
        map.set(key, {
          id: 'CLT-' + ord.id.replace('DJS-', ''),
          name: ord.clientName,
          email: ord.clientEmail || '',
          phone: ord.clientPhone || '',
          address: ord.installationAddress || '',
          company: '',
          notes: '',
          orders: [],
          totalContracted: 0,
          totalPaid: 0,
          balanceDue: 0
        });
      }
      const client = map.get(key);
      client.orders.push(ord);
      client.totalContracted += Number(ord.totalAmount) || 0;
      client.totalPaid += Number(ord.amountPaid) || 0;
      client.balanceDue += Number(ord.balanceDue) || 0;
      if (!client.address && ord.installationAddress) client.address = ord.installationAddress;
      if (!client.phone && ord.clientPhone) client.phone = ord.clientPhone;
    });

    return Array.from(map.values());
  }

  saveClient(clientData) {
    let storedClients = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLIENTS);
      if (raw) storedClients = JSON.parse(raw);
    } catch (e) {}

    const key = (clientData.email || clientData.phone || clientData.name).toLowerCase().trim();
    const existingIdx = storedClients.findIndex(
      c => (c.email || c.phone || c.name).toLowerCase().trim() === key
    );

    const record = {
      id: clientData.id || 'CLT-' + Math.floor(1000 + Math.random() * 9000),
      name: clientData.name,
      email: clientData.email || '',
      phone: clientData.phone || '',
      address: clientData.address || '',
      company: clientData.company || '',
      notes: clientData.notes || ''
    };

    if (existingIdx >= 0) {
      storedClients[existingIdx] = { ...storedClients[existingIdx], ...record };
    } else {
      storedClients.unshift(record);
    }

    try {
      localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(storedClients));
      this.notifyChange('clients_updated', { client: record });
    } catch (e) {}
    return record;
  }

  // --- Expenses & Project P&L Methods ---
  getExpenses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_EXPENSES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(DEFAULT_EXPENSES));
        return DEFAULT_EXPENSES;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_EXPENSES;
    }
  }

  saveExpenses(expenses) {
    try {
      localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
      this.notifyChange('expenses_updated', { expenses });
    } catch (e) {}
  }

  addExpense(expenseData) {
    const expenses = this.getExpenses();
    const newExp = {
      id: 'EXP-' + Math.floor(1000 + Math.random() * 9000),
      date: expenseData.date || new Date().toISOString().split('T')[0],
      type: expenseData.projectId ? 'project' : 'general',
      projectId: expenseData.projectId || null,
      category: expenseData.category || 'Operations',
      description: expenseData.description || 'Expense entry',
      amount: Math.max(0, Number(expenseData.amount) || 0)
    };
    expenses.unshift(newExp);
    this.saveExpenses(expenses);
    return newExp;
  }

  deleteExpense(expenseId) {
    const expenses = this.getExpenses().filter(e => e.id !== expenseId);
    this.saveExpenses(expenses);
  }

  getOrderFinancials(order) {
    const inventory = this.getInventory();
    const expenses = this.getExpenses();

    let bomCost = 0;
    if (order.bom && Array.isArray(order.bom)) {
      order.bom.forEach(b => {
        const invItem = inventory.find(i => i.id === b.itemId);
        const unitCost = invItem ? (invItem.costPrice || Math.round(invItem.unitPrice * 0.78)) : 0;
        bomCost += unitCost * (b.qty || 1);
      });
    }

    const projectExpenses = expenses
      .filter(e => e.type === 'project' && e.projectId === order.id)
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    const revenue = Number(order.totalAmount) || 0;
    const collected = Number(order.amountPaid) || 0;
    const balanceDue = Math.max(0, revenue - collected);
    const totalCost = bomCost + projectExpenses;
    const netProfit = revenue - totalCost;
    const marginPct = revenue > 0 ? Math.round((netProfit / revenue) * 1000) / 10 : 0;

    return {
      revenue,
      collected,
      balanceDue,
      bomCost,
      projectExpenses,
      totalCost,
      netProfit,
      marginPct
    };
  }

  // --- Engineers Methods ---
  getEngineers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ENGINEERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_ENGINEERS, JSON.stringify(DEFAULT_ENGINEERS));
        return DEFAULT_ENGINEERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_ENGINEERS;
    }
  }

  // --- Client Profile Methods (Storefront compat) ---
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
