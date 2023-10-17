import React, { useContext, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Linking, Image } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native'
import { MyContext } from '../ContextProvider';
import { Share } from 'react-native';




export const About = () => {

    const [aboutShown, setAboutShown] = useState(false)
    const [privacyShown, setprivacyShown] = useState(false)
    const { bannerData, telegram } = useContext(MyContext)
    const url = 'https://play.google.com/store/apps/details?id=com.avssolution.fancylivecricketscore'
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    ('CricSpin Fastest Cricket Live Line ' + '\n' + url)
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const width = Dimensions.get("screen").width
    return (
        <ImageBackground className="flex-1" source={require('../assets/bg.png')}>

            <ScrollView className='w-full font-[Roboto]  '
            >

                <View className=' mt-10 mx-4'>


                    <View className='bg-white  rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer' >
                        <TouchableOpacity onPress={() => setAboutShown(!aboutShown)} className='flex justify-between items-center transition-all duration-150 ease-in-out flex-row p-2 '>
                            <Text>About</Text>
                            <Ionicons name='caret-forward-outline' />
                        </TouchableOpacity>
                        <Text className={aboutShown ? '' : "hidden"}>
                            Cricspin stands as one of the world's foremost cricket technology solution provider.
                            Throughout its journey, cricket has always been a game heavily reliant on statistical data, and Cricspin fully embraces this aspect, leveraging the power of numbers to enhance smoothness, conduct comprehensive business studies, and contribute to the overall economics of cricket through robust analytics.
                            {"\n"}
                            Established in 2023 Cricspin offers a dynamic display of live ball-by-ball statistics for all Test, ODI, T20I, and club matches. The platform excels in delivering multiple live coverages of cricket matches, ensuring users have access to Live Scorecards, Fixtures, Player rankings, Team rankings, News, and more. Moreover, it provides in-depth statistical insights for every Cricket match and the cricketers who have graced the game.
                            {"\n"}
                            With a bold vision, Cricspin aims to be the world's most popular digital sports platform. Striving to pave the way for greater competitiveness, entertainment, and constructive engagement with cricket, the platform caters to the needs of players, enthusiasts, and stakeholders alike.
                        </Text>
                    </View>

                    <View className='bg-white mt-4 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer' >
                        <TouchableOpacity onPress={() => setprivacyShown(!privacyShown)} className='flex flex-row justify-between items-center transition-all duration-150 ease-in-out p-2 '>
                            <Text>Privacy Policy</Text>
                            <Ionicons name='caret-forward-outline' />
                        </TouchableOpacity>
                        <Text className={privacyShown ? '' : "hidden"}>
                            Thank you for using CricSpin, the cricket live score app. We value your privacy and are committed to protecting your personal information. This privacy policy explains how we handle your information when you use our app.

                            {"\n"}

                            1. Information we do not collect


                            {"\n"}
                            We do not collect any personal information from you when you use our app, such as your name, email address, or location. We also do not collect any usage information, such as which features you use or how long you use the app.

                            {"\n"}

                            2. How we use your information



                            Since we do not collect any information from you, we do not use your information for any purposes.

                            {"\n"}

                            3. How we share your information



                            Since we do not collect any information from you, we do not share your information with anyone.

                            {"\n"}


                            4. Security



                            Even though we do not collect any information from you, we still take reasonable measures to protect your privacy and the security of our app.

                            {"\n"}


                            5. Children's privacy



                            Our app is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children under 13.

                            {"\n"}


                            6. Changes to this policy



                            We may update this privacy policy from time to time. If we make significant changes, we will notify you by email or by posting a notice in our app.


                            {"\n"}

                            7. Contact us



                            If you have any questions or concerns about our privacy policy, please contact us at alien01plays@gmail.com
                        </Text>
                    </View>



                    <TouchableOpacity onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.avssolution.fancylivecricketscore")} className='bg-white mt-4 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer'>
                        <View className='flex justify-between flex-row p-2 items-center transition-all duration-150 ease-in-out '>
                            <Text href="mailto:alien01plays@gmail.com">Rate US</Text>
                            <Ionicons name='caret-forward-outline' />

                        </View>
                    </TouchableOpacity>
                    {telegram !== null && <TouchableOpacity onPress={() => Linking.openURL(telegram)} className='bg-white mt-4 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer'>
                        <View className='flex flex-row p-2 justify-between items-center transition-all duration-150 ease-in-out '>
                            <Text href="https://t.me/CricSpin">Telegram</Text>
                            <Ionicons name='caret-forward-outline' />

                        </View>
                    </TouchableOpacity>}

                    <TouchableOpacity onPress={onShare} className='bg-white mt-4 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer'>
                        <View className='flex flex-row p-2 justify-between items-center transition-all duration-150 ease-in-out '>
                            <Text href="https://play.google.com/store/apps/developer?id=CricSpin+Technologies">Share our App</Text>
                            <Ionicons name='caret-forward-outline' />

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('mailto:alwaysrank01@gmail.com')} className='bg-white mb-42 mt-4 rounded-xl p-2 transition-all duration-300 ease-in-out cursor-pointer'>
                        <View className='flex p-2 flex-row justify-between items-center transition-all duration-150 ease-in-out '>
                            <Text href="mailto:alwaysrank01@gmail.com">Contact us</Text>
                            <Ionicons name='caret-forward-outline' />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(bannerData[1].url)} className={' mt-10 overflow-hidden mb-10'}>
                        {

                            < Image resizeMode='stretch' style={{ width: width - 40, height: 270 }} source={{ uri: bannerData[1].image }} />
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>

    )
}
