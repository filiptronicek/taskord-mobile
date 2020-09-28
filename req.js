import fetch from "node-fetch";
require("dotenv").config();

export function datafc() {
  const url = `https://taskord.com/graphql`;
  const query = `
    {
        tasks(first: 20, page: 1) {
        paginatorInfo {
            count
            currentPage
            perPage
        }
        data {
            task
            user {
            username
            firstname
            lastname
            }
        }
        }
    }
 `;

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({ query }),
  };
  return fetch(url, opts)
    .then((res) => res.json())
    .then((resp) => resp)
    .catch(console.error);
}
