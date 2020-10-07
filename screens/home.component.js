import AsyncStorage from "@react-native-community/async-storage";
import {Button, Divider, Layout, TopNavigation} from "@ui-kitten/components";
import React, {useState} from "react";
import {SafeAreaView} from "react-native";
import {signOut} from "../src/auth/signout";

export const HomeScreen = ({navigation}) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const signIn = () => { navigation.navigate("SignIn"); };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("USR_TOKEN");
      if (value !== null) {
        setShowSignIn(false);
      } else {
        signIn();
      }
    } catch (e) {
      // error reading value
    }
  };
  getData();

  return (
    <SafeAreaView style={{
    flex: 1 }}>
      <TopNavigation title="TASKORD" alignment="center" />
      <Divider />
      <Layout
        style={{
    flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        { showSignIn ? <Button onPress={signIn}>Sign In</Button> :  <Button onPress={signIn}>Sign Out</Button> }
      </Layout>
    </SafeAreaView>
  );
};
