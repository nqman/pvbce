import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import "./authentication.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { addUserAPI } from "../../../apis/authenticationAPI";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const schema = yup
  .object({
    name: yup.string().required("Vui lòng không bỏ trống"),
    email: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .email("Email không đúng định dạng"),
    phone: yup.string().required("Vui lòng không bỏ trống"),
    password: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự,1 ký tự hoa, 1 ký tự thường và 1 ký tự số"
      ),
  })
  .required();

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (user) => {
    setIsLoading(true);
    await addUserAPI(user);
    alert("Vui lòng xác nhận tài khoản qua email của bạn!");
    navigate("/signin");
  };

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "block", textAlign: "center" }}>
          <CircularProgress size={"100px"} style={{ marginTop: "10%" }} />
          <h1 style={{ marginTop: "20px" }}>Vui lòng đợi...</h1>
        </Box>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="form"
            style={{ width: "500px", position: "relative" }}
          >
            <h3 className="text-center mb-3">Đăng ký</h3>
            <form
              style={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              }}
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="mb-3 w-100">
                <TextField
                  className="w-100"
                  size="small"
                  label="Họ tên"
                  {...register("name")}
                />
                <span className="text-danger ">{errors.name?.message}</span>
              </div>
              <div className="mb-3 w-100">
                <TextField
                  className="w-100 "
                  size="small"
                  label="Số điện thoại"
                  {...register("phone")}
                />
                <span className="text-danger ">{errors.phone?.message}</span>
              </div>
              <div className="mb-3 w-100">
                <TextField
                  className="w-100"
                  size="small"
                  type="email"
                  label="Email"
                  {...register("email")}
                />
                <span className="text-danger ">{errors.email?.message}</span>
              </div>

              <div className="mb-3 w-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <TextField
                    className="w-100 "
                    size="small"
                    label="Mật khẩu"
                    type={visible ? "text" : "password"}
                    {...register("password")}
                  />
                  <div
                    onClick={() => setVisible(!visible)}
                    style={{ position: "absolute", right: "10px" }}
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
                <span className="text-danger ">{errors.password?.message}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <a
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "10px",
                    padding: 0,
                  }}
                  className="btn btn-outline-primary"
                  href="/"
                >
                  <HomeIcon />
                </a>

                <button
                  style={{
                    backgroundColor: "#FB8332",
                    color: "white",
                    fontSize: "16px",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Đăng ký
                </button>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="d-flex mt-2 "
              >
                <p className="mb-0">Bạn đã có tài khoản?</p>
                <button
                  className="btn text-primary"
                  onClick={() => navigate("/signin")}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
