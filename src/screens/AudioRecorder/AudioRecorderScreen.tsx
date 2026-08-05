import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { audioRecorderScreenStyles } from './AudioRecorderScreen.styles';
import { useEffect, useRef, useState } from 'react';
import {
  AudioContext,
  AudioManager,
  AudioRecorder,
} from 'react-native-audio-api';

AudioManager.setAudioSessionOptions({
  iosCategory: 'record',
  iosMode: 'default',
  iosOptions: [],
});

const audioRecorder = new AudioRecorder();

// Enables recording to file with default configuration
audioRecorder.enableFileOutput();

const AudioRecorderScreen = () => {
  const styles = audioRecorderScreenStyles;

  const [isRecording, setIsRecording] = useState(false);

  const [recordingPath, setRecordingPath] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  if (!audioContextRef.current) {
    audioContextRef.current = new AudioContext();
  }

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
    };
  }, []);

  const handleRecord = async () => {
    if (isRecording) {
      return;
    }

    // Make sure the permissions are granted
    const permissions = await AudioManager.requestRecordingPermissions();

    if (permissions !== 'Granted') {
      console.warn('Recording permissions not granted.');
      return;
    }

    setRecordingPath(null);

    //Activate audio session
    try {
      await AudioManager.setAudioSessionActivity(true);

      const result = await audioRecorder.start();

      if (result.status === 'error') {
        console.error('Could not start recording:', result.message);

        await AudioManager.setAudioSessionActivity(false);
        return;
      }

      setIsRecording(true);
    } catch (error) {
      console.error('Could not start recording:', error);

      await AudioManager.setAudioSessionActivity(false).catch(() => undefined);
    }
  };

  const handleStop = async () => {
    if (!isRecording) {
      return;
    }

    try {
      const result = await audioRecorder.stop();

      if (result.status === 'error') {
        console.error('Could not stop recording:', result.message);
        return;
      }

      const [path] = result.paths;

      if (!path) {
        console.error('Recording stopped, but no file path was returned.');
        return;
      }

      setRecordingPath(path);
    } catch (error) {
      console.error('Could not stop recording:', error);
    } finally {
      setIsRecording(false);
      try {
        await AudioManager.setAudioSessionActivity(false);
      } catch (error) {
        console.error('Could not deactivate the audio session:', error);
      }
    }
  };

  const handlePlay = async () => {
    if (!recordingPath) {
      console.error('No recording path.');
      return;
    }

    const audioContext = audioContextRef.current;

    if (!audioContext) {
      console.error('Could not create audioContext');
      return;
    }

    try {
      const audioBuffer = await audioContext.decodeAudioData(recordingPath);

      const playerNode = audioContext.createBufferSource();
      playerNode.buffer = audioBuffer;

      playerNode.connect(audioContext.destination);
      playerNode.start(audioContext.currentTime);
    } catch (error) {
      console.error('Could not play recording:', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Audio Recorder</Text>
          <Pressable
            disabled={isRecording}
            onPress={handleRecord}
            style={[styles.button, isRecording && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>START</Text>
          </Pressable>
          <Pressable
            disabled={!isRecording}
            onPress={handleStop}
            style={[styles.button, !isRecording && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>STOP</Text>
          </Pressable>
          <Pressable
            disabled={isRecording || !recordingPath}
            onPress={handlePlay}
            style={[
              styles.button,
              (isRecording || !recordingPath) && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>PLAY</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AudioRecorderScreen;
