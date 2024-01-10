import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://pvbce.io.vn/API",
  //   headers: {
  //     TokenPVB:
  //       "oiMTcxNjUwODgwMDAwMCMCwiZXhwIjoxNzE2NjU2NDAwfQ.HsoestvkIN5Kub3jnAr8UddrPugJcxCsAm4QfMi4ZbU",
  //   },
});

export default baseAPI;
