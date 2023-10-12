import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

export const PointsTable = ({ seriesId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.cricspin.live/Pointstable?seriesId=${seriesId}`);
      const data = await response.json();
      setData(data.pointsst);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.topHeaderCell}>Teams</Text>
        <Text style={styles.headerCell}>P</Text>
        <Text style={styles.headerCell}>W</Text>
        <Text style={styles.headerCell}>L</Text>
        <Text style={{
                flex:1,
                padding: 10,
                textAlign: 'center',
                fontWeight:"bold"
              }}>NR</Text>
        <Text style={{
          flex: 1,
          padding: 10,
          textAlign: 'center',
          fontWeight:"bold"
        }}>PTS</Text>
        <Text style={{
          flex: 1.5,
          padding: 10,
          textAlign: 'center',
          fontWeight: "bold"
        }}>NRR</Text>
      </View>
      <View style={styles.body}>
        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          data.map((player, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.headCell}>{player.TeamName}</Text>
              <Text style={styles.cell}>{player.Matches}</Text>
              <Text style={styles.cell}>{player.Won}</Text>
              <Text style={styles.cell}>{player.Lost}</Text>
              <Text style={{
                flex:1,
                padding: 10,
                textAlign: 'center',
              }}>{player.NR}</Text>
              <Text style={{
                flex: 1,
                padding: 10,
                textAlign: 'center',
              }}>{player.Pts}</Text>
              <Text style={{
                flex: 1.5,
                padding: 10,
                textAlign: 'center',
              }}>{player.NRR}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: width
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    flex: .5,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topHeaderCell: {
    flex: 3,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  body: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: .5,
    padding: 10,
    textAlign: 'center',
  },
  headCell: {
    flex: 3,
    padding: 10,
    textAlign: 'left',
  },
});
