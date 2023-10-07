import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper';

import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { MatchOdd } from './MatchOdd';
import { MyContext } from '../ContextProvider';


export const MatchOdds = () => {
    const { matchId } = useContext(MyContext)
    const [match, setMatch] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(matchId, "From Odds");
        fetchData();

        // const interval = setInterval(() => {
        //     fetchData();
        // }, 1000);

        // return () => clearInterval(interval);
    }, [matchId]);
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.cricspin.live/MatchOdds?MatchId=${matchId}`);
            const data = await response.json();
            setMatch(data.Matchst);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const teamAPlayers = match.filter((match) => match.isfirstinning === "1");
    const teamBPlayers = match.filter((match) => match.isfirstinning === "2");

    const [showTeamAPlayers, setShowTeamAPlayers] = useState(true);
    const [showTeamBPlayers, setShowTeamBPlayers] = useState(false);

    const toggleTeamAPlayers = () => {
        setShowTeamAPlayers(true);
        setShowTeamBPlayers(false);
    };

    const toggleTeamBPlayers = () => {
        setShowTeamBPlayers(true);
        setShowTeamAPlayers(false);
    };


    return (
        !loading ?
            <View className='flex flex-col'>
                <View className='fixed w-full  bottom-0 max-w-[320px] md:max-w-full md:left-0 self-center'>
                    {/* <BottomBanner /> */}
                </View>
                <View className='flex w-full justify-between p-2 flex-row'>
                    <TouchableOpacity onPress={toggleTeamAPlayers} className={showTeamAPlayers ? "bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-md" : "bg-white rounded-md px-4 py-2 cursor-pointer"}>
                        <Text className="text-lg font-bold">1ST INNINGS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleTeamBPlayers} className={showTeamBPlayers ? "bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-md" : "bg-white rounded-md px-4 py-2 cursor-pointer"}>
                        <Text className="text-lg font-bold ">2ND INNINGS</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {showTeamAPlayers && (
                        teamAPlayers.map((item, index) => {
                            return (
                                <MatchOdd index={index} key={index} item={item} />
                            )
                        })
                    )}
                    {showTeamBPlayers && (

                        teamBPlayers.map((item, index) => {
                            return (<MatchOdd index={index} key={index} item={item} />)

                        })
                    )}
                </ScrollView>
            </View>
            : <ActivityIndicator style={{ padding: 10 }} />
    )
}
