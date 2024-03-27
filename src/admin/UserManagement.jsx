import React, { useEffect, useState } from "react";
import ListUser from "./components/ListUser";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import {
  deleteUserAPI,
  listUserAPI,
  selectUserAPI,
} from "../apis/authenticationAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../modules/home/components/Loading/Loading";
import { Container } from "@mui/material";

export default function UserManagement() {
  const role = Cookies.get("role");

  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate("/sign-up");
  };

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEquips();
  }, []);

  const fetchEquips = async () => {
    try {
      const data = await listUserAPI();
      // console.log(data);
      toast.success("Lấy danh sách tài khoản thành công");
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching User:", error);
      toast.error("Lấy danh sách tài khoản thất bại");
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
        fetchEquips();
      }
    } catch (error) {
      toast.error("Xóa tài khoản thất bại");
    }
  };

  const handleSelectUser = async (id) => {
    try {
      const data = await selectUserAPI(id);
      setSelectedUser(data);
      navigate(`/catalogue/edit/${id}`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
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
          {/* {console.log(role)}
      {console.log(role == "Admin")} 
      ??????
      */}

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
          />
        ) : (
          <Loading />
        )}
      </div>
    </Container>
  );
}
