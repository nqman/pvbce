import { Button, TextField } from "@mui/material";
import React from "react";
import "./signIn.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required("Vui lòng không bỏ trống"),
    email: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .email("Email không đúng định dạng"),
    phone: yup.string().required("Vui lòng không bỏ trống"),
    username: yup.string().required("Vui lòng không bỏ trống"),
    password: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự và không được để trống,1 ký tự hoa, 1 ký tự thường và 1 ký tự số"
      ),
  })
  .required();
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  // const emptyValue = {};
  const handleChange = (e) => {
    // console.log(e);
  };

  const handleSignUp = (e) => {
    // console.log(e);
  };
  const onSubmit = (data) => console.log(data);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="form" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">Đăng ký</h3>

        <form
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3 w-100">
            <TextField
              className="w-100"
              size="small"
              label="Họ tên"
              {...register("fullName")}
            />
            <span className="text-danger ">{errors.fullName?.message}</span>
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
            <TextField
              className="w-100 mb-3"
              size="small"
              label="Số điện thoại"
              {...register("phone")}
            />
            <span className="text-danger ">{errors.phone?.message}</span>
          </div>
          <div className="mb-3 w-100">
            <TextField
              className="w-100 mb-3"
              size="small"
              label="Tài khoản"
              {...register("username")}
            />
            <span className="text-danger ">{errors.username?.message}</span>
          </div>
          <div className="mb-3 w-100">
            <TextField
              className="w-100 mb-3"
              size="small"
              label="Mật khẩu"
              type="password"
              {...register("password")}
            />
            <span className="text-danger ">{errors.password?.message}</span>
          </div>
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
            onClick={() => handleSignUp()}
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
