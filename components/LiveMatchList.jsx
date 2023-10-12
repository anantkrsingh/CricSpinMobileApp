import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { IMAGEURL } from './CONST';
import { TouchableWithoutFeedback } from 'react-native';
import { MyContext } from '../ContextProvider';


export const LiveMatchList = ({ match, index, navigation }) => {
    const [jsonData, setJsonData] = useState()
    const { setMatchId, setSeriesId } = useContext(MyContext)
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    function compareDateTimeWithCurrent(dateTimeString) {
        const targetDateTime = parseDateTime(dateTimeString);
        const currentDateTime = new Date();

        if (targetDateTime < currentDateTime) {
            return -1; // targetDateTime is earlier
        } else if (targetDateTime > currentDateTime) {
            return 1; // targetDateTime is later
        } else {
            return 0; // dates are equal
        }
    }

    function convertDateFormat(inputDate) {
        const months = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        };

        const parts = inputDate.split("-");
        const day = parts[0];
        const month = months[parts[1]];
        const year = parts[2];

        return `${day}-${month}-${year}`;
    }

    function parseDateTime(dateTimeString) {
        const parts = dateTimeString.split("-");
        const datePart = parts[0].trim() + " " + parts[1].trim() + " " + parts[2].split("at")[0]
        const timePart = parts[2].split("at")[1];

        const dateParts = datePart.split(" ");
        const day = parseInt(dateParts[0]);
        const monthAbbrev = dateParts[1];
        const year = parseInt(dateParts[2]);

        const timeParts = timePart.split(":");
        let hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1].slice(0, 2));
        const ampm = timeParts[1].slice(2).trim().toLowerCase();

        if (ampm === "pm" && hours !== 12) {
            hours += 12;
        } else if (ampm === "am" && hours === 12) {
            hours = 0;
        }

        const monthMap = {
            "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
            "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
        };

        const month = monthMap[monthAbbrev];
        return new Date(year, month, day, hours, minutes);
    }

    function compareDateTimeWithCurrent(dateTimeString) {
        const targetDateTime = parseDateTime(dateTimeString);
        const currentDateTime = new Date();

        if (targetDateTime < currentDateTime) {
            return -1;
        } else if (targetDateTime > currentDateTime) {
            return 1;
        } else {
            return 0;
        }
    }

    const inputDateTime = match.Matchtime;
    const comparisonResult = compareDateTimeWithCurrent(inputDateTime);


    let isLive = false;
    let intData = -1;
    if (comparisonResult < 0) {
        isLive = true;
    } else if (comparisonResult > 0) {
        isLive = false;
    } else {
        isLive = true;
    }



    useEffect(() => {
        try {
            const data = match.jsondata;
            const sanitizedJsonData = data.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
            let jsondata = null;

            try {
                jsondata = JSON.parse(sanitizedJsonData).jsondata;
            } catch (error) {
                console.error("Error parsing JSON data:", error);
                return null;
            }
            setJsonData(jsondata);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [])

    const { width } = Dimensions.get('window');

    return (
        <View style={{flex:1,margin:10}}>



            <TouchableOpacity
                key={index}
                onPress={() => { setMatchId(match.MatchId); setSeriesId(match.seriesid); { navigation.navigate("Result") } }}
                style={{ width: width - 20, marginTop: 4, borderRadius: 20, backgroundColor: "white", overflow: "hidden", flexDirection: "column" }}
            >
                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}  >
                    <Text style={{ padding: 8 }} >{match.Title}</Text>
                    {isLive && match.Result === "" && <Text style={{ color: "white", padding: 6, backgroundColor: "#EF4444" }}>Live</Text>}
                    {match.Result === "" && !isLive && <Text style={{ color: "white", display: "flex", padding: 6, backgroundColor: "#EF4444" }}>Upcoming</Text>}
                    {match.Result != "" && <Text style={{ color: "white", padding: 6, backgroundColor: "#EF4444" }} >Finished</Text>}
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "100%" }} >
                    <View className='flex flex-col p-4 justify-start items-start'>
                        <Image style={{ height: 48, width: 48, borderColor: "gray", borderWidth: 2, borderRadius: 40 }} source={{ uri: IMAGEURL + match?.TeamAImage }} className='teamLogo' alt="" />
                        <Text className=' font-bold text-start text-xl'>{isLive && match.Result === "" ? jsonData?.teamA : match.TeamA}</Text>
                        <Text className='font-bold flex flex-row'>{jsonData?.wicketA}  <Text className='text-gray-400 ms-1'> {jsonData?.oversA ? "(" : ""} {jsonData?.oversA} {jsonData?.oversA ? ")" : ""}</Text> </Text>
                    </View>
                    <View className='w-[inherit] h-[100%] flex flex-1 text-center justify-center self-center'>
                        <Text className='text-red-500 text-center font-bold'>VS</Text>
                    </View>
                    <View className='flex w-[inherit] flex-col p-4 items-end '>
                        <Image style={{ height: 48, width: 48, borderColor: "gray", borderWidth: 2, borderRadius: 40 }} source={{ uri: IMAGEURL + match?.TeamBImage }} className='teamLogo' alt="" />
                        <Text className=' font-bold text-right text-xl'>{isLive && match.Result === "" ? jsonData?.teamB : match.TeamB}</Text>
                        <Text className='font-bold flex'>{jsonData?.wicketB}</Text>
                    </View>
                </View>
                <Text className=' mt-2 mb-4 pl-4 euclidMedium text-start'>{match.Matchtime}</Text>
            </TouchableOpacity>
        </View>
    )
}
