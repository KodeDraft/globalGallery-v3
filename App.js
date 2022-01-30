import React, { useState, useEffect } from "react";
// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// FOT FONTS
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// NON DISPLAY SCREENS
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import OnBoarding from "./screens/OnBoarding";
import PasswordReset from "./screens/PasswordReset";
import DetailedPost from "./screens/DetailedPost";

// VISIBLE SCREENS STACK
import Tabs from "./navigation/tabs";

// STACKS
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getFonts = () =>
  Font.loadAsync({
    "extraBold-special-title": require("./assets/fonts/Dongle-Bold.ttf"),
    "semiBold-special-description": require("./assets/fonts/Dongle-Regular.ttf"),
    "title-bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
    normal: require("./assets/fonts/Montserrat-Medium.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnBoarding"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="OnBoarding" component={OnBoarding} />
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "SIGN UP TO CONTINUE" }}
          />
          <Tab.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "SIGN IN" }}
          />
          <Tab.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{ title: "PASSWORD RESET" }}
          />
          <Tab.Screen
            name="DetailedPost"
            component={DetailedPost}
            options={{ title: "DETAILED POST" }}
          />

          <Tab.Screen name="bottomTab" component={Tabs} />
          {/* <Tabs /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => console.log("error")}
      />
    );
  }
}
