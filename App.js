import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import StackNavigation from "./src/navigations/StackNavigations";
import styles from "./src/styles/Theme";

export default function App() {
  return (
    <ThemeProvider theme={styles}>
      <View style={{ flex: 1, backgroundColor: styles.lightGreyColor }}>
        <StackNavigation />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
