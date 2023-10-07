import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const TopBar = (props) => {
    const screenWidth = Dimensions.get('window').width
    return (
        <View className="bg-[#2a076f] items-center p-2 flex flex-row color-white" style={{ width: screenWidth, alignContent: "center", alignSelf: "center" }}>
            <Ionicons onPress={() => { props.navigation.goBack() }} className="p-4" color={"white"} size={25} name="chevron-back-outline"></Ionicons>
            <Text className="ml-4 text-white font-semibold">{props.title}</Text>
        </View>
    )
}
