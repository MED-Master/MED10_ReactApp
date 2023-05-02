import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export const QuestionController = ({ qIndex }) => {
  {

    const SSQOLquestions = [
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
      "Jeg har haft svært ved at koncentrere mig.", //T2 . ****Use SSQOLAnswerOptions2 from here
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
      "Spørgeskemaet er slut", //O1
    ];


    let questionIndex = qIndex - 1;
    const question = SSQOLquestions[questionIndex];

    return (
      <Text style={styles.question}>{question}</Text>
    );

  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
})