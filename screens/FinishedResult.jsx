import React, { useEffect, useState } from 'react';
import { ScoreCard } from '../components/Scorecard';
import { Live } from '../components/Live';
import { MatchOdds } from '../components/MatchOdds';
import { Text, View, SafeAreaView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { TopBar } from '../components/TopBar';
import { TouchableOpacity } from 'react-native';


export const FinishedResult = ({ navigation, route }) => {

    const [currentItem, setCurrentItem] = useState("Scorecard");
    const { matchId, title } = route.params
    const [loading, setLoading] = useState(true);
    const [myMatch, setMyMatch] = useState(null);
    const [jsonData, setJsonData] = useState(null)

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.cricspin.live/Result?MatchId=${matchId}`);
            const data = await response.json();
            const matchId = parseInt(matchId);
            const filteredMatches = data.filter(it => it.MatchId === matchId);
            setMyMatch(filteredMatches[0]);
            console.log(filteredMatches[0].jsondata);
            try {
                if (filteredMatches[0].jsondata === "") {
                    filteredMatches[0].jsondata = "{}";
                }
                setJsonData(JSON.parse(filteredMatches[0].jsondata).jsondata);
                const wicketA = jsonData?.wicketA;
                setLoading(false);
                console.log(wicketA);
            } catch (error) {
                setLoading(false);
                console.error('Error parsing JSON:', error.message);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };




    const resultNavs = [
        "Scorecard", "Matchodds"
    ];

    const ResultView = () => {
        switch (currentItem) {
            case "Scorecard": return (<ScoreCard matchID={matchId} />);
            case "Live": return (<Live matchID={matchId} />);
            default: return (<MatchOdds matchId={matchId} />);
        }
    };

    return (
        <SafeAreaView className="bg-gray-200 flex-1" >{
            loading ? <ActivityIndicator /> : <>
                <TopBar navigation={navigation} title={title} />
                <View className="  flex overflow-hidden">
                    <View className="flex h-screen  bg-gray-200  flex-col w-[375px] m-0  transition-all duration-300 ease-in-out ">

                        <View className='w-full bg-gray-100 self-center items-center justify-between mt-4 mb-2 px-4 flex flex-row '>
                            {resultNavs.map((item) => {
                                const selected = currentItem === item;
                                return (
                                    <TouchableOpacity onPress={() => { setCurrentItem(item) }} className={selected ? 'self-center p-4 cursor-pointer text-orange-800 font-bold' : 'text-gray-800 cursor-pointer'} key={item}>
                                        <Text className={selected ? 'self-center cursor-pointer text-orange-800 font-bold' : 'text-gray-800 cursor-pointer'}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <ResultView />
                        )}
                    </View>
                </View>
            </>
        }

        </SafeAreaView>
    );
};

