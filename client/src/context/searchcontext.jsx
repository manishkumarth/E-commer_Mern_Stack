import { createContext, useState } from "react";

export const searcContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [searchMode, setSearchMode] = useState(false); 

  const resetToNormalMode = () => {
    setSearch("");
    setAiSearchResults([]);
    setSearchMode(false);
  };

  const enterResultsView = () => {
    setSearchMode(true);
  };

  return (
    <searcContext.Provider value={{
      search,
      setSearch,
      searchMode,
      setSearchMode,
      aiSearchResults,
      setAiSearchResults,
      resetToNormalMode,
      enterResultsView,        // ← Add this
    }}>
      {children}
    </searcContext.Provider>
  );
};

export default SearchProvider;