import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatListScreen from "./screens/ChatListScreen";
import SearchScreen from './screens/SearchScreen';
import UploadScreen from './screens/UploadScreen';
import ProjectDetails from './screens/ProjectDetails';
import MyProjects from './screens/MyProjects'; // MyProjects eklendi

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

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
      <Tab.Screen
        name="Main Screen"
        component={MainScreen}
        options={{ headerShown: true, title: "Main Screen" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: true, title: "Search" }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{ headerShown: true, title: "Upload Project" }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{ title: "Chat" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileEditScreen}
        options={{ headerShown: true, title: "My Profile" }}
      />
    </Tab.Navigator>
  );
}

function App() {
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
          component={UploadScreen}
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
