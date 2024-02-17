import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome"; // Ikon kütüphanesi
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const UploadScreen = () => {
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [entrepreneurId, setEntrepreneurId] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    console.log(
      "Proje yüklendi:",
      projectName,
      budget,
      status,
      category,
      description,
      entrepreneurId,
      image
    );

    //Giriş yapanın id verilecek
    const user = auth.currentUser;

    // Yeni bir proje oluştur
    const docData = {
      name: projectName,
      description: description,
      category: category,
      budget: budget,
      photo: 123,
      status: status,
      entrepreneurId: null,
    };

    const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email.toLowerCase() === user.email) {
        docData.entrepreneurId = doc.id;
      }
      console.log(doc.id, " => ", doc.data());
    });

    await setDoc(doc(FIREBASE_DB, "project", user.email), docData);

    // Klavyeyi kapat
    Keyboard.dismiss();
  };

  useEffect(async () => {
    const user = auth.currentUser;
    console.log("user", user);
    console.log("gerçek user benim lan", user.email);

    // const fetchData = async () => {
    //   console.log("fetchData fonksiyonu çağrıldı.");
    //   try {
    //     console.log("fetchData");
    //     const querySnapshot = await getDocs(projectRef);
    //     console.log("querySnapshot", querySnapshot);
    //     const data = [];
    //     querySnapshot.forEach((doc) => {
    //       data.push({ ...doc.data() });
    //       console.log("docs", doc.data());
    //     });
    //     console.log("data", data);
    //     setCards(data);
    //   } catch (error) {
    //     console.error("fetchData fonksiyonunda bir hata oluştu:", error);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/image.png")} style={styles.logo} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Project Name"
            value={projectName}
            onChangeText={setProjectName}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Project Budget"
            value={budget}
            onChangeText={setBudget}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Project Status"
            value={status}
            onChangeText={setStatus}
          />
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              style={{ inputAndroid: { ...pickerSelectStyles.inputAndroid } }}
              onValueChange={(value) => setCategory(value)}
              placeholder={{ label: "Select Category", value: null }}
              items={[
                { label: "Kategori 1", value: "category1" },
                { label: "Kategori 2", value: "category2" },
                { label: "Kategori 3", value: "category3" },
                { label: "Kategori 4", value: "category4" },
                { label: "Kategori 5", value: "category5" },
              ]}
              Icon={() => {
                return <Icon name="caret-down" size={24} color="gray" />;
              }}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Project Description"
          multiline
          value={description}
          onChangeText={setDescription}
          numberOfLines={4} // İstediğiniz kadar satır
          onFocus={() => {
            setDescription("");
          }} // İlgili alana tıklandığında içeriği temizle
        />

        {/* Resim yükleme alanı */}
        <TouchableOpacity
          style={styles.imageUploadButton}
          onPress={() => console.log("Resim yükleme butonuna basıldı")}
        >
          <Text style={styles.imageUploadButtonText}>Upload Project Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload Project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
  },
});

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eceff1",
    paddingTop: 30,
    paddingBottom: 50, // Klavye kapandığında inputların görünmesi için ekstra padding
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },
  inputHalf: {
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
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
    width: "47%",
    height: 50,
  },
  pickerContainer: {
    width: "47%",
    height: 50,
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    paddingLeft: 10,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
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
    width: "80%",
    height: 150, // Yükseklik ayarlanabilir
    textAlignVertical: "top", // Metni yukarıya hizalama
    marginBottom: 10, // Boşluk ekleyin
  },
  imageUploadButton: {
    backgroundColor: "black",
    width: "80%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  imageUploadButtonText: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff5252",
    width: "80%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UploadScreen;