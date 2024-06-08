import {
  Autocomplete,
  Box,
  Container,
  Pagination,
  PaginationItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getCategoriesAPI,
  selectCategoryAPI,
  validateCategoryAPI,
} from "../../../apis/reportAPI";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  viVN,
} from "@mui/x-data-grid";
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
import Cookies from "js-cookie";
const schema = yup
  .object({
    name: yup.string().required("Vui lòng không bỏ trống"),
  })
  .required();

export default function CategoryProject02() {
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
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory1, setSelectedCategory1] = useState("");

  const fetchListCategory = async () => {
    try {
      const data = await getCategoriesAPI();
      setCategories(data);
      setIsLoading(false);
      toast.success("Lấy danh sách danh mục thành công");
      return data;
    } catch (error) {
      toast.error("Lấy danh sách danh mục thất bại");
    }
  };
  const handleSelectCategory1 = async (event, value) => {
    // debugger;
    setSelectedCategory1(value);
    let category = value;
    console.log(category);
  };

  const handleAddCategory = async (category) => {
    debugger;
    try {
      const validate = await validateCategoryAPI(category.name);
      if (validate) {
        await addCategoryAPI(category);
        toast.success("Thêm danh mục thành công");
        resetField("name");
        resetField("unit");
        fetchListCategory();
        return;
      } else {
        toast.error("Danh mục đã tồn tại!");
        return;
      }
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
              <h3 className="text-center mb-4">DANH MỤC 2 - DỰ ÁN</h3>
              {role && role === "Admin" && (
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                  onSubmit={handleSubmit(handleAddCategory)}
                >
                  <div className="w-50" style={{ height: "35px" }}>
                    <Autocomplete
                      size="small"
                      sx={{
                        marginBottom: "5px",
                        marginRight: "20px",
                        display: "block",
                      }}
                      disablePortal
                      options={categories.map((option) => option.name)}
                      // defaultValue={detail?.category}
                      // disabled={detail?.category ? true : false}
                      onChange={handleSelectCategory1}
                      renderInput={(params) => (
                        <TextField {...params} label="Danh mục 1" />
                      )}
                    />
                    <span className="text-danger ">{errors.name?.message}</span>
                  </div>
                  <div style={{ height: "35px" }}>
                    <TextField
                      size="small"
                      placeholder="Tên danh mục 2"
                      sx={{
                        marginBottom: "5px",
                        marginRight: "20px",

                        display: "block",
                      }}
                      {...register("name")}
                    />
                    <span className="text-danger ">{errors.name?.message}</span>
                  </div>

                  <div>
                    <button
                      className="btn btn-primary"
                      // disabled={isLoading}
                      type="submit"
                    >
                      Thêm
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
                                border: "1px solid",
                                borderRadius: "5px",
                                background: "none",
                                color: "black",
                                marginRight: "10px",
                                width: "23px",
                                lineHeight: "15px",
                              }}
                              onClick={() => handleSelectCategory(params.id)}
                              title="Sửa"
                            >
                              <EditIcon
                                sx={{ fontSize: "15px", fontWeight: "bold" }}
                              />
                            </button>

                            <button
                              onClick={() => {
                                handleDeteleCategory(params.id);
                              }}
                              style={{
                                border: "1px solid",
                                borderRadius: "5px",
                                background: "none",
                                color: "red",
                              }}
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
