import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = () => {
    // Burada kayıt işlemi için API çağrısı yapılacak
    console.log("Kayıt bilgileri:", username, email, password, passwordConfirm);
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
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre Tekrarı"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text>Zaten bir hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // İçeriği yukarıya yaklaştır
    alignItems: "center",
    backgroundColor: "#eceff1",
    paddingTop: 30, // Üstten boşluk ekle
  },
  logoContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  logo: {
    marginTop: 50,
    width: 150, // Logoyu büyüttük
    height: 150, // Logoyu büyüttük
    resizeMode: "contain",
    borderRadius: 75, // Logo kenarlarını yuvarlak yaptık
  },
  input: {
    width: "80%",
    height: 50, // Input yüksekliğini artırdık
    backgroundColor: "white", // Arka plan rengini beyaz yaptık
    borderColor: "#ddd", // Kenarlık rengini daha soft bir tona ayarladık
    borderWidth: 1,
    borderRadius: 25, // Köşeleri yuvarlak yaptık
    marginBottom: 15,
    paddingLeft: 20,
    fontSize: 16, // Font boyutunu büyüttük
    shadowColor: "#000", // Gölge ekledik
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: "#ff5252", // Buton rengini daha canlı bir tona ayarladık
    width: "80%",
    padding: 10,
    borderRadius: 20, // Buton kenarlarını yuvarlak yaptık
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#ff5252", // Unuttum metni rengini de buton rengiyle uyumlu yaptık
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  loginText: {
    color: "#ff5252", // Giriş yap metni rengini buton rengiyle uyumlu yaptık
    fontWeight: "bold",
  },
});

export default RegisterScreen;
