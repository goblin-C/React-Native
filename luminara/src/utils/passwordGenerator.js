const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const getRandomChar = chars =>
  chars[Math.floor(Math.random() * chars.length)];

const shuffleString = str =>
  str
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

export const generatePassword = (length = 8) => {
  if (length < 8) {
    throw new Error('Password length must be at least 8 characters');
  }

  const required = [
    getRandomChar(UPPER),
    getRandomChar(LOWER),
    getRandomChar(NUMBERS),
    getRandomChar(SPECIAL),
  ];

  const ALL = UPPER + LOWER + NUMBERS + SPECIAL;

  const remaining = Array.from(
    { length: length - required.length },
    () => getRandomChar(ALL)
  );

  return shuffleString([...required, ...remaining].join(''));
};
