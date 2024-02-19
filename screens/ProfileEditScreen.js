import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { collection, getDoc, query, where, addDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const ProfileEditScreen = ({ navigation }) => { // navigation prop'unu al

  const [name, setName] = useState('Mert');
  const [surname, setSurname] = useState('29');
  const [email, setEmail] = useState('Biraz sanat, biraz teknoloji...');
  const [profileImage, setProfileImage] = useState(require('../assets/user2.png')); 
  const user = auth.currentUser;
  const [User, setUser] = useState([]);

  const handleSave = () => {
    // Kullanıcı bilgilerini kaydetme işlemleri
    console.log('Saved:', { name, age, bio });
  };

  const handleMyProjects = () => {
    // MyProjects sayfasına yönlendirme işlemi
    navigation.navigate('MyProjects');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const docSnap = await getDoc(doc(FIREBASE_DB, "users", user.uid));
        setUser(docSnap.data());

      }catch(error){
        console.log("Error in fetchData", error)
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{User.name}</Text>
        
        <Text style={styles.label}>{User.surname}</Text>
       
        <Text style={styles.label}>{User.email}</Text>
      </View>     
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    marginTop:80,
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#ff5252',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  // My Projects butonu stilleri
  myProjectsButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  myProjectsButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileEditScreen;
