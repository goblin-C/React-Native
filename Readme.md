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

Installing "react-native-config": "^1.5.5"
npm i react-native-config@1.5.5

# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
newArchEnabled=true # make this false in gradle.properties

Flavours: 
In Android, Product Flavors are part of the Gradle build system.
They let you create different versions of your app (like dev, staging, production) from the same codebase, but with different configurations.

Commonly: dev, staging, production
ENV's: .env.dev .env.qa .env


In the app/src/build.gradle

Add External Configuration for env's
project.ext.envConfigFiles = [
    devDebug: ".env.dev",
    dev: ".env.dev",
    qaDebug: ".env.qa",
    qa: ".env.qa",
    productionDebug: ".env",
    production: ".env",
]

apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"

Product Flavours: Add this in the android after the buildTypes
This is to generate different productFlavours for this application basically differentiating the single app with different environments

namespace 'com.anonymous.MyAppName'
   // Flavours configurations
    flavorDimensions "appType"
    productFlavors {
        dev {
            applicationId 'com.myappname.dev'
            resValue "string", "build_config_package", "com.anonymous.MyAppName"
        }
        qa{
            applicationId 'com.myappname.qa'
            resValue "string", "build_config_package", "com.anonymous.MyAppName"
        }
        prod {
            applicationId 'com.myappname'
            resValue "string", "build_config_package", "com.anonymous.MyAppName"
        }
    }

Also create react-native.config.js
code react-native.config.js
module.exports = {
 project: {
   ios: {},
   android: {},
 },
};

Run the project by passing the variant npm run android -- --variant devDebug

Debugging:
npm i @react-native-community/cli
npx react-native doctor

Android Manifest.xml Error

app:assembleDevDebug -x lint -x test --configure-on-demand --build-cache -PreactNativeDevServerPort=8081 -PreactNativeArchitectures=arm64-v8a,armeabi-v7a exited with non-zero code: 1

> Task :app:processDevDebugMainManifest FAILED
/home/sonal/Documents/Frontend/Milestone_ReactNative/MyAppName/android/app/src/debug/AndroidManifest.xml:14:162-188 Error:
        Attribute application@allowBackup value=(false) from AndroidManifest.xml:14:162-188
        is also present at AndroidManifest.xml:14:162-188 value=(true).
        Suggestion: add 'tools:replace="android:allowBackup"' to <application> element at AndroidManifest.xml:6:5-162 to override.

See https://developer.android.com/r/studio-ui/build/manifest-merger for more information about the manifest merger.


[Incubating] Problems report is available at: file:///home/sonal/Documents/Frontend/Milestone_ReactNative/MyAppName/android/build/reports/problems/problems-report.html

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processDevDebugMainManifest'.
> Manifest merger failed : Attribute application@allowBackup value=(false) from AndroidManifest.xml:14:162-188
        is also present at AndroidManifest.xml:14:162-188 value=(true).
        Suggestion: add 'tools:replace="android:allowBackup"' to <application> element at AndroidManifest.xml:6:5-162 to override.

in <manifest> xmlns:tools="http://schemas.android.com/tools"

in <application> add tools:replace="android:allowBackup"

In settings.gradle
include ':react-native-config'
project(':react-native-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-config/android')

npx react-native run-android --mode devDebug

Metro Logger
npm i @react-native/metro-config
npx react-native start

cat android/app/build/generated/res/resValues/dev/debug/values/gradleResValues.xml

npx react-native run-android --mode=devDebug --appId com.myappname.dev



Application Testing:
To clean gradle builds: 
rm -rf node_modules && npm install && npx react-native-clean-project clean-project-auto

cd android && ./gradlew clean && cd ..

To run based on modes

Expo 
npm run android -- --variant devDebug
npm run android -- --variant qaDebug
npm run android -- --variant productionDebug

React Native CLI:
npx react-native run-android --mode devDebug --appId com.loopup.dev
npx react-native run-android --mode qaDebug --appId com.loopup.qa
npx react-native run-android --mode productionDebug --appId com.loopup

---

Adding Folder Structure
mkdir src && cd src && mkdir assets constants model navigation screens services store styles utils viewmodels types && cd ..

---

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
Create a eslint.config.cjs

// eslint.config.cjs
module.exports = [
  { ignores: ["node_modules/**", "dist/**"] },

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      // JavaScript / TypeScript recommended rules (manually defined)
      "no-unused-vars": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/prop-types": "off", // TS doesn’t need prop-types
    },
  },
];


RUN:
npx eslint . --ext .js,.jsx,.ts,.tsx or add this in package.json

---

