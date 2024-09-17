import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AreasScreen from "../screens/area/AreasScreen";
import { Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation, route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Sites") {
            return <Entypo name="layers" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <BottomTab.Screen name="Sites" component={AreasScreen} />
    </BottomTab.Navigator>
  );
}

function MainApp() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Roots = () => {
  return (
    <>
      <MainApp />
    </>
  );
};

export default Roots;
