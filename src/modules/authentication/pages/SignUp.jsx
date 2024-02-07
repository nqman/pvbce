import { TextField } from "@mui/material";
import React from "react";

export default function SignUp() {
  return (
    <div>
      <h3 className="text-center m-3">Sign Up</h3>
      <form
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField className="w-25 mb-3" size="small" label="Tên" />
        <TextField className="w-25 mb-3" size="small" label="Mật khẩu" />
        <TextField
          className="w-25 mb-3"
          size="small"
          type="email"
          label="Email"
        />
        <TextField className="w-25 mb-3" size="small" label="Số điện thoại" />
      </form>
    </div>
  );
}
