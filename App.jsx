import React from "react";
import Roots from "./src/navigation/index";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/navigation/RootNavigation";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";

enableScreens(false);
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Roots />
    </NavigationContainer>
  );
}
