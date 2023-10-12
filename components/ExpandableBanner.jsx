import React, { useContext, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import { MyContext } from '../ContextProvider'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Linking } from 'react-native'


export const ExpandableBanner = () => {
    const { bannerData } = useContext(MyContext)
    const [shown, setShown] = useState(false)
    const width = Dimensions.get("screen").width

    return (
        <View>
            <View className='bg-white  mt-2 mb-2 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer ' >
                <TouchableOpacity onPress={() => setShown(!shown)} className='flex euclidMedium justify-between items-center transition-all duration-150 ease-in-out flex-row w-full p-2 '>
                    <Text>Get Online Id</Text>
                    {/* <BsCaretRight /> */}
                    <Ionicons name={shown ? 'caret-forward' : "caret-down"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(bannerData[1].url)} className={shown ? '' : "hidden"}>
                    {
                        bannerData &&
                        < Image resizeMode='stretch' style={{ width: width - 40, height: 270 }} source={{ uri: bannerData[1].image }} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}
