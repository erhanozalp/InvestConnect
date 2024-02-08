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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Burada giriş doğrulama işlemleri yapılacak
    console.log("Giriş yapıldı:", username, password);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/image.png")} style={styles.logo} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Şifrenizi mi unuttunuz?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Yeni kullanıcı mısınız? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Kayıt Ol</Text>
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
