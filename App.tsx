import { SafeAreaProvider } from 'react-native-safe-area-context';
// import HomeScreen from './src/screens/Home/HomeScreen';
// import AudioRecorderScreen from './src/screens/AudioRecorder/AudioRecorderScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LiveInputScreen from './src/screens/LiveInputScreen/LiveInputScreen';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LiveInputScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
