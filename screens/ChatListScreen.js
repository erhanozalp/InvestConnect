import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth, FIREBASE_DB } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { email } = route.params;

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(FIREBASE_DB, "chats"),
        orderBy("createdAt", "desc") // Mesajları tarihe göre sırala
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));

        console.log("messages", messages);

        // Sadece belirli alıcıya veya belirli göndericiye ait mesajları filtrele
        const filteredMessages = messages.filter((message) => {
          return (
            (message.receiverId === email.toLowerCase() &&
              message.senderId === auth?.currentUser?.email) ||
            (message.senderId === email.toLowerCase() &&
              message.receiverId === auth?.currentUser?.email)
          );
        });

        console.log("filteredMessages", filteredMessages);

        setMessages(filteredMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    console.log("asdas", messages[0]);
    const { _id, createdAt, text, user, senderId, receiverId } = messages[0];
    addDoc(collection(FIREBASE_DB, "chats"), {
      _id,
      createdAt,
      text,
      user,
      senderId: auth?.currentUser?.email,
      receiverId: email.toLowerCase(),
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://i.pravatar.cc/300",
      }}
    />
  );
}
