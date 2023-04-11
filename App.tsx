import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import store from './Store/messages';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { author: "RASA", text: 'Hello', me: false },
    { author: "User", text: 'Hi', me: true }
  ]);
  
  const [text, setText] = useState('');
  
  const sendToServer = () => {
    fetch('http://10.0.2.2:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    })
    .then(async (response) => {
      const res = await response.json()
      const mesyge = response.ok ? res[0].text : "Error";

      console.log("User sent", text);
      console.log("RASA sent", res);

      const rasaResponse = response.ok ? res.map((item) => {
        return { author: "RASA", text: item.text || "", me: false, image: item.image || null };
      }) : [{ author: "ERROR", text: "RASA: Error", me: false, image: null }];

      setMessages([...messages, { author: "User", text, me: true }, ...rasaResponse]);
      setText('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSend = () => {
    sendToServer();
  };

  const answers = [
    "Strongly agree",
    "Moderately agree",
    "Neither agree nor disagree",
    "Moderately disagree",
    "Strongly disagree"
  ];
  //TODO use styles
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.question}>Question very important????</Text>
        
        <FlatList
        data={answers}
        style={styles.ratings}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sendButtonStyle} onPress={handleSend}>
          <Text style={styles.textSettingsButton}>{item}</Text>
        </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
        
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.me ? styles.inputMessage : styles.botMessage}>
            <Text>{ item.author + 'I am of breaddy nature, daaddy :'}</Text> 
            { item.image ? <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} /> : null }
            { item.text ?
              <Text style={{ fontWeight: 'bold', color: item.me ? 'black' : '#000' }}>{item.text}</Text> : null
            }
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.textFieldsInputContainer}>
        <TextInput
          style={styles.textFieldsInput}
          placeholder="Skriv en besked..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButtonStyle} onPress={handleSend}>
          <Text style={styles.textSettingsButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const DEFAULT_PADDING = 10;
//padding: 10, margin: 5
const styles = StyleSheet.create({ //design of the chat screen
  headerContainer: {
    backgroundColor: '#F7E5C9',
  },
  question: {
    fontSize: 20,
    padding: DEFAULT_PADDING,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  ratings: {
    flexDirection: 'row',
  },
  ratingButton: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendButtonStyle: { 
    backgroundColor: '#F9CA7F',
    padding: DEFAULT_PADDING,
    borderRadius: 10,
    //fontWeight: 'bold',
  },
  textSettingsButton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  textFieldsInputContainer: {
    backgroundColor: 'white',
    padding: DEFAULT_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textFieldsInput: {
    flex: 1, 
    margin: 5,
    //borderWidth: 5,
    //borderColor: '#ccc',
    //borderRadius: 10,
    padding: DEFAULT_PADDING,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputMessage: {
    backgroundColor: '#688BAB',
    padding: DEFAULT_PADDING,
    borderRadius: 10,
    margin: 5,
    width: '90%',
    alignSelf: 'flex-end'
  },
  botMessage: {
    backgroundColor: '#DAE8F4',
    padding: DEFAULT_PADDING,
    borderRadius: 10,
    margin: 5,
    width: '90%',
  },
})
export default ChatScreen;
