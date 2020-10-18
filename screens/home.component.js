import AsyncStorage from "@react-native-community/async-storage";
import { Button, Divider, Layout, TopNavigation, Avatar, Card, List, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import { signOut } from "../src/auth/signout";
import { requestData } from "../src/app/api-req";

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const ListCustomItemShowcase = ( props ) => {

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {info.item.node.task}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>
      By {info.item.node.user.username}
    </Text>
  );

  const renderItem = (info) => {

    //const date = new Date(info.item.node.created_at);
    return (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={footerProps => renderItemFooter(footerProps, info)}>
      <Text>
        Created {dayjs(info.item.node.created_at).fromNow()}
      </Text>
    </Card>
    );
  };

  return (
    props.data ?
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={props.data}
      renderItem={renderItem}
    />
    : null
  );
};

export const HomeScreen = ({ navigation }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  
  const [avatarURL, setAvatarURL] = useState("https://avatars0.githubusercontent.com/u/848102?s=200&v=4");
  const [tasks, setTasks] = useState("");

  const getTasks = async() => {
    if(tasks === "") {
      const reqRes = await requestData("tasks");
      setTasks(reqRes.data);
    }
  };
  getTasks();

  const getAvatar = async() => {
    const reqRes = await requestData("avatar");
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
      <View style={{alignItems: 'flex-end'}}>
        <Avatar source={{uri: avatarURL}} style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}/>
      </View>
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showSignIn ? (
          <Button onPress={signIn}>Sign In</Button>
        ) : (
          <View>
          <ListCustomItemShowcase data={tasks?.tasks?.edges} />
          <Button onPress={signUserOut}>Sign Out</Button>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 1500,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});
