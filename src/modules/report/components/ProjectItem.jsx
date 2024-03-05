import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCategoriesAPI } from "../../../apis/reportAPI";

export default function ProjectItem() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const handleSelect = async (event) => {
    debugger;
    setCategory(event.target.value);
    for (let index = 0; index < categories.length; index++) {
      const element = categories[index].name;
      if (event.target.value === element) {
        setUnit(categories[index].unit);
        break;
      }
    }
    setQuantityDetails([...quantityDetails, unit]);
  };
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getCategoriesAPI();
      setCategories(response);
    }
    fetchMyAPI();
  }, []);
  const [quantityDetails, setQuantityDetails] = useState([
    {
      id: -Date.now(),
      category: "",
      quantity: "",
      price: "",
      amount: "",
      date: "",
    },
  ]);

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
        const updatedQuantityDetails = quantityDetails.filter(
          (quantityDetail) => quantityDetail.id !== id
        );
        Swal.fire({
          title: "Đã xóa!",
          text: "Hạng mục đã được xóa thành công.",
          icon: "success",
        });
        setQuantityDetails(updatedQuantityDetails);
      }
    } catch (error) {}
  };

  const handleInputChange = (id, key, value) => {
    const updatedQuantityDetails = quantityDetails.map((quantityDetail) =>
      quantityDetail.id === id
        ? { ...quantityDetail, [key]: value }
        : quantityDetail
    );
    // console.log(updatedQuantityDetails);
    setQuantityDetails(updatedQuantityDetails);
  };
  return (
    <div>
      <div>
        {quantityDetails.map((quantityDetail) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "35px",
              height: "30px",
            }}
            key={quantityDetail.id}
          >
            <Box
              sx={{
                minWidth: 130,
                marginRight: "20px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  style={{ marginTop: "-8px" }}
                  id="demo-simple-select-label"
                >
                  Hạng mục
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Hạng mục"
                  onChange={handleSelect}
                  size="small"
                  style={{ display: "flex" }}
                >
                  {categories.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
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
              value={quantityDetail.quantity}
              size="small"
              type="number"
              sx={{ marginRight: "20px" }}
              onChange={(e) =>
                handleInputChange(quantityDetail.id, "quantity", e.target.value)
              }
            />
            <TextField
              label="Đơn giá"
              id="outlined-size-small"
              value={quantityDetail.price}
              size="small"
              type="number"
              sx={{ marginRight: "20px" }}
              onChange={(e) =>
                handleInputChange(quantityDetail.id, "price", e.target.value)
              }
            />
            <TextField
              label="Thành tiền"
              id="outlined-size-small"
              value={`${(
                quantityDetail.quantity * quantityDetail.price
              ).toLocaleString()} VND`}
              size="small"
              disabled={true}
              sx={{ marginRight: "20px" }}
              onChange={(e) =>
                handleInputChange(quantityDetail.id, "price", e.target.value)
              }
            />
            <button
              className="btn btn-danger"
              onClick={() => deleteDiv(quantityDetail.id)}
            >
              x
            </button>
          </div>
        ))}
        <p className="text-danger">{errorDetail}</p>
      </div>
    </div>
  );
}
