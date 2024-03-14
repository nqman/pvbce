import Cookies from "js-cookie";

const token = {
  get: () =>
    JSON.parse(
      Cookies.get("token") !== undefined ? Cookies.get("token") : null
    ),

  set: (token) => Cookies.set("token", JSON.stringify(token)),
  remove: () => Cookies.remove("token"),
};

export default token;
