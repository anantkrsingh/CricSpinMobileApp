import React from 'react'
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const PlayerScoreCard = ({ player }) => {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text className="text-black font-bold">{player.PlayerName}</Text>
        <Text className="text-blue-800 font-bold" >{player.outby}</Text>
      </View>
      <Text className="text-blue-800 font-bold" style={[styles.subcell, styles.textRight]}>{player.Runs}</Text>
      <Text style={[styles.subcell, styles.textRight]}>{player.Balls}</Text>
      <Text style={[styles.subcell, styles.textRight]}>{player.four}</Text>
      <Text style={[styles.subcell, styles.textRight]}>{player.six}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 4
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
  outBy: {
    color: 'blue',
    fontSize: 14,
  },
});

export default PlayerScoreCard
