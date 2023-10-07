import React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export const PlayerItem = ({ item, index }) => {
    const PLAYERURL = "http://cricnet.co.in/ManagePlaying/PlayerImage/"
    return (
        <View key={index} >
            <Image style={{ width: 80, height: 80 }} source={{ uri: `${PLAYERURL}${item.PlayerImage}` }} />
            <Text>{item.PlayerName}</Text>
        </View>
    )
}
