import React, { useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Text, } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopBar } from '../components/TopBar'
import LottieView from 'lottie-react-native';
import out from '../assets/json/out.json';
import four from '../assets/json/four.json';
import zero from '../assets/json/zero.json';
import one from '../assets/json/one.json';
import two from '../assets/json/two.json';
import three from '../assets/json/three.json';
import deadball from '../assets/json/deadball.json';
import ball from '../assets/json/deadball.json';
import over from '../assets/json/over.json';
import wicket from '../assets/json/wicket.json';
import wide from '../assets/json/wide.json';
import thid_umpire from '../assets/json/third_umpire.json';
import six from '../assets/json/six.json';
import loadingLottie from '../assets/json/loading.json';
import useResult from '../Hooks/useResult'
import { IMAGEURL } from '../components/CONST';
import CircleOverlay from '../components/Circleoverlay';
import Info from '../components/Info';
import { Live } from '../components/Live';
import { ScoreCard } from '../components/Scorecard';
import { MatchOdds } from '../components/MatchOdds';


export const Result = ({ navigation, route }) => {
  const { matchId } = route.params
  const { myMatch, loading, jsonData, CRR, RRR, animation,speed } = useResult(route.params)
  const [currentItem, setCurrentItem] = useState("Info");
  const animationMap = {
    out,
    four,
    zero,
    one,
    two,
    three,
    ball,
    over,
    wicket,
    wide,
    thid_umpire,
    six,
    loadingLottie,
  };
  const resultNavs = [
    "Info", "Live", "Scorecard", "Matchodds"
  ];


  return (
    <SafeAreaView className="bg-gray-200 flex-1" >{
      loading ? <ActivityIndicator /> : <>
        <TopBar navigation={navigation} title={`${myMatch?.MatchType} ${myMatch?.TeamA} VS ${myMatch?.TeamB}`} />
        <View style={{ flex: 1  }}>
          <View style={{ flex: 1, alignItems: 'center', overflow: 'hidden' }}>
            <View style={{ backgroundColor: '#E5E7EB', position: 'fixed', left: 0, transitionDuration: '300ms', flexDirection: 'column', width: "100%", height: "100%" }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>{jsonData?.teamA}</Text>
                  <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 8, borderWidth: 4 }} source={{ uri: `${IMAGEURL}${jsonData?.TeamABanner}` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 8, borderWidth: 4 }} source={{ uri: `${IMAGEURL}${jsonData?.TeamBBanner}` }} />
                  <Text style={{ color: "black" }}>{jsonData?.teamB}</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40, position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, right: 0, justifyContent: "center", backgroundColor: 'white', margin: 8, borderRadius: 8, }}>
                  <View style={{ padding: 8, width: "80%", overflow: "hidden" }}>
                    <Text>{jsonData?.wicketA}</Text>
                    <Text style={{ color: '#777' }}>Overs: {jsonData?.oversA}</Text>
                  </View>
                  <Text style={{ marginHorizontal: 8 }}>{jsonData?.wicketB}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', flexDirection: "row" }}>
                  {animation !== "loadingLottie" && (
                    <LottieView
                      loop
                      autoPlay
                      speed={speed}
                      source={animationMap[animation]}
                      style={{ width: 160, height: 103, position: 'absolute', zIndex: 1 }}
                    />
                  )}

                  {animationMap[animation] && animation === 'loadingLottie' && (
                    <Text style={{ position: "absolute", zIndex: 2, fontWeight: 'bold', fontSize: 14, height: "auto", width: 100, flex: 1, flexWrap: "wrap", flex: 1, flexShrink: 1, textAlign: "center" }}>
                      {jsonData?.score}
                    </Text>
                  )}

                  <CircleOverlay style={{ position: 'absolute', zIndex: 2 }} />
                </View>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 20 }}>
                <Text>CRR: {CRR}</Text>
                <Text>RRR: {RRR}</Text>
              </View>
              <View style={{ backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 8,margin:10,borderRadius:10 }}>
                {resultNavs.map((item) => (
                  <TouchableOpacity style={{padding:10}} key={item} onPress={() => setCurrentItem(item)}>
                    <Text style={{ fontWeight: currentItem === item ? 'bold' : 'normal', fontSize: 16, color: currentItem === item ? '#F59E0B' : '#333' }}>{item}</Text>
                    {currentItem === item && <View style={{ backgroundColor: '#F59E0B', width: 'auto', height: 2 }} />}
                  </TouchableOpacity>
                ))}
              </View>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                currentItem === 'Scorecard' ? (
                  <ScoreCard matchID={matchId} />
                ) : currentItem === 'Live' ? (
                  <Live matchID={matchId} />
                ) : currentItem === 'Matchodds' ? (
                  <MatchOdds matchId={matchId} />
                ) : (
                  <Info match={myMatch} matchId={matchId} />
                )
              )}
            </View>
          </View>
        </View>
      </>
    }

    </SafeAreaView>
  )
}
