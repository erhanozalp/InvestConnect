import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome'; //bunu kullanmak lazım butonlar için
import Swiper from "react-native-deck-swiper";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";

const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);

  const projectRef = collection(FIREBASE_DB, "project");

  const renderCard = (card, index) => {
    console.log("card", card);
    return (
      <View key={index} style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.cardName}>{`${card.name}`}</Text>
          <Image
            source={{
              uri: card.photo,
            }}
            style={styles.cardImage}
          />
          <Text>{`${card.category}`}</Text>
          <Text>{`${card.description}`}</Text>
          <Text>{`${card.budget}`}</Text>
          <Text>{`${card.owner}`}</Text>
          <Text>{`${card.status}`}</Text>
        </View>
      </View>
    );
  };

  const handleLike = (index) => {
    console.log("Like", index);
  };

  const handleDislike = (index) => {
    console.log("Dislike", index);
  };

  const handleSuperLike = (index) => {
    console.log("Super Like", index);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData fonksiyonu çağrıldı.");
      try {
        console.log("fetchData");
        const querySnapshot = await getDocs(projectRef);
        console.log("querySnapshot", querySnapshot);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data() });
          console.log("docs", doc.data());
        });
        console.log("data", data);
        setCards(data);
      } catch (error) {
        console.error("fetchData fonksiyonunda bir hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {cards.length > 0 && (
        <Swiper
          cards={cards}
          renderCard={renderCard}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          onSwipedTop={handleSuperLike}
          stackSize={3}
          backgroundColor={"transparent"}
          cardIndex={0}
          infinite
          verticalSwipe={false}
          containerStyle={styles.swiperContainer}
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "green",
                  borderColor: "green",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
            top: {
              title: "SUPER LIKE",
              style: {
                label: {
                  backgroundColor: "blue",
                  borderColor: "blue",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            },
          }}
        />
      )}
      {/* Eylem butonları */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swiperContainer: {
    alignItems: "center",
    marginTop: 50, // Üstten boşluk
  },
  card: {
    width: width * 0.9, // Kartın genişliği ekran genişliğinin %90'ı kadar
    height: height * 0.7, // Kartın yüksekliği ekran yüksekliğinin %60'ı kadar
    borderRadius: 20,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "#fff",
    elevation: 1, // Android için gölge
  },
  cardImage: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTextContainer: {
    padding: 10,
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardBio: {
    fontSize: 16,
    color: "gray",
  },
});

export default MainScreen;

//aşağıda ki kod ilk hali çalıştırıp deneyebilirsiniz fakat kaydırma işlemi yok bunu işinize yaramazsa silin

// import React, { useState } from 'react';
// import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Swiper from 'react-native-deck-swiper';
// // import CustomTabBar from '../navigation/CustomTabBar';

// const MainScreen = ({navigation}) => {

//   const images = {
//     user1: require("../assets/user1.png"),
//   };
//   const user = {
//     name: "Mert",
//     age: 29,
//     bio: "Biraz sanat, biraz teknoloji...",
//     image: "user1",
//   };

//   // Like, Dislike ve Super Like işlemleri için fonksiyonlar
//   const handleLike = () => console.log("Like");
//   const handleDislike = () => console.log("Dislike");
//   const handleSuperLike = () => console.log("Super Like");

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
//         <Image source={images[user.image]} style={styles.cardImage} />
//         <Text style={styles.cardName}>{`${user.name}, ${user.age}`}</Text>
//         <Text style={styles.cardBio}>{user.bio}</Text>
//       </View>

//       <View style={styles.actionContainer}>
//         <TouchableOpacity onPress={handleDislike} style={styles.actionButton}>
//           <Icon name="thumbs-down" size={30} color="#ff5252" />
//           <Text style={styles.actionText}>Dislike</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleSuperLike} style={styles.actionButton}>
//           <Icon name="star" size={30} color="#ff5252" />
//           <Text style={styles.actionText}>Super Like</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
//           <Icon name="thumbs-up" size={30} color="#ff5252" />
//           <Text style={styles.actionText}>Like</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1, // Bileşenin ekranın tümünü kaplamasını sağlar
//       justifyContent: 'space-between', // Kart ve Tab Bar arasında boşluk bırakır
//       backgroundColor: '#f8f9fa', // Arka plan rengi
//     },
//     cardContainer: {
//       alignItems: 'center', // İçeriği ortalar
//       marginTop: 50, // Üstten boşluk
//     },
//     cardImage: {
//       width: '90%', // Resmin genişliği
//       height: 300, // Resmin yüksekliği
//       borderRadius: 20, // Resmin köşe yuvarlaklığı
//     },
//     cardName: {
//       fontSize: 24, // İsim font büyüklüğü
//       fontWeight: 'bold', // İsim font kalınlığı
//       marginVertical: 10, // İsim etrafındaki dikey boşluk
//     },
//     cardBio: {
//       fontSize: 16, // Biyografi font büyüklüğü
//       color: 'gray', // Biyografi font rengi
//       marginBottom: 20, // Biyografi altındaki boşluk
//     },
//     actionContainer: {
//       flexDirection: 'row', // Butonları yanyana sıralar
//       justifyContent: 'space-evenly', // Butonlar arasında eşit boşluk bırakır
//       marginBottom: 20, // Altından boşluk
//     },
//     actionButton: {
//       alignItems: 'center', // İçeriği ortalar
//     },
//     actionText: {
//       fontSize: 18, // Buton yazı font büyüklüğü
//       color: '#ff5252',
//       fontWeight: 'bold',
//     },
//   });

// export default MainScreen;
