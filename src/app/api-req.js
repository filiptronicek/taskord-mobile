import AsyncStorage from "@react-native-community/async-storage";

import {api_endpoint as url} from "../consts";

const fetch = require("node-fetch");

export const requestData = async (params, args = {}) => {
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
        tasks(first: 25 done: true) {
          pageInfo {
            hasNextPage
            currentPage
          }
          edges {
            node {
              user {
                username
                avatar
              }
              id
              task
              created_at
              done_at
              done
              praises (first: 100) {
                edges {
                  node {
                    username
                  }
                }
              }
            }
          }
        }
      }
      `;
    }

    if(params === "postTask") {
      query = `
        mutation {
          createTask(task: "${args.taskText}", done: true, source: "Taskord mobile") {
            task {
              task
            }
            response
          }
        }
        `;
    }

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
