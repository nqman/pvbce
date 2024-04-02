import { Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getCategoriesAPI,
  selectCategoryAPI,
} from "../../../apis/reportAPI";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { StyledEngineProvider } from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
//Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../home/components/Loading/Loading";
const schema = yup
  .object({
    name: yup.string().required("Vui lòng không bỏ trống"),
    unit: yup.string().required("Vui lòng không bỏ trống"),
  })
  .required();

export default function Category() {
  const {
    resetField,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      unit: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchListCategory = async () => {
    try {
      const data = await getCategoriesAPI();
      setCategories(data);
      setIsLoading(false);
      toast.success("Lấy danh sách hạng mục thành công");
      return data;
    } catch (error) {
      toast.error("Lấy danh sách hạng mục thất bại");
    }
  };

  const handleAddCategory = async (category) => {
    try {
      await addCategoryAPI(category);
      toast.success("Thêm hạng mục thành công");
      resetField("name");
      resetField("unit");
      fetchListCategory();
    } catch (error) {}
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchListCategory();
  }, []);

  const navigate = useNavigate();

  // Xóa hạng mục
  const handleDeteleCategory = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa hạng mục? ",
        text: "Hạng mục này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa hạng mục",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteCategoryAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Hạng mục đã được xóa thành công.",
          icon: "success",
        });
        fetchListCategory();
      }
    } catch (error) {
      toast.error("Xóa hạng mục thất bại");
    }
  };

  const handleSelectCategory = async (id) => {
    try {
      const data = await selectCategoryAPI(id);
      setValue("id", data.id);
      setValue("name", data.name);
      setValue("unit", data.unit);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <div>
              <h3 className="text-center mb-3">Danh sách hạng mục</h3>
              <form
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
                onSubmit={handleSubmit(handleAddCategory)}
              >
                <div className=" w-50 me-3" style={{ height: "50px" }}>
                  <TextField
                    className="w-100"
                    size="small"
                    placeholder="Tên hạng mục"
                    {...register("name")}
                  />
                  <span className="text-danger ">{errors.name?.message}</span>
                </div>
                <div className=" w-25 me-3" style={{ height: "50px" }}>
                  <TextField
                    className="w-100"
                    size="small"
                    placeholder="Đơn vị"
                    {...register("unit")}
                  />
                  <span className="text-danger ">{errors.unit?.message}</span>
                </div>
                <div style={{ height: "50px" }}>
                  <button
                    className="btn btn-primary"
                    // disabled={isLoading}
                    type="submit"
                  >
                    Thêm
                  </button>
                </div>
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
                    rows={categories.map((row, index) => ({
                      ...row,
                      id: row.id,
                      index: index + 1,
                    }))}
                    columns={[
                      { field: "index", headerName: "STT", width: 50 },
                      { field: "name", headerName: "TÊN HẠNG MỤC", width: 400 },
                      { field: "unit", headerName: "ĐƠN VỊ", width: 100 },
                      // {
                      //   field: "action",
                      //   headerName: "TÙY CHỌN",
                      //   width: 120,

                      //   renderCell: (params) => (
                      //     <div style={{ display: "flex" }}>
                      //       <button
                      //         style={{
                      //           padding: "0px",
                      //           height: "25px",
                      //           width: "25px",
                      //           marginRight: "10px",
                      //         }}
                      //         className="btn btn-warning me-2"
                      //         onClick={() => handleSelectCategory(params.id)}
                      //         title="Sửa"
                      //       >
                      //         <EditIcon
                      //           sx={{
                      //             fontSize: "17px",
                      //             marginBottom: "2px",
                      //           }}
                      //         />
                      //       </button>
                      //       <button
                      //         style={{
                      //           padding: "0px",
                      //           height: "25px",
                      //           width: "25px",
                      //           lineHeight: "15px",
                      //         }}
                      //         className="btn btn-danger"
                      //         onClick={() => {
                      //           handleDeteleCategory(params.id);
                      //         }}
                      //         title="Xóa"
                      //       >
                      //         <ClearIcon
                      //           sx={{
                      //             fontSize: "20px",
                      //           }}
                      //         />
                      //       </button>
                      //     </div>
                      //   ),
                      // },
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
      )}
    </div>
  );
}
