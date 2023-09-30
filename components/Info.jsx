import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { PlayerXI } from './PlayerXI';

const Info = ({ match, matchId }) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'transparent', padding: 10, height: "100%" }}>
            <Text style={{ padding: 10 }}>{match?.Result}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Ionicons name="calendar" size={20} color="black" />
                <Text style={{ marginLeft: 10 }}>{match?.Matchtime}</Text>
            </View>
            {match?.venue && (
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Ionicons name="location-outline" size={20} color="black" />
                    <Text style={{ marginLeft: 10 }}>{match?.venue}</Text>
                </View>
            )}
            <PlayerXI matchId={matchId} />
            {/* <BottomBanner /> */}
        </ScrollView>
    );
};

export default Info;
