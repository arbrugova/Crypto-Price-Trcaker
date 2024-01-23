// Coin.js

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Coin = ({ id, name, symbol, price, marketCap, percentage }) => {
  const navigation = useNavigation();

  const limitDecimalPlaces = (value, decimalPlaces) => {
    return parseFloat(value).toFixed(decimalPlaces);
  };

  const formattedPercentage = isNaN(parseFloat(percentage)) ? 'N/A' : `${limitDecimalPlaces(percentage, 2)}%`;

  const formatMarketCapWithSuffix = (value) => {
    if (isNaN(parseFloat(value))) {
      return 'N/A';
    }

    const num = parseFloat(value);
    const absNum = Math.abs(num);

    if (absNum >= 1.0e12) {
      return `Mcap: ${limitDecimalPlaces(num / 1.0e12, 2)}T`;
    } else if (absNum >= 1.0e9) {
      return `Mcap: ${limitDecimalPlaces(num / 1.0e9, 2)}B`;
    } else if (absNum >= 1.0e6) {
      return `Mcap: ${limitDecimalPlaces(num / 1.0e6, 2)}M`;
    } else {
      return `Mcap: ${limitDecimalPlaces(num, 0)}`;
    }
  };
  const formattedMarketCap = formatMarketCapWithSuffix(marketCap);

  const handleCoinPress = () => {
    // Navigate to Item page with the ID of the selected cryptocurrency
    navigation.navigate('Item', { id });
  };

  return (
    <TouchableOpacity style={styles.Container} onPress={handleCoinPress}>
      <Text style={styles.Index}>{}</Text>
      <View style={styles.InfoContainer}>
        <Text style={styles.CoinName}>{name}</Text>

        <View style={styles.PercentageContainer}>
          <Text style={styles.CoinSymbol}>{symbol}</Text>
          <View style={styles.Separator} />
          <Text style={styles.PercentageText}>{formattedPercentage}</Text>
        </View>
      </View>
      <View style={styles.PriceInfoContainer}>
        <Text style={styles.PriceText}>
          {`$${limitDecimalPlaces(price, 2)}`}
        </Text>
        <Text style={styles.MarketCapText}>
          {formattedMarketCap}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  Index: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  InfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  CoinName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  CoinSymbol: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  PercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Separator: {
    width: 5,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  PercentageText: {
    fontSize: 16,
    color: 'white',
  },
  PriceInfoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  PriceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  MarketCapText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Coin;
