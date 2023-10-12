import React, { useContext } from 'react'
import { View } from 'react-native'
import { MyContext } from '../ContextProvider'
import { ActivityIndicator } from 'react-native';
import { PlayerItem } from './PlayerItem';
import { FlatList } from 'react-native';
import usePlayers from '../Hooks/usePlayers';


export const TeamB = () => {
  const { matchId } = useContext(MyContext)
  const { players, loading } = usePlayers(matchId);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
        {loading ? <ActivityIndicator /> : <FlatList
          renderItem={PlayerItem}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
          data={players.filter((player) => player.TeamSide === "Team B")}
        />}


    </View>
  )
}
