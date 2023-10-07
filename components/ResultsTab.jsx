import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Info from './Info'
import { Live } from './Live'
import { ScoreCard } from './Scorecard'
import { MatchOdds } from './MatchOdds'




const Tab = createMaterialTopTabNavigator()



export const ResultsTab = () => {
    console.log("Tab Re Rendered");
    return (
        <Tab.Navigator
            style={{flex:3,marginTop:0,padding:0}}
            optimizationsEnabled={true}
            screenOptions={{
                tabBarStyle: { backgroundColor: "#6D2BEF" },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "lightgrey",
                tabBarLabelStyle: { fontWeight: "600", padding: 0,fontSize:10 },
                tabBarIndicatorStyle: { backgroundColor: "red" },
                lazy:true,
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
            <Tab.Screen name='Matchodds'  >
                {props => (<MatchOdds />)}
            </Tab.Screen>
        </Tab.Navigator>
    )
}
