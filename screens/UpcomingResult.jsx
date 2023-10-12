import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { IMAGEURL } from '../components/CONST';
import { ActivityIndicator } from 'react-native-paper';
import { TopBar } from '../components/TopBar';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Linking } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native'
import { Text } from 'react-native-paper';
import { MyContext } from '../ContextProvider';


export const UpcomingResults = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [myMatch, setMyMatch] = useState(null);
    const { bannerData } = useContext( MyContext)

    const width = Dimensions.get("screen").width

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

    const screenWidth = Dimensions.get('window').width



    return (
        <>

            <StatusBar style='light' />
            <SafeAreaView className="bg-gray-200 flex-1" >{
                loading ? <ActivityIndicator /> : <>
                    <View className="bg-[#2a076f] items-center p- 2 pt-14 pb-6 pl-4 flex flex-row color-white" style={{ width: screenWidth, alignContent: "center", alignSelf: "center" }}>
                        <Ionicons onPress={() => { navigation.goBack() }} className="p-4" color={"white"} size={25} name="chevron-back-outline"></Ionicons>
                        <Text className="ml-4 text-white font-semibold">{`${myMatch?.TeamA} VS ${myMatch?.TeamB}`}</Text>
                    </View>
                    <ScrollView>
                    <View className="flex relative z-0 overflow-y-scroll p-4 bg-gray-200  flex-col m-0 
                    justify-center items-center transition-all duration-300 ease-in-out ">

                        <View className='flex flex-row justify-between items-center  mt-2 overflow-hidden text-black p-2 w-full'>
                            <View className='flex flex-row items-center'>
                                <Text>{myMatch?.TeamA}</Text>
                                <Image className='rounded-full ml-3 mr-1 border-4  h-10 w-10 ' source={{ uri: `${IMAGEURL}${myMatch?.TeamAImage}` }} />
                            </View>
                            <View className='relative justify-center m-2 items-center flex'>

                                <View className=' rounded-lg rotate-[45deg] bg-blue-500 z-1 absolute h-10 w-10
                    justify-center items-center '>

                                </View>
                                <Text className=' absolute  text-white text-lg font-bold'>VS</Text>
                            </View>
                            <View className='flex flex-row items-center'>
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
                        <TouchableOpacity onPress={() => Linking.openURL(bannerData[1].url)} className={ 'rounded-xl overflow-hidden'}>
                            {

                                < Image resizeMode='stretch' style={{ width: width - 40, height: 270 }} source={{ uri: bannerData[1].image }} />
                            }
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                    
                </>
            }
            </SafeAreaView>
        </>
    );
};

