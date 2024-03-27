import React, { useEffect, useState } from "react";
import ListUser from "./components/ListUser";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import {
  checkEmailAPI,
  deleteUserAPI,
  enableUserAPI,
  listRolesAPI,
  listUserAPI,
  selectUserAPI,
  updateUserAPI,
} from "../apis/authenticationAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../modules/home/components/Loading/Loading";
import {
  Container,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    password: yup.string(),
    // .required("Vui lòng không bỏ trống")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    //   "Mật khẩu ít nhất 8 kí tự,1 ký tự hoa, 1 ký tự thường và 1 ký tự số"
    // ),
  })
  .required();

export default function UserManagement() {
  const role = Cookies.get("role");

  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate("/signup");
  };

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [valueRole, setValueRole] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      roleName: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [visible, setVisible] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);
  const handleCheckEmail = async (e) => {
    try {
      setCheckEmail(await checkEmailAPI(e.target.value));
    } catch (error) {}
  };
  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    try {
      const data = await listUserAPI();
      const listRoles = await listRolesAPI();
      console.log(listRoles);
      toast.success("Lấy danh sách tài khoản thành công");
      setListRoles(listRoles);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching User:", error);
      toast.error("Lấy danh sách tài khoản thất bại");
    }
  };
  //Kích hoạt tài khoản
  const handleEnable = async (email, status) => {
    try {
      const result = await Swal.fire({
        title: "Bạn có muốn kích hoạt tài khoản?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Có",
        denyButtonText: `Không`,
      });
      if (result.isConfirmed) {
        await enableUserAPI(email, status);
        Swal.fire("Đã kích hoạt!", "", "success");
        fetchListUser();
      } else if (result.isDenied) {
        return;
      }
    } catch (error) {
      toast.error("Xóa tài khoản thất bại");
    }
  };

  // Xóa tài khoản
  const handleDeteleUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa tài khoản? ",
        text: "tài khoản này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa tài khoản",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteUserAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Tài khoản đã được xóa thành công.",
          icon: "success",
        });
        fetchListUser();
      }
    } catch (error) {
      toast.error("Xóa tài khoản thất bại");
    }
  };

  const handleSelectUser = async (id) => {
    // debugger;
    try {
      const data = await selectUserAPI(id);
      console.log(data);
      setValue("id", data.id);
      setValue("name", data.name);
      setValue("phone", data.phone);
      setValue("email", data.email);
      setValue("roleId", data.roles[0]?.id);
      setValue("roleName", data.roles[0]?.name);
      setValue("roleDescription", data.roles[0]?.description);
      setValue("enable", data.enable);
      setValue("root", data.root);
      setValueRole(data.roles[0]?.name);
      // setValue("password", data.password);
      // setSelectedUser(data);
      handleShow();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };
  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleUpdate = async (user) => {
    // debugger;
    setIsLoading(true);
    console.log(user);
    try {
      await updateUserAPI(user);
      setShow(false);
      setIsLoading(false);
      toast.success("Cập nhật tài khoản thành công");

      fetchListUser();
    } catch (error) {
      toast.error("Cập nhật tài khoản thất bại");
    }
  };
  const handleShow = () => setShow(true);
  const handleChangeRole = (e) => {
    // console.log(e.target);
    const selectedRole = e.target.value;
    const parts = selectedRole.split(";");
    const id = parts[0];
    const name = parts[1];
    const description = parts[2];

    setValue("roleId", id);
    setValue("roleName", name);
    setValue("roleDescription", description);
  };

  return (
    <Container maxWidth="lg">
      <div style={{ position: "relative" }}>
        <Toaster position="top-right" />
        {/* BTN THÊM tài khoản */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          {role && !role !== "Admin" && (
            <button
              disabled={!role === "Admin" ? true : false}
              onClick={() => handleAddUser()}
              className="btn btn-primary"
            >
              Thêm tài khoản
            </button>
          )}
        </div>
        {/* Danh sách tài khoản*/}

        {!isLoading ? (
          <ListUser
            role={role}
            rows={users}
            onDelete={handleDeteleUser}
            onEdit={handleSelectUser}
            onEnable={handleEnable}
          />
        ) : (
          <Loading />
        )}
        {/* MODAL */}
        <Modal size="md" show={show} onHide={handleClose}>
          <form
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              // width: "500px",
            }}
            onSubmit={handleSubmit(handleUpdate)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3 w-100">
                <div>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Role
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={valueRole}
                    name="radio-buttons-group"
                    // onChange={(event) => setValue("roles", event.target.value)}
                    onChange={handleChangeRole}
                  >
                    {listRoles.map((role) => (
                      <FormControlLabel
                        // name={`${role.id};${role.description}`}
                        value={`${role.id};${role.name};${role.description}`}
                        control={<Radio />}
                        label={`${role.name} - ${role.description}`}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>
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
                  className="w-100 "
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
                  type="email"
                  label="Email"
                  disabled={true}
                  {...register("email")}
                  onBlur={handleCheckEmail}
                />
                <span className="text-danger ">{errors.email?.message}</span>
                {checkEmail ? (
                  ""
                ) : (
                  <span className="text-danger ">Email đã tồn tại</span>
                )}
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
                    // value={selectedUser?.password}
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                Cập nhật
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </Container>
  );
}
