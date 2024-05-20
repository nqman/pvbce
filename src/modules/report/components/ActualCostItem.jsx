import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ClearIcon from "@mui/icons-material/Clear";

export default function ActualCostItem({
  detail,
  costs,
  remainingCosts,
  onCostSelect,
  updateTotalAmount = () => {},
  onChange = () => {},
  onRemove = () => {},
}) {
  // Hàm để tính tổng tiền
  // debugger;
  const [amount, setAmount] = useState(detail?.amount || "");

  useEffect(() => {
    updateTotalAmount();
  }, [amount]);
  const handleInputChange = (id, key, value) => {
    // debugger;
    if (key === "amount") {
      setAmount(value);
    }
    onChange({
      ...detail,
      [key]: value,
    });
  };

  const handleSelectCost = async (event, value) => {
    // debugger;
    const cost = value;
    const selectedCost = costs.find((el) => el.name === cost);
    const validateCost = onCostSelect(selectedCost);

    if (validateCost) {
      onChange({
        ...detail,
        cost,
      });
    }
  };

  const [errorDetail, setErrorDetail] = useState("");

  const deleteDiv = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa? ",
        text: "Hạng mục này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa hạng mục",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đã xóa!",
          text: "Hạng mục đã được xóa thành công.",
          icon: "success",
        });
        onRemove(detail);
      }
    } catch (error) {}
  };

  return (
    <div data-cc="root">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "35px",
          height: "30px",
        }}
      >
        <Autocomplete
          size="small"
          sx={{ width: "80%", marginRight: "20px" }}
          disablePortal
          id="combo-box-demo"
          options={remainingCosts?.map((option) => option.name)}
          defaultValue={detail?.cost}
          disabled={detail?.cost ? true : false}
          onChange={handleSelectCost}
          renderInput={(params) => (
            <TextField {...params} label="Tên chi phí" />
          )}
        />

        <TextField
          label={
            <span style={{ fontSize: "14px" }}>
              Thành tiền<span style={{ color: "red" }}>*</span>
            </span>
          }
          id="outlined-size-small"
          value={amount}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "20%" }}
          onChange={(e) =>
            handleInputChange(detail.id, "amount", e.target.value)
          }
        />
        <div>
          <button
            onClick={() => deleteDiv(detail.id)}
            style={{
              border: "none",
              background: "none",
              color: "red",
            }}
          >
            <ClearIcon sx={{ fontSize: "20px", fontWeight: "bolder" }} />
          </button>
        </div>
      </div>

      <p className="text-danger">{errorDetail}</p>
    </div>
  );
}
