import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import store from './Store/messages';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello', me: false },
    { text: 'Hi', me: true }
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
        return { text: item.text ? "RASA: " + item.text || "Error" : null, me: false, image: item.image || null };
      }) : [{ text: "RASA: Error", me: false, image: null }];

      setMessages([...messages, { text: "User: " + text, me: true }, ...rasaResponse]);
      setText('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSend = () => {


    sendToServer();
  };
  //TODO use styles
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: item.me ? '#688BAB' : '#DAE8F4', padding: 10, margin: 5}}> 
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

const styles = StyleSheet.create({ //design of the chat screen
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendButtonStyle: { 
    backgroundColor: '#F9CA7F',
    padding: 10,
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
    padding: 10,
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
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputMessage: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  outPutMessage: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    flex: 1,
  },
})
export default ChatScreen;
