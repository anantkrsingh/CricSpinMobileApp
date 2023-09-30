import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons';

import { Players } from './Players'

export const PlayerXI = ({ matchId }) => {
    const [shown, setShown] = useState(false)
    return (
        <View>
            <TouchableOpacity onPress={() => setShown(!shown)} className='bg-white  mt-2 mb-24 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer' >
                <View  className='flex euclidMedium justify-between items-center transition-all duration-150 ease-in-out flex-row '>
                    <Text>Player XI</Text>
                    <Ionicons name='caret-forward-outline' />
                </View>
                <View className={shown ? '' : "hidden"}>
                    {
                        <Players matchID={matchId} />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}
