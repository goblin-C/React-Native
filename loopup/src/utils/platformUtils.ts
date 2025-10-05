import {Platform} from 'react-native';

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const isIOSPlatform = () => {
  return (Platform.OS === 'ios') ? 'iOS' : 'Android';
};
