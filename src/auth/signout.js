import AsyncStorage from "@react-native-community/async-storage";

export const signOut = async () => {
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem("usr_token");
    } catch (e) {
      // remove error
    }
  };
};
