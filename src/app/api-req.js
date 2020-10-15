import AsyncStorage from "@react-native-community/async-storage";

import {api_endpoint as url} from "../consts";

const fetch = require("node-fetch");

export const requestData = async (params) => {
    const token = await AsyncStorage.getItem("USR_TOKEN");

    let query;

    if (params === "avatar") {
        query = `
      {
        me {
          avatar
          id
        }
      }
    `;
    }

    if (params === "tasks") {
        query = `
      {
        tasks(first: 50) {
          pageInfo {
            hasNextPage
            currentPage
          }
          edges {
            node {
              id
              task
            }
          }
        }
      }
      `;
    }

    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({query})
    };

    return fetch(url, opts).then((res) => res.json()).then((resp) => resp);
};
