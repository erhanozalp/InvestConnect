import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [showNoProjectsMessage, setShowNoProjectsMessage] = useState(false);
  const investRef = collection(FIREBASE_DB, "invest");
  const user = auth.currentUser;
  const [investorId, setInvestorId] = useState("");
  const projectRef = collection(FIREBASE_DB, "project");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(projectRef);
        const data = [];

      
        for (const doc of querySnapshot.docs) {
          const docData = doc.data();
          docData.id = doc.id;

          const k = query(
            collection(FIREBASE_DB, "invest"),
            where("investorId", "==", user.uid)
          );

          const querySnapshott = await getDocs(k);
          let projectFound = false;

          for (const docK of querySnapshott.docs) {
            if (docK.data().projectId === doc.id) {
              projectFound = true;
              break;
              
            }
          }

          if(projectFound !== true){
            console.log("docdata: ", docData)
            data.push({ ...docData });
          }
        
        }

        setCards(data);

        const querySnapshots = await getDocs(collection(FIREBASE_DB, "users"));
        querySnapshots.forEach((doc) => {
          if (doc.data().email.toLowerCase() === user.email) {
            setInvestorId(doc.id);
          }
        });

        if (data.length === 0) {
          setShowNoProjectsMessage(true);
        }
      } catch (error) {
        console.log("fetchData fonksiyonunda bir hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  const renderCard = (card, index) => {
    if (!card || !card.description) {
      return null; // Kart veya açıklama özelliği tanımsız ise, hiçbir şey döndürme
    }
    const sentences = card.description
      .split(".")
      .filter((sentence) => sentence.trim() !== "");

    // İlk üç cümleyi al
    const truncatedDescription = sentences.slice(0, 3).join(". ") + ".";

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
    // Add like logic
    try {
      await addDoc(collection(FIREBASE_DB, "invest"), docData);
    } catch (error) {
      console.error("An error occured while liking the card", error);
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
    // Add dislike logic
    try {
      await addDoc(collection(FIREBASE_DB, "invest"), docData);
    } catch (error) {
      console.error("An error occured while disliking the card", error);
    }
  };

  const handleSuperLike = (index) => {
    console.log("Super Like", index);
  };

  return (
    <View style={styles.container}>
      {showNoProjectsMessage ? (
        <Text style={styles.noProjectsMessage}>
          There are no projects to see. You finished them all :)
        </Text>
      ) : (
        <Swiper
          cards={cards}
          renderCard={renderCard}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          onSwipedTop={handleSuperLike}
          stackSize={3}
          backgroundColor={"transparent"}
          cardIndex={0}
          infinite={false}
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
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "#fff",
    elevation: 1,
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
  noProjectsMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
});

export default MainScreen;
