import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { liveInputScreenStyles } from './LiveInputScreen.styles';
import { useEffect, useRef, useState } from 'react';
import {
  AudioContext,
  AudioManager,
  AudioRecorder,
  GainNode,
  RecorderAdapterNode,
  WorkletNode,
} from 'react-native-audio-api';
import { scheduleOnRN } from 'react-native-worklets';

AudioManager.setAudioSessionOptions({
  iosCategory: 'playAndRecord',
  iosMode: 'measurement',
  iosOptions: [],
  // iosOptions: [mixWithOthers],
});

const audioRecorder = new AudioRecorder();

// Enables recording to file with default configuration
audioRecorder.enableFileOutput();

const LiveInputScreen = () => {
  const styles = liveInputScreenStyles;

  const [isRecording, setIsRecording] = useState(false);
  const [rms, setRms] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);

  if (!audioContextRef.current) {
    audioContextRef.current = new AudioContext({ sampleRate: 16000 });
  }

  const audioContext = audioContextRef.current;

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
    };
  }, []);

  const adapterNodeRef = useRef<RecorderAdapterNode | null>(null);

  const workletNodeRef = useRef<WorkletNode | null>(null);

  const gainNodeRef = useRef<GainNode | null>(null);

  const calculateRMS = (channel: Float32Array): number => {
    'worklet';

    let sumOfSquares = 0;

    for (const sample of channel) {
      sumOfSquares += sample * sample;
    }

    return channel.length > 0 ? Math.sqrt(sumOfSquares / channel.length) : 0;
  };

  const displayWorkletValue = (rmsValue: number) => {
    setRms(rmsValue);
  };

  const handleLiveInput = async () => {
    if (isRecording) {
      return;
    }

    const worklet = (audioData: Array<Float32Array>) => {
      'worklet';

      const channel = audioData[0];

      if (!channel) {
        return;
      }

      const calculatedRms = calculateRMS(channel);

      scheduleOnRN(displayWorkletValue, calculatedRms);

      requestAnimationFrame(() => {});
    };

    if (!adapterNodeRef.current) {
      adapterNodeRef.current = audioContext.createRecorderAdapter();
    }

    const adapterNode = adapterNodeRef.current;

    if (!workletNodeRef.current) {
      workletNodeRef.current = audioContext.createWorkletNode(
        worklet,
        1024,
        1,
        'UIRuntime',
      );
    }

    if (!gainNodeRef.current) {
      gainNodeRef.current = audioContext.createGain();
    }

    const gainNode = gainNodeRef.current;

    if (!gainNode) {
      console.error('Gain node is unavailable.');
      return;
    }

    gainNode.gain.setValueAtTime(0, 0);

    const workletNode = workletNodeRef.current;

    try {
      // Make sure the permissions are granted
      const permission = await AudioManager.checkRecordingPermissions();

      if (permission !== 'Granted') {
        const requestedPermission =
          await AudioManager.requestRecordingPermissions();

        if (requestedPermission !== 'Granted') {
          console.warn('Recording permission not granted.');
          return;
        }
      }

      await AudioManager.setAudioSessionActivity(true);
      adapterNode.connect(workletNode);
      workletNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      audioRecorder.connect(adapterNode);

      const startResult = await audioRecorder.start();

      if (startResult.status === 'error') {
        console.error('Could not start recording:', startResult.message);

        await AudioManager.setAudioSessionActivity(false);
        return;
      }
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      setIsRecording(true);
    } catch (error) {
      console.error('Recording not started.', error);
    }
  };

  const handleStop = async () => {
    if (!isRecording) {
      return;
    }

    const adapterNode = adapterNodeRef.current;
    const workletNode = workletNodeRef.current;
    const gainNode = gainNodeRef.current;

    if (!adapterNode || !workletNode || !gainNode) {
      console.error('Audio graph is unavailable.');
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
    } catch (error) {
      console.error('Could not stop recording:', error);
    } finally {
      setIsRecording(false);
      try {
        await AudioManager.setAudioSessionActivity(false);
        audioRecorder.disconnect();
        adapterNode.disconnect(workletNode);
        workletNode.disconnect(gainNode);
        gainNode.disconnect(audioContext.destination);

        adapterNodeRef.current = null;
        workletNodeRef.current = null;
        gainNodeRef.current = null;
      } catch (error) {
        console.error('Could not deactivate the audio session:', error);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Live Recorder</Text>
          <Pressable
            disabled={isRecording}
            onPress={handleLiveInput}
            style={[styles.button, isRecording && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>START LIVE INPUT</Text>
          </Pressable>
          <Pressable
            disabled={!isRecording}
            onPress={handleStop}
            style={[styles.button, !isRecording && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>STOP</Text>
          </Pressable>
          <Text style={styles.subtitle}>RMS: {rms.toFixed(4)}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LiveInputScreen;
