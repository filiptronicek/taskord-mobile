import AsyncStorage from "@react-native-community/async-storage";
import { Button, Divider, Layout, TopNavigation, Avatar, Card, List, Text, CheckBox} from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

import { signOut } from "../src/auth/signout";
import { requestData } from "../src/app/api-req";

/* Day.js options */

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const ListCustomItemShowcase = ( props ) => {

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        <CheckBox
          style={styles.checkbox}
          status='success'
          checked={info.item.node.done}
          >
          {info.item.node.task}
        </CheckBox>
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => {
    const [praised, setPraised] = useState(false);
    const togglePraise = () => {
      setPraised(!praised);
    }
    
    return (
    <View>
      <Text {...footerProps}>
        By {info.item.node.user.username}     
      </Text>
      <Layout style={styles.lContainer}>
      <Layout style={styles.layout}>
        </Layout>
        <Layout style={styles.layout}>
        </Layout>

        <Layout style={styles.layout}>
          <Button style={styles.button} appearance={praised ?  'filled' : 'outline'} size='large' onPress={togglePraise}>
            👏
          </Button>
        </Layout>

        <Layout style={styles.layout}>
          <Button style={styles.button} appearance='outline' size='large'>
            💬
          </Button>
        </Layout>

      </Layout>
    </View>
  )};

  const renderItem = (info) => {

    const date = info.item.node.done ? dayjs(info.item.node.done_at).fromNow() : dayjs(info.item.node.created_at).fromNow();
    return (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={footerProps => renderItemFooter(footerProps, info)}>
      <Text>
        {info.item.node.done ? "Done" : "Created" } {date}
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
  
  const [avatarURL, setAvatarURL] = useState("assets/image-person.png");
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
            <Text category="h2" style={{marginLeft: 10}}>Tasks</Text>
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
  button: {
    width: "90%"
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
