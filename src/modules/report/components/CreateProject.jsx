import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//API
import { getCategoriesAPI } from "../../../apis/reportAPI";

//Calendar
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CreateProject() {
  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  //   const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // try {
    //   await addEquipmentAPI(value);
    //   toast.success("Thêm thiết bị thành công");
    //   navigate("/catalogue");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Thêm thiết bị thất bại");
    // }
  };

  // RpQuantityDetailMode----Hạng mục và đơn giá

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const handleSelect = async (event) => {
    setCategory(event.target.value);
    let response = await getCategoriesAPI();
    for (let index = 0; index < response.length; index++) {
      const element = response[index].name;
      if (event.target.value === element) {
        setUnit(response[index].unit);
        // console.log(response[index].unit);
      }
    }
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

  const createDiv = () => {
    const newQuantityDetail = {
      id: -Date.now(),
      category: "",
      quantity: "",
      price: "",
      amount: "",
      date: "",
    };
    setQuantityDetails([...quantityDetails, newQuantityDetail]);
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
    console.log(updatedQuantityDetails);
    setQuantityDetails(updatedQuantityDetails);
  };

  // Thời gian dự án
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePickStartDate = (date) => {
    setStartDate(date);
    handlePickDate(date, "Ngày bắt đầu");
  };

  const handlePickEndDate = (date) => {
    setEndDate(date);
    handlePickDate(date, "Ngày kết thúc");
  };

  const handlePickDate = (date, label) => {
    if (date !== null) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      console.log(`${label}: ${formattedDate}`);
    }
  };
  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    if (endDate !== null && startDate !== null) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      setTimeDiff((end - start) / (1000 * 60 * 60 * 24) + 1);
    }
  }, [endDate, startDate]);
  console.log(timeDiff);

  //Thư viện dự án ---projectDiary
  const [projectDiaries, setProjectDiaries] = useState([
    { id: -Date.now(), name: "", value: "", file: null },
  ]);

  const [errorDiary, setErrorDiary] = useState("");

  const createDivDiary = () => {
    const newDiary = {
      id: -Date.now(),
      name: "",
      file: null,
    };
    setProjectDiaries([...projectDiaries, newDiary]);
  };

  const deleteDivDiary = (id) => {
    const updatedProjectDiaries = projectDiaries.filter(
      (projectDiary) => projectDiary.id !== id
    );
    setProjectDiaries(updatedProjectDiaries);
  };

  const handleInputChangeDiary = (id, key, value) => {
    const updateDiaries = projectDiaries.map((projectDiary) =>
      projectDiary.id === id ? { ...projectDiary, [key]: value } : projectDiary
    );
    setProjectDiaries(updateDiaries);
  };

  const handleFileChangeDiary = (id, file) => {
    const updateDiaries = projectDiaries.map((projectDiary) =>
      projectDiary.id === id ? { ...projectDiary, file } : projectDiary
    );
    setProjectDiaries(updateDiaries);
    // setValue({ ...value, projectDiaries: updateDiaries });
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <TabContext value={item}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TabList onChange={handleChangeItem}>
              <Tab label="THÔNG TIN HỢP ĐỒNG" value="1" />
              <Tab label="THƯ VIỆN" value="2" />
            </TabList>
          </Box>
          {/* Thông tin hợp đồng */}
          <TabPanel value="1">
            <Container className="">
              <div>
                <div>
                  {quantityDetails.map((quantityDetail) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "25px",
                        height: "30px",
                      }}
                      key={quantityDetail.id}
                    >
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Hạng mục
                          </InputLabel>
                          <Select
                            sx={{
                              marginRight: "20px",
                              width: "200px",
                            }}
                            id="outlined-size-small"
                            value={category}
                            label="Hạng mục"
                            onChange={handleSelect}
                            size="small"
                          >
                            {categories?.map((category) => (
                              <MenuItem value={category.name}>
                                {category.name}
                              </MenuItem>
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
                          handleInputChange(
                            quantityDetail.id,
                            "quantity",
                            e.target.value
                          )
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
                          handleInputChange(
                            quantityDetail.id,
                            "price",
                            e.target.value
                          )
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
                          handleInputChange(
                            quantityDetail.id,
                            "price",
                            e.target.value
                          )
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
                  <Button variant="contained" onClick={createDiv}>
                    Thêm
                  </Button>
                </div>
                <div className="calendar d-flex mt-3">
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="me-4"
                        value={startDate}
                        onChange={handlePickStartDate}
                        renderInput={(params) => <TextField {...params} />}
                        label="Ngày bắt đầu"
                        format="DD-MM-YYYY"
                      />
                      <DatePicker
                        className="me-4"
                        value={endDate}
                        onChange={handlePickEndDate}
                        renderInput={(params) => <TextField {...params} />}
                        label="Ngày kết thúc"
                        format="DD-MM-YYYY"
                      />
                      <TextField
                        value={`${timeDiff} ngày`}
                        label={"Tổng số ngày"}
                        disabled={true}
                        size=""
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </Container>
          </TabPanel>
          {/* Thư viện */}
          <TabPanel value="2">
            <Container className="">
              <div className="library">
                <div>
                  {projectDiaries.map((projectDiary) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                        height: "30px",
                      }}
                      key={projectDiary.id}
                    >
                      <TextField
                        placeholder="Thông số"
                        id="outlined-size-small"
                        value={projectDiary.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChangeDiary(
                            projectDiary.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        placeholder="Nội dung"
                        id="outlined-size-small"
                        value={projectDiary.value || projectDiary.file?.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChangeDiary(
                            projectDiary.id,
                            "value",
                            e.target.value
                          )
                        }
                      />
                      <input
                        style={{ width: "130px" }}
                        className="custom-file-input"
                        type="file"
                        id={`fileInput${projectDiary.id}`}
                        name="filename"
                        onChange={(e) =>
                          handleFileChangeDiary(
                            projectDiary.id,
                            e.target.files[0]
                          )
                        }
                      />

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDivDiary(projectDiary.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <p className="text-danger">{errorDetail}</p>
                  <Button variant="contained" onClick={createDivDiary}>
                    Thêm
                  </Button>
                </div>
              </div>
            </Container>
          </TabPanel>
        </TabContext>
      </form>
    </div>
  );
}
