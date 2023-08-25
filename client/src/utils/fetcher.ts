import { Fetcher } from "../@types";

const fetcher: Fetcher = {
  get: async (url) => {
    let res = await fetch(url);
    return await res.json();
  },
  post: async (url, body) => {
    let res = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
    });
    return await res.text();
  },
};

export default fetcher;
