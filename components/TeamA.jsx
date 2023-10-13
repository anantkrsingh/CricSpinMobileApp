import React, { useContext } from 'react'
import usePlayers from '../Hooks/usePlayers';
import { MyContext } from '../ContextProvider';
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { PlayerItem } from './PlayerItem';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { Text } from 'react-native-paper';

export const TeamA = () => {
    const { matchId } = useContext(MyContext)

    const { players, loading } = usePlayers(matchId);
    let data = players.filter((player) => player.TeamSide === "Team A")
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {loading ? <ActivityIndicator /> : ( data.length > 0 ?  <FlatList
                renderItem={PlayerItem}
                keyExtractor={(item, index) => item.id }
                numColumns={2}  
                data={data}
            /> : <Text>Not Anounced</Text>)
            
            }

        </View>
    )
}
