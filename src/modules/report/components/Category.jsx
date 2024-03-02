import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getCategoriesAPI,
} from "../../../apis/reportAPI";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { StyledEngineProvider } from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Category() {
  const [category, setCategory] = useState({ name: "", unit: "" });

  const fetchListCategory = async () => {
    try {
      const data = await getCategoriesAPI();
      setCategories(data);
      return data;
    } catch (error) {}
  };
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategoryAPI(category);
      toast.success("Thêm hạng mục thành công");
      setCategory({ name: "", unit: "" });
      fetchListCategory();
      console.log(category);
    } catch (error) {}
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchListCategory();
  }, []);

  const navigate = useNavigate();
  //Xem chi tiết thiết bị
  const handleRead = (id) => {
    navigate(`/catalogue/${id}`);
  };

  // Xóa hạng mục
  const handleDeteleCategory = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa thiết bị? ",
        text: "Thiết bị này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa thiết bị",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteCategoryAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Thiết bị đã được xóa thành công.",
          icon: "success",
        });
        fetchListCategory();
      }
    } catch (error) {
      toast.error("Xóa thiết bị thất bại");
    }
  };

  const handleSelectCategory = async (id) => {
    try {
      // const data = await selectEquipmentAPI(id);
      // setSelectedEquip(data);
      navigate(`/catalogue/edit/${id}`);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div>
      <Toaster />
      <Container>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div>
            <h3 className="text-center mb-3">Thêm hạng mục</h3>
            <form
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Tên hạng mục"
                id="outlined-size-small"
                value={category.name}
                name="name"
                sx={{ marginRight: "20px" }}
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
              <TextField
                label="Đơn vị"
                id="outlined-size-small"
                value={category.unit}
                name="unit"
                sx={{ marginRight: "20px" }}
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
              <button
                className="btn btn-primary"
                // disabled={isLoading}
                type="submit"
              >
                Thêm
              </button>
            </form>
          </div>
          <div>
            <StyledEngineProvider injectFirst>
              <div
                style={{
                  height: 450,
                  width: "100%",
                  margin: "auto",
                  overflow: "hidden",
                }}
              >
                <DataGrid
                  style={{
                    padding: 10,
                  }}
                  rows={categories.map((row) => ({ ...row, id: row.id }))}
                  columns={[
                    { field: "id", headerName: "STT", width: 50 },
                    { field: "name", headerName: "TÊN HẠNG MỤC", width: 400 },
                    { field: "unit", headerName: "ĐƠN VỊ", width: 100 },
                    {
                      field: "action",
                      headerName: "TÙY CHỌN",
                      width: 120,

                      renderCell: (params) => (
                        <div style={{ display: "flex" }}>
                          <button
                            style={{
                              padding: "0px",
                              height: "25px",
                              width: "25px",
                              marginRight: "10px",
                            }}
                            className="btn btn-warning me-2"
                            onClick={() => handleSelectCategory(params.id)}
                            title="Sửa"
                          >
                            <EditIcon
                              sx={{
                                fontSize: "17px",
                                marginBottom: "2px",
                              }}
                            />
                          </button>
                          <button
                            style={{
                              padding: "0px",
                              height: "25px",
                              width: "25px",
                              lineHeight: "15px",
                            }}
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeteleCategory(params.id);
                            }}
                            title="Xóa"
                          >
                            <ClearIcon
                              sx={{
                                fontSize: "20px",
                              }}
                            />
                          </button>
                        </div>
                      ),
                    },
                  ]}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                  {...categories}
                  initialState={{
                    ...categories.initialState,
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10, 15]}
                />
              </div>
            </StyledEngineProvider>
          </div>
        </div>
      </Container>
    </div>
  );
}
