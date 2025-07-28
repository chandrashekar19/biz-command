import { create } from 'zustand';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image?: string;
}

export interface ChartData {
  sales: Array<{ date: string; value: number; }>;
  users: Array<{ date: string; value: number; }>;
  revenue: Array<{ date: string; value: number; }>;
}

interface DataState {
  users: UserData[];
  products: Product[];
  chartData: ChartData;
  loading: boolean;
  
  // User management
  addUser: (user: Omit<UserData, 'id'>) => void;
  updateUser: (id: string, user: Partial<UserData>) => void;
  deleteUser: (id: string) => void;
  
  // Product management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Data fetching
  loadData: () => Promise<void>;
}

// Mock data
const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=10b981&color=fff'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=f59e0b&color=fff'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@company.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15T14:20:00Z',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=ef4444&color=fff'
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Dashboard',
    category: 'Software',
    price: 99.99,
    stock: 150,
    status: 'active',
  },
  {
    id: '2',
    name: 'Analytics Suite',
    category: 'Software',
    price: 199.99,
    stock: 75,
    status: 'active',
  },
  {
    id: '3',
    name: 'Basic Plan',
    category: 'Subscription',
    price: 29.99,
    stock: 999,
    status: 'active',
  },
  {
    id: '4',
    name: 'Enterprise License',
    category: 'Software',
    price: 499.99,
    stock: 25,
    status: 'inactive',
  },
];

const mockChartData: ChartData = {
  sales: [
    { date: '2024-01-01', value: 1200 },
    { date: '2024-01-02', value: 1800 },
    { date: '2024-01-03', value: 1600 },
    { date: '2024-01-04', value: 2200 },
    { date: '2024-01-05', value: 1900 },
    { date: '2024-01-06', value: 2500 },
    { date: '2024-01-07', value: 2100 },
  ],
  users: [
    { date: '2024-01-01', value: 120 },
    { date: '2024-01-02', value: 150 },
    { date: '2024-01-03', value: 180 },
    { date: '2024-01-04', value: 220 },
    { date: '2024-01-05', value: 190 },
    { date: '2024-01-06', value: 250 },
    { date: '2024-01-07', value: 280 },
  ],
  revenue: [
    { date: '2024-01-01', value: 24000 },
    { date: '2024-01-02', value: 36000 },
    { date: '2024-01-03', value: 32000 },
    { date: '2024-01-04', value: 44000 },
    { date: '2024-01-05', value: 38000 },
    { date: '2024-01-06', value: 50000 },
    { date: '2024-01-07', value: 42000 },
  ],
};

export const useDataStore = create<DataState>((set, get) => ({
  users: [],
  products: [],
  chartData: { sales: [], users: [], revenue: [] },
  loading: false,
  
  addUser: (user) => {
    const newUser = { ...user, id: Date.now().toString() };
    set((state) => ({ users: [...state.users, newUser] }));
  },
  
  updateUser: (id, updatedUser) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    }));
  },
  
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  
  addProduct: (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  
  updateProduct: (id, updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },
  
  loadData: async () => {
    set({ loading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    set({
      users: mockUsers,
      products: mockProducts,
      chartData: mockChartData,
      loading: false,
    });
  },
}));