import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import PlayerScoreCard from './PlayerScoreCard';
import usePlayers from '../Hooks/usePlayers';
import { MyContext } from '../ContextProvider';

export const ScoreCard = () => {
    const { matchId } = useContext(MyContext)
    console.log(matchId, "From Scorecard");
    const { players, loading } = usePlayers(matchId);

    const [showTeamAPlayers, setShowTeamAPlayers] = useState(true);
    const [showTeamBPlayers, setShowTeamBPlayers] = useState(false);

    const teamA = players.filter((player) => player.TeamSide === "Team A")[0]?.TeamName || "";
    const teamB = players.filter((player) => player.TeamSide === "Team B")[0]?.TeamName || "";

    const teamAPlayers = players.filter((player) => player.TeamSide === "Team A");
    const teamBPlayers = players.filter((player) => player.TeamSide === "Team B");

    const toggleTeamAPlayers = () => {
        setShowTeamAPlayers(true);
        setShowTeamBPlayers(false);
    };

    const toggleTeamBPlayers = () => {
        setShowTeamBPlayers(true);
        setShowTeamAPlayers(false);
    };
    if (loading) {
        return <Text>Loading...</Text>;
    }
    return (
        <ScrollView>
            <View className="w-full justify-between">
                <View className='w-full p-4 flex-row mt-4 mb-2 flex justify-between euclidMedium text-sm '>
                    <TouchableOpacity onPress={toggleTeamAPlayers} className={showTeamAPlayers ? "bg-blue-100 text-blue-800 font-bold px-2 py-2 rounded-md" : "bg-white rounded-md px-2 py-2 cursor-pointer"}>
                        <Text className="font-bold">{teamA}</Text>
                        <Text className="font-bold"> {teamAPlayers[0]?.TeamRuns})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleTeamBPlayers} className={showTeamBPlayers ? "bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-md" : "bg-white rounded-md px-4 py-2 cursor-pointer"}>
                        <Text className="font-bold">{teamB} </Text>
                        <Text className="font-bold">{teamBPlayers[0]?.TeamRuns})</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {showTeamAPlayers && (
                        <View style={styles.table}>
                            <View style={styles.headerRow}>
                                <Text className="text-black font-bold" style={styles.cell}>Batter</Text>
                                <Text className="text-black  font-bold" style={[styles.subcell, styles.textRight]}>R</Text>
                                <Text className="text-black  font-bold" style={[styles.subcell, styles.textRight]}>B</Text>
                                <Text className="text-black  font-bold" style={[styles.subcell, styles.textRight]}>4s</Text>
                                <Text className="text-black font-bold" style={[styles.subcell, styles.textRight]}>6s</Text>
                            </View>
                            <View style={styles.body}>
                                {teamAPlayers.map((player) => (
                                    <PlayerScoreCard key={player.seqno} player={player} />
                                ))}
                            </View>
                        </View>
                    )}
                    {showTeamBPlayers && (
                        <View style={styles.table}>
                            <View style={styles.headerRow}>
                                <Text style={styles.cell}>Batter</Text>
                                <Text style={[styles.subcell, styles.textRight]}>R</Text>
                                <Text style={[styles.subcell, styles.textRight]}>B</Text>
                                <Text style={[styles.subcell, styles.textRight]}>4s</Text>
                                <Text style={[styles.subcell, styles.textRight]}>6s</Text>
                            </View>


                            <View style={styles.body}>
                                {teamBPlayers.map((player) => (
                                    <PlayerScoreCard key={player.seqno} player={player} />
                                ))}
                            </View>

                        </View>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    table: {
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 10,
        margin: 10

    },
    headerRow: {
        flexDirection: 'row',
        padding: 4,
        flex: 1
    },
    body: {
        marginTop: 5,
        paddingBottom: 100
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 8,
    },
    cell: {
        flex: 3,
        paddingHorizontal: 8,
    },
    subcell: {
        flex: 1,
        paddingHorizontal: 4,
    },
    textRight: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
});


