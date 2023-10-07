import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Animated, TouchableOpacity } from 'react-native';
import { TeamB } from './TeamB';
import { TeamA } from './TeamA';
const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
    const inputRange = state.routes.map((_, i) => i);

    const translateX = position.interpolate({
        inputRange,
        outputRange: inputRange.map(i => i * 60),
    });
    return (
        <View

            style={{ padding: 5 }}

        >
            <View style={{ flexDirection: 'row' }}>
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
                            style={{ alignItems: "center" }}
                        >
                            <Animated.Text style={{ color: isFocused ? "black" : "gray", width: 60, textAlign: "center", padding: 5 }}>
                                {label}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Animated.View style={{ width: 60, height: 1, marginBottom: 5, backgroundColor: "black", transform: [{ translateX }] }}></Animated.View>
        </View>
    );
}



function PlayerXITabs({ teamA, teamB }) {
    console.log(teamA, teamB);
    return (
        <Tab.Navigator tabBar={(props) => <MyTabBar   {...props} />}
        >
            <Tab.Screen name={teamA} component={TeamA} />
            <Tab.Screen name={teamB} component={TeamB} />
        </Tab.Navigator>
    );
}

export default PlayerXITabs