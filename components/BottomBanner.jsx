import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Image } from 'react-native'
import { MyContext } from '../ContextProvider'
import { Dimensions } from 'react-native'
import { Linking } from 'react-native'

export const BottomBanner = () => {
    const { bannerData } = useContext(MyContext)
    const width = Dimensions.get("screen").width
    return (
        <TouchableOpacity onPress={()=>Linking.openURL(bannerData[2].url)}>
            <View className='flex z-10 items-center justify-center w-[375px] first-line:  self-center  pl-4 pr-4 fixed bottom-0  bg-[#513BB2] bg-opacity-60 md:left-0  md:w-[100vw]' >
            {
                bannerData &&
                <Image resizeMode='stretch' style={{ width: width - 20, height: 60 }} source={{ uri: bannerData[2].image }} />
            }
            </View>
        </TouchableOpacity>
    )
}
