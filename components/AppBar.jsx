import React from 'react'
import { Image, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';


export const MyAppBar = ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header className="bg-[#28076f] border-b-[1px] border-white  justify-center flex flex-col p-0 items-center">
            <View className="flex flex-row w-full justify-center items-center">
                <Appbar.Content title="CricSpin" color='white' titleStyle={{ alignSelf: 'center',fontSize:17 }} />
                <Image className="w-12 h-12" resizeMode='stretch' source={require('../assets/logo.png')}></Image>
                <Appbar.Content title="LiveLine" color='white' titleStyle={{ alignSelf: 'center',fontSize:17 }} />
            </View>
        </Appbar.Header>
    )
}
