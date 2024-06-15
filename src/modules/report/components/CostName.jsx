import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  saveCostAPI,
  deleteCostAPI,
  getCostsAPI,
  selectCostAPI,
  validateCostAPI,
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

export default function CostName() {
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

  const fetchListCost = async () => {
    try {
      const data = await getCostsAPI();
      setCosts(data);
      setIsLoading(false);
      toast.success("Lấy danh sách chi phí thành công");
      return data;
    } catch (error) {
      toast.error("Lấy danh sách chi phí thất bại");
    }
  };

  const handleSaveCost = async (cost) => {
    try {
      // EDIT
      if (cost.id) {
        await saveCostAPI(cost);
        toast.success("Cập nhật chi phí thành công");
      }
      // NEW
      else {
        const validate = await validateCostAPI(cost.name);
        if (validate) {
          await saveCostAPI(cost);
          toast.success("Thêm chi phí thành công");
        } else {
          toast.error("Chi phí đã tồn tại!");
          return;
        }
      }
      setValue("id", "");
      setValue("name", "");
      resetField("name");
      fetchListCost();
    } catch (error) {}
  };

  const [costs, setCosts] = useState([]);
  useEffect(() => {
    fetchListCost();
  }, []);

  const navigate = useNavigate();

  // Xóa chi phí
  const handleDeteleCost = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa chi phí? ",
        text: "chi phí này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa chi phí",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteCostAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "chi phí đã được xóa thành công.",
          icon: "success",
        });
        fetchListCost();
      }
    } catch (error) {
      toast.error("Xóa chi phí thất bại");
    }
  };

  const handleSelectCost = async (id) => {
    try {
      const data = await selectCostAPI(id);
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
              <h3 className="text-center mb-4">CHI PHÍ - DỰ ÁN</h3>
              {role && role === "Admin" && (
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                  onSubmit={handleSubmit(handleSaveCost)}
                >
                  <div className=" w-50 me-3" style={{ height: "50px" }}>
                    <input
                      className="w-100 form-control"
                      placeholder="Tên chi phí"
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
                    // height: 450,
                    width: "100%",
                    margin: "auto",
                    overflow: "hidden",
                  }}
                >
                  <DataGrid
                    rows={costs.map((row, index) => ({
                      ...row,
                      id: row.id,
                      index: index + 1,
                    }))}
                    columns={[
                      { field: "index", headerName: "STT", width: 100 },
                      { field: "name", headerName: "TÊN CHI PHÍ", width: 900 },
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
                              onClick={() => handleSelectCost(params.id)}
                              title="Sửa"
                            >
                              <EditIcon
                                sx={{ fontSize: "14px", fontWeight: "bold" }}
                              />
                            </button>

                            <button
                              onClick={() => {
                                handleDeteleCost(params.id);
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
                    {...costs}
                    initialState={{
                      ...costs.initialState,
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 15]}
                    disableRowSelectionOnClick
                    disableColumnFilter
                    ignoreDiacritics
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
