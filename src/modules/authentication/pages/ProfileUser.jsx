import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserAPI } from "../../../apis/authenticationAPI";
import "./authentication.css";

export default function ProfileUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const res = await selectUserAPI(JSON.parse(Cookies.get("email") || ""));
      console.log("res", res);
      setUser(res);
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <div className="form" style={{ minWidth: "500px" }}>
        <h3 style={{ marginBottom: 20, color: "#00477b" }}>
          Thông tin tài khoản
        </h3>

        <div
          style={{
            fontSize: 17,
            marginBottom: 20,
            borderBottom: "1px solid black",
            paddingBottom: 10,
            fontWeight: 600,
          }}
        >
          Name : <span style={{ color: "black" }}>{user?.name}</span>
        </div>
        <div
          style={{
            fontSize: 17,
            marginBottom: 20,
            borderBottom: "1px solid black",
            paddingBottom: 10,
            fontWeight: 600,
          }}
        >
          Email : <span style={{ color: "black" }}>{user?.email}</span>
        </div>
        <div
          style={{
            fontSize: 17,
            marginBottom: 20,
            borderBottom: "1px solid black",
            paddingBottom: 10,
            fontWeight: 600,
          }}
        >
          Phone Number : <span style={{ color: "black" }}>{user?.phone}</span>
        </div>
        <div
          style={{
            fontSize: 17,
            marginBottom: 20,
            borderBottom: "1px solid black",
            paddingBottom: 10,
            fontWeight: 600,
          }}
        >
          Role :{" "}
          <span style={{ color: "black" }}>
            {user?.roles[0]?.name || "User"}
          </span>
        </div>

        <button
          onClick={() => navigate(`/forgot-password`)}
          className="btn btn-primary"
          style={{ paddingInline: "20px" }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
