import { useEffect, useState } from "react"

const useMatches = () => {
    const [matches, setMatches] = useState()
    const [upcomingMatches, setUpcomingMatches] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch("https://api.cricspin.live/LiveLine");
                const upcomingResponse = await fetch("https://api.cricspin.live/UpcomingMatches");
                const matchData = await response.json();
                const upcomingMatchData = await upcomingResponse.json();
                setMatches(matchData);
                setUpcomingMatches(upcomingMatchData.AllMatch);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        fetchMatches()
        // const interval = setInterval(() => {
        //     fetchMatches();
        // }, 500);
        // return () => {
        //     if (interval) {
        //         clearInterval(interval);
        //     }
        // };
    }, [])


    return { matches, upcomingMatches, loading }
}


export default useMatches