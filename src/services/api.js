// Mock data and API functions
import imgTesla from '../assets/tesla..webp';
import imgFord from '../assets/Ford.webp';
import imgAudi from '../assets/Audi.webp';
import imgToyota from '../assets/Toyota.webp';
import imgJeep from '../assets/Jeep.webp';
import imgPorsche from '../assets/Porsche.webp';
import imgCivic from '../assets/Civic.webp';
import imgBmw from '../assets/Bmw.webp';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let USERS = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@nexgile.com',
        password: 'admin',
        role: 'Dealership Manager',
        avatar: 'https://i.pravatar.cc/150?u=admin'
    }
];

let MOCK_VEHICLES = [
    { id: 101, brand: 'Tesla', model: 'Model 3', year: 2023, price: 42000, status: 'Available', image: imgTesla },
    { id: 102, brand: 'Ford', model: 'Mustang', year: 2022, price: 35000, status: 'Sold', image: imgFord },
    { id: 103, brand: 'BMW', model: 'X5', year: 2024, price: 65000, status: 'Available', image: imgBmw },
    { id: 104, brand: 'Audi', model: 'Q7', year: 2023, price: 58000, status: 'In Transit', image: imgAudi },
    { id: 105, brand: 'Toyota', model: 'Camry', year: 2024, price: 26000, status: 'Available', image: imgToyota },
    { id: 106, brand: 'Jeep', model: 'Wrangler', year: 2023, price: 45000, status: 'Available', image: imgJeep },
    { id: 107, brand: 'Porsche', model: '911 Carrera', year: 2024, price: 115000, status: 'In Transit', image: imgPorsche },
    { id: 108, brand: 'Honda', model: 'Civic Type R', year: 2023, price: 43000, status: 'Available', image: imgCivic },
];

const MOCK_SALES_DATA = [
    { name: 'Jan', sales: 4000, target: 4500 },
    { name: 'Feb', sales: 3000, target: 3500 },
    { name: 'Mar', sales: 5000, target: 4800 },
    { name: 'Apr', sales: 6500, target: 6000 },
    { name: 'May', sales: 4800, target: 5500 },
    { name: 'Jun', sales: 7000, target: 6500 },
];

let MOCK_SERVICES = [
    { id: 201, customer: 'John Doe', vehicle: 'Tesla Model 3', type: 'Routine Maintenance', status: 'In Progress', date: '2023-10-24' },
    { id: 202, customer: 'Jane Smith', vehicle: 'BMW X5', type: 'Oil Change', status: 'Pending', date: '2023-10-25' },
    { id: 203, customer: 'Mike Johnson', vehicle: 'Ford Mustang', type: 'Tire Replacement', status: 'Completed', date: '2023-10-23' },
    { id: 204, customer: 'Emily Chen', vehicle: 'Audi Q7', type: 'Brake Inspection', status: 'Pending', date: '2023-10-26' },
    { id: 205, customer: 'Robert Wilson', vehicle: 'Toyota Camry', type: 'Transmission Service', status: 'In Progress', date: '2023-10-24' },
    { id: 206, customer: 'Sarah Davis', vehicle: 'Honda Civic', type: 'Battery Replacement', status: 'Completed', date: '2023-10-22' },
    { id: 207, customer: 'David Miller', vehicle: 'Chevrolet Silverado', type: 'Engine Diagnostic', status: 'Pending', date: '2023-10-27' },
    { id: 208, customer: 'Jessica White', vehicle: 'Subaru Outback', type: 'Alignment', status: 'In Progress', date: '2023-10-24' },
];

let MOCK_PARTS = [
    { id: 301, name: 'Brake Pads (Front)', category: 'Brakes', quantity: 45, price: 120, status: 'In Stock' },
    { id: 302, name: 'Oil Filter', category: 'Engine', quantity: 12, price: 25, status: 'Low Stock' },
    { id: 303, name: 'LED Headlight Bulb', category: 'Electrical', quantity: 0, price: 85, status: 'Out of Stock' },
    { id: 304, name: 'Wiper Blades', category: 'Accessories', quantity: 150, price: 30, status: 'In Stock' },
];

let MOCK_DEALS = [
    { id: 401, customer: 'Alice Brown', vehicle: 'Tesla Model 3', type: 'Purchase', amount: 45000, date: '2023-10-20', status: 'Approved' },
    { id: 402, customer: 'Chris Green', vehicle: 'BMW X5', type: 'Lease', amount: 65000, date: '2023-10-21', status: 'Approved' },
];

// --- API Methods ---

export const login = async (email, password) => {
    await delay(800);
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return { token: 'mock-jwt-token-12345', user: userWithoutPassword };
    }
    throw new Error('Invalid credentials');
};

export const register = async (name, email, password) => {
    await delay(800);
    if (USERS.some(u => u.email === email)) {
        throw new Error('Email already exists');
    }
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: 'Sales Representative', // Default role
        avatar: `https://i.pravatar.cc/150?u=${email}`
    };
    USERS.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return { token: 'mock-jwt-token-12345', user: userWithoutPassword };
};

export const fetchDashboardStats = async () => {
    await delay(500);
    return {
        totalVehicles: 145,
        salesThisMonth: 32,
        activeService: 18,
        revenue: 1245000,
        salesChart: MOCK_SALES_DATA
    };
};

export const fetchInventory = async () => {
    await delay(600);
    return [...MOCK_VEHICLES];
};

export const addVehicle = async (vehicle) => {
    await delay(400);
    const newVehicle = { id: Date.now(), ...vehicle };
    MOCK_VEHICLES.push(newVehicle);
    return newVehicle;
};

export const updateVehicle = async (id, updates) => {
    await delay(400);
    const index = MOCK_VEHICLES.findIndex(v => v.id === id);
    if (index !== -1) {
        MOCK_VEHICLES[index] = { ...MOCK_VEHICLES[index], ...updates };
        return MOCK_VEHICLES[index];
    }
    throw new Error('Vehicle not found');
};

export const deleteVehicle = async (id) => {
    await delay(400);
    MOCK_VEHICLES = MOCK_VEHICLES.filter(v => v.id !== id);
    return { success: true };
};

export const fetchServices = async () => {
    await delay(600);
    return [...MOCK_SERVICES];
};

export const fetchParts = async () => {
    await delay(600);
    return [...MOCK_PARTS];
};

export const addPart = async (part) => {
    await delay(400);
    const newPart = { id: Date.now(), ...part };
    MOCK_PARTS.push(newPart);
    return newPart;
};

export const updatePart = async (id, updates) => {
    await delay(400);
    const index = MOCK_PARTS.findIndex(p => p.id === id);
    if (index !== -1) {
        MOCK_PARTS[index] = { ...MOCK_PARTS[index], ...updates };
        return MOCK_PARTS[index];
    }
    throw new Error('Part not found');
};

export const deletePart = async (id) => {
    await delay(400);
    MOCK_PARTS = MOCK_PARTS.filter(p => p.id !== id);
    return { success: true };
};

export const addService = async (service) => {
    await delay(400);
    const newService = { id: Date.now(), ...service };
    MOCK_SERVICES.push(newService);
    return newService;
};

export const updateService = async (id, updates) => {
    await delay(400);
    const index = MOCK_SERVICES.findIndex(s => s.id === id);
    if (index !== -1) {
        MOCK_SERVICES[index] = { ...MOCK_SERVICES[index], ...updates };
        return MOCK_SERVICES[index];
    }
    throw new Error('Service not found');
};

export const deleteService = async (id) => {
    await delay(400);
    MOCK_SERVICES = MOCK_SERVICES.filter(s => s.id !== id);
    return { success: true };
};

export const fetchDeals = async () => {
    await delay(600);
    return [...MOCK_DEALS].reverse();
};

export const addDeal = async (deal) => {
    await delay(400);
    const newDeal = { id: Date.now(), ...deal, date: new Date().toISOString().split('T')[0], status: 'Approved' };
    MOCK_DEALS.push(newDeal);
    return newDeal;
};
