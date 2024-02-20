import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import logo from "../assets/image.png"; // Logo ekledim
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  getDocs,
  getDoc,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";
import { auth } from "../firebase";

const MyProjects = () => {
  const navigation = useNavigation();
  const [project, setProject] = useState([]);

  const handleDeleteProject = async (item) => {
    console.log("handleDeleteProject", item);
    await deleteDoc(doc(FIREBASE_DB, "project", item.id));
    const q = query(collection(FIREBASE_DB, "invest"), where("projectId", "==", item.id));
    const querySnapshot = await getDocs(q);
    const promises = querySnapshot.docs.map(async (docX) => {
      await deleteDoc(doc(FIREBASE_DB, "invest", docX.id));
    });
    await Promise.all(promises);
    fetchData();
  };

  const renderProjectItem = ({ item }) => {
    return (
      <ProjectItem item={item} handleDeleteProject={handleDeleteProject} onPress={() => navigateToProjectDetails(item)}/>
    );
  };

  const navigateToProjectDetails = (card) => {
    navigation.navigate("ProjectDetails",{card}); // ProjectDetails'e gitmek için gerekli navigasyon kodu
  };

  const navigateToProfileEdit = () => {
    navigation.navigate("ProfileEdit");
  };
  const user = auth.currentUser;
  const fetchData = async () => {
    try {
      console.log("fetchData");
      const q = query(
        collection(FIREBASE_DB, "project"),
        where("entrepreneurId", "==", user.uid)
      );
      const dataa = [];

      const querySnapshot = await getDocs(q);
      const promises = querySnapshot.docs.map(async (docX) => {
        dataa.push({ ...docX.data(), id: docX.id }); // ID eklendi
      });
      await Promise.all(promises);

      setProject(dataa);
      console.log("gelen true projeler: ", project);
    } catch (error) {
      console.log("fetchData fonksiyonunda bir hata oluştu:", error);
    }
  };
  useEffect(() => {
   
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>My Projects</Text>
      <FlatList
        data={project}
        renderItem={renderProjectItem}
        keyExtractor={(item) => item.id}
        onPress ={() => handleCardPress(item) }
        style={styles.projectList}
      />
    </View>
  );
};

const ProjectItem = ({ item, handleDeleteProject, onPress }) => {
  const swipeX = React.useRef(new Animated.Value(0)).current;

  const handleSwipe = () => {
    Animated.timing(swipeX, {
      toValue: -100,
      duration: 200,
      useNativeDriver: false,
    }).start(() => handleDeleteProject(item)); // item gönderildi
  };

  return (
    <Animated.View
      style={[styles.projectContainer, { transform: [{ translateX: swipeX }] }]}
    >
      <TouchableOpacity style={styles.deleteAction} onPress={handleSwipe}>
        <Image source={require('../assets/542724-removebg-preview.png')} style={styles.trashIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.projectTouchable} onPress={onPress}>
        <Text style={styles.projectName}>{item.name}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 50,
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  projectList: {
    width: "100%",
    paddingHorizontal: 20,
  },
  projectContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  projectTouchable: {
    flex: 1,
    marginLeft: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 16,
    color: "gray",
  },
  deleteAction: {
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    borderRadius: 75,
  },
  trashIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
 
});

export default MyProjects;
