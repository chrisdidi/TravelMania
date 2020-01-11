import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import StackNavigation from "./src/navigations/StackNavigations";
import styles from "./src/styles/Theme";
import ItineraryContextProvier from "./src/context/ItineraryContext"

export default function App() {
  return (
    <ItineraryContextProvier>
      <ThemeProvider theme={styles}>
        <View style={{ flex: 1, backgroundColor: styles.lightGreyColor }}>
          <StackNavigation />
        </View>
      </ThemeProvider>
    </ItineraryContextProvier>
  );
}
