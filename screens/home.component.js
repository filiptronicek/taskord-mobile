import AsyncStorage from "@react-native-community/async-storage";
import { Button, Divider, Layout, TopNavigation, Avatar } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import { signOut } from "../src/auth/signout";
import { requestData } from "../src/app/api-req";

export const HomeScreen = ({ navigation }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [avatarURL, setAvatarURL] = useState("https://avatars0.githubusercontent.com/u/848102?s=200&v=4");

  const getAvatar = async() => {
    const reqRes = await requestData();
    setAvatarURL(reqRes.data.me.avatar);
  };
  getAvatar();

  const signIn = () => {
    navigation.navigate("SignIn");
  };

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

  const signUserOut = async () => {
    signOut();
    getData();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TopNavigation title="TASKORD" alignment="center" />
      <Divider />
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <Avatar source={{uri: avatarURL}}/>
        {showSignIn ? (
          <Button onPress={signIn}>Sign In</Button>
        ) : (
          <Button onPress={signUserOut}>Sign Out</Button>
        )}
      </Layout>
    </SafeAreaView>
  );
};
