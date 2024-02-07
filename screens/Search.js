import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import Coin from "../components/Coin";

const apiKey = "ae53ac8e-5508-4c59-b260-3c73222c2622";
const apiUrl =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptoData, setCryptoData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?CMC_PRO_API_KEY=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setCryptoData(data.data);
        } else {
          alert("Error fetching data from the API.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  const searchCryptocurrency = () => {
    console.log("Search Term:", searchTerm);
    const filteredData = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter cryptocurrency name or symbol"
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
        }}
      />
      <Button title="Search" onPress={searchCryptocurrency} />

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Coin
              id={item.id}
              name={item.name}
              symbol={item.symbol}
              price={item.quote?.USD?.price}
              marketCap={item.quote?.USD?.market_cap}
              percentage={item.quote?.USD?.percent_change_24h}
            />
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    color: "white",
  },
  cryptoList: {
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "darkgray",
    borderRadius: 8,
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cryptoSymbol: {
    fontSize: 16,
    color: "white",
  },
  noResultsText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Search;
