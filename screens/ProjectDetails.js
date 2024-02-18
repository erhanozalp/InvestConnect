import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProjectDetails = ({ route }) => {
  // MainScreen'den gelen parametreleri al
  const { card } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={card.image} style={styles.cardImage} />
      <View style={styles.textContainer}>
        <Text style={styles.cardName}>{`${card.name}, ${card.age}`}</Text>
        <Text style={styles.cardBio}>{card.bio}</Text>
        {/* Buraya başka detay bilgileri de eklenebilir */}
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackText}>Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '90%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardBio: {
    fontSize: 16,
    color: 'gray',
  },
  goBackButton: {
    backgroundColor: '#ff5252',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  goBackText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProjectDetails;
