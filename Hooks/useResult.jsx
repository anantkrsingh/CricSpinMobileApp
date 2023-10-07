import { useContext, useEffect, useState } from "react"
import { MyContext } from "../ContextProvider"


const useResult = (params) => {
    const { myMatch, setMatch } = useContext(MyContext)
    const [loading, setLoading] = useState(true)
    const { matchId, seriesId } = useContext(MyContext)
    const [jsonData, setJsonData] = useState(null)
    const [CRR, setCRR] = useState("N/A")
    const [RRR, setRRR] = useState("N/A")
    const [animation, setAnimation] = useState("loadingLottie");
    const [speed, setSpeed] = useState(1)

    const handleAnimation = (strf) => {
        let animationName;
        let speed;
        switch (strf) {
            case '4-4-4':
                animationName = 'four';
                speed = 1.1
                break;
            case '0':
                animationName = 'zero';
                speed = 1.0
                break;
            case '1':
                animationName = 'one';
                speed = 1.2
                break;
            case '2':
                animationName = 'two';
                speed = .9
                break;
            case '3':
                animationName = 'three';
                speed = .8
                break;
            case 'Ball':
                animationName = 'ball';
                speed = 1.3
                break;
            case 'Over':
                animationName = 'over';
                speed = .7
                break;
            case 'Wicket':
                animationName = 'wicket';
                speed = 1.4
                break;
            case 'Wide Ball':
                animationName = 'wide';
                speed = 1.5
                break;
            case 'Third Umpire':
                animationName = 'third_umpire';
                speed = 1.6
                break;
            case '6-6-6':
                animationName = 'six';
                speed = 1.7
                break;
            default:
                animationName = 'loadingLottie';
                break;
        }
        setAnimation(animationName);
        setSpeed(speed)
    };
    useEffect(() => {

        const fetchMatch = async () => {
            try {
                const response = await fetch(`https://api.cricspin.live/SeriesMatches?seriesId=${seriesId}`);
                const matchData = await response.json();
                const matchID = parseInt(matchId);
                const filteredMatches = matchData.filter(it => it.MatchId === matchID);
                setMatch(filteredMatches[0]);
                const sanitizedJsonData = filteredMatches[0].jsondata.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
                let jsonData = null;

                try {
                    jsonData = JSON.parse(sanitizedJsonData).jsondata;
                    handleAnimation(jsonData?.score);
                } catch (error) {
                    console.error("Error parsing JSON data:", error);
                    return null;
                }
                setJsonData(jsonData)

                const title = jsonData.title;
                const substringIndex = title.indexOf("Match");
                const str = substringIndex !== -1 ? title.substring(0, substringIndex) : title;

                const CRRRegex = /C\.RR:\s*(\d+(\.\d+)?)/i;
                const RRRRegex = /R\.RR:\s*(\d+(\.\d+)?)/i;

                const CRRMatch = title.match(CRRRegex);
                const RRRMatch = title.match(RRRRegex);

                const CRR1 = CRRMatch ? CRRMatch[1] : "N/A";
                const RRR1 = RRRMatch ? RRRMatch[1] : "N/A";
                setCRR(CRR1)
                setRRR(RRR1)
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            } finally {
                setLoading(false)

            }
        }
        fetchMatch()
        const interval = setInterval(() => {
            fetchMatch();
        }, 1500);
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [params])


    return { myMatch, loading, CRR, RRR, jsonData, animation, speed }
}


export default useResult