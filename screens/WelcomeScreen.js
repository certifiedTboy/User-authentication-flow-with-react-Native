import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  const [fetchedMessage, setFetchedMessage] = useState("");

  useEffect(() => {
    const onGetMessage = async () => {
      const response = await axios.get(
        `https://cme-msdmps.firebaseio.com/message.json?auth=${authCtx.token}`
      );
      setFetchedMessage(response.data);
    };

    onGetMessage();
  }, [authCtx.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>

      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
