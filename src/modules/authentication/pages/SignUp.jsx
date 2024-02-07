import { Button, TextField } from "@mui/material";
import React from "react";

export default function SignUp() {
  return (
    <div>
      <h3 className="text-center m-3">Đăng ký</h3>
      <form
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField className="w-25 mb-3" size="small" label="Họ tên" />
        <TextField className="w-25 mb-3" size="small" label="Mật khẩu" />
        <TextField
          className="w-25 mb-3"
          size="small"
          type="email"
          label="Email"
        />
        <TextField className="w-25 mb-3" size="small" label="Số điện thoại" />
        <Button type="submit" variant="contained">
          Đăng ký
        </Button>
      </form>
    </div>
  );
}
