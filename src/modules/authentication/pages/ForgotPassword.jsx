import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./authentication.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { forgotPasswordAPI } from "../../../apis/authenticationAPI";
import Swal from "sweetalert2";
import Loading from "../../home/components/Loading/Loading";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .email("Email không đúng định dạng"),
  })
  .required();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(schema) });

  const handleSendEmail = async (e) => {
    // debugger;

    setIsLoading(true);
    try {
      console.log(e.email);
      const status = await forgotPasswordAPI(e.email);
      setIsLoading(false);

      if (!status) {
        Swal.fire("Email không tồn tại!");
      } else {
        Swal.fire("Vui lòng kiểm tra email để tạo mật khẩu mới!");
        navigate("/");
      }
    } catch (error) {}
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <div className="form" style={{ width: "500px" }}>
        <h3>Quên mật khẩu</h3>
        <p>Vui lòng nhập địa chỉ email để lấy lại mật khẩu.</p>
        <form onSubmit={handleSubmit(handleSendEmail)}>
          <TextField
            id="email"
            size="small"
            type="email"
            className="w-100"
            label="Email"
            {...register("email")}
          />
          <span className="text-danger ">{errors.email?.message}</span>

          <div
            className="mt-3"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              onClick={() => navigate("/signin")}
              className=" btn btn-outline-secondary"
              style={{ width: "100px" }}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="ms-3 btn btn-primary"
              style={{ width: "100px" }}
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
