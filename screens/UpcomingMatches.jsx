import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';
import { UpcomingMatch } from '../components/UpcomingMatch';
import { ActivityIndicator } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const UpcomingMatches = ({ navigation }) => {
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [mainList, setMainList] = useState([])
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const upcomingResponse = await fetch("https://api.cricspin.live/UpcomingMatches");
            const upcomingData = await upcomingResponse.json();
            setUpcomingMatches(upcomingData.AllMatch);

            const groupByDate = (matches) => {
                const groupedMatches = {};
                matches.forEach((match, index) => {
                    const date = match.Matchtime.split(" ")[0];
                    if (!groupedMatches[date]) {
                        groupedMatches[date] = [];
                    }
                    match.position = index;
                    groupedMatches[date].push({ ...match, Matchtime: match.Matchtime });
                });
                return groupedMatches;
            };

            const groupedMatches = groupByDate(upcomingData.AllMatch);
            setFilteredMatches(groupedMatches);

            const uniqueDates = Object.keys(groupedMatches);
            const dropdownItems = uniqueDates.map((date) => ({
                label: date,
                value: date,
            }));
            setItems(dropdownItems);
            setMainList(groupedMatches)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleDropdownChange = (itemValue) => {
        const filtered = mainList[itemValue.label] || [];
        setFilteredMatches({ [itemValue.label]: filtered });
        setValue(itemValue.label);
    };

    return (
        <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
            {!loading ? (
                <ScrollView className='w-full font-[Roboto]  '>
                    <Text className='p-4 mt-2 text-white'>
                        Upcoming Matches
                    </Text>
                    <StatusBar style='dark' backgroundColor='white' />

                    <View style={styles.container}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={items}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Filter Matches' : '...'}
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                handleDropdownChange(item)
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <View className=''>
                        {!loading &&
                            Object.values(filteredMatches).map((date, index) => {
                                return (
                                    <View key={index} className="items-center">
                                        <Text className='text-white w-full text-left pl-4 mt-4'>
                                            {date[0].Matchtime.split("at")[0]}
                                        </Text>
                                        {date.map((match, index) => (
                                            <UpcomingMatch
                                                navigation={navigation}
                                                item={match}
                                                position={match.position}
                                                key={match.id}
                                            />
                                        ))}
                                    </View>
                                );
                            })}
                    </View>
                </ScrollView>
            ) : (
                <ActivityIndicator color='white' />
            )}
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "white"
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})
