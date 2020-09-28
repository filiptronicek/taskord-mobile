import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Image,
} from "react-native";
import { Header, Icon, Avatar, Badge } from "react-native-elements";
/*
import { datafc } from "./req";


async function getData() {
  const data = await datafc();
  console.log(data.data.tasks.data[0]);
  return await data;
}

getData();
*/
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
          height: 120,
        }}
      >
        <Icon
          type="font-awesome" // The icon is loaded from the font awesome icon library
          name="bars" // Icon fa-bars
          color={colorScheme === "dark" ? "white" : "black"} // White color for contrast on the Header
        />
        <Image
          style={styles.logo}
          source={{
            uri: "https://files.catbox.moe/uebvzr.png",
          }}
        ></Image>
        <View>
          <Avatar
            rounded
            source={{
              uri: `https://randomuser.me/api/portraits/men/41.jpg`,
            }}
            size="small"
          />

          <Badge
            status="success"
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
          />
        </View>
      </Header>
          <Text>Bruh</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
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
