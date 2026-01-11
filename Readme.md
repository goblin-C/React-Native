React Native Milestones

Milestone 1: 
1. What is React Native: React Native is an open-source framework developed by Facebook that allows developers to build mobile applications using JavaScript/Typescript and React. The key advantage of React Native is that it enables the development of apps for both iOS and Android platforms using a single codebase, which significantly reduces development time and effort.
a. React Native CLI (Vanilla React Native)
b. Expo (Managed & Bare Workflow)
2. What is Expo : Expo is a framework that simplifies React Native development. A fully managed environment where Expo handles the native side of your app.
3. Bundle ID & Package Name: Important for Publishing Application to Google Play Store or Apple Store

4. Understanding Project Setup and App Icon Name: 

Creating a Project:
npx create-expo-app@latest ${Name of the Project} --template bare-minimum

In the package.json in the scripts change the android to "npm run android -d" as this prevents the use of a emulator.

Run the project with "npm run android"

# Android (Clean Up)
cd android && ./gradlew clean && cd ..

In the android/app/src
cp -r main ./dev
cp -r main ./qa
From the main directory create
dev
qa
and delete the java folder

Flavours: 
In Android, Product Flavors are part of the Gradle build system.
They let you create different versions of your app (like dev, staging, production) from the same codebase, but with different configurations.

Commonly: dev, staging, production
ENV's: .env.dev .env.qa .env


Also create react-native.config.js
code react-native.config.js
module.exports = {
 project: {
   ios: {},
   android: {},
 },
};

Debugging:
npm i @react-native-community/cli
npx react-native doctor

Adding Custom Fonts
 react-native.config
 assets: ['./src/assets/fonts'],

src/assets/fonts
add .ttf files without (-) as it causes issues in Android
npx react-native-asset -  to link assets

---

Adding Linter
  "devDependencies": {
    "@eslint/eslintrc": "^x.x.x",
    "@eslint/js": "^9.37.0",
    "@react-native-community/eslint-config": "^x.x.x",
    "@typescript-eslint/eslint-plugin": "^8.45.0",
    "@typescript-eslint/parser": "^8.45.0",
    "eslint": "^9.37.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-jest": "^29.0.1",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^6.1.1",
    "eslint-plugin-react-native": "^x.x.x"
  }


RUN:
npx eslint . --ext .js,.jsx,.ts,.tsx or add this in package.json

---
Milestone 2:

Splash Screen: https://www.reactnativepro.com/free-icon-and-splash-generator/

# core navigation
npm install @react-navigation/native

# native dependencies
npm install react-native-screens react-native-safe-area-context

# stack navigator
npm install @react-navigation/native-stack

# gesture handler (required)
npm install react-native-gesture-handler

Bottom Sheet - phone number

// =================================

Design Link:
https://stitch.withgoogle.com/projects/10494247845769515228?pli=1

Create the Project by running:
npx create-expo-app@latest ${Name of the Project} --template bare-minimum

This project is Luminara which is a E-shopping application for crochets and handmade items

This needs to have 3 flavours - 
1. luminara.dev 
2. luminara.qa 
3. luminara

    flavorDimensions "app"
    productFlavors {
        dev {
            dimension "app"
            applicationIdSuffix ".dev"
            versionNameSuffix "-dev"
        }

        qa {
            dimension "app"
            applicationIdSuffix ".qa"
            versionNameSuffix "-qa"
        }

        production {
            dimension "app"
        }
    }

babel.config.js
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          allowUndefined: true,
        },
      ],
    ],
  };
};
```

# Terminal 1
npx expo start --dev-client --android-package com.luminara.dev

# Terminal 2 
npx expo run:android --variant devDebug --app-id com.luminara.dev


Environment importing:
import { ENVIRONMENT } from '@env';

Configuration for the package.json
package.json
```js
  "scripts": {
    "start": "expo start --dev-client",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",

    "env:dev": "cp .env.dev .env",
    "start:dev": "npm run env:dev && expo start --dev-client",
    "android:dev": "npm run env:dev && expo run:android --variant devDebug --app-id com.luminara.dev",

    "env:qa": "cp .env.qa .env",
    "start:qa": "npm run env:qa && expo start --dev-client",
    "android:qa": "npm run env:qa && expo run:android --variant qaDebug --app-id com.luminara.qa",
    
    "env:prod": "cp .env.prod .env",
    "start:prod": "npm run env:prod && expo start --dev-client",
    "android:prod": "npm run env:prod && expo run:android --variant prodDebug --app-id com.luminara",
    
    "ios:dev": "npm run env:dev && expo run:ios",
    "ios:qa": "npm run env:qa && expo run:ios",
    "ios:prod": "npm run env:prod && expo run:ios"

    "clean":"cd android && ./gradlew clean && cd .."
  },
```
Setting Up eslint

npm install --save-dev \
eslint \
@typescript-eslint/parser \
@typescript-eslint/eslint-plugin \
eslint-plugin-react \
eslint-plugin-react-native \
eslint-plugin-import \
eslint-plugin-jsx-a11y \
prettier \
eslint-config-prettier

npm install eslint-plugin-ft-flow@latest --save-dev

```.eslintrc.js
module.exports = {
  root: true,
  extends: [
    '@react-native/eslint-config',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // General
    'no-console': 'warn',
    'prefer-const': 'error',

    // React
    'react/react-in-jsx-scope': 'off',

    // React Native
    'react-native/no-inline-styles': 'warn',
    'react-native/no-unused-styles': 'error',

    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
```

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "always"
}

```

for package.json scripts
    "lint": "eslint ./src --fix"

---

Adding Folder Structure
mkdir src && cd src && mkdir assets constants model navigation screens services store styles utils types && cd ..

---
# stack navigator
npm install @react-navigation/native-stack

Add the navigation in the App.js
and in the `navigation` directory create a AppNavigator

Using the `AppNavigator` create routes to different screens

Create Screens in the `screens` directory

Create `services` for async API calls

# Cognito Intergration
 Install the required Packages

npm install amazon-cognito-identity-js
npm install react-native-get-random-values
npm install @react-native-async-storage/async-storage

```js index.js
/*
Cognito uses crypto during module initialization
If this is not loaded before any Cognito import, you’ll get:
random crashes
crypto.getRandomValues errors
silent auth failures
*/
import 'react-native-get-random-values'
import { Buffer } from 'buffer'
global.Buffer = Buffer
```

Create a file to store Cognito config in constants
```js
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { USERPOOL_ID, CLIENT_ID } from '@env'

export const poolData = {
  UserPoolId: USERPOOL_ID,
  ClientId: CLIENT_ID,
}

export const userPool = new CognitoUserPool(poolData)
```

Svg Icon imports
```
install npm install react-native-svg
npx react-native link react-native-svg
npm i "@react-native-community/cli"

npm install --save-dev react-native-svg-transformer

metro.config.js
```js
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
```

how to use
go to Material Design icons: https://pictogrammers.com/library/mdi/
search for the icon download the icon and save it in assets/icons/

when using import 
import EyeIcon from '../../assets/icons/eye.svg';

<EyeIcon width={24} height={24} fill={colors.textSecondary} />


```
how to add gesture
wrap the App.js with below code

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

for gohram bottom sheets

  const bottomSheetRef = useRef(null)
  <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
    {/* Example: country list */}
    {['+91', '+1', '+44'].map(code => (
      <TouchableOpacity
        key={code}
        style={{ padding: 16 }}
        onPress={() => {
          handleChange('countryCode', code)
          bottomSheetRef.current?.close()
        }}
      >
        <Text>{code}</Text>
      </TouchableOpacity>
    ))}
  </BottomSheet>


  Since gohram doesnot work implemented a Custom Bottom Sheet (Idealogy of a spring) with bouncy effect
  