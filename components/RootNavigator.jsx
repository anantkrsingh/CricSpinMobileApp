import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard } from '../screens/Dashboard';
import { MyAppBar } from './AppBar';
import { Result } from '../screens/Result';
import { FinishedResult } from '../screens/FinishedResult';
import { UpcomingResults } from '../screens/UpcomingResult';
import { ResultHome } from '../screens/ResultHome';
import { LiveMatches } from '../screens/LiveMatches';
import { UpcomingMatchesScreen } from '../screens/UpcomingMatchesScreen';
import { Series } from '../screens/Series';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Dashboard"
                screenOptions={({ route }) => ({
                    header: (props) =>
                        route.name === "Dashboard" ? (
                            <MyAppBar {...props} />
                        ) : null,
                })}
            >
                <Stack.Screen name="Result" component={ResultHome} />
                <Stack.Screen name="FinishedResult" component={FinishedResult} />
                <Stack.Screen name="UpcomingResult" component={UpcomingResults} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="LiveMatches" component={LiveMatches} />
                <Stack.Screen name="UpcomingMatches" component={UpcomingMatchesScreen} />
                <Stack.Screen name="SeriesDetails" component={Series} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
