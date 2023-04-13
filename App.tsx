import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { QuestionController } from './Question';
import { Progress } from './ProgressBar';

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

  


  const SSQOLAnswerOptions1 =[
    "Kunne slet ikke",
    "Meget besvær",
    "En del besvær",
    "Lidt besvær",
    "Intet besvær"
  ];
  
  const SSQOLAnswerOptions2 = [
    "Helt enig",
    "Delvist enig",
    "Hverken enig eller uenig",
    "Delvist uenig",
    "Helt uenig"
  ];
  

  const progressSetter = 5;

  const PS = (progressSetter) => {

  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <QuestionController qIndex={progressSetter}/>
        <View style={styles.progressContainer}>
          <Progress step={progressSetter} steps={49} height={10} />
        </View>
        <FlatList
        data={SSQOLAnswerOptions1}
        horizontal = {true}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.likertButtonStyle} onPress={handleSend}>
            <Text style={styles.textSettingsLikertButton}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        
      />
        
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.me ? styles.inputMessage : styles.botMessage}>
            <Text>{ item.author + ':'}</Text> 
            { item.image ? <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} /> : null }
            { item.text ?
              <Text style={{ fontWeight: 'bold', color: item.me ? 'black' : '#000' }}>{item.text}</Text> : null
            }
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{borderBottomColor: 'blue', borderBottomWidth: 2}}/>
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
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  question: {
    fontSize: 26,
    padding: DEFAULT_PADDING,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  ratings: {
    //flexDirection: 'row',
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
    //flex: 1,
    width: 120,
    height: 50,
    textAlignVertical: 'center',
  },
  likertButtonStyle: { 
    backgroundColor: '#F9CA7F',
    borderRadius: 10,
    maxWidth: 78,
    maxHeight: 100,
    minWidth: 78,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    margin: 2,
    
  },
  textSettingsButton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textSettingsLikertButton: {
    fontWeight: 'bold',
    fontSize: 14,
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
  progressContainer: {
    width: '95%',
    alignSelf: 'center',
  },
})
export default ChatScreen;
