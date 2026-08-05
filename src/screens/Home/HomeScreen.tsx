import { Alert, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { homeScreenStyles } from './HomeScreen.styles';

const HomeScreen = () => {
  const styles = homeScreenStyles;

  const experimentButton = () => {
    Alert.alert('Coming Soon');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Native Audio Lab</Text>

          <Text style={styles.subtitle}>
            A playground for audio, pitch detection, and mobile engineering.
          </Text>
          <Pressable onPress={experimentButton} style={styles.button}>
            <Text style={styles.buttonText}>Let the experiment begin!</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
