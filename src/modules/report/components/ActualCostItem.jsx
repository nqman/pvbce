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
  costNames,
  updateTotalAmount = () => {},
  onChange = () => {},
  onRemove = () => {},
}) {
  // Hàm để tính tổng tiền
  const [price, setPrice] = useState(detail?.price || "");

  useEffect(() => {
    updateTotalAmount();
  }, [price]);
  const handleInputChange = (id, key, value) => {
    debugger;
    if (key === "price") {
      setPrice(value);
    }
    onChange({
      ...detail,
      [key]: value,
    });
  };

  const handleSelectCostName = async (event) => {
    debugger;
    const costName = event.target.value;

    onChange({
      ...detail,
      costName,
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
            marginRight: "20px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Hạng mục
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={detail?.costName}
              label="Hạng mục"
              onChange={handleSelectCostName}
              size="small"
              sx={{ display: "flex", width: "350px" }}
            >
              {costNames?.map((costName) => (
                <MenuItem
                  key={costName.id + "_" + costName.value}
                  value={costName.name}
                >
                  {costName.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Chi phí"
          id="outlined-size-small"
          value={price}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "200px" }}
          onChange={(e) =>
            handleInputChange(detail.id, "price", e.target.value)
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
