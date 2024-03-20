import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./authentication.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { changePasswordAPI } from "../../../apis/authenticationAPI";
import Swal from "sweetalert2";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự,1 ký tự hoa, 1 ký tự thường và 1 ký tự số"
      ),
    retypePassword: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự,1 ký tự hoa, 1 ký tự thường và 1 ký tự số"
      ),
  })
  .required();

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(schema) });

  const param = useParams();
  const handleSendPassword = async (e) => {
    console.log("param", param);
    // const status = await changePasswordAPI(e.password, param.code);
    // console.log(status);
    // if (status) {
    //   Swal.fire("Thay đổi mật khẩu thành công!");
    //   navigate("/signin");
    // }
  };

  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <div className="form" style={{ width: "500px" }}>
        <h3>Đổi mật khẩu</h3>
        <p>Vui lòng nhập mật khẩu mới.</p>
        <form onSubmit={handleSubmit(handleSendPassword)}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <TextField
              id="password"
              type={visible ? "text" : "password"}
              size="small"
              className="w-100"
              label="Mật khẩu mới"
              {...register("password")}
            />
            <div
              onClick={() => setVisible(!visible)}
              className="mt-1"
              style={{ position: "absolute", right: "10px" }}
            >
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>

          <span className="text-danger ">{errors.password?.message}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <TextField
              size="small"
              id="retypePassword"
              type={visible ? "text" : "password"}
              className="w-100 mt-3"
              label="Nhập lại mật khẩu mới"
              {...register("retypePassword")}
            />

            <div
              onClick={() => setVisible(!visible)}
              className="mt-4"
              style={{ position: "absolute", right: "10px" }}
            >
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <span className="text-danger ">{errors.retypePassword?.message}</span>
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
            <button className="ms-3 btn btn-primary" style={{ width: "100px" }}>
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
