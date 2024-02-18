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
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const investRef = collection(FIREBASE_DB, "invest");
  const user = auth.currentUser;
  const [investorId, setInvestorId] = useState("");
  const projectRef = collection(FIREBASE_DB, "project");

  const renderCard = (card, index) => {
    console.log("card", card);
    const sentences = card.description
      .split(".")
      .filter((sentence) => sentence.trim() !== "");

    // İlk üç cümleyi al
    const truncatedDescription = sentences.slice(0, 3).join(". ") + ".";
    console.log("truncatedDescription", truncatedDescription);
    return (
      <TouchableOpacity key={index} onPress={() => handleCardPress(card)}>
        <View style={styles.card}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardName}>{`${card.name}`}</Text>
            <Image
              source={{
                uri: card.photo,
              }}
              style={styles.cardImage}
            />
            <Text>{`${card.category}`}</Text>
            <Text>{`${truncatedDescription}`}</Text>
            <Text>{`${card.budget}`}</Text>
            <Text>{`${card.owner}`}</Text>
            <Text>{`${card.status}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLike = async (index) => {
    const likedCard = cards[index];

    const docData = {
      projectId: likedCard.id,
      investorId: investorId,
      liked: true,
    };
    try {
      await addDoc(collection(FIREBASE_DB, "invest"), docData);
    } catch (error) {
      console.log("An error occured while liking the card", error);
    }
  };
  const handleCardPress = (card) => {
    // Projeyi detaylar sayfasına yönlendir
    navigation.navigate("ProjectDetails", { card });
  };

  const handleDislike = async (index) => {
    const likedCard = cards[index];

    const docData = {
      projectId: likedCard.id,
      investorId: investorId,
      liked: false,
    };

    try {
      await addDoc(collection(FIREBASE_DB, "invest"), docData);
    } catch (error) {
      console.log("An error occured while liking the card", error);
    }
  };

  const handleSuperLike = (index) => {
    console.log("Super Like", index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetchData");
        const querySnapshot = await getDocs(projectRef);
        console.log("querySnapshot", querySnapshot);
        const data = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          data.push({ ...docData });
          
        });
        console.log("data", data);

        setCards(data);

        const querySnapshots = await getDocs(collection(FIREBASE_DB, "users"));
        querySnapshots.forEach((doc) => {
          if (doc.data().email.toLowerCase() === user.email) {
            setInvestorId(doc.id);
          }
        });
      } catch (error) {
        console.log("fetchData fonksiyonunda bir hata oluştu:", error);
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
    marginTop: 30, // Üstten boşluk
    marginBottom: 30, // Altından boşluk
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dislikeButton: {
    backgroundColor: "#ff5252",
  },
  superLikeButton: {
    backgroundColor: "#4CAF50",
  },
  likeButton: {
    backgroundColor: "#2196F3",
  },
});

export default MainScreen;
