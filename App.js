import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, useColorScheme, TouchableOpacity } from 'react-native';
import { Header, Icon, Input } from "react-native-elements";


export default function App() {
  const colorScheme = useColorScheme();
  return (
    <View>
      <Header
        containerStyle={{
          backgroundColor:
            colorScheme === "dark" ? colors.darkHeader : colors.lightHeader,
          color: colorScheme === "dark" ? "white" : "black",
          justifyContent: "space-around",
          marginBottom: Platform.OS === "ios" ? "20%" : "5%",
        }}
      >
        <Text>Left</Text>
        <Text>Center</Text>
        <Text>Right</Text>
      </Header>
      <Text>Yes!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const colors = {
  bg: "white",
  headerBg: "#444444",
  text: "black",
  errorColor: "#f44336",
  light: "white",
  darkHeader: "#333333",
  lightHeader: "#f4f4f4",
  darkContent: "#444444",
  lightContent: "#f4f4f4",
};