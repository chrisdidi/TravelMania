import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import styles from './src/styles/Theme';

export default function App() {
  return (
    <ThemeProvider theme={styles}>
      <View style={{flex: 1, backgroundColor: styles.lightGreyColor}}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </ThemeProvider>
  );
}

