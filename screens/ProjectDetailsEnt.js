import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDoc,
  query,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const ProjectDetailsEnt = ({ route }) => {
  const { card } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChat = async () => {
    const q = await getDoc(doc(FIREBASE_DB, "users", card.entrepreneurId));
    console.log("q: ", q.data().email);

    navigation.navigate("ChatList", { email: q.data().email });
  };

  return (
    <View style={styles.container}>
      <Image source={card.image} style={styles.cardImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.cardName}>{card.name}</Text>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.cardDescription}>{card.description}</Text>
        </ScrollView>
        {/* Buraya başka detay bilgileri de eklenebilir */}
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.goBackButton} onPress={handleChat}>
        <Text style={styles.goBackText}>Chat With Project Owner</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "90%",
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  cardDescription: {
    fontSize: 16,
    color: "gray",
  },
  goBackButton: {
    backgroundColor: "#ff5252",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  goBackText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default ProjectDetailsEnt;
