import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/Search";
import ProfileScreen from "../screens/Profile";
import Portfolio from "../screens/Portfolio";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import CoinStackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#b0b0b0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderWidth: 0.25,
          borderColor: "white",
          elevation: 10,
          height: 80,
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          borderRadius: 20,
          padding: "35",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CoinStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="pie-chart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
