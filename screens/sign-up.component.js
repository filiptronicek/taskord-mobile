import React, { useState } from 'react';
import { View } from "react-native";
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { ProfileAvatar } from "./extra/profile-avatar.component";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  PlusIcon,
} from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";

export const SignUpScreen = ({ navigation }) => {
  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = () => {
    navigation && navigation.navigate("SignIn");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEditAvatarButton = () => (
    <Button style={styles.editAvatarButton} status="basic" icon={PlusIcon} />
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <ProfileAvatar
          style={styles.profileAvatar}
          resizeMode="center"
          source={require("./assets/image-person.png")}
          editButton={renderEditAvatarButton}
        />
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="User Name"
          icon={PersonIcon}
          value={userName}
          onChangeText={setUserName}
        />
        <Input
          style={styles.emailInput}
          autoCapitalize="none"
          placeholder="Email"
          icon={EmailIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          autoCapitalize="none"
          secureTextEntry={!passwordVisible}
          placeholder="Password"
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          onChangeText={setPassword}
          onIconPress={onPasswordIconPress}
        />
        <CheckBox
          style={styles.termsCheckBox}
          textStyle={styles.termsCheckBoxText}
          text="I read and agree to Terms & Conditions"
          checked={termsAccepted}
          onChange={(checked) => setTermsAccepted(checked)}
        />
      </Layout>
      <Button
        style={styles.signUpButton}
        size="giant"
        onPress={onSignUpButtonPress}
      >
        SIGN UP
      </Button>
      <Button
        style={styles.signInButton}
        appearance="ghost"
        status="basic"
        onPress={onSignInButtonPress}
      >
        Already have an account? Sign In
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
    backgroundColor: "color-primary-default",
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "color-primary-default",
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: "text-hint-color",
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
