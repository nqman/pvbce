import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="d-flex" style={{ justifyContent: "center" }}>
      <div className="form">
        <form action="">
          <div className="mb-3">
            <TextField
              id="user"
              type="text"
              label="Tài khoản"
              size="small"
              style={{ width: "500px" }}
            />
          </div>
          <div>
            <TextField
              label="Mật khẩu"
              id="password"
              type="text"
              size="small"
              style={{ width: "500px" }}
            />
          </div>
          <button className="button-9">Đăng nhập</button>
        </form>
        <div style={{ borderBottom: "1px solid", margin: "30px -20px" }}></div>
        <div className="text-center">
          <button onClick={() => handleSignUp()} className="button-8">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
