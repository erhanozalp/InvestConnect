import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState([
    { id: '1', name: 'Ayşe', age: 28, bio: 'Müzik ve yürüyüşler', image: require('../assets/user2.png') },
    { id: '2', name: 'Mehmet', age: 30, bio: 'Kitaplar ve kahve', image: require('../assets/user1.png') },
    // Daha fazla profil
  ]);

  const renderProfile = ({ item }) => (
    <View style={styles.profileContainer}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.profileText}>
        <Text style={styles.profileName}>{item.name}, {item.age}</Text>
        <Text style={styles.profileBio}>{item.bio}</Text>
      </View>
      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>Daha fazla</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Arama yap..."
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="sliders" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        renderItem={renderProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
  },
  profileBio: {
    color: 'gray',
  },
  viewMoreButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF', // Butonun arka plan rengini değiştirdim
    borderRadius: 15, // Kenarları yuvarlaklaştırdım
    elevation: 3, // Android için hafif gölge ekledim
    shadowColor: '#000000', // iOS için gölge rengi
    shadowOffset: { width: 1, height: 1 }, // iOS için gölge ofseti
    shadowOpacity: 0.3, // iOS için gölge opaklığı
    shadowRadius: 1, // iOS için gölge yarıçapı
  },
  viewMoreText: {
    color: 'white', // Buton yazı rengini beyaz yaptım
    fontSize: 12, // Yazı boyutunu ayarladım
    fontWeight: 'bold', // Yazı tipi kalınlığını artırdım
  },

});

export default SearchScreen;
