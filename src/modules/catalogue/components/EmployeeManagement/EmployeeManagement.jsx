import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ListEmployees from "./ListEmployees";
import Swal from "sweetalert2";

// API

import {
  listEmployeesAPI,
  deleteEmployeeAPI,
  selectEmployeeAPI,
} from "../../../../apis/employeeAPI";
import { Box, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import Loading from "../../../home/components/Loading/Loading";

export default function EmployeeManagement() {
  // const role = Cookies.get("role");
  const role = Cookies.get("role")?.replace(/"/g, "");
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/catalogue/employee/create");
  };

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await listEmployeesAPI();
      // toast.success("Lấy danh sách nhân sự thành công");
      setEmployees(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Employees:", error);
      toast.error("Lấy danh sách nhân sự thất bại");
    }
  };

  // Xóa nhân sự
  const handleDeteleEmployee = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa nhân sự? ",
        text: "Nhân sự này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa nhân sự",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteEmployeeAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Nhân sự đã được xóa thành công.",
          icon: "success",
        });
        fetchEmployees();
      }
    } catch (error) {
      toast.error("Xóa nhân sự thất bại");
    }
  };

  const handleSelectEmployee = async (id) => {
    try {
      const data = await selectEmployeeAPI(id);
      setSelectedEmployee(data);
      navigate(`/catalogue/edit/${id}`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Toaster position="top-right" />
      {/* BTN THÊM nhân sự */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        {role && role === "Admin" && (
          <button
            disabled={!role === "Admin" ? true : false}
            onClick={() => handleAdd()}
            className="btn btn-primary"
          >
            Thêm nhân sự
          </button>
        )}
      </div>
      {/* Danh sách nhân sự*/}

      {!isLoading ? (
        <ListEmployees
          role={role}
          rows={employees}
          onDelete={handleDeteleEmployee}
          onEdit={handleSelectEmployee}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
