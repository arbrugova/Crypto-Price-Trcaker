import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [cryptoToAdd, setCryptoToAdd] = useState("");
  const [amount, setAmount] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [totalInvestment, setTotalInvestment] = useState(0);

  const fetchDataForPortfolio = useCallback(async () => {
    try {
      const apiKey = "ae53ac8e-5508-4c59-b260-3c73222c2622";
      const updatedPortfolio = [];
      let totalInvestment = 0;

      for (const crypto of portfolio) {
        const response = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${apiKey}&symbol=${crypto.symbol}`
        );

        if (!response.ok) {
          throw new Error("Network request failed");
        }

        const result = await response.json();
        const currentPrice = result.data[crypto.symbol]?.quote?.USD?.price;

        if (currentPrice !== undefined) {
          const investedAmount = crypto.amount * crypto.avgPrice;
          const currentInvestment = crypto.amount * currentPrice;
          const profitLoss = currentInvestment - investedAmount;

          updatedPortfolio.push({
            ...crypto,
            currentPrice,
            currentInvestment,
            profitLoss,
          });

          totalInvestment += investedAmount;
        }
      }

      setTotalInvestment(totalInvestment);
      setPortfolio(updatedPortfolio);
    } catch (error) {
      console.error("Error fetching crypto data:", error.message);
    }
  }, [portfolio]);

  useEffect(() => {
    if (portfolio.length > 0) {
      fetchDataForPortfolio();
    }
  }, [portfolio, fetchDataForPortfolio]);

  const handleAddCrypto = () => {
    const newCrypto = {
      symbol: cryptoToAdd.toUpperCase(),
      amount: parseFloat(amount),
      avgPrice: parseFloat(averagePrice),
    };

    setPortfolio((prevPortfolio) => [...prevPortfolio, newCrypto]);

    setCryptoToAdd("");
    setAmount("");
    setAveragePrice("");
  };

  const handleRemoveCrypto = (cryptoToRemove) => {
    const updatedPortfolio = portfolio.filter(
      (crypto) => crypto.symbol !== cryptoToRemove.symbol
    );
    setPortfolio(updatedPortfolio);
  };

  const renderCrypto = ({ item }) => (
    <View style={styles.cryptoItem}>
      <Text>{`${item.symbol}: ${item.amount} ${
        item.currentPrice !== undefined ? `($${item.currentPrice})` : ""
      }`}</Text>
      <Text>{`Investment: $${item.currentInvestment}`}</Text>
      {item.currentPrice !== undefined ? (
        <Text style={{ color: item.profitLoss >= 0 ? "green" : "red" }}>
          {`Profit/Loss: $${item.profitLoss}`}
        </Text>
      ) : (
        <Text>Data not available</Text>
      )}
      <TouchableOpacity onPress={() => handleRemoveCrypto(item)}>
        <View style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove Investment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Portfolio</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Crypto Symbol"
          value={cryptoToAdd}
          onChangeText={(text) => setCryptoToAdd(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Average Price"
          keyboardType="numeric"
          value={averagePrice}
          onChangeText={(text) => setAveragePrice(text)}
        />
        <Button title="Add Crypto" onPress={handleAddCrypto} />
      </View>
      <View style={styles.portfolioSummary}>
        <Text
          style={styles.totalInvestment}
        >{`Total Investment: $${totalInvestment}`}</Text>
      </View>
      <FlatList
        data={portfolio}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCrypto}
        contentContainerStyle={styles.cryptoList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
    paddingTop: "20%",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2e2e2e",
    marginRight: 10,
    padding: 8,
    color: "white",
    backgroundColor: "grey",
  },
  portfolioSummary: {
    marginBottom: 10,
  },
  totalInvestment: {
    fontSize: 18,
    color: "white",
  },
  cryptoList: {
    alignItems: "center",
  },
  cryptoItem: {
    borderWidth: 1,
    borderColor: "#2e2e2e",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#424242",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 10,
    marginTop: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
});

export default Portfolio;
