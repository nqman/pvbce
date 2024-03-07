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

export default function ProjectItem({
  detail = {},
  categories = [],
  onChange = () => {},
  onRemove = () => {},
  updateTotalAmount,
}) {
  // Hàm để tính tổng tiền
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const totalAmount = quantity * price;
  // console.log(totalAmount);
  // updateTotalAmount(totalAmount);
  useEffect(() => updateTotalAmount(totalAmount, detail.id), [totalAmount]);

  const handleInputChange = (id, key, value) => {
    // debugger;
    if (key === "quantity") {
      setQuantity(value);
    } else if (key === "price") {
      setPrice(value);
    }
    // console.log(value);
    onChange({
      ...detail,
      [key]: value,
    });
  };
  const [unit, setUnit] = useState("");
  const handleSelectCategory = async (event) => {
    const category = event.target.value;
    // let unit;
    const selectedCategory = categories.find((el) => el.name === category);
    if (selectedCategory) {
      setUnit(selectedCategory.unit);
    }
    onChange({
      ...detail,
      category,
      // unit,
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
            <InputLabel
              style={{ marginTop: "px", bottom: "8px" }}
              // sx={{ height: "100px", paddingBottom: "-8px" }}
              id="demo-simple-select-label"
            >
              Hạng mục
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={detail.category}
              label="Hạng mục"
              onChange={handleSelectCategory}
              size="small"
              sx={{ display: "flex", width: "250px" }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id + "_" + category.value}
                  value={category.name}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="ĐVT"
          id="outlined-size-small"
          value={unit}
          size="small"
          disabled={true}
          sx={{ marginRight: "20px", width: "100px" }}
        />
        <TextField
          label="Sản lượng"
          id="outlined-size-small"
          value={detail.quantity}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "200px" }}
          onChange={(e) =>
            handleInputChange(detail.id, "quantity", e.target.value)
          }
        />
        <TextField
          label="Đơn giá"
          id="outlined-size-small"
          value={detail.price}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "200px" }}
          onChange={(e) =>
            handleInputChange(detail.id, "price", e.target.value)
          }
        />
        <TextField
          label="Thành tiền"
          id="outlined-size-small"
          value={`${totalAmount.toLocaleString()} VND`}
          size="small"
          disabled={true}
          sx={{ marginRight: "20px", width: "200px" }}
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
