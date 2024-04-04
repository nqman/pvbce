import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ActualCostItem({
  detail,
  costs,
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

  const handleSelectcost = async (event) => {
    // debugger;
    const cost = event.target.value;

    onChange({
      ...detail,
      cost,
    });
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
        <Box
          sx={{
            minWidth: 130,
            marginRight: "40px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Loại chi phí
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={detail?.cost}
              label="Loại chi phí"
              onChange={handleSelectcost}
              size="small"
              sx={{ display: "flex", width: "750px" }}
            >
              {costs?.map((cost) => (
                <MenuItem key={cost.id + "_" + cost.value} value={cost.name}>
                  {cost.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Thành tiền"
          id="outlined-size-small"
          value={amount}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "200px" }}
          onChange={(e) =>
            handleInputChange(detail.id, "amount", e.target.value)
          }
        />

        <button
          className="btn btn-danger"
          onClick={() => deleteDiv(detail.id)}
          type="button"
        >
          x
        </button>
      </div>

      <p className="text-danger">{errorDetail}</p>
    </div>
  );
}
