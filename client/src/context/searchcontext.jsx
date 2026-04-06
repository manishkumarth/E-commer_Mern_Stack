import { createContext, useState } from "react";

export const searcContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);   // ← New: store products here

  const resetToNormalMode = () => {
    setSearchMode(false);
    setAiSearchResults([]);
    setSearch("");
  };

  return (
    <searcContext.Provider value={{
      search,
      setSearch,
      searchMode,
      setSearchMode,
      aiSearchResults,
      setAiSearchResults,
      allProducts,
      setAllProducts,          // ← expose this
      resetToNormalMode
    }}>
      {children}
    </searcContext.Provider>
  );
};
export default SearchProvider