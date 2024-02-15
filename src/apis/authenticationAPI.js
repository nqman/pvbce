import axios from "axios";
import baseAPI from "./baseAPI";

export async function listUserAPI() {
  try {
    const resp = await baseAPI.get("users");
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addUserAPI(user) {
  try {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("password", user.password);
    const resp = await baseAPI.post("users/save", formData);
    // const resp = await axios.post(
    //   "http://103.82.39.125:8080/users/save",
    //   formData
    // );
    return resp;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//delete
export async function deleteUserAPI(id) {
  try {
    const resp = await baseAPI.get(`users/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}
// selected
export async function selectUserAPI(id) {
  try {
    const resp = await baseAPI.get(`users/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editUserAPI(user) {
  try {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("fullName", user.fullName);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("password", user.password);
    const resp = await baseAPI.post("users/save", formData);
    return resp;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Verify

export async function verifyUser(data) {
  try {
    const code = data.code;
    const resp = await baseAPI.get(`verify/${code}`);
    return resp;
  } catch (error) {}
}
