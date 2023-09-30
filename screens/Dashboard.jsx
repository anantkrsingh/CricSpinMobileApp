import React from 'react'
import { ImageBackground, View } from 'react-native'
import { MyBottomNavigation } from '../components/BottomNavigation'

export const Dashboard = () => {
  return (
    <ImageBackground className="flex-1" source={require('../assets/bg.png')}>
      <MyBottomNavigation />
    </ImageBackground>
  )
}
