import React, { useState } from "react";
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
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ikon kütüphanesi

const UploadScreen = () => {
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [entrepreneurId, setEntrepreneurId] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    console.log("Proje yüklendi:", projectName, budget, owner, status, category, description, entrepreneurId, image);
    // Klavyeyi kapat
    Keyboard.dismiss();
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
            placeholder="Proje Adı"
            value={projectName}
            onChangeText={setProjectName}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Bütçe"
            value={budget}
            onChangeText={setBudget}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Sahip"
            value={owner}
            onChangeText={setOwner}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Durum"
            value={status}
            onChangeText={setStatus}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              style={{ inputAndroid: { ...pickerSelectStyles.inputAndroid } }}
              onValueChange={(value) => setCategory(value)}
              placeholder={{ label: 'Kategori Seçin', value: null }}
              items={[
                { label: 'Kategori 1', value: 'category1' },
                { label: 'Kategori 2', value: 'category2' },
                { label: 'Kategori 3', value: 'category3' },
                { label: 'Kategori 4', value: 'category4' },
                { label: 'Kategori 5', value: 'category5' },
              ]}
              Icon={() => {
                return <Icon name="caret-down" size={24} color="gray" />;
              }}
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Proje Açıklaması"
          multiline
          value={description}
          onChangeText={setDescription}
          numberOfLines={4} // İstediğiniz kadar satır
          onFocus={() => { setDescription("") }} // İlgili alana tıklandığında içeriği temizle
        />

        {/* Resim yükleme alanı */}
        <TouchableOpacity style={styles.imageUploadButton} onPress={() => console.log("Resim yükleme butonuna basıldı")}>
          <Text style={styles.imageUploadButtonText}>Resim Yükle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Yükle</Text>
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
    borderColor: 'gray',
    borderRadius: 25,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white',
  },
});

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    width: '47%',
    height: 50,
  },
  pickerContainer: {
    width: '47%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
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
    width: '80%',
    height: 150, // Yükseklik ayarlanabilir
    textAlignVertical: 'top', // Metni yukarıya hizalama
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
