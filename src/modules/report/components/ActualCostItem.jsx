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

export default function ActualCostItem(
  props
  // detail = {},
  // categories = [],
  // oldCategory,
  // onChange = () => {},
  // onRemove = () => {},
  // updateTotalAmount,
) {
  // Hàm để tính tổng tiền
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const amount = quantity * price;

  useEffect(() => {
    props.updateTotalAmount();
  }, [amount]);

  const handleInputChange = (id, key, value) => {
    if (key === "quantity") {
      setQuantity(value);
    } else if (key === "price") {
      setPrice(value);
    }
    props.onChange({
      ...props.detail,
      unit: unit,
      [key]: value,
    });
  };

  const [unit, setUnit] = useState("");
  const handleSelectCategory = async (event) => {
    const category = event.target.value;
    const selectedCategory = props.categories.find(
      (el) => el.name === category
    );
    if (selectedCategory) {
      setUnit(selectedCategory.unit);
    }

    props.onChange({
      ...props.detail,
      category,
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
        props.onRemove(props.detail);
      }
    } catch (error) {}
  };

  return (
    <div data-cc="root">
      {/* OLD */}
      {props.oldDetail ? (
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
                value={props?.oldCategory}
                label="Hạng mục"
                onChange={handleSelectCategory}
                size="small"
                sx={{ display: "flex", width: "250px" }}
              >
                {props.categories?.map((category) => (
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
            label="Đơn vị"
            id="outlined-size-small"
            value={unit}
            // API Trả về đơn vị
            size="small"
            disabled={true}
            sx={{ marginRight: "20px", width: "100px" }}
          />
          <TextField
            label="Sản lượng"
            id="outlined-size-small"
            value={props.oldDetail?.quantity}
            size="small"
            type="number"
            sx={{ marginRight: "20px", width: "200px" }}
            onChange={(e) =>
              handleInputChange(props.oldDetail.id, "quantity", e.target.value)
            }
          />
          <TextField
            label="Đơn giá"
            id="outlined-size-small"
            value={props.oldDetail?.price}
            size="small"
            type="number"
            sx={{ marginRight: "20px", width: "200px" }}
            onChange={(e) =>
              handleInputChange(props.oldDetail.id, "price", e.target.value)
            }
          />
          <TextField
            label="Thành tiền"
            id="outlined-size-small"
            // value={`${amount.toLocaleString()} VND`}
            value={`
              ${
                props.oldDetail?.price *
                props.oldDetail?.quantity.toLocaleString()
              } VND`}
            size="small"
            disabled={true}
            sx={{ marginRight: "20px", width: "200px" }}
          />
          <button
            className="btn btn-danger"
            onClick={() => deleteDiv(props.oldDetail.id)}
            type="button"
          >
            x
          </button>
        </div>
      ) : (
        ""
      )}

      {/* NEW */}
      {props.detail ? (
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
                value={props.detail?.category}
                label="Hạng mục"
                onChange={handleSelectCategory}
                size="small"
                sx={{ display: "flex", width: "250px" }}
              >
                {props.categories?.map((category) => (
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
            label="Đơn vị"
            id="outlined-size-small"
            value={unit}
            size="small"
            disabled={true}
            sx={{ marginRight: "20px", width: "100px" }}
          />
          <TextField
            label="Sản lượng"
            id="outlined-size-small"
            value={props.detail?.quantity}
            size="small"
            type="number"
            sx={{ marginRight: "20px", width: "200px" }}
            onChange={(e) =>
              handleInputChange(props.detail.id, "quantity", e.target.value)
            }
            // onBlur={handleGetAmount}
          />
          <TextField
            label="Đơn giá"
            id="outlined-size-small"
            value={props.detail?.price}
            size="small"
            type="number"
            sx={{ marginRight: "20px", width: "200px" }}
            onChange={(e) =>
              handleInputChange(props.detail.id, "price", e.target.value)
            }
            // onBlur={handleGetAmount}
          />
          <TextField
            label="Thành tiền"
            id="outlined-size-small"
            value={`${amount.toLocaleString()} VND`}
            size="small"
            disabled={true}
            sx={{ marginRight: "20px", width: "200px" }}
          />
          <button
            className="btn btn-danger"
            onClick={() => deleteDiv(props.detail.id)}
            type="button"
          >
            x
          </button>
        </div>
      ) : (
        ""
      )}

      <p className="text-danger">{errorDetail}</p>
    </div>
  );
}
