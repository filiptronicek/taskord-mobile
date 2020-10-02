const fetch = require("node-fetch");

export const signIn = async (email, password) => {
  const url = `https://taskord.com/graphql`;
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
    .then((resp) => resp)
    //.catch(console.error);
};
