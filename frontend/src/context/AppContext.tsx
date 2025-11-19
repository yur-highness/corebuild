import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useContext } from "react";

interface UserData {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  isAccountVerified?: boolean;
}

interface AppContextType {
  backendUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  getUserData: () => Promise<void>;
  currency: string;
  delivery_fee: number;
  token: string | null;
  setToken: (t: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [role, setRole] = useState("");
  const [token, setTokenState] = useState<string | null>(null);

  // client-safe wrapper to set token
  const setToken = (t: string | null) => {
    if (typeof window !== "undefined") {
      if (t) {
        localStorage.setItem("token", t);
      } else {
        localStorage.removeItem("token");
      }
    }
    setTokenState(t);
  };

  // Initialize token from localStorage on client only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("token");
    if (t) setTokenState(t);
  }, []);

  // Keep axios default Authorization in sync (optional)
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ Automatically include credentials (cookies) for cross-site cookies if needed
  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true, // very important if backend uses cookie auth
      });

      if (data.success && data.userData) {
        setUserData(data.userData);
        setRole(data.userData.role || "");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        setRole("");
        if (data?.message) toast.error(data.message);
      }
    } catch (error: any) {
      setIsLoggedIn(false);
      setUserData(null);
      setRole("");
      if (error.response?.status !== 401) toast.success("connection #secure");
    }
  };

  // Auto fetch user data on client mount
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;
    getUserData();
    // Note: If your backend requires the token header, ensure token is set before calling getUserData
  }, [/* no deps so runs on mount */]);

  // persist role to localStorage (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isLoggedIn && role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [isLoggedIn, role]);

  const value: AppContextType = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData: userData || {},
    setUserData,
    role,
    setRole,
    getUserData,
    currency: "$",
    delivery_fee: 0,
    token,
    setToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
