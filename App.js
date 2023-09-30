import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './components/RootNavigator';
import "react-native-gesture-handler"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex:1}}>
        <RootNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}


