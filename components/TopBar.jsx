import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const TopBar = (props) => {
    const screenWidth = Dimensions.get('window').width
    return (
        <View className="bg-blue-600 items-center p-4 flex flex-row rounded-xl color-white" style={{ width: screenWidth - 20, alignContent: "center", alignSelf: "center" }}>
            <Ionicons onPress={() => { props.navigation.goBack() }} className="p-4" color={"white"} size={20} name="chevron-back-outline"></Ionicons>
            <Text className="ml-4 text-white">{props.title}</Text>
        </View>
    )
}
