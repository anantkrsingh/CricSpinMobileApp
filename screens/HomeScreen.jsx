import React, { useContext, useState, useEffect } from 'react'
import { Text, View, ImageBackground, Dimensions, Image, Linking } from 'react-native'
import useMatches from '../Hooks/useMatches'
import { LiveMatch } from '../components/LiveMatch'
import Carousel from 'react-native-x-carousel';
import { PaginationDots } from '../components/PaginationDots'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { UpcomingMatch } from '../components/UpcomingMatch'
import useSeries from '../Hooks/useSeries'
import { TouchableOpacity } from 'react-native'
import { Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Dialog } from '@rneui/themed';
import { MyContext } from '../ContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from '@rneui/themed';




const { width } = Dimensions.get('window');


export const HomeScreen = ({ navigation }) => {
  const { matches, loading, upcomingMatches } = useMatches()
  const { series, isLoading } = useSeries()
  const { notification } = useContext(MyContext)
  const [url, setUrl] = useState(false)
  useEffect(() => {
    if (notification != null) {
      try {
        AsyncStorage.getItem('Notification').then((value) => {
          if (value === null) {
            console.log(value, notification.key, "KEYSSSS");
            setUrl(notification.url)
          } else if (value !== notification.key) {
            console.log(value, notification.key, "KEYSSSS");
            setUrl(notification.url)
          }
        })

      } catch (error) {
        console.log("Error", error);
      }

    }

  }, [notification])
  const width = Dimensions.get("screen").width

  const dismissDialog = () => {
    try {
      AsyncStorage.setItem(
        'Notification',
        notification.key,
      );
      setUrl(null)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      {url && <Overlay isVisible onBackdropPress={dismissDialog}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={dismissDialog} style={{ borderRadius: 10, borderWidth: 1, width: 20, alignSelf: "flex-end", margin: 5 }}>
            <AntDesign size={18} name='close' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(notification?.redirectUrl)}>
            <Image resizeMode='stretch' style={{ height: 500, width: width - 40 }} source={{ uri: url }} />
          </TouchableOpacity>
        </View>
      </Overlay>
      }
      <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
        <StatusBar style='light' />
        <ScrollView decelerationRate={"normal"} style={{ flex: 1, flexDirection: "column" }}>
          <View>
            <View className="flex-1 flex-col">
              <View className="text-white flex m-2 justify-between flex-row">
                <Text className="text-white p-2 ">Live Matches</Text>
                <View className="flex flex-row items-center p-2">
                  <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} onPress={() => { navigation.navigate("LiveMatches", { match: matches }) }} >
                    <Text className="text-white mr-1">
                      See All
                    </Text>
                    <AntDesign color="white" name='doubleright' />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
              {
                !loading && <Carousel  style={{ backgroundColor: "blue" }}
                  pagination={(data) => <PaginationDots key={""} totalPages={data.total} currentPage={data.currentPage} />}
                  renderItem={(item, index) => <LiveMatch key={index} match={item} index={index} navigation={navigation} />}
                  data={matches}
                  loop
                  autoplay
                  autoplayInterval={5000}
                />
              }
              </View>
            </View>
            <View style={{}}>
              <View className="text-white flex mx-4 m-2  justify-between flex-row">
                <Text className="text-white p-2 ">Featured Matches</Text>
                <View className="flex flex-row items-center p-2">
                  <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} onPress={() => { navigation.navigate("UpcomingMatches", { match: upcomingMatches }) }} >
                    <Text className="text-white mr-1">
                      See All
                    </Text>
                    <AntDesign color="white" name='doubleright' />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                {loading ? <ActivityIndicator color='white' /> : (
                  upcomingMatches.slice(0, 3).map((item, index) => {
                    return (
                      <UpcomingMatch navigation={navigation} item={item} position={index} />
                    )
                  })
                )}
              </View>
            </View>
            <View style={{}}>
              <View className="text-white flex mx-4  justify-between flex-row">
                <Text className="text-white p-2 mt-4 ">Series</Text>

              </View>
              <View style={{ alignItems: "center" }}>
                {isLoading ? <ActivityIndicator color='white' /> : (
                  series.map((item, index) => {
                    return (
                      <Pressable onPress={() => navigation.navigate("SeriesDetails", { id: item.seriesid, name: item.seriesname })} style={{ margin: 5, width: "90%" }}>

                        <View className=" p-4 cursor-pointer bg-white mt-2 rounded-3xl shadow-xl"  >
                          <Text>{item.seriesname}</Text>
                          <Text>{item.startdate} - {item.enddate}</Text>
                        </View>
                      </Pressable>
                    )
                  })
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  )
}
