const fetch = require("node-fetch");
import { api_endpoint as url} from '../consts';

export const signIn = async (email, password) => {
  const query = `
        mutation {
            login(email: "${email}", password: "${password}") {
            token
            response
            user {
                id
            }
            }
        }
   `;

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  return fetch(url, opts)
    .then((res) => res.json())
    .then((resp) => resp);
  //.catch(console.error);
};
