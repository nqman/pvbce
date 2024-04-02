import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Link, Tab, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//API
import {
  saveProjectAPI,
  getCategoriesAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";

//Calendar
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ProjectItem from "./ProjectItem";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../home/components/Loading/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const newEmptyProjectDetail = () => {
  return {
    id: -Date.now(),
    category: "",
    unit: "",
    quantity: "",
    price: "",
    amount: "",

    // date: "",
  };
};

export default function EditProject() {
  const emptyValue = {
    name: "",
    rpQuantityAndRevenueDetails: "",
    totalAmount: "",
    startDate: "",
    endDate: "",
    totalTime: "",
    rpQuantityAndRevenueLibraries: "",
    note: "",
  };
  const navigate = useNavigate();
  const params = useParams();
  const idProject = params.code;
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState(emptyValue);
  const [categories, setCategories] = useState([]);

  const getProject = async (idProject) => {
    // debugger;
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setTotalAmount(data.totalAmount);
      setTimeDiff(data?.totalTime);
      setProjectItems(data.rpQuantityAndRevenueDetails);
      setRpQuantityAndRevenueLibraries(data.rpQuantityAndRevenueLibraries);
      // console.log(data);

      return data;
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    // Call the asynchronous function inside the useEffect
    getProject(idProject);
  }, [idProject]); // Add idProject as a dependency if needed

  // Get category selection
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getCategoriesAPI();
      setCategories(response);
    }
    fetchMyAPI();
  }, [idProject]);

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  //General project information
  const handleChangeGeneralInfor = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  //Project Item
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
    // debugger
    if (date.$y) {
      setStartDate(date);
      handlePickDate(date, "startDate");
    }
  };

  const handlePickEndDate = (date) => {
    if (date.$y) {
      setEndDate(date);
      handlePickDate(date, "endDate");
    }
  };

  const handlePickDate = (date, label) => {
    // debugger;
    if (date !== null) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
      const [day, month, year] = formattedDate.split("/");
      const formattedDateString = `${day}-${month}-${year}`;
      if (label === "endDate") {
        setProject({ ...project, endDate: formattedDateString });
      }
    }
  };

  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    // debugger;
    if (
      typeof endDate !== "string" &&
      endDate !== null
      // ||
      // (typeof startDate !== "string" && startDate !== null)
    ) {
      //format startDate
      let start = formatDate(startDate);
      let end = new Date(endDate);
      const timeDiffNew = (end - start) / (1000 * 60 * 60 * 24) + 1;
      setTimeDiff(timeDiffNew);
      setProject({ ...project, totalTime: timeDiffNew });
    }
  }, [endDate]);

  //Thư viện dự án ---projectDiary

  const [rpQuantityAndRevenueLibraries, setRpQuantityAndRevenueLibraries] =
    useState([{ id: -Date.now(), name: "", value: "", file: null }]);
  const [errorLibary, setErrorLibrary] = useState("");

  const createDiv = () => {
    const newLibraryDetail = {
      id: -Date.now(),
      name: "",
      value: "",
      file: null,
    };
    setRpQuantityAndRevenueLibraries([
      ...rpQuantityAndRevenueLibraries,
      newLibraryDetail,
    ]);
  };

  const deleteDiv = (id) => {
    const updatedrpQuantityAndRevenueLibraries =
      rpQuantityAndRevenueLibraries.filter(
        (productDetail) => productDetail.id !== id
      );
    setRpQuantityAndRevenueLibraries(updatedrpQuantityAndRevenueLibraries);
    setProject({
      ...project,
      rpQuantityAndRevenueLibraries: updatedrpQuantityAndRevenueLibraries,
    });
  };

  const handleInputChange = (id, key, value) => {
    const updatedrpQuantityAndRevenueLibraries =
      rpQuantityAndRevenueLibraries.map((projectLibrary) =>
        projectLibrary.id === id
          ? { ...projectLibrary, [key]: value }
          : projectLibrary
      );
    setRpQuantityAndRevenueLibraries(updatedrpQuantityAndRevenueLibraries);
  };

  const handleFileChange = (id, file) => {
    debugger;
    const updatedrpQuantityAndRevenueLibraries =
      rpQuantityAndRevenueLibraries.map((projectLibrary) =>
        projectLibrary.id === id ? { ...projectLibrary, file } : projectLibrary
      );

    setRpQuantityAndRevenueLibraries(updatedrpQuantityAndRevenueLibraries);
  };
  const handleBlurInput = () => {
    setProject({
      ...project,
      rpQuantityAndRevenueLibraries: rpQuantityAndRevenueLibraries,
    });
  };

  const handleProjectDetailChange = (detail) => {
    setProjectItems((oldProjectItems) => {
      const index = oldProjectItems.findIndex((el) => el.id === detail.id);
      const newProjectItems = [...oldProjectItems]; // clone array, avoid side effect
      newProjectItems.splice(index, 1, detail);
      setProject({
        ...project,
        rpQuantityAndRevenueDetails: newProjectItems,
      });
      return [...newProjectItems];
    });
  };

  const handleRemoveProjectDetail = (detail) => {
    setProjectItems((oldProjectItems) => {
      const newProjectItems = [
        ...oldProjectItems.filter((el) => detail.id !== el.id),
      ];
      setProject({
        ...project,
        rpQuantityAndRevenueDetails: newProjectItems,
      });
      return newProjectItems;
    });
  };
  useEffect(() => {
    updateTotalAmount();
  }, [projectItems]);
  const handleSubmit = async (e) => {
    // debugger;
    e.preventDefault();
    setIsLoading(true);
    console.log(project);
    try {
      await saveProjectAPI(project);
      setIsLoading(false);
      toast.success("Cập nhật dự án thành công");
      navigate("/report/listprojects");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật dự án thất bại");
    }
  };

  const formatDate = (date) => {
    // debugger;
    if (typeof date === "string") {
      let result = "";
      if (date) {
        let parts = date.split("-");

        // Lấy các thành phần ngày, tháng, năm
        let year = parts[2];
        let month = parts[1];
        let day = parts[0];

        // Trả về chuỗi ngày mới định dạng yyyy-mm-dd
        result = dayjs(`${year}-${month}-${day}`);
      }
      // setEndDate(result);

      return result;
    }
    //trả về định dạng date khi pick từ calendar
    return date;
  };
  // setEndDate(formatDate);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-2" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", left: "80px" }}>
            <Link
              sx={{ fontSize: "16px" }}
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/report/listprojects");
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
              Danh sách dự án
            </Link>
          </div>
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
                    <div
                      className="mb-4 pb-3"
                      style={{
                        borderBottom: "2px solid black",
                        display: "flex",
                      }}
                    >
                      <TextField
                        value={project.name}
                        name="name"
                        size="small"
                        className="me-4 w-50"
                        // label={"Tên dự án"}
                        label={
                          <span>
                            Tên dự án<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        onChange={handleChangeGeneralInfor}
                      />
                      <TextField
                        value={project.note}
                        name="note"
                        size="small"
                        className="w-50"
                        label={"Ghi chú"}
                        onChange={handleChangeGeneralInfor}
                      />
                    </div>

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
                        {/* <TextField value={startDate}/> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="me-4"
                            value={formatDate(startDate)}
                            onChange={handlePickStartDate}
                            // renderInput={(params) => <TextField {...params} />}
                            label={
                              <span>
                                Ngày bắt đầu
                                {/* <span style={{ color: "red" }}>*</span> */}
                              </span>
                            }
                            format="DD-MM-YYYY"
                            disabled={true}
                          />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="me-4"
                            value={formatDate(endDate)}
                            onChange={handlePickEndDate}
                            renderInput={(params) => <TextField {...params} />}
                            label={
                              <span>
                                Ngày kết thúc
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            format="DD-MM-YYYY"
                          />
                          <TextField
                            value={`${timeDiff} ngày`}
                            label={"Tổng số ngày"}
                            disabled={true}
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
                  <div>
                    {rpQuantityAndRevenueLibraries.map((projectLibrary) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                          height: "30px",
                        }}
                        key={projectLibrary.id}
                      >
                        <TextField
                          placeholder="Thông số"
                          id="outlined-size-small"
                          value={projectLibrary.name}
                          size="small"
                          sx={{ marginRight: "20px", width: "50%" }}
                          onChange={(e) =>
                            handleInputChange(
                              projectLibrary.id,
                              "name",
                              e.target.value
                            )
                          }
                        />
                        {console.log(projectLibrary)}
                        <TextField
                          placeholder="Nội dung"
                          id="outlined-size-small"
                          value={
                            projectLibrary.value ||
                            projectLibrary.file?.name ||
                            projectLibrary?.fileName ||
                            projectLibrary?.linkLibrary
                          }
                          size="small"
                          sx={{
                            marginRight: "20px",
                            width: "50%",
                            pointerEvents: "none",
                          }}
                          onChange={(e) =>
                            handleInputChange(
                              projectLibrary.id,
                              "value",
                              e.target.value
                            )
                          }
                          onBlur={handleBlurInput}
                        />
                        <input
                          type="file"
                          style={{ width: "130px" }}
                          className="custom-file-input"
                          id={`fileInput${projectLibrary.id}`}
                          name="filename"
                          onChange={(e) =>
                            handleFileChange(
                              projectLibrary.id,
                              e.target.files[0]
                            )
                          }
                          onBlur={handleBlurInput}
                        />

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteDiv(projectLibrary.id)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                    <p className="text-danger">{errorLibary}</p>
                    <Button variant="contained" onClick={createDiv}>
                      Thêm
                    </Button>
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
        </div>
      )}
    </div>
  );
}
