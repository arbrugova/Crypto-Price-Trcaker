import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Item from "../screens/Item";
import Search from "../screens/Search";
import Portfolio from "../screens/Portfolio";

const Stack = createStackNavigator();

const CoinStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={Item}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PortfolioScreen"
        component={Portfolio}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default CoinStackNavigator;
