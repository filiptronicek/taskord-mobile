import AsyncStorage from "@react-native-community/async-storage";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const signIn = () => {
    navigation.navigate("SignIn");
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("usr_token");
      if (value !== null) {
        // value previously stored
      } else {
        signIn();
      }
    } catch (e) {
      // error reading value
    }
  };
  getData();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="TASKORD" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={signIn}>Sign In</Button>
      </Layout>
    </SafeAreaView>
  );
};
