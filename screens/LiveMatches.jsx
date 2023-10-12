import React from 'react'
import { View, ScrollView, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native'
import { TopBar } from '../components/TopBar'
import { LiveMatch } from '../components/LiveMatch'
import { LiveMatchList } from '../components/LiveMatchList'

export const LiveMatches = ({ navigation, route }) => {
  return (
    <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
      <SafeAreaView style={{ marginTop: 50 }}>

        <TopBar navigation={navigation} title="Matches For You" />
      </SafeAreaView>
      <ScrollView style={{ flexDirection: "column", }}>
        {
          route.params.match.map((match, index) => {
            return (
              <View>
                <LiveMatchList match={match} index={index} navigation={navigation} />
              </View>
            )
          })
        }

      </ScrollView>
    </ImageBackground>
  )
}
