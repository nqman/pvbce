import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";

export default function ProjectManagement() {
  const navigate = useNavigate();
  //   const [value, setValue] = useState();

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  //   const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // try {
    //   await addEquipmentAPI(value);
    //   toast.success("Thêm thiết bị thành công");
    //   navigate("/catalogue");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Thêm thiết bị thất bại");
    // }
  };
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/report/category")}
      >
        Hạng mục
      </button>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/report/create-project")}
      >
        Khởi tạo dự án
      </button>
    </div>
  );
}
