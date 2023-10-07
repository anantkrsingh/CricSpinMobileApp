import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView,ImageBackground } from 'react-native'
import { FinishedMatch } from '../components/FinishedMatch';
import { ActivityIndicator } from 'react-native-paper';


export const Results = ({navigation}) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {
            const upcomingResponse = await fetch("https://api.cricspin.live/MatchResults");
            const upcomingData = await upcomingResponse.json();
            setMatches(upcomingData.AllMatch);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    return (
        <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
            <ScrollView className='w-full font-[Roboto] ov  relative '
            >
                <Text className='p-4 mt-10 text-white'>
                    Results
                </Text>
                <View className='pb-28'>
                    {
                        loading ? <ActivityIndicator color='white'/> : matches.map((item) => (
                            <View  style={{ alignItems: "center" }}>
                                <FinishedMatch item={item} key={item.id} navigation={navigation} />
                            </View>
                        ))
                    }
                </View>
                <View className='h-6'></View>

            </ScrollView>
        </ImageBackground>
    )

}
