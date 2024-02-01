import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EquipList from "./EquipList";
import CreateEquipment from "../CreateEquipment/CreateEquipment";
import toast, { Toaster } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// API

import axios from "axios";
import {
  listEquipmentsAPI,
  addEquipmentAPI,
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
    // setIsLoading(true);
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
      await deleteEquipmentAPI(id);
      toast.success("Xóa thiết bị thành công");
      fetchEquips();
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
      {/* Tìm kiếm thiết bị */}
      {/* <div className="d-flex justify-content-center m-3">
        <div className="input-group  w-50 ">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm thiết bị..."
            aria-label="Tìm kiếm thiết bị..."
            aria-describedby="basic-addon2"
            value={searchTerm}
            // onChange={handleSearch}
          />
        </div>
      </div> */}
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
        <EquipList
          rows={equips}
          onDelete={handleDeteleEquip}
          onEdit={handleSelectEquip}
          // onRead={() => handleRead()}
          // selectedEquip={selectedEquip}
        />
      ) : (
        <Box sx={{ display: "block", textAlign: "center" }}>
          <CircularProgress size={"100px"} />
        </Box>
      )}
    </div>
  );
}
