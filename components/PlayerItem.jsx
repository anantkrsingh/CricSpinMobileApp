import React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export const PlayerItem = ({ item, index }) => {
    const PLAYERURL = "http://cricnet.co.in/ManagePlaying/PlayerImage/"
    function formatName(fullName) {
        const nameArray = fullName.split(' ');
        if (nameArray.length >= 2) {
            const firstNameInitial = nameArray[0].charAt(0);
            const formattedName = firstNameInitial + ' ' + nameArray[nameArray.length - 1];
            return formattedName;
        } else {
            return fullName;
        }
    }
    return (
        <View key={index} style={{ flexDirection: "row", flex: 1 / 2, margin: 10, backgroundColor: "#FAFAFA", borderRadius: 10, overflow: "hidden", alignItems: "center" }} >
            <Image style={{ width: 50, height: 50, borderRadius: 10, overflow: "hidden" }} source={{ uri: `${PLAYERURL}${item.PlayerImage}` }} />
            <Text style={{ textAlign: "center", fontWeight: 600, flex: 1 }}>{formatName(item.PlayerName)}
            </Text>
        </View>
    )
}
