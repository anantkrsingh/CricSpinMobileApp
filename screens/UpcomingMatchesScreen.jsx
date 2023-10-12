import React from 'react'
import { View, ScrollView, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopBar } from '../components/TopBar'
import { LiveMatch } from '../components/LiveMatch'
import { UpcomingMatch } from '../components/UpcomingMatch'
import { StatusBar } from 'expo-status-bar'

export const UpcomingMatchesScreen = ({ navigation, route }) => {
    return (
        <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
            <StatusBar style='light'/>
            <SafeAreaView>
                <TopBar navigation={navigation} title="Upcoming Matches" />
            </SafeAreaView>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {
                        route.params.match.map((item, index) => {
                            return (
                                <UpcomingMatch navigation={navigation} item={item} position={index} />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    )
}
