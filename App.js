import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './components/RootNavigator';
import "react-native-gesture-handler"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ContextProvider } from './ContextProvider';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from "expo-constants";





export default function App() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize("ff80ecf9-cf6a-4625-b51f-73e86bfac9d8");
  OneSignal.Notifications.requestPermission(true);
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


