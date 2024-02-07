import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { firebaseApp } from "../config";
import { getDatabase, ref, child, get, push, set } from "firebase/database";

const databaseRef = getDatabase(firebaseApp);

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [buttonColor, setButtonColor] = useState("#007AFF");

  useEffect(() => {
    setButtonColor(user ? "#4CAF50" : "#007AFF");
  }, [user]);

  const handleSignUp = async () => {
    try {
      // Check if the user already exists
      const userPath = email.replace(/\./g, "_");
      const userExists = await checkUserExists(userPath);
      if (userExists) {
        console.error("User already exists");
        setButtonColor("#FF0000");
        return;
      }

      // Create user in the database
      await createUserInDatabase(email, password);

      // Set user state
      setUser({ email });
      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message || error);
      setButtonColor("#FF0000");
    }
  };

  const handleLogin = async () => {
    try {
      // Fetch user data from the Realtime Database
      const userPath = email.replace(/\./g, "_");
      const query = await get(child(ref(databaseRef, "users"), userPath));

      if (query.exists()) {
        const userData = query.val();
        if (userData.password === password) {
          // Set user state
          setUser({ email });
          console.log("User logged in successfully!");
        } else {
          console.error("Invalid credentials");
          setButtonColor("#FF0000");
        }
      } else {
        console.error("User not found");
        setButtonColor("#FF0000");
      }
    } catch (error) {
      console.error("Error logging in:", error.message || error);
      setButtonColor("#FF0000");
    }
  };

  const checkUserExists = async (userPath) => {
    const query = await get(child(ref(databaseRef, "users"), userPath));
    return query.exists();
  };

  const createUserInDatabase = async (email, password) => {
    const userPath = email.replace(/\./g, "_");
    await set(ref(databaseRef, `users/${userPath}`), { email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} color={buttonColor} />
      <Button title="Login" onPress={handleLogin} color={buttonColor} />
      {user && <Text>{`Logged in as: ${user.email}`}</Text>}
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
  input: {
    borderWidth: 1,
    borderColor: "#2e2e2e",
    marginVertical: 10,
    padding: 8,
    color: "white",
    backgroundColor: "grey",
  },
});

export default Profile;
