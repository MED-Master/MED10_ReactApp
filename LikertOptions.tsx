import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const AnswerOptionsController = (optionToggler) => {
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
    let option = SSQOLAnswerOptions1;
    if (optionToggler > 26) {
      option = SSQOLAnswerOptions2;
    } else {
      option = SSQOLAnswerOptions1;
    }
    return (
        <FlatList
        data={option}
        horizontal = {true}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.likertButtonStyle} onPress={}>
            <Text style={styles.textSettingsLikertButton}>{item}</Text>
            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        />
    )
  }
  const styles = StyleSheet.create({ 
    textSettingsLikertButton: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
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
    })
