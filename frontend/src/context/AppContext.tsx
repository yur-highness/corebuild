import  { createContext,useState,  type ReactNode } from 'react';

interface AppContextType {
    backendUrl: string;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userData: boolean;
    setUserData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode })=>{
const backendUrl = "http://localhost:5000";
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState(false);


const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData
};


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};