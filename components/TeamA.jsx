import React, { useContext } from 'react'
import usePlayers from '../Hooks/usePlayers';
import { MyContext } from '../ContextProvider';
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { PlayerItem } from './PlayerItem';
import { ActivityIndicator } from 'react-native';

export const TeamA = () => {
    const { matchId } = useContext(MyContext)

    const { players, loading } = usePlayers(matchId);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {loading ? <ActivityIndicator /> : <FlatList
                renderItem={PlayerItem}
                keyExtractor={(item, index) => item.id }
                numColumns={2}  
                data={players.filter((player) => player.TeamSide === "Team B")}
            />}

        </View>
    )
}
