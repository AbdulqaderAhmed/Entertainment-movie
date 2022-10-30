import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
