import { fontFamilies, fontWeights } from '../constants/font';

type FontOptions = {
  font: 'LATO' | 'POPPINS' | 'Lato' | 'Poppins';
  fontSize: number | string;
  fontWeight?: keyof typeof fontWeights | `${keyof typeof fontWeights}Italic`;
};

type FontFamilyKeys = keyof typeof fontFamilies['LATO'];

export const getFontFamily = ({
  font,
  fontSize,
  fontWeight = 'regular',
}: FontOptions) => {

  const normalizedFont = font.toUpperCase() as 'LATO' | 'POPPINS';
  const selectedFontFamily = fontFamilies[normalizedFont];

  let weightKey: FontFamilyKeys;

  if (fontWeight in selectedFontFamily) {
    weightKey = fontWeight as FontFamilyKeys;
  } else if (`${fontWeight}Italic` in selectedFontFamily) {
    weightKey = `${fontWeight}Italic` as FontFamilyKeys;
  } else {
    weightKey = 'regular';
  }

  return {
    fontFamily: selectedFontFamily[weightKey],
    fontSize,
    fontWeight:
      fontWeights[fontWeight.replace('Italic', '') as keyof typeof fontWeights],
  };
};
