import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export const Progress =({step, steps, height}) => {
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
          marginBottom: 8,
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