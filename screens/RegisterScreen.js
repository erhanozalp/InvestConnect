import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [userType, setUserType] = useState("users");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name,
        surname
      );
      const user = userCredential.user;
        console.log("user", user);
      await setDoc(doc(FIREBASE_DB, "users",user.uid), {
        name: name,
        surname: surname,
        email: email,
        password: password,
        userType: userType,
      });

      if (user) {
        if (userType === "investor") {
          navigation.navigate("Main");
        } else {
          navigation.navigate("Upload");
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
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
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setUserType("investor")}
        >
          <Text
            style={
              userType === "investor"
                ? styles.radioButtonTextSelected
                : styles.radioButtonText
            }
          >
            Investor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setUserType("entrepreneur")}
        >
          <Text
            style={
              userType === "entrepreneur"
                ? styles.radioButtonTextSelected
                : styles.radioButtonText
            }
          >
            Entrepreneur
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text>You already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Login</Text>
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
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  radioButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  radioButtonTextSelected: {
    color: "#ff5252",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
