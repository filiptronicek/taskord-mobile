import AsyncStorage from "@react-native-community/async-storage";

export const token = async() => {
    const value = await AsyncStorage.getItem("USR_TOKEN");
    return value;
};