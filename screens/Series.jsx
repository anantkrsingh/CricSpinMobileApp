import React, { useEffect, useState } from 'react';
import { PointsTable } from '../components/PointsTable';
import { View, Text } from 'react-native'
import { FinishedMatch } from '../components/FinishedMatch'
import { Pressable } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native'
import { BottomBanner } from '../components/BottomBanner';


export const Series = ({ navigation, route }) => {
    const id = route.params.id;
    const name = route.params.name;
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState("FIXTURE");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.cricspin.live/SeriesMatches?seriesId=${id}`);
            const data = await response.json();
            setMatches(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const MyView = ({ match }) => {
        return <FinishedMatch item={match} navigation={navigation} />;
    };
    const screenWidth = Dimensions.get('window').width

    return (
        <>
                        <StatusBar style='dark' backgroundColor='white' />

            <View className='flex h-screen bg-gray-200  flex-col m-0 transition-all duration-300 ease-in-out '>
                <View style={{}}>
                    <View className="bg-[#2a076f] items-center p- 2 pt-14 pb-6 pl-4 flex flex-row color-white" style={{ width: screenWidth, alignContent: "center", alignSelf: "center" }}>
                        <Ionicons onPress={() => { navigation.goBack() }} className="p-4" color={"white"} size={25} name="chevron-back-outline"></Ionicons>
                        <Text className="ml-4 text-white font-semibold">{name} </Text>
                    </View>
                </View>
                <View className=" justify-center items-center mt-8 ">
                    <View className='w-full flex-row px-4 mt-4 flex justify-between euclidMedium '>
                        <Pressable
                            onPress={() => setSelected("FIXTURE")}
                            className={
                                selected === "FIXTURE"
                                    ? 'bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-md'
                                    : 'bg-white rounded-md px-4 py-2 cursor-pointer'
                            }
                        >
                            <Text>

                                FIXTURE
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setSelected("POINTS TABLE")}
                            className={
                                selected === "POINTS TABLE"
                                    ? 'bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-md'
                                    : 'bg-white font-bold rounded-md px-4 py-2 cursor-pointer'
                            }
                        >
                            <Text>

                                POINTS TABLE
                            </Text>
                        </Pressable>
                    </View>
                    <View className='mt-4 pb-48  bottom-0  text-white '>
                        {loading ?
                            (<Text>Loading...</Text>

                            ) : selected === 'FIXTURE' ? (<ScrollView >
                                {matches.map((item) => {
                                    return <MyView match={item} />;
                                })}
                            </ScrollView>) : (

                                <PointsTable seriesId={id} />
                            )}
                    </View>

                </View>
            </View>
            
        </>
    );
};
