import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Coin from '../components/Coin';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchTopCryptos = async () => {
      try {
        const apiKey = 'ae53ac8e-5508-4c59-b260-3c73222c2622';
        const response = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&limit=10`
        );

        if (!response.ok) {
          throw new Error('Network request failed');
        }

        const result = await response.json();

        setCryptos(result.data || []);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    };

    fetchTopCryptos();
  }, []);

  const renderCrypto = ({ item }) => (
    <Coin
      id={item.id}
      name={item.name}
      symbol={item.symbol}
      price={item.quote?.USD?.price || 'N/A'}
      marketCap={item.quote?.USD?.market_cap || 'N/A'}
      percentage={item.quote?.USD?.percent_change_24h || 'N/A'}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top 10 Cryptos</Text>
        <FlatList
          data={cryptos}
          keyExtractor={(item) => item.id}
          renderItem={renderCrypto}
          contentContainerStyle={styles.cryptoList}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    paddingTop: '20%',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    paddingLeft:10
  },
  cryptoList: {
    alignItems: 'center',
  },
});

export default Home;
