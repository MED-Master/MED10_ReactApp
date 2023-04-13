import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const Progress =({step, steps, height}) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  
  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step,width]);

  return (
    <>
    <Text style={{
      fontFamily: 'menlo',
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 2,
    }}>
      {step}/{steps}
    </Text>
    <View 
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;

        setWidth(newWidth);
      }}
      style={{
        height,
        backgroundColor: 'white',
        borderRadius: height,
        overflow: 'hidden',
      }}>
      <Animated.View 
        style={{
          height,
          width: '100%',
          backgroundColor: '#F9CA7F',
          borderRadius: height,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [{ translateX: animatedValue }],
        }} />
    </View>
    </>
  ) 
  
}


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

  const SSQOLquestionsForAnswerOption1 = [
    "Har De haft besvær med at tilberede et måltid?", //SC1
    "Har De haft besvær med at spise?", //SC2
    "Har De haft besvær med at tage tøj på?", //SC4
    "Har De haft besvær med at tage bad?", //SC 5
    "Har De haft besvær med at gå på toilettet?", //SC8
    "Har De haft besvær med at se fjernsyn tydeligt nok?", //V1
    "Har De haft besvær med at række ud efter ting på grund af dårligt syn?",//V2
    "Har De haft besvær med at se ting til den ene side?", //V3
    "Har De haft besvær med at tale?", //L2
    "Har De haft besvær med at tale klart og tydeligt i telefon?", //L3
    "Har andre mennesker haft besvær med at forstå, hvad De sagde?", //L5
    "Har De haft besvær med at finde de ord, De gerne ville sige?", //L6
    "Har De været nødt til at gentage Dem selv for at andre kunne forstå, hvad De sagde?", //L7
    "Har De haft besvær med at gå?", // M1 if they answer 1(Kunne slet ikke) skip question M4 and M6
    "Har De haft besvær med at holde balancen, når De lænede Dem frem eller rakte ud efter noget?", //m4
    "Har De haft besvær med at gå op ad trapper?", //m6
    "Har De haft besvær, fordi De var nødt til at holde pause, mens De gik eller kørte i kørestol?", //m7
    "Har De haft besvær med at stå oprejst?", //m8
    "Har De haft besvær med at komme op fra en stol?", //m9
    "Har De haft besvær med at klare de daglige gøremål i hjemmet?", //W1
    "Har De haft besvær med at gøre det færdigt, som De var begyndt på?", //W2
    "Har De haft besvær med at udføre De opgaver, De plejer?", //W3
    "Har De haft besvær med at skrive i hånden eller på maskine?", //UE1
    "Har De haft besvær med at tage strømper på?", //UE2
    "Har De haft besvær med at knappe knapper?", //UE3
    "Har De haft besvær med at åbne en mælkekarton?", //UE5
    "Har De haft besvær med at åbne glas med skruelåg?", //UE6
  ];
  
  const SSQOLquestionsForAnswerOption2 = [
    "Jeg har haft svært ved at koncentrere mig.", //T2
    "Jeg har haft svært ved at huske ting.", //T3
    "Jeg har været nødt til at skrive ting ned for at huske dem.", //T4
    "Jeg har været irritabel.", //P1
    "Jeg har været utålmodig over for andre.", //P2
    "Min personlighed har ændret sig.", //P3
    "Jeg har følt mig modløs med hensyn til fremtiden", //MD2
    "Jeg har været uinteresseret i andre mennesker eller aktiviteter.", //MD3
    "Jeg har deltaget mindre i fornøjelser med min familie", //FR5
    "Jeg har følt, at jeg var en byrde for min familie.", //FR7
    "Min fysiske tilstand har påvirket mit familieliv.", //FR8
    "Jeg er gået mindre i byen end jeg gerne ville.", //SR1
    "Jeg har beskæftiget mig med mine fritidsinteresser i kortere perioder, end jeg gerne ville.", //SR4
    "Jeg har været sammen med færre af mine venner end jeg gerne ville.", //SR5
    "Jeg har dyrket mindre sex end jeg gerne ville", //SR6
    "Min fysiske tilstand har påvirket mit sociale liv", //SR7
    "Jeg har følt mig isoleret fra andre mennesker.", //MD6
    "Min selvtillid har været lille", //MD7
    "Jeg har været uinteresseret i mad", //MD8
    "Jeg har følt mig træt det meste af tiden.", //E2
    "Jeg har følt mig træt det meste af tiden.", //E3
    "Jeg har været for træt til at gøre det, jeg gerne ville.", //E4
  ];

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
  
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.question}>Havde du problemer med at tale?Havde du problemer med at tale?</Text>
        <View style={styles.progressContainer}>
          <Progress step={12} steps={49} height={10} />
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
