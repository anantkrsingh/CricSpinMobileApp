import React, { useEffect, useState } from 'react';
import { ScoreCard } from '../components/Scorecard';
import { Live } from '../components/Live';
import { MatchOdds } from '../components/MatchOdds';
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native-paper';
import { TopBar } from '../components/TopBar';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons';
import { BottomBanner } from '../components/BottomBanner';



export const FinishedResult = ({ navigation, route }) => {
    const [currentItem, setCurrentItem] = useState("Scorecard");
    const { matchId, title } = route.params
    console.log(route.params);
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
            try {
                if (filteredMatches[0].jsondata === "") {
                    filteredMatches[0].jsondata = "{}";
                }
                setJsonData(JSON.parse(filteredMatches[0].jsondata).jsondata);
                const wicketA = jsonData?.wicketA;
                setLoading(false);
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
            case "Scorecard": return (<ScoreCard matchId={matchId} />);
            case "Live": return (<Live matchID={matchId} />);
            default: return (<MatchOdds matchId={matchId} />);
        }
    };
    const screenWidth = Dimensions.get('window').width


    return (
        <>

            <StatusBar style='dark' backgroundColor='white' />
            <View className="bg-gray-200 flex-1" >{
                loading ? <ActivityIndicator style={{ marginTop: 30 }} /> : <>
                    <View style={{}}>
                        <View className="bg-[#2a076f] items-center p- 2 pt-14 pb-6 pl-4 flex flex-row color-white" style={{ width: screenWidth, alignContent: "center", alignSelf: "center" }}>
                            <Ionicons onPress={() => { navigation.goBack() }} className="p-4" color={"white"} size={25} name="chevron-back-outline"></Ionicons>
                            <Text className="ml-4 text-white font-semibold">{title} </Text>
                        </View>
                    </View>

                    <View className="flex h-full overflow-hidden">
                        <View className="bg-gray-200 h-full  flex-col m-0  transition-all duration-300 ease-in-out ">
                            <View className='w-full bg-[#6D2BEF] self-center items-center justify-between mt-4 mb-2 px-4 flex flex-row '>
                                {resultNavs.map((item) => {
                                    const selected = currentItem === item;
                                    return (
                                        <TouchableOpacity onPress={() => { setCurrentItem(item) }} className={selected ? 'self-center p-4 cursor-pointer text-white font-bold' : 'text-gray cursor-pointer'} key={item}>
                                            <Text className={selected ? 'self-center cursor-pointer text-white font-bold' : 'text-gray-300 cursor-pointer'}>{item}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <View style={{ flex: 1, height: "100%" }}>

                                <ResultView />
                            </View>

                        </View>
                    </View>
                </>
            }
            </View>
            <BottomBanner />

        </>
    );
};

