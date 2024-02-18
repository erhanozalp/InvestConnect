import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";

const CustomTabBar = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const User = auth.currentUser;

    const authUser = doc(collection(FIREBASE_DB, "users"), User.uid);
    const docSnap = await getDoc(authUser);

    setUser(docSnap.data());
  }, []);

  if (user === null) {
    // Eğer user henüz set edilmediyse, null döndürerek render etmeyi durdur
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {userType === "investor" && (
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Main")}
        >
          <Icon name="home" size={20} />
          <Text>Ana Sayfa</Text>
        </TouchableOpacity>
      )}
      {userType === "investor" && (
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Search")}
        >
          <Icon name="search" size={20} />
          <Text>Arama</Text>
        </TouchableOpacity>
      )}
      {userType === "entrepreneur" && (
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Upload")}
        >
          <Icon name="upload" size={20} /> {/* Yükleme ikonu burada */}
          <Text>Yükle</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate("Chat")}
      >
        <Icon name="comments" size={20} />
        <Text>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user" size={20} />
        <Text>Profil</Text>
      </TouchableOpacity>

      {userType === "investor" && (
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Liked")}
        >
          <Icon name="liked" size={20} />
          <Text>Liked</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
  },
  tabItem: {
    alignItems: "center",
  },
});

export default CustomTabBar;
