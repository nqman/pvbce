import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import baseAPI from "../../apis/baseAPI";
import token from "../../utils/token";
import Swal from "sweetalert2";

const initialState = {
  user: {},
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      token.remove();
      Cookies.remove("id");
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    // GET user
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.loading = false;
      state.user = {};
    });
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { handleLogout } = actions;

export default authReducer;

// export const hanldeRegister = createAsyncThunk(
//   "auth/hanldeRegister"

//   // Check email validate
//   // async (payload, thunkApi) => {
//   // console.log("payload", payload);
//   // try {
//   //   const res = await baseAPI.get(
//   //     `authenticate/validate/email/${payload.email}`
//   //   );
//   //   if (res?.data) {
//   //     console.log("ok");
//   //     // const resp = await axios.post(
//   //     //   "https://pvbce.io.vn/API/users/save",
//   //     //   payload
//   //     // );
//   //     // console.log("resp", resp);
//   //     // Swal.fire("Vui lòng xác nhận tài khoản qua email của bạn!");
//   //   } else {
//   //     toast.error("Email da duoc dang ky");
//   //   }
//   // } catch (error) {
//   //   console.log("error", error);
//   // }
//   // }
// );

export const handelLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, thunkApi) => {
    try {
      // call API login with payload
      const res = await axios.post(
        "https://pvbce.io.vn/API/authenticate/login",
        payload
      );
      // get token + id
      const token = res?.data?.token || "";
      const email = res?.data?.user?.email;

      // set token in cookie
      Cookies.set("token", JSON.stringify(token));
      Cookies.set("email", JSON.stringify(email));

      return res?.data?.user;
    } catch (error) {
      const errorInfo = error?.response?.data;
      toast.error(errorInfo?.mess);
      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkApi) => {
    try {
      if (Cookies.get("email")) {
        const res = await axios.get(
          `https://pvbce.io.vn/API/users/${JSON.parse(Cookies.get("email"))}`
        );
        return res?.data;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
