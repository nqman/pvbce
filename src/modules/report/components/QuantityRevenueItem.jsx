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

export default function QuantityRevenueItem({
  detail,
  categories,
  remainingCategories,
  updateTotalAmount = () => {},
  onChange = () => {},
  onRemove = () => {},
  onCategorySelect,
}) {
  // console.log(remainingCategories);
  // Hàm để tính tổng tiền
  const [quantity, setQuantity] = useState(detail?.quantity || "");
  const [price, setPrice] = useState(detail?.price || "");
  const [amount, setAmount] = useState(detail?.amount || quantity * price);

  useEffect(() => {
    updateTotalAmount();
  }, [amount]);
  const handleInputChange = (id, key, value) => {
    // debugger;
    if (key === "quantity") {
      setQuantity(value);
      setAmount(value * price);
    } else if (key === "price") {
      setPrice(value);
      setAmount(value * quantity);
    }
    onChange({
      ...detail,
      [key]: value,
    });
  };

  const [unit, setUnit] = useState(detail?.unit || "");
  const handleSelectCategory = async (event) => {
    debugger;
    const category = event.target.value;
    const selectedCategory = categories.find((el) => el.name === category);
    if (remainingCategories.length <= 1) {
      onCategorySelect(false);
      setUnit(selectedCategory.unit);
      setPrice(selectedCategory.price);
      onChange({
        ...detail,
        unit: selectedCategory.unit,
        price: selectedCategory.price,
        category,
      });
      return;
    }
    const validateCategory = onCategorySelect(selectedCategory);
    if (validateCategory) {
      setUnit(selectedCategory.unit);
      setPrice(selectedCategory.price);
      onChange({
        ...detail,
        unit: selectedCategory.unit,
        price: selectedCategory.price,
        category,
      });
    }
  };
  //xóa item
  const deleteDiv = async (id) => {
    try {
      // const result = await Swal.fire({
      //   title: "Bạn chắc chắn muốn xóa? ",
      //   text: "Hạng mục này sẽ bị xóa vĩnh viễn!",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: "#3085d6",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "Xóa hạng mục",
      //   cancelButtonText: "Hủy bỏ",
      // });
      // if (result.isConfirmed) {
      //   Swal.fire({
      //     title: "Đã xóa!",
      //     text: "Hạng mục đã được xóa thành công.",
      //     icon: "success",
      //   });
      //   onRemove(detail);
      // }
      debugger;
      onRemove(detail);
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
              Hạng mục<span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={detail?.category}
              label={
                <span>
                  Hạng mục<span style={{ color: "red" }}>*</span>
                </span>
              }
              onChange={handleSelectCategory}
              size="small"
              sx={{ display: "flex", width: "450px" }}
            >
              {remainingCategories?.map((category) => (
                <MenuItem
                  key={category.id + "_" + category.value}
                  value={detail?.category ? detail?.category : category.name}
                >
                  {detail?.category ? detail?.category : category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="Đơn vị"
          id="outlined-size-small"
          value={unit}
          size="small"
          disabled={true}
          sx={{ marginRight: "20px", width: "100px" }}
        />
        <TextField
          // label="Sản lượng*"
          label={
            <span>
              Sản lượng<span style={{ color: "red" }}>*</span>
            </span>
          }
          id="outlined-size-small"
          value={quantity}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "110px" }}
          onChange={(e) =>
            handleInputChange(detail.id, "quantity", e.target.value)
          }
        />
        <TextField
          label="Đơn giá(VND)"
          // label={
          //   <span>
          //     Đơn giá<span style={{ color: "red" }}>*</span>
          //   </span>
          // }
          id="outlined-size-small"
          value={price.toLocaleString()}
          size="small"
          // type="number"
          disabled={true}
          sx={{ marginRight: "20px", width: "140px" }}
          onChange={(e) =>
            handleInputChange(detail.id, "price", e.target.value)
          }
        />
        <TextField
          label="Thành tiền(VND)"
          id="outlined-size-small"
          value={`${amount.toLocaleString()}`}
          size="small"
          disabled={true}
          sx={{ marginRight: "20px", width: "190px" }}
        />
        <button
          className="btn btn-danger"
          onClick={() => deleteDiv(detail.id)}
          type="button"
        >
          x
        </button>
      </div>
    </div>
  );
}
