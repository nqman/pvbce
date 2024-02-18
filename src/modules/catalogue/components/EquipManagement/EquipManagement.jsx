import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ListEquipments from "./ListEquipments";
import Swal from "sweetalert2";

// API

import axios from "axios";
import {
  listEquipmentsAPI,
  deleteEquipmentAPI,
  selectEquipmentAPI,
} from "../../../../apis/equipmentAPI";
import { Box, CircularProgress } from "@mui/material";
// const listEquipmentsAPI = "https://pvbce.io.vn/API/products";

export default function EquipManagement() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/catalogue/create");
  };

  const [equips, setEquips] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEquips();
  }, []);

  const fetchEquips = async () => {
    try {
      const data = await listEquipmentsAPI();
      toast.success("Lấy danh sách thiết bị thành công");
      setEquips(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching equipments:", error);
      toast.error("Lấy danh sách thiết bị thất bại");
    }
  };

  // Xóa thiết bị
  const handleDeteleEquip = async (id) => {
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
        await deleteEquipmentAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Thiết bị đã được xóa thành công.",
          icon: "success",
        });
        fetchEquips();
      }
    } catch (error) {
      toast.error("Xóa thiết bị thất bại");
    }
  };

  const handleSelectEquip = async (id) => {
    try {
      const data = await selectEquipmentAPI(id);
      setSelectedEquip(data);
      navigate(`/catalogue/edit/${id}`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Toaster position="top-right" />
      {/* BTN THÊM THIẾT BỊ */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => handleAdd()} className="btn btn-primary">
          Thêm thiết bị
        </button>
      </div>
      {/* Danh sách thiết bị*/}

      {!isLoading ? (
        <ListEquipments
          rows={equips}
          onDelete={handleDeteleEquip}
          onEdit={handleSelectEquip}
        />
      ) : (
        <Box sx={{ display: "block", textAlign: "center" }}>
          <CircularProgress size={"100px"} style={{ marginTop: "10%" }} />
        </Box>
      )}
    </div>
  );
}
