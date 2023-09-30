import React, { useEffect, useState } from "react";
import { View, Text, ScrollView,StyleSheet } from 'react-native'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';


export const Live = React.memo(({ matchID }) => {
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 2000);

        return () => clearInterval(interval);
    }, [matchID]);
    const { width } = useWindowDimensions();


    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://api.cricspin.live/Live/?MatchId=" + matchID,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setMatch(data[0]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    if (loading || !match) {
        return <Text>Loading...</Text>;
    }

    const sanitizedJsonRuns = match.jsonruns.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
    const sanitizedJsonData = match.jsondata.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

    let jsonData = null;
    let jsonRuns = null;

    try {
        jsonData = JSON.parse(sanitizedJsonData).jsondata;
    } catch (error) {
        console.error("Error parsing JSON data:", error);
        return null;
    }

    try {
        jsonRuns = JSON.parse(sanitizedJsonRuns).jsonruns;
    } catch (error) {
        console.error("Error parsing JSON data:", error);
        return null;
    }

    const data = jsonData;


    const title = data.title;
    const CRRRegex = /C\.RR:\s*(\d+(\.\d+)?)/i;
    const RRRRegex = /R\.RR:\s*(\d+(\.\d+)?)/i;

    const CRRMatch = title.match(CRRRegex);
    const RRRMatch = title.match(RRRRegex);


    if (!data) {
        return null;
    }

    const last6Balls = data.Last6Balls.split("-");
    let substring = jsonData.oversB.substring(0, jsonData.oversB.indexOf("|"));
    let substring2 = jsonData.oversB.substring(jsonData.oversB.indexOf("|") + 1);

    let nonstrikerruns;
    let strikerruns;
    let nonstrikerballs;
    let strikerballs;

    if (substring != null && substring.length > 0) {
        let split2 = substring.split(",");
        if (split2.length > 0) {
            nonstrikerruns = split2[0];
            strikerruns = split2[1];
        }
    }

    if (substring2 != null && substring2.length > 0) {
        let split2 = substring2.split(",");
        if (split2.length > 0) {
            nonstrikerballs = split2[0];
            strikerballs = split2[1];
        }
    }

    let sr = parseInt((strikerruns / strikerballs) * 100);

    let nsr = parseInt((nonstrikerruns / nonstrikerballs) * 100);

    const startIndex = jsonData.title.indexOf("PLZ RATE US 5 STARS");
    const content = jsonData.title.substring(startIndex);

    return (
        <ScrollView className="flex w-full p-2 ">
            <View className='fixed w-full bottom-0 max-w-[320px] md:max-w-full md:left-0 self-center'>
                {/* <BottomBanner /> */}
            </View>
            <View className="w-full flex mb-2 flex-col">
                <View className="w-full p-2 mt-4 items-center euclid flex  flex-row justify-between bg-white rounded-md">
                    <Text className="text-lg">Favourite</Text>
                    <View className="flex items-center font-bold flex-row">
                        <Text style={{ fontWeight: "bold" }}> {jsonRuns.fav}</Text>
                        <Text className="px-2 text-xl py-1 mx-2 bg-red-100 text-red-800 rounded-lg">
                            {jsonRuns.rateA}
                        </Text>
                        <Text className="px-2 py-1 text-xl bg-green-100  text-green-800 ">
                            {jsonRuns.rateB}
                        </Text>
                    </View>
                </View>
                <View className=" mb-2 euclid font-bold bg-white rounded-md mt-4 p-2 flex-row justify-between">
                    <View className="flex flex-col items-center">
                        <Text>Session </Text>
                        <View className="flex flex-row">
                            <Text className="px-2 py-1 mx-2 text-xl bg-red-100 text-red-800 rounded-lg">
                                {jsonRuns.sessionA}
                            </Text>
                            <Text className="px-2 py-1 text-xl  mx-2 bg-green-100  text-green-800 rounded-lg">
                                {jsonRuns.sessionB}
                            </Text>
                        </View>
                    </View>
                    <View className="mb-2 flex items-center flex-col">
                        <Text>Over</Text>
                        <Text className="px-2 text-xl py-1 mx-2 bg-green-100  text-green-800 rounded-2xl">
                            {jsonRuns.sessionOver}
                        </Text>
                    </View>
                    <View className="flex flex-col mb-2 bg-white rounded-md">
                        <Text className="text-center">Run x Ball</Text>
                        <View className="flex flex-row justify-center">
                            <Text className="px-2 text-xl py-1 mx-2 bg-red-100 text-red-800 rounded-lg">
                                {jsonRuns.runxa}
                            </Text>
                            <Text className="px-2 text-xl py-1 mx-2 bg-green-100  text-green-800 rounded-lg ">
                                {jsonRuns.runxb}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="bg-white rounded-xl  shadow-lg mt-2 mb-2 w-full">
                    <View style={styles.container}>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerCell}>Batsmen</Text>
                            <Text style={[styles.headerCell, styles.textRight]}>R</Text>
                            <Text style={[styles.headerCell, styles.textRight]}>B</Text>
                            <Text style={[styles.headerCell, styles.textRight]}>4s</Text>
                            <Text style={[styles.headerCell, styles.textRight]}>6s</Text>
                            <Text style={[styles.headerCell, styles.textRight]}>SR</Text>
                        </View>
                        <View style={styles.dataRow}>
                            <Text style={styles.dataCell}>{data.batsman.split("|")[0].trim()}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.oversB.split("|")[0].trim().split(",")[1].trim()}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.oversB.split("|")[1].trim().split(",")[1].trim()}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.s4}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.s6}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{sr}</Text>
                        </View>
                        <View style={styles.dataRow}>
                            <Text style={styles.dataCell}>{data.batsman.split("|")[1].trim()}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.oversB.split("|")[0].trim().split(",")[0].trim()}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.oversB.split("|")[1].trim().split(",")[0].trim()}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.ns4}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{data.ns6}</Text>
                            <Text style={[styles.dataCell, styles.textRight]}>{nsr}</Text>
                        </View>
                    </View>
                    <View className="flex flex-row p-2 items-center w-[inherit]">

                        <Text>{" "}Bowler:</Text>
                        <Text className="flex font-bold w-[inherit] justify-center items-center  flex-1  text-center">
                            {" "}
                            {data.bowler}
                        </Text>
                    </View>
                </View>
                {/* <ExpandableBanner /> */}
                <View className="flex euclid flex-row mt-2 mb-2 bg-white rounded-md p-1 items-center">
                    <Text>Last 6 Balls</Text>

                    {last6Balls.map((item) => {
                        return (
                            <Text className="bg-gray-200 w-fit rounded-full px-3 py-2 m-1">
                                {item}
                            </Text>
                        );
                    })}
                </View>

                <View className="w-full mb-28  euclid mt-2 bg-white  rounded-md">
                    <Text className="p-2 text-lg">Summary</Text>
                    <View className="flex flex-1 h-[1px]  bg-gray-700">
                    </View>
                    <Text className="text-lg items-center text-center">{content}</Text>
                </View>
            </View>
        </ScrollView>
    );
});


const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 2,
      borderBottomColor:"gray",
      padding:3,
      marginBottom: 10,
    },
    headerRow: {
      flexDirection: 'row',
    },
    dataRow: {
      flexDirection: 'row',
    },
    headerCell: {
      flex: 1,
      padding: 5,
      fontWeight: 'bold',
    },
    dataCell: {
      flex: 1,
      padding: 5,
    },
    textRight: {
      textAlign: 'right',
    },
  });

