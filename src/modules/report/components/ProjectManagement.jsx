import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

import {
  listProjectsAPI,
  deleteProjectAPI,
  selectProjectAPI,
} from "../../../../src/apis/reportAPI";
import { Box, CircularProgress, Container } from "@mui/material";
import ListProjects from "./ListProjects";

import { listEquipmentsAPI } from "../../../apis/equipmentAPI";

export default function ProjectManagement() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await listEquipmentsAPI();
      toast.success("Lấy danh sách thiết bị thành công");
      console.log(data);
      setProjects(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching equipments:", error);
      toast.error("Lấy danh sách thiết bị thất bại");
    }
  };

  // Xóa thiết bị
  const handleDeleteProject = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa thiết bị? ",
        text: "Thiết bị này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa thiết bị",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteProjectAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Thiết bị đã được xóa thành công.",
          icon: "success",
        });
        fetchProjects();
      }
    } catch (error) {
      toast.error("Xóa thiết bị thất bại");
    }
  };

  const handleSelectProject = async (id) => {
    try {
      const data = await selectProjectAPI(id);
      setSelectedProject(data);
      navigate(`/catalogue/edit/${id}`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Container maxWidth="lg">
        <Toaster position="top-right" />
        {/* BTN khởi tạo dự án */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => navigate("/report/create-project")}
            className="btn btn-primary"
          >
            Thêm dự án mới
          </button>
        </div>
        {/* Danh sách dự án*/}

        {!isLoading ? (
          <ListProjects
            rows={projects}
            onDelete={handleDeleteProject}
            onEdit={handleSelectProject}
          />
        ) : (
          <Box sx={{ display: "block", textAlign: "center" }}>
            <CircularProgress size={"100px"} style={{ marginTop: "10%" }} />
          </Box>
        )}
      </Container>
    </div>
  );
}
