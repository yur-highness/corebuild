import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

interface AppContextType {
  backendUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  getUserData: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [role, setRole] = useState("");

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
    userData,
    setUserData,
    role,
    setRole,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
