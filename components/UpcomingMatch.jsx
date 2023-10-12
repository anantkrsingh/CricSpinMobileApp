import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { IMAGEURL } from './CONST';
import { TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

export const UpcomingMatch = ({ item, position, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate("UpcomingResult", { position: position }) }}
            style={{ width: width - 20 }} className='flex-1 bg-white mt-4 p-2 ps-4 rounded-xl justify-between flex flex-col'>
            <Text className='text-black text-[16px] euclid'>
                {item.Title}
            </Text>
            <View className=' w-full justify-between flex-row flex-1'>
                <View className='flex flex-col flex-1'>
                    <View className='flex flex-row items-center mt-2'>
                        <Image source={{ uri: (IMAGEURL + item.TeamAImage) }} className='rounded-full border-2  w-[48px] h-[48px]' alt="" />
                        <Text style={{ marginStart: 4 }} className=' euclid font-semibold ms-4 text-[18px]'>{item.TeamA}</Text>
                    </View>
                    <View className='flex flex-row items-center mt-4'>
                        <Image source={{ uri: (IMAGEURL + item.TeamBImage) }} className='rounded-full border-2  w-[48px] h-[48px]' alt="" />
                        <Text style={{ marginStart: 4 }} className='euclid font-semibold  text-[18px]'>{item.TeamB}</Text>
                    </View>
                </View>
                <View className='flex justify-between flex-row items-center'>
                    <View className='w-[1px] h-full bg-gray-400   m-2'>

                    </View>
                    <Text className='ms-4 mr-4 font-[Rajdhani] font-semibold text-[#a50000]'>
                        Upcoming
                    </Text>
                </View>
            </View>
            <Text className='text-[#9d6003] euclidMedium text-[16px] mt-2'>
                {item.Matchtime}
            </Text>
        </TouchableOpacity>
    )
}
