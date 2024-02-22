import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./authentication.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { addUserAPI, checkEmailAPI } from "../../../apis/authenticationAPI";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "../../home/components/Loading/Loading";
import Swal from "sweetalert2";

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
    Swal.fire("Vui lòng xác nhận tài khoản qua email của bạn!");
    navigate("/signin");
  };

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);
  const handleCheckEmail = async (e) => {
    try {
      setCheckEmail(await checkEmailAPI(e.target.value));
    } catch (error) {}
  };
  return (
    <>
      {isLoading ? (
        <Loading />
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
                {}
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
                  onBlur={handleCheckEmail}
                />
                <span className="text-danger ">{errors.email?.message}</span>
                {checkEmail ? (
                  ""
                ) : (
                  <span className="text-danger ">Email đã tồn tại</span>
                )}
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
                <button
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "10px",
                    padding: 0,
                  }}
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/")}
                >
                  <HomeIcon />
                </button>

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
