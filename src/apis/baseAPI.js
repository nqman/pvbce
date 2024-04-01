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

const baseAPI = createBaseAPI(token);

export default baseAPI;
