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
export async function listRolesAPI() {
  try {
    const resp = await baseAPI.get("users/roles");
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//sign up
export async function saveUserAPI(user) {
  try {
    const formData = new FormData();
    //edit
    if (user.id) {
      formData.append("id", user.id);
    }
    formData.append("name", user.name);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("roles[0].id", user.roleId);
    formData.append("roles[0].name", user.roleName);
    formData.append("roles[0].description", user.roleDescription);
    formData.append("enable", user.enable);
    formData.append("root", user.root);

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

// export async function updateUserAPI(user) {
//   try {
//     const formData = new FormData();
//     formData.append("id", user.id);
//     formData.append("name", user.name);
//     formData.append("phone", user.phone);
//     formData.append("email", user.email);
//     formData.append("password", user.password);
//     formData.append("roles[0].id", user.roleId);
//     formData.append("roles[0].name", user.roleName);
//     formData.append("roles[0].description", user.roleDescription);
//     formData.append("enable", user.enable);
//     formData.append("root", user.root);

//     const resp = await baseAPI.post("users/save", formData);
//     return resp;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
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
//Enable account
export async function enableUserAPI(email, status) {
  try {
    // const code = data.code;
    const resp = await baseAPI.get(`users/update-enable/${email}/${status}`);
    return resp;
  } catch (error) {}
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
    const resp = await baseAPI.post(`authenticate/login`, account);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
