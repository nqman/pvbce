import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../../apis/authenticationAPI";
import "./authentication.css";
import { Alert, AlertTitle } from "@mui/material";

export default function VerifyUser() {
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    // Alert("Tài khoản của bạn đã được kích hoạt thành công");
    <Alert severity="success">
      <AlertTitle>Thông báo</AlertTitle>
      Tài khoản của bạn đã được kích hoạt thành công
    </Alert>;
    verifyUser(param);
    navigate("/signin");
  }, []);

  return <></>;
}
