import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import { HomeScreen } from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { MyAppBar } from './AppBar';
import { Results } from '../screens/Results';
import { UpcomingMatches } from '../screens/UpcomingMatches';
import { About } from '../screens/About';


const Tab = createBottomTabNavigator();

export const MyBottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarStyle: { backgroundColor: "#3B82F6", borderWidth: 0 },
                tabBarInactiveTintColor: "white",
                tabBarActiveTintColor: "white",
                
            }}

            backBehavior='initialRoute'
        >
            <Tab.Screen
                name="Home"

                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',

                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Results"

                component={Results}
                options={{
                    tabBarLabel: 'Results',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="stats-chart-outline" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Upcoming"

                component={UpcomingMatches}
                options={{
                    tabBarLabel: 'Upcoming',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="calendar-outline" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Settings"

                component={About}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="cog" size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    )
}
