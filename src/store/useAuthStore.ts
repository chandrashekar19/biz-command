import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Mock authentication - replace with real API
    if (email === 'admin@company.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff'
      };
      set({ user, isAuthenticated: true });
      return true;
    } else if (email === 'user@company.com' && password === 'user123') {
      const user: User = {
        id: '2',
        email,
        name: 'Regular User',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Regular+User&background=10b981&color=fff'
      };
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));