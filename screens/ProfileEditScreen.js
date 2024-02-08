import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProfileEditScreen = () => {
  const [name, setName] = useState('Mert');
  const [age, setAge] = useState('29');
  const [bio, setBio] = useState('Biraz sanat, biraz teknoloji...');
  const [profileImage, setProfileImage] = useState(require('../assets/user2.png')); 

  const handleSave = () => {
    // Kullanıcı bilgilerini kaydetme işlemleri
    console.log('Kaydedilen:', { name, age, bio });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ad</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Yaş</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType='numeric'
        />
        <Text style={styles.label}>Biyografi</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
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
});

export default ProfileEditScreen;
