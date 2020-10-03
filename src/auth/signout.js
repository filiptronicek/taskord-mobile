import AsyncStorage from "@react-native-community/async-storage";

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("usr_token");
  } catch (e) {
    alert("Failed to log you out :(");
  }
};
