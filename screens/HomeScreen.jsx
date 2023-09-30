import React from 'react'
import { Text, View, ImageBackground, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useMatches from '../Hooks/useMatches'
import { LiveMatch } from '../components/LiveMatch'
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { PaginationDots } from '../components/PaginationDots'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { UpcomingMatch } from '../components/UpcomingMatch'
import useSeries from '../Hooks/useSeries'




const { width } = Dimensions.get('window');


export const HomeScreen = ({navigation}) => {
  const { matches, loading, upcomingMatches } = useMatches()
  const { series, isLoading } = useSeries()
  return (
    <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
      <ScrollView decelerationRate={"normal"} style={{ flex: 1, flexDirection: "column" }}>
        <View>
          <View className="flex-1 flex-col">
            <View className="text-white flex m-2 justify-between flex-row">
              <Text className="text-white p-2 ">Live Matches</Text>
              <View className="flex flex-row items-center p-2">
                <Text className="text-white mr-1">See All</Text>
                <AntDesign color="white" name='doubleright' />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              {
                !loading && <Carousel style={{ backgroundColor: "blue" }}
                  pagination={(data) => <PaginationDots key={""} totalPages={data.total} currentPage={data.currentPage} />}
                  renderItem={(item, index) => <LiveMatch key={index} match={item} index={index} navigation={navigation} />}
                  data={matches}
                  loop
                  autoplay
                />
              }
            </View>
          </View>
          <View style={{}}>
            <View className="text-white flex mx-4  justify-between flex-row">
              <Text className="text-white p-2 ">Featured Matches</Text>
              <View className="flex flex-row items-center p-2">
                <Text className="text-white mr-1">See All</Text>
                <AntDesign color="white" name='doubleright' />
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
                    <View style={{margin:5,width:"90%"}} className=" p-4 cursor-pointer bg-white mt-2 rounded-3xl shadow-xl"  >
                      <Text>{item.seriesname}</Text>
                      <Text>{item.startdate} - {item.enddate}</Text>
                    </View>
                  )
                })
              )}
            </View>
          </View>
        </View>


      </ScrollView>



    </ImageBackground>
  )
}
