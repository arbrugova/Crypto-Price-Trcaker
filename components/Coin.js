import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, push, set } from "firebase/database";

const Coin = ({ id, name, symbol, price, marketCap, percentage }) => {
  const navigation = useNavigation();
  const [addedToWatchList, setAddedToWatchList] = useState(false);
  const databaseRef = getDatabase();

  const limitDecimalPlaces = (value, decimalPlaces) => {
    return parseFloat(value).toFixed(decimalPlaces);
  };

  const handleCoinPress = () => {
    navigation.navigate("ItemScreen", { id });
  };

  const handleAddToWatchList = async () => {
    try {
      const coinData = {
        id,
        name,
        symbol,
        price,
        marketCap,
        percentage,
      };
      const newWatchListRef = push(ref(databaseRef, "watchlist"));
      await set(newWatchListRef, coinData);
      setAddedToWatchList(true);
      console.log(`${name} added to watch list`);
    } catch (error) {
      console.error("Error adding to watch list:", error.message || error);
    }
  };

  return (
    <TouchableOpacity style={styles.Container} onPress={handleAddToWatchList}>
      <Text style={styles.Star}>{addedToWatchList ? "★" : "☆"}</Text>
      <View style={styles.InfoContainer}>
        <Text style={styles.CoinName}>{name}</Text>
        <View style={styles.PercentageContainer}>
          <Text style={styles.CoinSymbol}>{symbol}</Text>
          <View style={styles.Separator} />
          <Text style={styles.PercentageText}>{percentage}%</Text>
        </View>
      </View>
      <View style={styles.PriceInfoContainer}>
        <Text style={styles.PriceText}>{`$${limitDecimalPlaces(price, 2)}`}</Text>
        <Text style={styles.MarketCapText}>{`Mcap: ${marketCap}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  InfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  CoinName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  CoinSymbol: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  PercentageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  Separator: {
    width: 5,
    height: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  PercentageText: {
    fontSize: 16,
    color: "white",
  },
  PriceInfoContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  PriceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  MarketCapText: {
    fontSize: 14,
    color: "gray",
  },
  Star: {
    fontSize: 24,
    color: "white",
  },
});

export default Coin;
