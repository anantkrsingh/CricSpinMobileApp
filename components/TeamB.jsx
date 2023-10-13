import React, { useContext } from 'react'
import { View } from 'react-native'
import { MyContext } from '../ContextProvider'
import { ActivityIndicator } from 'react-native';
import { PlayerItem } from './PlayerItem';
import { FlatList } from 'react-native';
import usePlayers from '../Hooks/usePlayers';
import { Text } from 'react-native-paper';


export const TeamB = () => {
  const { matchId } = useContext(MyContext)
  const { players, loading } = usePlayers(matchId);
  let data = players.filter((player) => player.TeamSide === "Team B")
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
        {loading ? <ActivityIndicator /> :( data.length > 1 ? <FlatList
          renderItem={PlayerItem}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
          data={data}
        /> : <Text>Not Anounced</Text>)
        }


    </View>
  )
}
