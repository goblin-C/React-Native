import { isIOS } from '../utils/platformUtils';

export const fontFamilies = {
  LATO: {
    thin: isIOS() ? 'Lato-Thin' : 'LatoThin',
    thinItalic: isIOS() ? 'Lato-ThinItalic' : 'LatoThinItalic',
    light: isIOS() ? 'Lato-Light' : 'LatoLight',
    lightItalic: isIOS() ? 'Lato-LightItalic' : 'LatoLightItalic',
    regular: isIOS() ? 'Lato-Regular' : 'LatoRegular',
    italic: isIOS() ? 'Lato-Italic' : 'LatoItalic',
    bold: isIOS() ? 'Lato-Bold' : 'LatoBold',
    boldItalic: isIOS() ? 'Lato-BoldItalic' : 'LatoBoldItalic',
    black: isIOS() ? 'Lato-Black' : 'LatoBlack',
    blackItalic: isIOS() ? 'Lato-BlackItalic' : 'LatoBlackItalic',
  },
  POPPINS: {
    thin: isIOS() ? 'Poppins-Thin' : 'PoppinsThin',
    thinItalic: isIOS() ? 'Poppins-ThinItalic' : 'PoppinsThinItalic',
    extraLight: isIOS() ? 'Poppins-ExtraLight' : 'PoppinsExtraLight',
    extraLightItalic: isIOS() ? 'Poppins-ExtraLightItalic' : 'PoppinsExtraLightItalic',
    light: isIOS() ? 'Poppins-Light' : 'PoppinsLight',
    lightItalic: isIOS() ? 'Poppins-LightItalic' : 'PoppinsLightItalic',
    regular: isIOS() ? 'Poppins-Regular' : 'PoppinsRegular',
    italic: isIOS() ? 'Poppins-Italic' : 'PoppinsItalic',
    medium: isIOS() ? 'Poppins-Medium' : 'PoppinsMedium',
    mediumItalic: isIOS() ? 'Poppins-MediumItalic' : 'PoppinsMediumItalic',
    semiBold: isIOS() ? 'Poppins-SemiBold' : 'PoppinsSemiBold',
    semiBoldItalic: isIOS() ? 'Poppins-SemiBoldItalic' : 'PoppinsSemiBoldItalic',
    bold: isIOS() ? 'Poppins-Bold' : 'PoppinsBold',
    boldItalic: isIOS() ? 'Poppins-BoldItalic' : 'PoppinsBoldItalic',
    extraBold: isIOS() ? 'Poppins-ExtraBold' : 'PoppinsExtraBold',
    extraBoldItalic: isIOS() ? 'Poppins-ExtraBoldItalic' : 'PoppinsExtraBoldItalic',
    black: isIOS() ? 'Poppins-Black' : 'PoppinsBlack',
    blackItalic: isIOS() ? 'Poppins-BlackItalic' : 'PoppinsBlackItalic',
  },
};

export const fontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};