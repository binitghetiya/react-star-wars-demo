import { BASE_API_URL } from "./../config/config";
import axios from "axios";

export const verifyLoginRequest = async username => {
  const url = `${BASE_API_URL}people/?search=${username}`;
  const res = await axios.get(url);
  if (res.status === 200 && res.data.count === 1) {
    return res.data.results[0];
  }
  return false;
};
export const getPlanetsRequest = async name => {
  const url = `${BASE_API_URL}planets/?search=${name}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data.results;
  }
  return false;
};
