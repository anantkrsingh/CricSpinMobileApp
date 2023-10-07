import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet'

import { Players } from './Players'
import HomeTopTabs from './PlayerXITabs';
import usePlayers from '../Hooks/usePlayers';
import PlayerXITabs from './PlayerXITabs';
import { NavigationContainer } from '@react-navigation/native';

export const PlayerXI = ({ matchId }) => {
    const bottomSheetRef = useRef(null);
    const { players } = usePlayers(matchId);
    return (
        <View>
            <TouchableOpacity onPress={() => bottomSheetRef.
                current
                ?.present()} className='bg-white  mt-2 mb-24 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer' >
                <View className='flex euclidMedium justify-between items-center transition-all duration-150 ease-in-out flex-row '>
                    <Text>Player XI</Text>
                    <Ionicons name='caret-forward-outline' />
                </View>
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={["80%"]}
                    keyboardBlurBehavior='restore'
                    android_keyboardInputMode='adjustResize'
                >
                    <View className="p-4 flex-1">
                        <NavigationContainer independent>
                            <PlayerXITabs teamA={players.filter((player) => player.TeamSide === "Team A")[0]?.TeamName || "Team A"} teamB={players.filter((player) => player.TeamSide === "Team B")[0]?.TeamName || "Team B"} />
                        </NavigationContainer>
                    </View>
                </BottomSheetModal >
            </TouchableOpacity>
        </View>
    )
}
