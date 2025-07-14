import  { createContext, useContext, useState, type ReactNode } from 'react';

interface CategoryContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  return (
    <CategoryContext.Provider value={{
      activeCategory,
      setActiveCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
};
