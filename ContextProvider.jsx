import { useState, createContext, useContext, useEffect } from "react";

import { db } from "./firebaseconfig";
import { onValue, ref } from "firebase/database";

export const MyContext = createContext();


export const ContextProvider = ({ children }) => {
    const [matchId, setMatchId] = useState()
    const [match, setMatch] = useState()
    const [seriesId, setSeriesId] = useState()
    const [bannerData, setBannerData] = useState()
    const [notification, setNotification] = useState(null)
    const [telegram,setTelegram] = useState(null)

    useEffect(() => {
        const query = ref(db, "data");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                setNotification(data.notification);
                setBannerData(data)
                setTelegram(data?.telegram?.url)
            }
        });
    }, []);



    return (
        <MyContext.Provider value={{ setMatchId, matchId, match, setMatch, seriesId, setSeriesId, bannerData,notification ,telegram}}>
            {children}
        </MyContext.Provider>
    )
}