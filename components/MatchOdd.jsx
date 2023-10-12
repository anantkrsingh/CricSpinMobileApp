import React from 'react'
import { Text, View } from 'react-native'

export const MatchOdd = ({ item, index }) => {
    const dateTime = new Date(item.subdate);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return (
        <View key={index} className='text-sm w-full items-center bg-white flex rounded-sm m-2 p-2'>
            <View className='flex w-full justify-between flex-row'>
                <View className='flex items-center justify-center flex-row '>
                    <Text className='bg-gray-200 px-2 py-2 rounded-md font-bold text-gray-900'>{item.Score}</Text>
                    <View className='flex ml-4 items-center flex-col'>
                        <Text>{item.overs}</Text>
                        <View className='bg-gray-800 w-4 h-[1px]'></View>
                        <Text>{formattedTime}</Text>
                    </View>

                    <View className='h-8 w-[1px] bg-gray-500 ml-2'>

                    </View>
                    <View className='flex ml-2 items-center flex-col'>
                        <Text>{item.SessionA}</Text>
                        <View className='bg-gray-800 w-4 h-[1px]'></View>
                        <Text>{item.SessionB}</Text>
                    </View>
                    <Text className='ml-2'>{item.favourite}</Text>
                </View>
                <View className='flex flex-row mr-4'>
                    <View className='px-2 text-center h-8 font-bold py-1 mx-2 bg-red-100 text-red-800 rounded-lg items-center justify-center'>

                        <Text className=' text-center font-bold   text-red-800 ' style={{ textAlign: "center" }}>{item.MrateA}</Text>
                    </View>
                    <View className='px-2 text-center h-8 font-bold py-1 mx-2 bg-green-100  rounded-lg items-center justify-center'>

                        <Text className=' text-center font-bold   text-green-800 ' style={{ textAlign: "center" }}>{item.MrateB}</Text>

                    </View>

                </View>
            </View>


        </View>
    )
}
