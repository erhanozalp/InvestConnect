import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Mert",
      age: 29,
      bio: "Biraz sanat, biraz teknoloji...",
      image: require("../assets/user1.png"),
    },
  ]);

  const renderCard = (card, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => handleCardPress(card)}>
        <View style={styles.card}>
          <Image source={card.image} style={styles.cardImage} />
          <View style={styles.textContainer}>
            <Text style={styles.cardName}>{`${card.name}, ${card.age}`}</Text>
            <Text style={styles.cardBio}>{card.bio}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCardPress = (card) => {
    // Projeyi detaylar sayfasına yönlendir
    navigation.navigate('ProjectDetails', { card });
  };

  const handleLike = (index) => {
    console.log("Like", index);
  };

  const handleDislike = (index) => {
    console.log("Dislike", index);
  };

  const handleSuperLike = (index) => {
    console.log("Super Like", index);
  };

  return (
    <View style={styles.container}>
        <Swiper
          cards={cards}
          renderCard={renderCard}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          onSwipedTop={handleSuperLike}
          stackSize={3}
          backgroundColor={'transparent'}
          cardIndex={0}
          infinite
          verticalSwipe={false}
          containerStyle={styles.swiperContainer}
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'red',
                  borderColor: 'red',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'green',
                  borderColor: 'green',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }
            }
          }}
        />
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiperContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 20,
    shadowRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: '#fff',
    elevation: 1,
  },
  cardImage: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    padding: 10,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardBio: {
    fontSize: 16,
    color: 'gray',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dislikeButton: {
    backgroundColor: '#ff5252',
  },
  superLikeButton: {
    backgroundColor: '#4CAF50',
  },
  likeButton: {
    backgroundColor: '#2196F3',
  },
});

export default MainScreen;
