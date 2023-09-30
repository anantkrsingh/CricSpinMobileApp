import React from 'react'
import { Image, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';


export const MyAppBar = ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header className="bg-blue-700 border-b-[1px] border-white  justify-center flex flex-col p-0 items-center">
            <View className="flex  flex-row w-full justify-center items-center">
                <Appbar.Content title="CricSpin" color='white' titleStyle={{ alignSelf: 'center' }} />
                <Image className="w-10 h-10" resizeMode='stretch' source={require('../assets/logo.png')}></Image>
                <Appbar.Content title="LiveLine" color='white' titleStyle={{ alignSelf: 'center' }} />
            </View>
        </Appbar.Header>
    )
}
