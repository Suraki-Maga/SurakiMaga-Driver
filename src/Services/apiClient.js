import axios from "axios";
import * as SecureStore from "expo-secure-store";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "surakimaga_driver_token";
  }

  async setToken(token) {
    this.token = token;
    await SecureStore.setItemAsync(this.tokenName, token);
  }
  getToken = async () => {
    // get Data from Storage
    try {
      const data = await SecureStore.getItemAsync(this.tokenName);
      if (data !== null) {
        this.setToken(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  removeToken = async () => {
    await SecureStore.setItemAsync(this.tokenName, "");
  };
  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      // Authorization: this.token ? `Bearer ${this.token}` : "",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    console.log("hello", headers, data, url, method);
    try {
      const res = await axios({ url, method, data, headers });
      // console.log(res)
      return { data: res.data, error: null };
    } catch (error) {
      console.error("APIclient.makeRequest.error:");
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async verifyUser(credentials) {
    return await this.request({
      endpoint: `driverauth/verify`,
      method: `POST`,
      data: credentials,
    });
  }
  async sendOtp(credentials) {
    return await this.request({
      endpoint: `driverauth/sendOtp`,
      method: `POST`,
      data: credentials,
    });
  }
  async resendOtp() {
    return await this.request({
      endpoint: `driverauth/resendOtp`,
      method: `GET`,
    });
  }
  async submitCredentials(credentials) {
    return await this.request({
      endpoint: `driverauth/submitCredentials`,
      method: `POST`,
      data: credentials,
    });
  }
  async login(credentials) {
    return await this.request({
      endpoint: `driverauth/login`,
      method: `POST`,
      data: credentials,
    });
  }
  async loadDetails() {
    return await this.request({
      endpoint: `driverauth/details`,
      method: `GET`,
    });
  }
  async loadStudentLocations() {
    return await this.request({
      endpoint: `driverauth/studentLocations`,
      method: `GET`,
    });
  }
  async getSpecificStudent(credentials) {
    console.log(credentials);
    return await this.request({
      endpoint: `driverauth/studentDetails`,
      method: `POST`,
      data: credentials,
    });
  }
  async changeProfilePicture(credentials) {
    console.log(credentials);
    return await this.request({
      endpoint: `driverauth/changeProfilePicture`,
      method: `POST`,
      data: credentials,
    });
  }
  async checkCurrentPassword(credentials) {
    return await this.request({
      endpoint: `driverauth/checkCurrentPassword`,
      method: `POST`,
      data: credentials,
    });
  }
  async setNewPassword(credentials) {
    console.log(credentials);
    return await this.request({
      endpoint: `driverauth/setNewPassword`,
      method: `POST`,
      data: credentials,
    });
  }
  async getOtpForNewNo(credentials) {
    console.log(credentials);
    return await this.request({
      endpoint: `driverauth/getOtpForNewNo`,
      method: `POST`,
      data: credentials,
    });
  }
  async submitContact(credentials) {
    console.log(credentials);
    return await this.request({
      endpoint: `driverauth/submitContact`,
      method: `POST`,
      data: credentials,
    });
  }
}

const API = new ApiClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://192.168.1.11:3001"
);

export default API;
