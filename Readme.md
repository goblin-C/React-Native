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

In the app/src 
From the main directory create
dev
qa
and delete the java folder

Installing "react-native-config": "^1.5.5"
npm i "react-native-config": "^1.5.5"

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

   // Flavours configurations
    flavorDimensions "appType"
    productFlavors {
        dev {
            applicationId 'com.myappname.app'
            resValue "string", "build_config_package", "com.myappname.dev"
        }
        qa{
            applicationId 'com.myappname.app'
            resValue "string", "build_config_package", "com.myappname.qa"
        }
        production {
            applicationId 'com.myappname.app'
            resValue "string", "build_config_package", "com.myappname.app"
        }
    }

Also create react-native.config.js
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

Android Manifest.xml Error for Cache 
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