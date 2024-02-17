import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../../apis/authenticationAPI";
import "./authentication.css";
import { Alert, AlertTitle } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function VerifyUser() {
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    verifyUser(param);

    // navigate("/signin");
  }, []);

  return (
    <div className="w-50 mt-2 text-center m-auto ">
      {/* <div className="text-center d-block"> */}
      <Alert severity="success">
        <AlertTitle className="text-start">Thông báo</AlertTitle>
        Tài khoản của bạn đã được kích hoạt thành công
      </Alert>
      {/* </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "relative",
          marginTop: "20px",
        }}
      >
        <a
          // className="home-icon"
          style={{ position: "absolute", left: "200px" }}
          href="/"
          className="btn btn-outline-primary"
        >
          <KeyboardReturnIcon />
          <HomeIcon />
        </a>
        <button
          className="btn btn-success w-25"
          onClick={() => navigate("/signin")}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
