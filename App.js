import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebase";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatListScreen from "./screens/ChatListScreen";
import SearchScreen from "./screens/SearchScreen";
import UploadScreen from "./screens/UploadScreen";
import ProjectDetails from "./screens/ProjectDetails";
import MyProjects from "./screens/MyProjects"; // MyProjects eklendi
import LikedProjects from "./screens/LikedProjects"; // LikedProjects eklendi

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();
const getCurrentUser = async () => {
  const User = auth.currentUser;
  const authUser = doc(collection(FIREBASE_DB, "users"), User.uid);
  const docSnap = await getDoc(authUser);
  return docSnap.data();
};

function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatList" component={ChatListScreen} />
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </ChatStack.Navigator>
  );
}

function MainTabScreen() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };

    fetchUser();
  }, []);
  if (!user || !user.userType) {
    // Kullanıcı tanımlı değilse veya kullanıcı türü belirlenemiyorsa, yükleme durumunu göster
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Main Screen") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Chat") {
            iconName = "comments";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Upload") {
            iconName = "upload";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      {user.userType === "investor" && (
        <Tab.Screen
          name="Main Screen"
          component={MainScreen}
          options={{ headerShown: true, title: "Main Screen" }}
        />
      )}
      {user.userType === "investor" && (
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: true, title: "Search" }}
        />
      )}
      {user.userType === "entrepreneur" && (
        <Tab.Screen
          name="Upload"
          component={UploadScreen}
          options={{ headerShown: true, title: "Upload Project" }}
        />
      )}
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{ title: "Chat" }}
      />
      {user.userType === "investor" && (
        <Tab.Screen
          name="Liked"
          component={LikedProjects}
          options={{ headerShown: true, title: "Liked Projects" }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileEditScreen}
        options={{ headerShown: true, title: "My Profile" }}
      />
    </Tab.Navigator>
  );
}

function UploadTabScreen() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };

    fetchUser();
  }, []);
  if (!user || !user.userType) {
    // Kullanıcı tanımlı değilse veya kullanıcı türü belirlenemiyorsa, yükleme durumunu göster
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Main Screen") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Chat") {
            iconName = "comments";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Upload") {
            iconName = "upload";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      {user.userType === "investor" && (
        <Tab.Screen
          name="Main Screen"
          component={MainScreen}
          options={{ headerShown: true, title: "Main Screen" }}
        />
      )}
      {user.userType === "investor" && (
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: true, title: "Search" }}
        />
      )}
      {user.userType === "entrepreneur" && (
        <Tab.Screen
          name="Upload"
          component={UploadScreen}
          options={{ headerShown: true, title: "Upload Project" }}
        />
      )}
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{ title: "Chat" }}
      />
      {user.userType === "investor" && (
        <Tab.Screen
          name="Liked"
          component={LikedProjects}
          options={{ headerShown: true, title: "Liked Projects" }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileEditScreen}
        options={{ headerShown: true, title: "My Profile" }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const user = getCurrentUser();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upload"
          component={UploadTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProjectDetails"
          component={ProjectDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProjects" // MyProjects sayfasını ekledim
          component={MyProjects} // MyProjects sayfasını ekledim
          options={{ headerShown: false }} // MyProjects sayfasını ekledim
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
