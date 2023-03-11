import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: item.me ? '#ccc' : '#eee', padding: 10, margin: 5 }}>
            { item.image ? <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} /> : null }
            { item.text ?
              <Text style={{ fontWeight: 'bold', color: item.me ? '#333' : '#000' }}>{item.text}</Text> : null
            }
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput
          style={{ flex: 1, margin: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10 }}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

export default ChatScreen;
