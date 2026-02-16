import { createContext, useState } from "react";


export const searcContext=createContext()

function SearchProvider({children}){
  const [search, setSearch] = useState("");
  const [searchMode,setSearchMode]=useState(false)
    return(
        <searcContext.Provider value={{search, setSearch,searchMode,setSearchMode}}>
        {children}
        </searcContext.Provider>
    )
}
export default SearchProvider