import { FC, ReactNode } from "react";

interface SearchProviderProps {
  children: ReactNode;
}

// Versión simplificada temporal sin kbar para diagnosticar problemas
export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default SearchProvider;