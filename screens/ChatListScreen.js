import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


const chats = [
  { id: '1', name: 'Ahmet', lastMessage: 'MErhaba' },
  { id: '2', name: 'Merve', lastMessage: 'Yatırımınızı kabul ediyorum...' },
  // beyler duruma göre burayı da route gibi çekebilirsiniz açılınca lasmessage olabilir.
];

const ChatListScreen = ({route, navigation }) => {
    const handlePressChat = (chat) => {
        navigation.navigate('Chat', { name: chat.name, image: chat.image });
      };
    
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem} 
            onPress={() => handlePressChat(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ChatListScreen;
