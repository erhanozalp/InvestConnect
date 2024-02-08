import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import CustomTabBar from '../navigation/CustomTabBar';

const MainScreen = ({navigation}) => {

  const images = {
    user1: require("../assets/user1.png"),
  };
  const user = {
    name: "Mert",
    age: 29,
    bio: "Biraz sanat, biraz teknoloji...",
    image: "user1",
  };

  // Like, Dislike ve Super Like işlemleri için fonksiyonlar
  const handleLike = () => console.log("Like");
  const handleDislike = () => console.log("Dislike");
  const handleSuperLike = () => console.log("Super Like");

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={images[user.image]} style={styles.cardImage} />
        <Text style={styles.cardName}>{`${user.name}, ${user.age}`}</Text>
        <Text style={styles.cardBio}>{user.bio}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleDislike} style={styles.actionButton}>
          <Icon name="thumbs-down" size={30} color="#ff5252" />
          <Text style={styles.actionText}>Dislike</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSuperLike} style={styles.actionButton}>
          <Icon name="star" size={30} color="#ff5252" />
          <Text style={styles.actionText}>Super Like</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <Icon name="thumbs-up" size={30} color="#ff5252" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1, // Bileşenin ekranın tümünü kaplamasını sağlar
      justifyContent: 'space-between', // Kart ve Tab Bar arasında boşluk bırakır
      backgroundColor: '#f8f9fa', // Arka plan rengi
    },
    cardContainer: {
      alignItems: 'center', // İçeriği ortalar
      marginTop: 50, // Üstten boşluk
    },
    cardImage: {
      width: '90%', // Resmin genişliği
      height: 300, // Resmin yüksekliği
      borderRadius: 20, // Resmin köşe yuvarlaklığı
    },
    cardName: {
      fontSize: 24, // İsim font büyüklüğü
      fontWeight: 'bold', // İsim font kalınlığı
      marginVertical: 10, // İsim etrafındaki dikey boşluk
    },
    cardBio: {
      fontSize: 16, // Biyografi font büyüklüğü
      color: 'gray', // Biyografi font rengi
      marginBottom: 20, // Biyografi altındaki boşluk
    },
    actionContainer: {
      flexDirection: 'row', // Butonları yanyana sıralar
      justifyContent: 'space-evenly', // Butonlar arasında eşit boşluk bırakır
      marginBottom: 20, // Altından boşluk
    },
    actionButton: {
      alignItems: 'center', // İçeriği ortalar
    },
    actionText: {
      fontSize: 18, // Buton yazı font büyüklüğü
      color: '#ff5252', 
      fontWeight: 'bold', 
    },
  });

export default MainScreen;
