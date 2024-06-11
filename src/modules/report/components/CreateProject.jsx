import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Container,
  Tab,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//API
import {
  saveProjectAPI,
  getCategoriesAPI,
  getCategoriesAndCategoriesOfProjectAPI,
} from "../../../apis/reportAPI";

//Calendar
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ProjectItem from "./ProjectItem";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../home/components/Loading/Loading";
import NavigationButton from "../../common/NavigationButton";

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

export default function CreateProject() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState(emptyValue);

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
  const [disableAddItem, setDisableAddItem] = useState(false);
  const [countItem, setCountItem] = useState(1);
  const addProjectItem = () => {
    // debugger;
    let tempCountItem = countItem + 1;
    setCountItem(tempCountItem);
    if (categories.length === tempCountItem) {
      setDisableAddItem(true);
    }
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems, newEmptyProjectDetail()];
    });
  };
  // Get category selection

  const [categories, setCategories] = useState([]);
  const [remainingCategories, setRemainingCategories] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let categories = await getCategoriesAPI("QUANTITY_ITEM");
      let category01 = await getCategoriesAPI("Project_ITEM_ONE");
      let category02 = await getCategoriesAPI("Project_ITEM_TWO");
      setCategories(categories);
      setCategory01(category01);
      setCategory02(category02);
      setRemainingCategories(categories);
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
    let tempCountItem = countItem - 1;
    setCountItem(tempCountItem);
    if (categories.length !== tempCountItem) {
      setDisableAddItem(false);
    }

    const filteredCategories = detail;
    if (filteredCategories.category) {
      let obj3 = [];
      categories.forEach((item2) => {
        if (filteredCategories.category === item2.name) {
          obj3.push({
            name: item2.name,
            unit: item2.unit,
          });
        }
        const newCategories = [...remainingCategories, obj3[0]];
        setRemainingCategories([...remainingCategories, obj3[0]]);
        if (newCategories.length > 0) {
          setDisableAddItem(false);
        }
      });
    }
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems.filter((el) => detail.id !== el.id)];
    });
  };
  useEffect(() => {
    updateTotalAmount();
  }, [projectItems]);
  const handleCategorySelect = (selectedCategory) => {
    // debugger;

    const temCategoryIndex = remainingCategories?.findIndex(
      (el) => el.name === selectedCategory?.name
    );
    // Nếu tìm thấy phần tử có name giống
    if (temCategoryIndex !== -1) {
      // Loại bỏ phần tử đó khỏi mảng remainingCategories
      const updatedRemainingCategories = [...remainingCategories];
      updatedRemainingCategories.splice(temCategoryIndex, 1);

      // Cập nhật lại mảng remainingCategories
      setRemainingCategories(updatedRemainingCategories);

      // Trả về selectedCategory
      return selectedCategory;
    }
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
    if (
      date.$y &&
      1900 <= date.$y &&
      date.$y <= 2099 &&
      date.$d instanceof Date &&
      !isNaN(date.$d)
    ) {
      setStartDate(date);
      handlePickDate(date, "startDate");
    }
  };

  const handlePickEndDate = (date) => {
    // if (date.$y && 1900 <= date.$y && date.$y <= 2099) {
    if (
      date.$y &&
      1900 <= date.$y &&
      date.$y <= 2099 &&
      date.$d instanceof Date &&
      !isNaN(date.$d)
    ) {
      setEndDate(date);
      handlePickDate(date, "endDate");
    }
  };

  const handlePickDate = (date, label) => {
    if (date !== null) {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
      const [day, month, year] = formattedDate.split("/");
      const formattedDateString = `${day}-${month}-${year}`;
      if (label === "startDate") {
        setProject({ ...project, startDate: formattedDateString });
      } else if (label === "endDate") {
        setProject({ ...project, endDate: formattedDateString });
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
  const [category01, setCategory01] = useState([]);
  const [category02, setCategory02] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");

  const handleSelectCategory01 = async (event, value) => {
    // debugger;
    setSelectedCategory1(value);
    let category = value;
    console.log(category);
  };
  const handleSelectCategory02 = async (event, value) => {
    // debugger;
    setSelectedCategory2(value);
    let category = value;
    console.log(category);
  };

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
  //Thư viện dự án ---projectDiary

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project.name) {
      toast.error("Vui lòng nhập tên dự án");
      return;
    }
    try {
      const data = await saveProjectAPI(project);
      if (data) {
        setIsLoading(true);
        toast.success("Khởi tạo dự án thành công");
        navigate("/report/listprojects");
      }
    } catch (error) {
      console.log(error);
      toast.error("Khởi tạo dự án thất bại");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-2 mb-5" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "10px", left: "80px" }}>
            <NavigationButton
              url="/report/listprojects"
              name="Danh sách dự án"
            />
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <TabContext value={item}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TabList onChange={handleChangeItem}>
                  <Tab
                    sx={{ fontWeight: "bold" }}
                    label="THÔNG TIN HỢP ĐỒNG"
                    value="1"
                  />
                  {/* <Tab
                    sx={{ fontWeight: "bold" }}
                    label="THƯ VIỆN DỰ ÁN"
                    value="2"
                  /> */}
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
                        label={
                          <span>
                            Tên dự án
                            <span style={{ color: "red" }}>*</span>
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
                          remainingCategories={[
                            ...remainingCategories,
                            ...categories.filter(
                              (el) => el.name === detail.category
                            ),
                          ]}
                          onCategorySelect={handleCategorySelect}
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
                        <button
                          className="btn btn-primary"
                          style={{ marginTop: "-10px", marginBottom: "20px" }}
                          onClick={addProjectItem}
                          type="button"
                          disabled={disableAddItem}
                        >
                          Thêm
                        </button>
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
                            label={
                              <span>
                                Ngày bắt đầu
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            format="DD-MM-YYYY"
                          />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="me-4"
                            value={endDate}
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
                            size=""
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                </Container>
              </TabPanel>
              {/* Thư viện */}
              {/* <TabPanel value="2">
                <Container className="w-100">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Autocomplete
                      size="small"
                      sx={{ width: "30%", marginRight: "20px" }}
                      disablePortal
                      id="combo-box-demo"
                      options={category01.map((option) => option.name)}
                      defaultValue={category01[0]?.name}
                      // disabled={detail?.category ? true : false}
                      onChange={handleSelectCategory01}
                      renderInput={(params) => (
                        <TextField {...params} label="Danh mục 1" />
                      )}
                    />
                    {selectedCategory1 === "Báo cáo ngày (1)" ||
                    selectedCategory1 === "Báo cáo tuần (1)" ? (
                      <Autocomplete
                        size="small"
                        sx={{ width: "20%", marginRight: "20px" }}
                        disablePortal
                        id="combo-box-demo"
                        options={category02?.map((option) => option.name)}
                        defaultValue={category02[0]?.name}
                        // disabled={detail?.category ? true : false}
                        onChange={handleSelectCategory02}
                        renderInput={(params) => (
                          <TextField {...params} label="Danh mục 2" />
                        )}
                      />
                    ) : (
                      ""
                    )}
                    <input
                      type="file"
                      // style={{ padding: "10px" }}
                      // className="custom-file-input"
                      // id={`fileInput${projectLibrary.id}`}
                      name="filename"
                      // onChange={(e) =>
                      //   handleFileChange(projectLibrary.id, e.target.files[0])
                      // }
                      multiple
                      onBlur={handleBlurInput}
                    />
                  </div>
                </Container>
              </TabPanel> */}
            </TabContext>
            {/* SUBMIT */}
            <div
              style={{
                marginTop: "20px",
                marginRight: "20px",
                textAlign: "end",
              }}
            >
              <button
                style={{
                  width: "45px",
                  height: "45px",
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
        </div>
      )}
    </div>
  );
}
