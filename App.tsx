import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Animated, Pressable, Keyboard  } from 'react-native';
import { QuestionController } from './Question';
import { Progress } from './ProgressBar';


const ChatScreen = () => {
  const messageRef = React.useRef(null);

  const [messages, setMessages] = useState([
    { author: "RASA", text: 'Hej mit navn er RASA' , me: false },
    //{ author: "RASA", text: '.', me: false },
    //{ author: "User", text: 'Hi', me: true }
  ]);
  
  const [text, setText] = useState('');
  
  const sendToServer = () => {
    const textToSend = text;
    setText('');
    fetch('http://10.0.2.2:6969/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: textToSend }),
    })
    .then(async (response) => {
      console.log(response);
      const res = await response.json()
      const mesyge = response.ok ? res[0].text : "Error";

      const rasaResponse = response.ok ? res.map((item) => {
        return { author: "RASA", text: item.text || "", me: false, image: item.image || null };
      }) : [{ author: "ERROR", text: "RASA: Error", me: false, image: null }];

      setMessages([...messages, { author: "Bruger", text, me: true }, ...rasaResponse]);
      setText('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };


  const handleSend = () => {
    if(text.length === 0) {
      console.log("Text null");
      return;
    } else {
      sendToServer();
      if(currentOption !== null) {
        setProgress(progress + 1);
        setCurrentOption(null);
      }
      if(messageRef.current !== null) {
        messageRef.current?.scrollToEnd({ animated: true });
      }
    };
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

  const [currentOptionList, setCurrentOptionList] = useState(SSQOLAnswerOptions1);

  const enumerate = (list: string[]) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push({
        id: i,
        element: list[i]
      })
    }
    return result;
  }

 
  const [currentOption, setCurrentOption] = useState(null);

  useEffect(() => {
    if(currentOption !== null) {
      setText('Sporgsmål ' +progress + " - " + currentOptionList[currentOption]);
    }
  }, [currentOption]);

  const [progress, setProgress] = useState(24);

  useEffect(() => {
    if(progress > 26) {
      setCurrentOptionList(SSQOLAnswerOptions2);
    }
  }, [progress]);
  
  const [isPressed, setIsPressed] = useState(false);

  function handleToggle() {
    setIsPressed(!isPressed);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <QuestionController qIndex={progress}/>
        <View style={styles.progressContainer}>
          <Progress step={progress} steps={49} height={10} />
        </View>
        <FlatList
        data={enumerate(currentOptionList)}
        horizontal = {true}
        renderItem={({ item }) => (
          <TouchableOpacity style={currentOption === item.id ? styles.likertButtonStylePressed : styles.likertButtonStyle} onPress={() => {
            if(currentOption === item.id) {
              setCurrentOption(null);
              setText('');
            } else {
              setCurrentOption(item.id);
            }
          }
          }>
            <Text style={styles.textSettingsLikertButton}>{item.element}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <FlatList
        ref={messageRef}
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
        onContentSizeChange={() => messageRef.current.scrollToEnd({ animated: true })}
      />
      <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
      <View style={styles.textFieldsInputContainer}>
        <TextInput
          style={currentOption !== null && currentOption !== false ? styles.readOnlyField : styles.textFieldsInput}
          placeholder="Skriv en besked..."
          value={text}
          onChangeText={setText}
          readOnly={currentOption !== null && currentOption !== false}
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
    marginBottom: 5,
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
    backgroundColor: '#F3F6F9',
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
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    margin: 2,
    marginBottom: 10,
    flex: 1,
    
  },
  likertButtonStylePressed: { 
    backgroundColor: '#F4B34B',
    borderRadius: 10,
    maxWidth: 78,
    maxHeight: 100,
    minWidth: 78,
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    margin: 2,
    marginBottom: 10,
    flex: 1,
  },
  textSettingsButton: {
    fontWeight: 'bold',
    fontSize: 22,
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
    backgroundColor: '#F3F6F9',
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
  readOnlyField: {
    backgroundColor: '#F4B34B',
    color: 'black',
    borderRadius: 10,
    padding: DEFAULT_PADDING,
    fontWeight: 'bold',
  },
  inputMessage: {
    backgroundColor: '#AAC3DB',
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
