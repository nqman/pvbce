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
} from "../../../../apis/equipmentAPI";
// const listEquipmentsAPI = "https://pvbce.io.vn/API/products";

export default function EquipManagement() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/catalogue/create");
  };

  const [equips, setEquips] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm);

  const timer = useRef();

  useEffect(() => {
    fetchEquips();
  }, [debounceSearchTerm]);

  // const listEquipmentPromise = getListEquipmentsAPI();

  // const fetchEquips = async () => {
  //   try {
  //     const { data } = await axios.get(listEquipmentsAPI, {
  //       params: {
  //         name: searchTerm || undefined,
  //       },
  //     });
  //     setEquips(data);
  //   } catch (error) {}
  // };
  const fetchEquips = async () => {
    try {
      const data = await listEquipmentsAPI();
      toast.success("Lấy danh sách thiết bị thành công");
      setEquips(data);
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
      const { data } = await axios.get(`${listEquipmentsAPI}/${id}`);
      setSelectedEquip(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // Cập nhật thiết bị
  // const handleUpdateEquip = async (divideCode, equip) => {
  //   try {
  //     await axios.put(`${listEquipmentsAPI}/${divideCode}`, equip);
  //     fetchEquips();
  //     toast.success("Cập nhật thiết bị thành công");
  //   } catch (error) {
  //     toast.error("Cập nhật thiết bị thất bại");
  //   }
  // };
  // Tìm kiếm
  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setDebounceSearchTerm(evt.target.value);
    }, 300);
  };

  //Modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => {
  //   setShow(false);
  // };
  // const handleShow = () => setShow(true);

  return (
    <div style={{ position: "relative" }}>
      <Toaster position="top-right" />
      {/* Tìm kiếm thiết bị */}
      <div className="d-flex justify-content-center m-3">
        <div className="input-group  w-50 ">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm thiết bị..."
            aria-label="Tìm kiếm thiết bị..."
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {/* BTN THÊM THIẾT BỊ */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => handleAdd()} className="btn btn-primary">
          Thêm thiết bị
        </button>
        {/* <Button variant="primary" onClick={handleShow}>
          Thêm thiết bị
        </Button> */}
      </div>

      {/* Danh sách thiết bị*/}
      <EquipList
        rows={equips}
        onDelete={handleDeteleEquip}
        onEdit={handleSelectEquip}
      />

      {/* <>
        <Modal size="xl" show={show} onHide={handleClose}>
          <Modal.Header style={{ padding: "5px 20px" }} closeButton>
            <Modal.Title>Thêm thiết bị</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "0" }}>
            <CreateEquipment
              equip={selectedEquip}
              onAddEquip={handleAddEquip}
              onUpdateEquip={handleUpdateEquip}
            />
          </Modal.Body>
          <Modal.Footer style={{ padding: "5px 20px" }}>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
              variant="primary"
              onClick={handleClose}
            >
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      </> */}
    </div>
  );
}
