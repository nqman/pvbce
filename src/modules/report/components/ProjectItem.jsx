import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";

export default function ProjectItem({
  detail = {},
  categories = [],
  remainingCategories,
  onCategorySelect,
  onChange = () => {},
  onRemove = () => {},
  updateTotalAmount,
}) {
  // console.log(detail);
  // Hàm để tính tổng tiền
  const [quantity, setQuantity] = useState(detail.quantity);
  const [price, setPrice] = useState(detail.price);
  const [amount, setAmount] = useState(detail.amount);

  useEffect(() => {
    updateTotalAmount();
  }, [amount]);

  const handleInputChange = (id, key, value) => {
    // debugger;
    if (key === "quantity") {
      setQuantity(value);
      setAmount(price * value);
      onChange({
        ...detail,
        quantity: value,
        amount: price * value,
      });
    } else if (key === "price") {
      setPrice(value);
      setAmount(quantity * value);
      onChange({
        ...detail,
        price: value,
        amount: quantity * value,
      });
    }
  };

  const [unit, setUnit] = useState("");
  const handleSelectCategory = async (event, value) => {
    // debugger;
    const category = value;
    console.log(category);
    const selectedCategory = categories.find((el) => el.name === category);
    const validateCategory = onCategorySelect(selectedCategory);
    if (validateCategory) {
      setUnit(selectedCategory.unit);
      onChange({
        ...detail,
        unit: selectedCategory.unit,
        category,
      });
    }
  };

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
          width: "100%",
        }}
      >
        <Autocomplete
          size="small"
          sx={{ width: "40%", marginRight: "20px" }}
          disablePortal
          id="combo-box-demo"
          options={remainingCategories?.map((option) => option.name)}
          defaultValue={detail?.category}
          disabled={detail?.category ? true : false}
          onChange={handleSelectCategory}
          renderInput={(params) => (
            <TextField {...params} label="Tên hạng mục" />
          )}
        />

        <TextField
          label="Đơn vị"
          id="outlined-size-small"
          value={detail.unit}
          size="small"
          disabled={true}
          sx={{ marginRight: "20px", width: "10%" }}
        />
        <TextField
          label={
            <span>
              Sản lượng<span style={{ color: "red" }}>*</span>
            </span>
          }
          id="outlined-size-small"
          value={detail.quantity}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "15%" }}
          onChange={(e) =>
            handleInputChange(detail.id, "quantity", e.target.value)
          }
          // onBlur={handleGetAmount}
        />
        <TextField
          label={
            <span>
              Đơn giá (VND)<span style={{ color: "red" }}>*</span>
            </span>
          }
          id="outlined-size-small"
          value={detail.price}
          size="small"
          type="number"
          sx={{ marginRight: "20px", width: "15%", textAlign: "center" }}
          onChange={(e) =>
            handleInputChange(detail.id, "price", e.target.value)
          }
          // onBlur={handleGetAmount}
        />
        <TextField
          label="Thành tiền (VND)"
          id="outlined-size-small"
          // value={detail.amount?.toLocaleString() || amount.toLocaleString()}
          value={amount.toLocaleString()}
          size="small"
          disabled={true}
          sx={{ marginRight: "20px", width: "20%" }}
        />
        {!detail.use && (
          <button
            style={{
              width: "35px",
              height: "35px",
              padding: 0,
              marginRight: "10px",
            }}
            className="btn btn-danger"
            onClick={() => deleteDiv(detail.id)}
            type="button"
          >
            <ClearIcon sx={{ fontSize: "20px" }} />
          </button>
        )}
      </div>
    </div>
  );
}
