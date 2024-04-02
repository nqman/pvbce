import { Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addCostAPI,
  deleteCostAPI,
  getCostsAPI,
  selectCostAPI,
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
  })
  .required();

export default function CostName() {
  const {
    resetField,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      id: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const [cost, setCost] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchListCost = async () => {
    try {
      const data = await getCostsAPI();
      setCosts(data);
      setIsLoading(false);

      return data;
    } catch (error) {}
  };
  // const handleChange = (e) => {
  //   setcost({ ...cost, [e.target.name]: e.target.value });
  // };
  const handleAddCost = async (cost) => {
    console.log(cost);
    try {
      await addCostAPI(cost);
      toast.success("Thêm chi phí thành công");
      resetField("name");
      fetchListCost();
    } catch (error) {}
  };

  const [costs, setCosts] = useState([]);
  useEffect(() => {
    fetchListCost();
  }, []);

  //   const navigate = useNavigate();

  // Xóa chi phí
  const handleDetelecost = async (id) => {
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
      //   console.log(data);
      setValue("name", data.name);
      setValue("id", data.id);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Toaster position="top-right" />
      <Container>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div>
            <h3 className="text-center mb-3">Danh sách chi phí</h3>
            <form
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
              onSubmit={handleSubmit(handleAddCost)}
            >
              <div className=" w-50 me-3" style={{ height: "50px" }}>
                <TextField
                  className="w-100"
                  size="small"
                  placeholder="Tên chi phí"
                  {...register("name")}
                  //   value={cost.name}
                />
                <span className="text-danger ">{errors.name?.message}</span>
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
                  rows={costs.map((row, index) => ({
                    ...row,
                    id: row.id,
                    index: index + 1,
                  }))}
                  columns={[
                    { field: "index", headerName: "STT", width: 50 },
                    { field: "name", headerName: "TÊN CHI PHÍ", width: 400 },
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
                    //         onClick={() => handleSelectCost(params.id)}
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
                    //           handleDetelecost(params.id);
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
                  {...costs}
                  initialState={{
                    ...costs.initialState,
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
