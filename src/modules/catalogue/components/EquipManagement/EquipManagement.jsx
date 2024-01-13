import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EquipList from "./EquipList";
import CreateEquipment from "../CreateEquipment/CreateEquipment";
import toast, { Toaster } from "react-hot-toast";

// API

import axios from "axios";
const listEquipmentsAPI = "https://pvbce.io.vn/API/products";
export default function EquipManagement() {
  // const navigate = useNavigate();
  const handleAdd = () => {
    // navigate("/create");
  };
  //
  const [equips, setEquips] = useState([]);
  const [selectedEquip, setSelectedEquip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm);

  const timer = useRef();

  useEffect(() => {
    fetchEquips();
  }, [debounceSearchTerm]);

  // const listEquipmentPromise = getListEquipmentsAPI();

  const fetchEquips = async () => {
    try {
      const { data } = await axios.get(listEquipmentsAPI, {
        params: {
          name: searchTerm || undefined,
        },
      });
      setEquips(data);
    } catch (error) {}
  };
  // Thêm thiết bị
  const handleAddEquip = async (equip) => {
    try {
      const response = await axios.post(listEquipmentsAPI, equip);
      setEquips([...equips, response.data]);
      toast.success("Equip added successfully");
    } catch (error) {
      toast.error("Error creating Equip");
    }
  };
  // Xóa thiết bị
  const handleDeteleEquip = async (id) => {
    try {
      const response = await axios.delete(`${listEquipmentsAPI}/${id}`);
      toast.success("Equip Deleted Successfully");
      fetchEquips();
    } catch (error) {
      toast.error("Something Went Wrong");
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
  const handleUpdateEquip = async (id, equip) => {
    try {
      await axios.put(`${listEquipmentsAPI}/${id}`, equip);
      fetchEquips();
      toast.success("Equip updated successfully");
    } catch (error) {
      toast.error("Error updating Equip");
    }
  };
  // Tìm kiếm
  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setDebounceSearchTerm(evt.target.value);
    }, 300);
  };

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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => handleAdd()} className="btn btn-primary">
          Thêm thiết bị
        </button>
      </div>
      {/* Danh sách thiết bị*/}
      <EquipList
        rows={equips}
        onDelete={handleDeteleEquip}
        onEdit={handleSelectEquip}
      />
      <CreateEquipment
        equip={selectedEquip}
        onAddEquip={handleAddEquip}
        onUpdateEquip={handleUpdateEquip}
      />
    </div>
  );
}
