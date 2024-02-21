import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";
import { onSnapshot } from "firebase/firestore";

const ChatBoxScreen = ({ route, navigation }) => {
  const [list, setChats] = useState([]);
  const [senders, setSenders] = useState([]);

  const handlePressChat = (chat) => {
    navigation.navigate("ChatList", { email: chat.email.toLowerCase() });
  };

  useEffect(() => {
    const fetchData = async () => {
      // async işlemleri burada yapabilirsiniz
      const user = auth.currentUser;
      const chatList = [];
      const usersSnapshot = await getDocs(collection(FIREBASE_DB, "users"));
      const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      const querySnapshot = await getDocs(
        query(collection(FIREBASE_DB, "chats"), where("receiverId", "==", user.email))
      );
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        const otherUser = user.email === chatData.senderId ? chatData.receiverId : chatData.senderId;
        if (!chatList.some((chat) => chat.email.toLowerCase() === otherUser)) {
          const matchedUser = allUsers.find(user => user.email.toLowerCase() === otherUser);
          if (matchedUser) {
            console.log("matchedUser: ", matchedUser)
            chatList.push(matchedUser);
          }
        }
      });
  
      setChats(chatList);
    };
  
    fetchData(); // async fonksiyonu çağır
  
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handlePressChat(item)}
          >
            <Text style={styles.name}>{item.name + " " + item.surname} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
  },
});

export default ChatBoxScreen;
