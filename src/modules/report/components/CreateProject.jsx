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
import { addProjectAPI, getCategoriesAPI } from "../../../apis/reportAPI";

//Calendar
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ProjectItem from "./ProjectItem";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../home/components/Loading/Loading";

const newEmptyProjectDetail = () => {
  return {
    id: -Date.now(),
    category: "",
    quantity: "",
    price: "",
    amount: "",
    // date: "",
  };
};

export default function CreateProject() {
  const emptyValue = {
    rpQuantityAndRevenueDetails: "",
    totalAmount: "",
    startDate: "",
    endDate: "",
    totalTime: "",
    projectDiaries: "",
  };
  const navigate = useNavigate();
  const [project, setProject] = useState(emptyValue);

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(project);
    try {
      await addProjectAPI(project);
      toast.success("Khởi tạo dự án thành công");
      navigate("/report/listprojects");
    } catch (error) {
      console.log(error);
      toast.error("Khởi tạo dự án thất bại");
    }
  };

  const [projectItems, setProjectItems] = useState([newEmptyProjectDetail()]);

  const addProjectItem = () => {
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems, newEmptyProjectDetail()];
    });
  };
  //Tính tổng tiền
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = () => {
    const totalAmountNew = projectItems.reduce((accumulator, projectItem) => {
      return accumulator + projectItem.quantity * projectItem.price;
    }, 0);
    setTotalAmount(totalAmountNew);
    setProject({
      ...project,
      totalAmount: totalAmountNew,
      rpQuantityAndRevenueDetails: projectItems,
    });
  };

  // Thời gian dự án
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePickStartDate = (date) => {
    setStartDate(date);
    handlePickDate(date, "startDate");
  };

  const handlePickEndDate = (date) => {
    setEndDate(date);

    handlePickDate(date, "endDate");
  };

  const handlePickDate = (date, label) => {
    if (date !== null) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
      if (label === "startDate") {
        setProject({ ...project, startDate: formattedDate });
      } else if (label === "endDate") {
        setProject({ ...project, endDate: formattedDate });
      }
    }
  };

  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    if (endDate !== null && startDate !== null) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      const timeDiffNew = (end - start) / (1000 * 60 * 60 * 24) + 1;
      setTimeDiff(timeDiffNew);
      setProject({ ...project, totalTime: timeDiffNew });
    }
  }, [endDate, startDate]);

  //Thư viện dự án ---projectDiary
  const [projectDiaries, setProjectDiaries] = useState([
    { id: -Date.now(), name: "", value: "", file: null },
  ]);

  const [categories, setCategories] = useState([]);

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
    setProject({ ...project, projectDiaries: updateDiaries });
  };

  // Get category selection
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getCategoriesAPI();
      setCategories(response);
    }
    fetchMyAPI();
  }, []);

  const handleProjectDetailChange = (detail) => {
    setProjectItems((oldProjectItems) => {
      const index = oldProjectItems.findIndex((el) => el.id === detail.id);
      const newProjectItems = [...oldProjectItems]; // clone array, avoid side effect
      newProjectItems.splice(index, 1, detail);
      return [...newProjectItems];
    });
  };

  const handleRemoveProjectDetail = (detail) => {
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems.filter((el) => detail.id !== el.id)];
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
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
                    {projectItems.map((detail) => (
                      <ProjectItem
                        key={detail.id}
                        detail={detail}
                        categories={categories}
                        onChange={handleProjectDetailChange}
                        onRemove={handleRemoveProjectDetail}
                        updateTotalAmount={updateTotalAmount}
                      />
                    ))}
                    {/* <p className="text-danger">{errorDetail}</p> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ marginTop: "-10px", marginBottom: "20px" }}
                        onClick={addProjectItem}
                      >
                        Thêm
                      </Button>
                      <b style={{ paddingRight: "120px" }}>
                        Tổng cộng: {`${totalAmount.toLocaleString()} VND`}
                      </b>
                    </div>
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
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    {/* <p className="text-danger">{errorDetail}</p> */}
                    <Button variant="contained" onClick={createDivDiary}>
                      Thêm
                    </Button>
                  </div>
                </div>
                {/* SUBMIT */}
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    // disabled={isLoading}
                    type="submit"
                  >
                    Lưu
                  </Button>
                </div>
              </Container>
            </TabPanel>
          </TabContext>
        </form>
      )}
    </div>
  );
}
