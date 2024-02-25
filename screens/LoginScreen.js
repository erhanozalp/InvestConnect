import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { collection, doc, setDoc, getDoc, getDocs ,query,where} from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
       // const docRef = collection(FIREBASE_DB, "users", email);
        const q = query(collection(FIREBASE_DB, "users"), where("email", "==", email));
        const docSnap = await getDocs(q);
        console.log("docSnap", docSnap);
        var User = docSnap.docs[0].data();
        console.log("user", User);      

        if (docSnap.docs[0].data().userType === "investor") {
          navigation.navigate("Main");
        } else {
          navigation.navigate("Upload");
        }
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/image.png")} style={styles.logo} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Are you a new user? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#eceff1",
    paddingTop: 30,
  },
  logoContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 75,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingLeft: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: "#ff5252",
    width: "80%",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#ff5252",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  registerText: {
    color: "#ff5252",
    fontWeight: "bold",
  },
});

export default LoginScreen;
