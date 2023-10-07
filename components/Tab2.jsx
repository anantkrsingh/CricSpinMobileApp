import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Info from './Info';
import { Live } from './Live';
import { ScoreCard } from './Scorecard';
import { MatchOdds } from './MatchOdds';






export default function Tab2({match,matchId}) {
    const layout = useWindowDimensions();
    const FirstRoute = () => (
        <Info match={match} matchId={matchId} style={{backgroundColor:"white"}} />
    );

    const SecondRoute = () => (
        <Live matchID= {matchId}/>
    );
    const Third = () => (
        <ScoreCard matchID= {matchId}/>
    );
    const Fourth = () => (
        <MatchOdds matchId= {matchId}/>
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third:Third,
        fourth:Fourth
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Info' },
        { key: 'second', title: 'Live' },
        { key: 'third', title: 'Scorecard' },
        { key: 'fourth', title: 'Matchodds' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            
        />
    );
}