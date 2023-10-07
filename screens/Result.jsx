import React, { useContext, useState } from 'react'
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
import { ResultsTab } from '../components/ResultsTab';
import Tab2 from '../components/Tab2';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MyContext } from '../ContextProvider';


export const Result = ({ navigation, route }) => {
  const { loading, jsonData, CRR, RRR, animation, speed } = useResult()
  const { match } = useContext(MyContext)
  let myMatch = match
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



  return (

    <View className="bg-[#5815db] mt-12 flex-1" >{
      loading ? <ActivityIndicator /> : <>
        <TopBar navigation={navigation} title={`${myMatch?.MatchType} ${myMatch?.TeamA} VS ${myMatch?.TeamB}`} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', overflow: 'hidden' }}>
            <View style={{ position: 'fixed', left: 0, transitionDuration: '300ms', flexDirection: 'column', width: "100%" }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: "white", marginRight: 10 }}>{jsonData?.teamA}</Text>
                  <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 8, borderWidth: 4 }} source={{ uri: `${IMAGEURL}${jsonData?.TeamABanner}` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 8, borderWidth: 4 }} source={{ uri: `${IMAGEURL}${jsonData?.TeamBBanner}` }} />
                  <Text style={{ color: "white" }}>{jsonData?.teamB}</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, position: 'relative' }}>
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
                    <Text style={{ position: "absolute", zIndex: 2, fontWeight: 'bold', fontSize: 14, height: "auto", width: 100, flex: 1, flexWrap: "wrap", flex: 1, flexShrink: 1, textAlign: "center", color: "white" }}>
                      {jsonData?.score}
                    </Text>
                  )}

                  <CircleOverlay style={{ position: 'absolute', zIndex: 2 }} />
                </View>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 20 }}>
                <Text style={{ color: "white" }}>CRR: {CRR}</Text>
                <Text style={{ color: "white" }}>RRR: {RRR}</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    }
    </View>

  )
}
