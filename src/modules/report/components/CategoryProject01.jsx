import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  saveCategoryAPI,
  deleteCategoryAPI,
  getCategoriesAPI,
  selectCategoryAPI,
  validateCategoryAPI,
} from "../../../apis/reportAPI";
import {
  DataGrid,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  viVN,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { StyledEngineProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
//Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../home/components/Loading/Loading";
import Cookies from "js-cookie";
const schema = yup
  .object({
    name: yup.string().required("Vui lòng không bỏ trống"),
  })
  .required();

export default function CategoryProject01() {
  const role = Cookies.get("role")?.replace(/"/g, "");

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
      type: "PROJECT_ITEM_ONE",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchListCategory = async () => {
    try {
      const data = await getCategoriesAPI("PROJECT_ITEM_ONE");
      setCategories(data);
      setIsLoading(false);
      toast.success("Lấy danh sách danh mục thành công");
      return data;
    } catch (error) {
      toast.error("Lấy danh sách danh mục thất bại");
    }
  };

  const handleSaveCategory = async (category) => {
    try {
      // EDIT
      if (category.id) {
        await saveCategoryAPI(category);
        toast.success("Cập nhật danh mục thành công");
      }
      // NEW
      else {
        const validate = await validateCategoryAPI(category.name);
        if (validate) {
          await saveCategoryAPI(category);
          toast.success("Thêm danh mục thành công");
        } else {
          toast.error("Danh mục đã tồn tại!");
          return;
        }
      }
      setValue("id", "");
      setValue("name", "");
      resetField("name");
      fetchListCategory();
    } catch (error) {}
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchListCategory();
  }, []);

  const navigate = useNavigate();

  // Xóa Danh mục
  const handleDeteleCategory = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa danh mục? ",
        text: "Danh mục này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa danh mục",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteCategoryAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Danh mục đã được xóa thành công.",
          icon: "success",
        });
        fetchListCategory();
      }
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    }
  };

  const handleSelectCategory = async (id) => {
    try {
      const data = await selectCategoryAPI(id);
      setValue("id", data.id);
      setValue("name", data.name);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

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
              <h3 className="text-center mb-4">DANH MỤC 1 - DỰ ÁN</h3>
              {role && role === "Admin" && (
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                  onSubmit={handleSubmit(handleSaveCategory)}
                >
                  <div className=" w-50 me-3" style={{ height: "50px" }}>
                    <input
                      className="w-100 form-control"
                      placeholder="Tên danh mục 1"
                      style={{ marginBottom: "5px" }}
                      {...register("name")}
                    />
                    <span className="text-danger ">{errors.name?.message}</span>
                  </div>

                  <div style={{ height: "50px" }}>
                    <button
                      style={{
                        width: "30px",
                        height: "30px",
                        padding: 0,
                      }}
                      className="btn btn-outline-success"
                      type="submit"
                    >
                      <SaveIcon
                        sx={{
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                      />
                    </button>
                  </div>
                </form>
              )}
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
                      { field: "index", headerName: "STT", width: 100 },
                      { field: "name", headerName: "TÊN DANH MỤC", width: 880 },
                      {
                        field: "action",
                        headerName: "TÙY CHỌN",
                        width: 150,

                        renderCell: (params) => (
                          <div style={{ display: "flex" }}>
                            <button
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: "0 0 2px 0",
                                marginRight: "10px",
                              }}
                              className="btn btn-dark"
                              onClick={() => handleSelectCategory(params.id)}
                              title="Sửa"
                            >
                              <EditIcon
                                sx={{ fontSize: "14px", fontWeight: "bold" }}
                              />
                            </button>

                            <button
                              onClick={() => {
                                handleDeteleCategory(params.id);
                              }}
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: 0,
                                marginRight: "10px",
                              }}
                              className="btn btn-danger"
                            >
                              <ClearIcon
                                sx={{ fontSize: "20px", fontWeight: "bold" }}
                              />
                            </button>
                          </div>
                        ),
                      },
                    ]}
                    slots={{
                      pagination: CustomPagination,
                      toolbar: QuickSearchToolbar,
                    }}
                    localeText={
                      viVN.components.MuiDataGrid.defaultProps.localeText
                    }
                    {...categories}
                    initialState={{
                      ...categories.initialState,
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 15]}
                    disableRowSelectionOnClick
                    disableColumnFilter
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
