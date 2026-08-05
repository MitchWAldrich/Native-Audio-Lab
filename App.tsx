import { SafeAreaProvider } from 'react-native-safe-area-context';
// import HomeScreen from './src/screens/Home/HomeScreen';
import AudioRecorderScreen from './src/screens/AudioRecorder/AudioRecorderScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AudioRecorderScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
