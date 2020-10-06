import AsyncStorage from "@react-native-community/async-storage";

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("USR_TOKEN");
  } catch (e) {
    alert("Failed to log you out :(");
  }
};
