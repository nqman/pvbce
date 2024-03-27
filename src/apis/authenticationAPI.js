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
//sign up
export async function addUserAPI(user) {
  try {
    const formData = new FormData();
    formData.append("name", user.name);
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
export async function selectUserAPI(email) {
  try {
    const resp = await baseAPI.get(`users/${email}`);
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
//check trùng email
export async function checkEmailAPI(valueOfEmail) {
  try {
    // console.log(valueOfEmail);

    const resp = await baseAPI.get(
      `authenticate/validate/email/${valueOfEmail}`
    );
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Verify
export async function verifyUser(data) {
  try {
    const code = data.code;
    const resp = await baseAPI.get(`authenticate/verify/${code}`);
    return resp;
  } catch (error) {}
}

//Forgot Password
export async function forgotPasswordAPI(valueOfEmail) {
  try {
    const resp = await baseAPI.get(
      `authenticate/forgot-password/${valueOfEmail}`
    );
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//change Password
export async function changePasswordAPI(newPassword, param) {
  try {
    const formData = new FormData();
    formData.append("newPassword", newPassword);
    formData.append("verificationCode", param);
    const resp = await baseAPI.post("authenticate/change-password", formData);
    return resp;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//sign in

export async function getToken(account) {
  try {
    const resp = await baseAPI.post(`user/login`, account);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
