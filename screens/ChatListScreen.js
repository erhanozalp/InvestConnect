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
    const MessagesQuery = query(
      collection(FIREBASE_DB, "chats"),
      where("user._id", "==", auth?.currentUser?.email)
    );

    const Messages2Query = query(
      collection(FIREBASE_DB, "chats"),
      where("user._id", "==", email.toLowerCase())
    );
    console.log("MessagesQuery", MessagesQuery);

    const unsubscribe = onSnapshot(MessagesQuery, (querySnapshot) => {
      const messages1 = querySnapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));

      const mergedMessages = [...messages1];
      setMessages(mergedMessages);
    });

    const unsubscribe2 = onSnapshot(Messages2Query, (querySnapshot) => {
      const messages2 = querySnapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      const mergedMessages = [...messages2];
      setMessages((prevMessages) => [...prevMessages, ...mergedMessages]);
    });
    console.log("messages", messages);
    const unsubscribeAll = () => {
      unsubscribe();
      unsubscribe2();
    };

    return unsubscribeAll;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    console.log("asdas", messages[0]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(FIREBASE_DB, "chats"), {
      _id,
      createdAt,
      text,
      user,
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
