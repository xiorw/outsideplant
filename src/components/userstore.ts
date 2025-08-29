import { createSignal } from "solid-js";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  company?: string;
  avatar?: string;
}

// Placeholder users untuk demo
const PLACEHOLDER_USERS = {
  // Regular Users
  "user@demo.com": {
    id: "1",
    email: "user@demo.com",
    name: "John Doe",
    role: "user" as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  "technician@demo.com": {
    id: "2",
    email: "technician@demo.com",
    name: "Sarah Wilson",
    role: "user" as const,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  
  // Admin Users
  "admin@telkom.com": {
    id: "3",
    email: "admin@telkom.com",
    name: "Admin Telkom",
    role: "admin" as const,
    company: "PT Telkom Indonesia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  "admin@xl.com": {
    id: "4",
    email: "admin@xl.com",
    name: "Admin XL",
    role: "admin" as const,
    company: "PT XL Axiata",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  "admin@indosat.com": {
    id: "5",
    email: "admin@indosat.com",
    name: "Admin Indosat",
    role: "admin" as const,
    company: "PT Indosat Ooredoo",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  }
};

const [currentUser, setCurrentUser] = createSignal<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = createSignal(false);

export const userStore = {
  // Getters
  get user() {
    return currentUser();
  },
  get isAuthenticated() {
    return isAuthenticated();
  },
  get isAdmin() {
    return currentUser()?.role === "admin";
  },

  // Actions
  login: async (email: string, password: string, loginType: "user" | "admin") => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = PLACEHOLDER_USERS[email as keyof typeof PLACEHOLDER_USERS];
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    if (user.role !== loginType) {
      throw new Error(`This account is not registered as ${loginType}`);
    }
    
    // Simulate password validation (any non-empty password works)
    if (!password || password.length < 1) {
      throw new Error("Password is required");
    }
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");
    
    return user;
  },

  logout: () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedPassword");
    localStorage.removeItem("rememberedCompany");
    localStorage.removeItem("rememberMe");
  },

  // Initialize from localStorage on app start
  init: () => {
    const savedUser = localStorage.getItem("user");
    const savedAuth = localStorage.getItem("isAuthenticated");
    
    if (savedUser && savedAuth === "true") {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        userStore.logout();
      }
    }
  },

  // Get all available demo users for testing
  getDemoUsers: () => PLACEHOLDER_USERS
};