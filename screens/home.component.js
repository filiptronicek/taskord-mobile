import AsyncStorage from "@react-native-community/async-storage";
import { Button, Divider, Layout, TopNavigation, Avatar, Card, List, Text, CheckBox, Icon, Modal, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { ProfileModal } from "../src/components/avatarModal";

import { signOut } from "../src/auth/signout";
import { requestData } from "../src/app/api-req";
import { praiseTask } from "../src/app/praiseTask";
import { styles } from "../src/app/includes/styles";

import { placeHolder } from "../src/app/inputPlaceholder";

/* Day.js options */

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const utc = require('dayjs/plugin/utc');

dayjs.extend(relativeTime);
dayjs.extend(utc);

const plusIcon = ( props ) => (
  <Icon {...props} name='plus-outline'/>
);

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

    const allPraises = info.item.node.praises.edges.map((item) => item.node.username);
    const IPraised = allPraises.includes("filip");

    const [praised, setPraised] = useState(IPraised);

    const togglePraise = async() => {
      const resp = await praiseTask(info.item.node.id);
      if(!resp.data.praiseTask.response.includes("can't")) setPraised(!praised); 
      else Alert.alert("Error praising task", "You cannot praise your own task!")
    }

    return (
    <View>
      <Text {...footerProps}>
      #{info.item.node.id} by {info.item.node.user.username}     
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

    const dateTrue = info.item.node.done ? info.item.node.done_at : info.item.node.created_at;
    const date = dayjs.utc(dateTrue).fromNow();

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
  const [visible, setVisible] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const [avatarURL, setAvatarURL] = useState("assets/image-person.png");
  const [tasks, setTasks] = useState("");

  const getTasks = async() => {
    if(tasks === "" || tasks === undefined) {
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
      <Button onPress={signUserOut}>Sign Out</Button>
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
            <ProfileModal></ProfileModal>
            <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            style={{width: "95%"}}
            onBackdropPress={() => setVisible(false)}>
              <Card disabled={true}>
                <Text category="h4">Post a new task</Text>
                <Input
                placeholder={placeHolder}
                value={inputValue}
                onChangeText={nextValue => setInputValue(nextValue)}
                />
                <Layout style={{...styles.lContainer, width: '100%'}}>
                  <Layout style={styles.layout}>
                    <Button onPress={() => setVisible(false)} appearance="ghost">
                      DISMISS
                    </Button>
                  </Layout>
                  <Layout style={styles.layout}>
                  </Layout>
                  <Layout style={styles.layout}>
                    <Button onPress={() => setVisible(false)}>
                      POST
                    </Button>
                  </Layout>
                </Layout>

              </Card>
            </Modal>
            <ListCustomItemShowcase data={tasks?.tasks?.edges} />
            <Layout style={{...styles.lContainer, marginBottom: 50}}>

            <Layout style={styles.layout}>
            </Layout>
            <Layout style={styles.layout}>
            </Layout>
            <Layout style={styles.layout}>
            <Button status='primary' appearance='filled' accessoryLeft={plusIcon} size='giant' onPress={() => {setVisible(true)}}></Button>
              </Layout>
              </Layout>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};
