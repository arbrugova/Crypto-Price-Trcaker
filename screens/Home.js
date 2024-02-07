import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native"; // Import the hook
import Coin from "../components/Coin";

const Home = () => {
  const isFocused = useIsFocused(); // Use the hook to check if the screen is focused
  const [marketData, setMarketData] = useState([]);

  const apiKey = "ae53ac8e-5508-4c59-b260-3c73222c2622";
  const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&limit=10`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMarketData(data.data);
        console.log("Updating Home data");
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    if (isFocused) {
      // Fetch data only when the component is focused
      fetchData();
    }

    const intervalId = setInterval(() => {
      if (isFocused) {
        // Fetch data at the interval only when the component is focused
        fetchData();
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused, apiUrl]);

  const renderCrypto = ({ item }) => {
    return (
      <Coin
        id={item.id}
        name={item.name}
        symbol={item.symbol}
        price={item.quote?.USD?.price}
        marketCap={item.quote?.USD?.market_cap}
        percentage={item.quote?.USD?.percent_change_24h}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top 10 Cryptos</Text>
      <FlatList
        data={marketData}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={renderCrypto}
        contentContainerStyle={styles.cryptoList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: "20%",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    paddingLeft: 10,
  },
  cryptoList: {
    alignItems: "center",
  },
});

export default Home;
