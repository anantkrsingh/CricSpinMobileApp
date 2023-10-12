import React from 'react'
import { View } from 'react-native'
import { Result } from './Result'
import { ResultsTab } from '../components/ResultsTab'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { BottomBanner } from '../components/BottomBanner'

export const ResultHome = ({ navigation }) => {
  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <Result navigation={navigation} />
        <ResultsTab />
        <BottomBanner />
      </View>
    </BottomSheetModalProvider>
  )
}
