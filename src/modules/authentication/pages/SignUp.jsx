import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./authentication.css";
//Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import {
  saveUserAPI,
  checkEmailAPI,
  listRolesAPI,
} from "../../../apis/authenticationAPI";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "../../home/components/Loading/Loading";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from "js-cookie";

const schema = yup
  .object({
    name: yup.string().required("Vui lòng không bỏ trống"),
    email: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .email("Email không đúng định dạng"),
    phone: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "SĐT không đúng định dạng"),
    password: yup
      .string()
      .required("Vui lòng không bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự,1 ký tự hoa, 1 ký tự thường và 1 ký tự số"
      ),
  })
  .required();

const token = Cookies.get("token");
const role = Cookies.get("role");
const root = Cookies.get("root");
const rootBoolean = root === "true";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [listRoles, setListRoles] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      roleName: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (user) => {
    debugger;
    try {
      const res = await checkEmailAPI(user?.email);
      console.log("res", res);
      if (!!res) {
        // console.log("ok");
        setIsLoading(true);
        console.log(user);
        await saveUserAPI(user, token);
        if (role && !role !== "Admin") {
          Swal.fire("Tạo tài khoản thành công");
          navigate(-1);
          return;
        }
        Swal.fire("Vui lòng xác nhận tài khoản qua email của bạn!");
        navigate("/signin");
      } else {
        // setCheckEmail(false);
        toast.error("Email đã tồn tại");
        return false;
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    // debugger;
    const fetchListRoles = async () => {
      try {
        // Gọi API hoặc các thao tác khác ở đây bằng async/await
        const response = await listRolesAPI();
        setListRoles(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchListRoles(); // Gọi hàm async trong useEffect
  }, []); // [] đại diện cho dependencies, bạn có thể thay đổi nếu cần thiết

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);

  const handleChangeRole = (e) => {
    // console.log(e.target);
    const selectedRole = e.target.name;
    const parts = selectedRole.split(";");
    const id = parts[0];
    const name = parts[1];
    const description = parts[2];

    setValue("roleId", id);
    setValue("roleName", name);
    setValue("roleDescription", description);
  };
  return (
    <>
      <Toaster position="top-right" />
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="form"
            style={{ width: "500px", position: "relative" }}
          >
            <h3 className="text-center mb-3">Đăng ký</h3>
            <form
              style={{
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              }}
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="mb-3 w-100">
                <TextField
                  className="w-100"
                  size="small"
                  label="Họ tên"
                  {...register("name")}
                />
                <span className="text-danger ">{errors.name?.message}</span>
              </div>
              <div className="mb-3 w-100">
                <TextField
                  className="w-100"
                  size="small"
                  label="Số điện thoại"
                  {...register("phone")}
                />
                <span className="text-danger ">{errors.phone?.message}</span>
              </div>
              <div className="mb-3 w-100">
                <TextField
                  className="w-100"
                  size="small"
                  // type="email"
                  label="Email"
                  {...register("email")}
                />
                <span className="text-danger ">{errors.email?.message}</span>
                {/* {checkEmail ? (
                  ""
                ) : (
                  <span className="text-danger ">Email đã tồn tại</span>
                )} */}
              </div>

              <div className="mb-3 w-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <TextField
                    className="w-100 "
                    size="small"
                    label="Mật khẩu"
                    type={visible ? "text" : "password"}
                    {...register("password")}
                  />
                  <div
                    onClick={() => setVisible(!visible)}
                    style={{ position: "absolute", right: "10px" }}
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
                <span className="text-danger ">{errors.password?.message}</span>
              </div>
              {role && !role !== "Admin" && (
                <div>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Role
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue={valueRole}
                    name="radio-buttons-group"
                    onChange={handleChangeRole}
                  >
                    {listRoles?.map((role) =>
                      rootBoolean || role.name !== "Admin" ? (
                        <FormControlLabel
                          key={role.id}
                          name={`${role.id};${role.name};${role.description}`}
                          value={role.name}
                          control={<Radio />}
                          label={`${role.name} - ${role.description}`}
                        />
                      ) : null
                    )}
                  </RadioGroup>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <button
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "10px",
                    padding: 0,
                  }}
                  className="btn btn-outline-primary"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon />
                </button>

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
                >
                  Đăng ký
                </button>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="d-flex mt-2 "
              >
                <p className="mb-0">Bạn đã có tài khoản?</p>
                <button
                  className="btn text-primary"
                  onClick={() => navigate("/signin")}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
