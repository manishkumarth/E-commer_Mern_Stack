// context/searchcontext.js
import { createContext, useState } from "react";

export const searcContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);     // false = normal, true = AI
  const [aiSearchResults, setAiSearchResults] = useState([]);

  const resetToNormalMode = () => {
    setSearchMode(false);
    setAiSearchResults([]);
    // setSearch("");        // Optional: clear search text or not
  };

  return (
    <searcContext.Provider value={{
      search,
      setSearch,
      searchMode,
      setSearchMode,
      aiSearchResults,
      setAiSearchResults,
      resetToNormalMode
    }}>
      {children}
    </searcContext.Provider>
  );
};

export default SearchProvider