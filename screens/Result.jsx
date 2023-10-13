import React, { useContext } from 'react'
import { View, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Text, } from 'react-native-paper'
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
import { MyContext } from '../ContextProvider';
import { StatusBar } from 'expo-status-bar';


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


  const screenWidth = Dimensions.get('window').width

  return (

    <View className="bg-[#5815db] flex-0" >{
      loading ? <ActivityIndicator color='white' style={{ marginTop: 35 }} /> : <>
                    <StatusBar style='dark' backgroundColor='white' />

        <View className="bg-[#2a076f] items-center p-4 pt-10 flex flex-row color-white" style={{ width: screenWidth, alignContent: "center", alignSelf: "center" }}>
          <Ionicons onPress={() => { navigation.goBack() }} className="p-4" color={"white"} size={25} name="chevron-back-outline"></Ionicons>
          <Text className="ml-4 text-white font-bold">{match.Title}</Text>
        </View>
        <View style={{  }}>
          <View style={{  alignItems: 'center', overflow: 'hidden' }}>
            <View style={{ position: 'fixed', left: 0, transitionDuration: '300ms', flexDirection: 'column', width: "100%" }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: "white", marginRight: 10, fontWeight: "bold" }}>{jsonData?.teamA}</Text>
                  <Image style={{ width: 30, height: 30, borderRadius: 24, marginRight: 8,}} source={{ uri: `${IMAGEURL}${jsonData?.TeamABanner}` }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ width: 30, height: 30, borderRadius: 24, marginRight: 8, }} source={{ uri: `${IMAGEURL}${jsonData?.TeamBBanner}` }} />
                  <Text style={{ color: "white", fontWeight: "bold" }}>{jsonData?.teamB}</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, right: 0, justifyContent: "center", backgroundColor: 'white', margin: 8, borderRadius: 8, paddingLeft: 10, paddingRight: 10 }}>
                  <View style={{ padding: 8, width: "80%", overflow: "hidden" }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>{jsonData?.wicketA}</Text>
                    <Text style={{ color: '#777', fontWeight: "bold" }}>Overs: {jsonData?.oversA}</Text>
                  </View>
                  <Text style={{ marginHorizontal: 8, fontWeight: "bold" }}>{jsonData?.wicketB}</Text>
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
                    <Text style={{ position: "absolute", zIndex: 2, fontWeight: 'bold', fontSize: 14, height: "auto", width: 90, flex: 1, flexWrap: "wrap", flex: 1, flexShrink: 1, textAlign: "center", color: "white" }}>
                      {jsonData?.score}
                    </Text>
                  )}

                  <CircleOverlay style={{ position: 'absolute', zIndex: 2 }} />
                </View>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 25, marginBottom: 10 }}>
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
