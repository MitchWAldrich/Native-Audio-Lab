jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);

jest.mock('react-native-audio-api', () => ({
  AudioManager: {
    setAudioSessionOptions: jest.fn(),
    requestRecordingPermissions: jest.fn(),
    setAudioSessionActivity: jest.fn(),
  },

  AudioRecorder: jest.fn().mockImplementation(() => ({
    enableFileOutput: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  })),

  AudioContext: jest.fn().mockImplementation(() => ({
    currentTime: 0,
    destination: {},
    close: jest.fn(),
    decodeAudioData: jest.fn(),
    createBufferSource: jest.fn(),
  })),
}));

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
