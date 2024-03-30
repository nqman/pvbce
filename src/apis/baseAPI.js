import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token")?.replace(/"/g, "");

// const createBaseAPI = (token) => {
//   if (token && token !== null) {
//     return axios.create({
//       baseURL: "http://103.82.39.125:8080/",
//       headers: {
//         Authorization: `Bearer ${token.replace(/"/g, "")}`,
//       },
//     });
//   } else {
//     return axios.create({
//       baseURL: "http://103.82.39.125:8080/",
//     });
//   }
// };
const createBaseAPI = (token) => {
  if (token && token !== null) {
    return axios.create({
      baseURL: "https://pvbce.io.vn/API/",
      headers: {
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      },
    });
  } else {
    return axios.create({
      baseURL: "https://pvbce.io.vn/API/",
    });
  }
};
const updateBaseAPI = () => {
  const newToken = Cookies.get("token")?.replace(/"/g, "");
  if (newToken !== token) {
    token = newToken;
    baseAPI = createBaseAPI(token);
  }
};

// Gọi updateBaseAPI mỗi khi bạn muốn kiểm tra và cập nhật token từ cookie.
updateBaseAPI();
const baseAPI = createBaseAPI(token);

export default baseAPI;
