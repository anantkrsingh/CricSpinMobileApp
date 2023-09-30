import React, { useEffect, useState } from 'react'
import { View, ImageBackground, ScrollView, Text } from 'react-native';
import { UpcomingMatch } from '../components/UpcomingMatch';
import { ActivityIndicator } from 'react-native-paper';


export const UpcomingMatches = ({ navigation }) => {

    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const upcomingResponse = await fetch("https://api.cricspin.live/UpcomingMatches");
            const upcomingData = await upcomingResponse.json();
            setUpcomingMatches(upcomingData.AllMatch);

            const groupByDate = (matches) => {
                const groupedMatches = {};
                matches.forEach((match, index) => {
                    const date = match.Matchtime.split(" ")[0];
                    if (!groupedMatches[date]) {
                        groupedMatches[date] = [];
                    }
                    match.position = index
                    console.log(index);
                    groupedMatches[date].push(match);
                });
                return groupedMatches;
            };

            const groupedMatches = groupByDate(upcomingData.AllMatch);
            setFilteredMatches(groupedMatches);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    return (

        <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
            {!loading ?
                <ScrollView className='w-full font-[Roboto]  '
                >
                    <Text className='p-4 mt-10 text-white'>
                        Results
                    </Text>
                    <View className=''>
                        {!loading &&
                            Object.values(filteredMatches).map((date, index) => {
                                return (
                                    <View key={index} className="items-center">
                                        <Text className='text-white w-full text-left pl-4 mt-2'>{date[0].Matchtime.split("at")[0]}</Text>
                                        {

                                            date.map((match, index) => (

                                                <UpcomingMatch navigation={navigation} item={match} position={match.position} key={match.id} />
                                            ))}
                                    </View>
                                );
                            })}
                    </View>

                </ScrollView> : <ActivityIndicator color='white' />}
        </ImageBackground>



    )
}
