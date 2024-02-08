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
// import SearchScreen from './screens/SearchScreen';

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

          if (route.name === "Ana Sayfa") {
            iconName = "home";
          } else if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Chat") {
            iconName = "comments";
          }
          // else if (route.name === 'Arama') {
          //   iconName = 'search';
          // }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Ana Sayfa"
        component={MainScreen}
        options={{ headerShown: true, title: "Ana Sayfa" }} 
      />
      <Tab.Screen
        name="Profil"
        component={ProfileEditScreen}
        options={{ headerShown: true, title: "Profilim" }} 
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{ title: "Sohbet" }} 
      />
      {/* <Tab.Screen name="Arama" component={SearchScreen} /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
