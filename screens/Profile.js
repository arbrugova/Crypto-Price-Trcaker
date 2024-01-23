// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = ({ navigation }) => {
  // You can add more logic here for handling sign-in or other actions

  const handleSignIn = () => {
    // Implement your sign-in logic here
    console.log('User signed in');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.description}>
        Welcome to your profile page. Sign in to access more features.
      </Text>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Profile;
