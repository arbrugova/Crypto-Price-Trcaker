import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Item = ({ route }) => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const apiKey = "ae53ac8e-5508-4c59-b260-3c73222c2622";
      const cryptoId = route.params.id;

      try {
        const response = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${apiKey}&id=${cryptoId}`
        );

        if (response.ok) {
          const data = await response.json();
          setCryptoData(data.data[cryptoId]);
        } else {
          alert("Error fetching data from the API.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchCryptoData();
  }, [route.params.id]);

  if (!cryptoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cryptoName}>{cryptoData.name}</Text>
      <Text style={styles.cryptoSymbol}>{cryptoData.symbol}</Text>
      <Image
        style={styles.cryptoImage}
        source={{ uri: cryptoData.logo_url }}
      />
      <Text style={styles.cryptoPrice}>
        Price: ${cryptoData.quote.USD.price.toFixed(2)}
      </Text>
      <Text style={styles.cryptoMarketCap}>
        Market Cap: ${cryptoData.quote.USD.market_cap.toLocaleString()}
      </Text>
      <Text style={styles.cryptoVolume}>
        24h Volume: ${cryptoData.quote.USD.volume_24h.toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
  },
  cryptoName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cryptoSymbol: {
    fontSize: 20,
    color: "white",
  },
  cryptoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cryptoPrice: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  cryptoMarketCap: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  cryptoVolume: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
});

export default Item;
