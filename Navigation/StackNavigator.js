import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Coin from "../components/Coin";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Item from "../screens/Item";
import Search from "../screens/Search";

const Stack = createStackNavigator();

const CoinStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default CoinStackNavigator;
