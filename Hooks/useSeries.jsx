import { useEffect, useState } from "react"

const useSeries = () => {
    const [series, setSeries] = useState()
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await fetch("https://api.cricspin.live/Series");
                const matchData = await response.json();
                setSeries(matchData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        fetchSeries()
        // const interval = setInterval(() => {
        //     fetchSeries();
        // }, 500);
        // return () => {
        //     if (interval) {
        //         clearInterval(interval);
        //     }
        // };
    }, [])


    return { series, isLoading }
}


export default useSeries