import React, { useState } from 'react';
import { View, Text } from 'react-native';

import usePlayers from '../Hooks/usePlayers';

export const Players = ({ matchID }) => {
    const { players, loading } = usePlayers(matchID);

    const [showTeamAPlayers, setShowTeamAPlayers] = useState(true);
    const [showTeamBPlayers, setShowTeamBPlayers] = useState(true);

    const teamA = players.filter((player) => player.TeamSide === "Team A")[0]?.TeamName || "";
    const teamB = players.filter((player) => player.TeamSide === "Team B")[0]?.TeamName || "";

    const teamAPlayers = players.filter((player) => player.TeamSide === "Team A");
    const teamBPlayers = players.filter((player) => player.TeamSide === "Team B");

    if (loading) {
        return <Text>Loading...</Text>;
    }
    return (
        <View className="w-full flex flex-col justify-between">
            <View className='w-full  mt-4 mb-2 flex flex-row justify-between euclidMedium text-sm '>
                <View className={showTeamAPlayers ? "" : "bg-white rounded-md px-2 py-2 cursor-pointer"}>
                    <Text className="font-bold bg-blue-100 text-blue-800 px-2 py-2 rounded-md">{teamA}</Text>
                    {
                        teamAPlayers.map((player) => {
                            return (
                                <Text className='mt-2'>{player.PlayerName}</Text>
                            )
                        })
                    }
                </View>
                <View className={showTeamBPlayers ? "" : "bg-white rounded-md px-4 py-2 cursor-pointer"}>
                    <Text className=" bg-blue-100 text-blue-800 font-bold px-2 py-2 rounded-md">{teamB}</Text>
                    <View className='flex flex-col items-end'>
                        {
                            teamBPlayers.map((player) => {
                                return (
                                    <Text className='mt-2'>{player.PlayerName}</Text>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            <View>

            </View>
        </View>
    );
};


