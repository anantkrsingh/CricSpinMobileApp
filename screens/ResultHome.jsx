import React, { useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { Result } from './Result'
import { ResultsTab } from '../components/ResultsTab'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { BottomBanner } from '../components/BottomBanner'

export const ResultHome = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0 }}>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />} style={{}}>
            <Result navigation={navigation} />
          </ScrollView>
        </View>
        <ResultsTab />
        <BottomBanner />
      </View>
    </BottomSheetModalProvider>
  )
}
