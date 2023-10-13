import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Info from './Info'
import { Live } from './Live'
import { ScoreCard } from './Scorecard'
import { MatchOdds } from './MatchOdds'
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';





const Tab = createMaterialTopTabNavigator()

function MyTabBar({ state, descriptors, navigation, position }) {
    const inputRange = state.routes.map((_, i) => i);
    const width = Dimensions.get("screen").width
    const translateX = position.interpolate({
        inputRange,
        outputRange: inputRange.map(i => i * width / 4),
    });
    return (
        <View
            key={translateX}

        >
            <View style={{ flexDirection: 'row', backgroundColor: "#6D2BEF" }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ alignItems: "center", width: width / 4 }}
                        >
                            <Animated.Text style={{ color: isFocused ? "white" : "lightgrey", textAlign: "center", padding: 10, borderRadius: 10, borderWidth: 0, overflow: "hidden", fontWeight: "semibold", }}>
                                {label}
                            </Animated.Text>

                        </TouchableOpacity>
                    );
                })}
            </View>
            <Animated.View style={{ width: width / 4, height: 1, marginBottom: 5, backgroundColor: "red", transform: [{ translateX }] }}></Animated.View>
        </View>
    );
}

export const ResultsTab = () => {
    return (
        <Tab.Navigator
            // style={{  flex: 0 }}
            optimizationsEnabled={true}
            tabBar={props => <MyTabBar {...props} />}
            screenOptions={{
                tabBarStyle: {},
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "lightgrey",
                tabBarLabelStyle: { fontWeight: "800", padding: 0, fontSize: 12, margin: 0, top: 0, alignItems: "center", },
                tabBarIndicatorStyle: { backgroundColor: "red" },
                lazy: true,
            }}>
            <Tab.Screen name='Info'  >
                {props => (<Info />)}
            </Tab.Screen>
            <Tab.Screen name='Live'  >
                {props => <Live />}
            </Tab.Screen>
            <Tab.Screen name='Scorecard' >
                {props => (<ScoreCard />)}
            </Tab.Screen>
            <Tab.Screen name='Odds'  >
                {props => (<MatchOdds />)}
            </Tab.Screen>
        </Tab.Navigator>
    )
}
