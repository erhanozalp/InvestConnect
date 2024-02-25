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
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome"; // Ikon kütüphanesi
import { useIsFocused } from '@react-navigation/native';




const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cards, setCards] = useState([]);
  const [showNoProjectsMessage, setShowNoProjectsMessage] = useState(false);
  const investRef = collection(FIREBASE_DB, "invest");
  const user = auth.currentUser;
  const [investorId, setInvestorId] = useState("");
  const projectRef = collection(FIREBASE_DB, "project");
  const [category, setCategory] = useState("");
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        let projectRef2;
  
        if (category === "All" || !category) {
          projectRef2 = collection(FIREBASE_DB, "project");
        } else {
          projectRef2 = query(
            collection(FIREBASE_DB, "project"),
            where("category", "==", category)
          );
        }
  
        const querySnapshot = await getDocs(projectRef2);
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
  
          if (!projectFound) {
            console.log("docdata2: ", docData);
            data.push({ ...docData });
          }
        }
  
        setCards(data);
        console.log("cards: ", cards);
        const querySnapshots = await getDocs(collection(FIREBASE_DB, "users"));
        querySnapshots.forEach((doc) => {
          if (doc.data().email.toLowerCase() === user.email) {
            setInvestorId(doc.id);
          }
        });
  
        setShowNoProjectsMessage(data.length === 0);
      } catch (error) {
        console.log("fetchData fonksiyonunda bir hata oluştu:", error);
      }
    };
  
    fetchData();
  }, [category,isFocused]);
  

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
          <Image
            source={{ uri: card.photo }}
            style={styles.cardImage}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardCategory}>Category: {card.category}</Text>
            <Text style={styles.cardDescription}>Description: {truncatedDescription}</Text>
            <Text style={styles.cardInfo}>{`Budget: ${card.budget}`}</Text>
            <Text style={styles.cardInfo}>{`Owner: ${card.owner}`}</Text>
            <Text style={styles.cardInfo}>{`Status: ${card.status}`}</Text>
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

 const handleSetCategory = async (value) => {
    setCategory(value);
    console.log("Category: ", category);
    
  };

  return (
    <View style={styles.container}>
       <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleSetCategory(value)}
              placeholder={{ label: "All", value: "All" }}
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
              
            />
          </View>
      {showNoProjectsMessage ? (
        <Text style={styles.noProjectsMessage}>
          There are no projects to see. You finished them all :)
        </Text>
      ) : (
        <Swiper
          key={cards.length}  // cards değiştiğinde Swiper'ın tekrar render olması için key ekleyin
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
              title: "DISLIKE",
              style: {
                label: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  overflow: "hidden",
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
                  padding: 10,
                  borderRadius: 5,
                  overflow: "hidden",
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
                  padding: 10,
                  borderRadius: 5,
                  overflow: "hidden",
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swiperContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    paddingLeft: 10,
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "#fff",
    elevation: 5,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: height * 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardDetails: {
    padding: 15,
    backgroundColor: "gray",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  cardCategoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    borderRadius: 100,
  },
  cardDescriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  cardBudgetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardBudget: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
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
