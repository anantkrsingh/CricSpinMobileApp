import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { IMAGEURL } from '../components/CONST';
import { ActivityIndicator } from 'react-native-paper';
import { TopBar } from '../components/TopBar';
import { Ionicons, Octicons } from '@expo/vector-icons';



export const UpcomingResults = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [myMatch, setMyMatch] = useState(null);

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 2000);


        return () => {

            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);
    const fetchData = async () => {
        try {
            const upcomingResponse = await fetch("https://api.cricspin.live/UpcomingMatches");
            const upcomingData = await upcomingResponse.json()
            setMyMatch(upcomingData.AllMatch[route.params.position]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }

    };




    return (


        <SafeAreaView className="bg-gray-200 flex-1" >{
            loading ? <ActivityIndicator /> : <>
                <TopBar navigation={navigation} title={`${myMatch?.TeamA} VS ${myMatch?.TeamB}`} />
                <View className="flex relative z-0 overflow-y-scroll p-4 bg-gray-200  flex-col w-[375px] m-0 md:left-0  md:w-[100vw] transition-all duration-300 ease-in-out ">

                    <View className='flex flex-row justify-between items-center  mt-2 overflow-hidden text-black p-2'>
                        <View className='flex items-center'>
                            <Text>{myMatch?.TeamA}</Text>
                            <Image className='rounded-full mr-1 border-4  h-10 w-10 ' source={{ uri: `${IMAGEURL}${myMatch?.TeamAImage}` }} />
                        </View>
                        <View className='relative justify-center m-2 items-center flex'>

                            <View className=' rounded-lg rotate-[45deg] bg-blue-500 z-1 absolute h-10 w-10
                    justify-center items-center '>

                            </View>
                            <Text className=' absolute  text-white text-lg font-bold'>VS</Text>
                        </View>
                        <View className='flex items-center'>
                            <Image className='rounded-full mr-1 border-4  h-10 w-10 ' source={{ uri: `${IMAGEURL}${myMatch?.TeamBImage}` }} />
                            <Text>{myMatch?.TeamB}</Text>
                        </View>

                    </View>
                    <View className='rounded-2xl mb-8 bg-white flex flex-col m-2 mt-4  overflow-hidden'>
                        <Text className='bg-blue-500 p-2 text-white euclidMedium text-lg'>Match Info </Text>

                        <Text className=' p-2 '>{myMatch?.Result}</Text>
                        <View className='flex items-center p-4 flex-row '>
                            <Ionicons name='tennisball-sharp' size={18} />
                            <Text className='ml-2 '>{myMatch?.Title}</Text>
                        </View>
                        <View className='flex flex-row items-center p-4'>
                            <Ionicons name='calendar' size={18} />
                            <Text className='ml-2 '>{myMatch?.Matchtime}</Text>
                        </View>

                        <View className='flex flex-row items-center px-4'>
                            {myMatch?.Venue && <>
                                <Ionicons name='location-sharp' size={18} />
                                <Text className='ml-2 '>{myMatch?.Venue}</Text>
                            </>}

                        </View>

                        <View className='w-full h-[2px] bg-black mt-4'></View>

                        <Text className='text-center mb-1 euclidMedium mt-4'>Match Hasn't Started Yet</Text>
                        <Text className='text-center px-2 text-sm  euclid mb-4'>We'll be live once the toss begins... Stay Tuned!</Text>
                    </View>
                </View>
            </>
        }
        </SafeAreaView>

    );
};

