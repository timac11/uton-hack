import * as axios from "axios";
import {getToken} from "../components/auth/localStorage";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/`;

export class ApiProvider {
  static async getRequest(url, params) {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
    const result = await axios.default.get(`${BASE_URL + url}`, {params, headers});
    console.log(result);
    return result.data;
  }

  static async addFormToBlockchain(url) {
    const result = await axios.default.post(` https://desolate-peak-15444.herokuapp.com/google_form`, {url});
    return result.data;
  }

  static async postRequest(url, body) {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
    const result = await axios.default.post(`${BASE_URL + url}`, body, {headers});
    console.log(result);
    return result;
  }
}
