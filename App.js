import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './components/RootNavigator';
import "react-native-gesture-handler"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ContextProvider } from './ContextProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ContextProvider>
          <RootNavigator />
        </ContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}


