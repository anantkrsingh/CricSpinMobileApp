import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard } from '../screens/Dashboard';
import { MyAppBar } from './AppBar';
import { Result } from '../screens/Result';
import { FinishedResult } from '../screens/FinishedResult';
import { UpcomingResults } from '../screens/UpcomingResult';

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
                <Stack.Screen name="Result" component={Result} />
                <Stack.Screen name="FinishedResult" component={FinishedResult} />
                <Stack.Screen name="UpcomingResult" component={UpcomingResults} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
