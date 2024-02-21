import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { collection, getDoc, query, where, addDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const ProfileEditScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(require('../assets/user2.png')); 
  const user = auth.currentUser;
  const [User, setUser] = useState(null);

  const handleSave = () => {
    console.log('Saved:', { name, surname, email });
  };

  const handleMyProjects = () => {
    navigation.navigate('MyProjects');
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Navigate to login screen or any other screen after sign out
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error signing out: ', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(FIREBASE_DB, "users", user.uid));
        setUser(docSnap.data());
      } catch(error) {
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
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={User ? User.name : ''}
          editable={false} // Make input read-only
        />
        
        <Text style={styles.label}>Surname:</Text>
        <TextInput
          style={styles.input}
          value={User ? User.surname : ''}
          editable={false} // Make input read-only
        />
       
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={User ? User.email : ''}
          editable={false} // Make input read-only
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSignOut}>
        <Text style={styles.saveButtonText}>Sign Out</Text>
      </TouchableOpacity>
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    marginTop: 80,
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
    backgroundColor: '#f0f0f0', // Change input background color to distinguish it from editable inputs
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
  }
});

export default ProfileEditScreen;
