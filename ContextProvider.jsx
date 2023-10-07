import { useState,createContext, useContext } from "react";


 export const MyContext = createContext();


export const ContextProvider = ({children}) =>{
    const [matchId,setMatchId] = useState()
    const [match,setMatch] = useState()
    const [seriesId,setSeriesId] = useState()

    
    return(
        <MyContext.Provider value={{setMatchId,matchId,match,setMatch,seriesId,setSeriesId}}>
                {children}
        </MyContext.Provider>
    )
}