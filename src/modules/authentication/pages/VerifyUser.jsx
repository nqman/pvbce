import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../../apis/authenticationAPI";

export default function VerifyUser() {
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    alert("Tài khoản của bạn đã được kích hoạt");
    verifyUser(param);
    navigate("/signin");
  }, []);
  // const handleYes = async () => {
  //   console.log("Yes");
  //   alert("Tài khoản của bạn đã được kích hoạt");
  //   await verifyUser(param);
  //   console.log(param);
  //   navigate("/signin");
  // };
  // const handleNo = () => {
  //   console.log("No");
  //   navigate("/");
  // };
  return (
    <div>
      {/* <h2>Xác nhận email</h2>
      <div className="form-group">
        <label htmlFor="confirm form-control">
          Bạn có muốn kích hoạt tài khoản không?
        </label>
        <button className="btn btn-success me-3" onClick={handleYes}>
          Yes
        </button>
        <button className="btn btn-dark" onClick={handleNo}>
          No
        </button>
      </div> */}
    </div>
  );
}
