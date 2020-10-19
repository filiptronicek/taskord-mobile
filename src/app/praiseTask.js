import AsyncStorage from "@react-native-community/async-storage";

import {api_endpoint as url} from "../consts";

const fetch = require("node-fetch");

export const praiseTask = async (id) => {
    const token = await AsyncStorage.getItem("USR_TOKEN");

    const query = `
        mutation {
            praiseTask(id: ${id}) {
            response
            }
        }
    `;

    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({query})
    };

    return fetch(url, opts).then((res) => res.json()).then((resp) => resp);
};
