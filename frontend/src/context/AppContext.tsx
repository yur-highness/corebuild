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
  curreny: string;
  delivery_fee: number;
  token: string;

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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [role, setRole] = useState("");

  const token: string | null = localStorage.getItem("token")?localStorage.getItem("token"):null;

  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token]);

  // ✅ Automatically include credentials (cookies)
  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true, // very important
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
      // console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
      setUserData(null);
      setRole("");
      // Only toast if not unauthorized (avoid spamming 401 logs)
      if (error.response?.status !== 401) toast.success("connection #secure");
    }
  };

  // ✅ Auto fetch user data on mount
  useEffect(() => {
    getUserData();
  }, []);

  // ✅ Optionally persist login state locally for faster reloads
  useEffect(() => {
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
    curreny: "$",
    delivery_fee: 0,
    token: token || "",

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
