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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome"; // Ikon kütüphanesi
import { collection, doc, setDoc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { FIREBASE_DB, storage } from "../firebase";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {alert} from "react-native";
const UploadScreen = () => {
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [entrepreneurId, setEntrepreneurId] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    console.log("Seçilen fotoğraf:", result);

    if (!result.cancelled) {
      try {
        const imageName = result.assets[0].uri.substring(
          result.assets[0].uri.lastIndexOf("/") + 1
        );
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${imageName}`);

        await uploadBytes(storageRef, blob);
        console.log("Resim başarıyla yüklendi.");

        // Firebase Storage'da yükleme işlemi başarılı olduğunda, dosyanın URL'sini alabilirsiniz.
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Dosyanın URL'si:", downloadURL);
        setImage(downloadURL);

        // setImage(downloadURL); // Eğer gerekliyse resmin URL'sini saklamak için bu satırı kullanabilirsiniz.
      } catch (error) {
        console.error("Resim yüklenirken hata oluştu:", error);
      }
    }
  };

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
      photo: image,
      status: status,
      entrepreneurId: null,
      owner: null,
    };

    const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email.toLowerCase() === user.email) {
        docData.entrepreneurId = doc.id;
        docData.owner = doc.data().name + " " + doc.data().surname;
      }
    });
    if(docData.name != "" && docData.description != "" && docData.category != "" && docData.budget != "" && docData.photo != "" && docData.status != "" && docData.entrepreneurId != "" && docData.owner != "") {
      console.log("docData", docData);
      await addDoc(collection(FIREBASE_DB, "project"), docData);
    }else{
      Alert.alert("Please fill in all fields");
    }
    // Klavyeyi kapat
    Keyboard.dismiss();
    setBudget("");
    setCategory("");
    setDescription("");
    setProjectName("");
    setStatus("");
    setImage(null);
  };

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
                { label: "Information Technology", value: "Information Technology" },
                { label: "Health and Medical Technologies", value: "Health and Medical Technologies" },
                { label: "Green Energy and Environmental Technologies", value: "Green Energy and Environmental Technologies" },
                { label: "Educational Technologies", value: "Educational Technologies" },
                { label: "Agricultural Technologies", value: "Agricultural Technologies" },
                { label: "Financial Technologies (Fintech)", value: "Financial Technologies (Fintech)" },
                { label: "Social Innovation and Sustainable Development", value: "Social Innovation and Sustainable Development" },
                { label: "Automation and Robotics", value: "Automation and Robotics" },
                { label: "Virtual and Augmented Reality", value: "Virtual and Augmented Reality" },
                { label: "Mobile and Internet Services", value: "Mobile and Internet Services" },
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
          onPress={handleImageUpload}
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
