import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .email("Email không đúng định dạng"),
    password: yup.string().required("Vui lòng không bỏ trống"),
  })
  .required();

export default function SignIn() {
  const navigate = useNavigate();
  // const handleSignUp = () => {
  //   navigate("/signup");
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(schema) });

  const handleSignIn = (data) => {
    console.log(data);
  };
  return (
    <div className="d-flex" style={{ justifyContent: "center" }}>
      <div className="form" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">Đăng nhập</h3>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="mb-3 w-100">
            <TextField
              id="email"
              type="email"
              label="Email"
              size="small"
              style={{ width: "100%" }}
              {...register("email")}
            />
            <span className="text-danger ">{errors.email?.message}</span>
          </div>
          <div className="mb-3 w-100">
            <TextField
              label="Mật khẩu"
              id="password"
              type="password"
              size="small"
              style={{ width: "100%" }}
              {...register("password")}
            />
            <span className="text-danger ">{errors.password?.message}</span>
          </div>
          <button className="button-9">Đăng nhập</button>
        </form>
        <div style={{ borderBottom: "1px solid", margin: "30px -20px" }}></div>
        <p className="text-center">Bạn chưa có tài khoản?</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <a
            style={{ position: "absolute", left: 0 }}
            className="home-icon"
            href="/"
          >
            <KeyboardReturnIcon />
            <HomeIcon />
          </a>

          <button onClick={() => navigate("/signup")} className="button-8">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
