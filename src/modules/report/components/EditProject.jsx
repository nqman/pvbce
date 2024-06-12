import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Tab,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import * as yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";

//API
import {
  saveProjectAPI,
  selectProjectAPI,
  getCategoriesAndCategoriesOfProjectAPI,
  getCategoriesAPI,
  getCategoriesOneAndTwoAPI,
} from "../../../apis/reportAPI";

//Calendar
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ProjectItem from "./ProjectItem";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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
  const [remainingCategories, setRemainingCategories] = useState([]);
  const [projectItems, setProjectItems] = useState([newEmptyProjectDetail()]);
  const [disableAddItem, setDisableAddItem] = useState(false);
  const [countItem, setCountItem] = useState(1);

  // Get category selection
  useEffect(() => {
    async function fetchMyAPI() {
      let categories = await getCategoriesAndCategoriesOfProjectAPI(idProject);
      const data = await selectProjectAPI(idProject);
      setProject(data);
      // console.log(data);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setTotalAmount(data.totalAmount);
      setTimeDiff(data?.totalTime);
      setProjectItems(data.rpQuantityAndRevenueDetails);
      setCountItem(data.rpQuantityAndRevenueDetails?.length);
      setRpQuantityAndRevenueLibraries(data.rpQuantityAndRevenueLibraries);
      setCategories(categories);

      let remaining = [];
      categories.forEach((item2) => {
        if (
          !data.rpQuantityAndRevenueDetails?.some(
            (item1) => item1.category === item2.name
          )
        ) {
          remaining.push({
            name: item2.name,
            unit: item2.unit,
          });
        }
      });
      setRemainingCategories(remaining);
      setCountItem(categories?.length - remaining.length);
      if (remaining.length === 0) {
        setDisableAddItem(true);
      }
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

  const addProjectItem = () => {
    let tempCountItem = countItem + 1;
    setCountItem(tempCountItem);
    if (categories.length === tempCountItem) {
      setDisableAddItem(true);
    }
    setProjectItems((oldProjectItems) => {
      return [...oldProjectItems, newEmptyProjectDetail()];
    });
  };
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
    } else if (remainingCategories.length === 1) {
      setDisableAddItem(true);
      return;
    }
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
    if (typeof endDate !== "string" && endDate !== null) {
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
    useState([
      {
        id: -Date.now(),
        categoryOne: "",
        categoryTwo: "",
        linkLibrary: "",
        files: [],
      },
    ]);
  const [categoryOne, setCategoryOne] = useState([]);
  const [categoryOneTwo, setCategoryOneTwo] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [selectedCategoryOne, setSelectedCategoryOne] = useState({
    id: 0,
    name: "",
  });
  const [selectedCategoryTwo, setSelectedCategoryTwo] = useState({
    id: 0,
    name: "",
  });
  const [errorCategoryOne, setErrorCategoryOne] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorCategoryTwo, setErrorCategoryTwo] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorFile, setErrorFile] = useState("Vui lòng không bỏ trống");
  const [errorType, setErrorType] = useState("");
  const [errorLibary, setErrorLibrary] = useState("");

  const createDiv = () => {
    const newLibraryDetail = {
      id: -Date.now(),
      categoryOne: "",
      categoryTwo: "",
      linkLibrary: "",
      files: [],
      fileNames: [],
    };
    setRpQuantityAndRevenueLibraries([
      ...rpQuantityAndRevenueLibraries,
      newLibraryDetail,
    ]);
  };

  const deleteDiv = (id) => {
    const updatedRpQuantityAndRevenueLibraries =
      rpQuantityAndRevenueLibraries.filter(
        (productDetail) => productDetail.id !== id
      );
    setRpQuantityAndRevenueLibraries(updatedRpQuantityAndRevenueLibraries);
    setProject({
      ...project,
      rpQuantityAndRevenueLibraries: updatedRpQuantityAndRevenueLibraries,
    });
  };

  const handleInputChange = (id, key, value) => {
    // debugger;
    if (key === "categoryOne") {
      setSelectedCategoryOne({ id: id, name: value });
      let selectedCategory = categoryOneTwo.filter(
        (category) => category.name === value
      );
      setCategoryTwo({ id: id, name: selectedCategory[0].categories });
      console.log(id);
      console.log(selectedCategory[0].categories);
    }
    if (key === "categoryTwo") {
      setSelectedCategoryTwo({ id: id, name: value });
    }

    if (value) {
      setErrorCategoryOne("");
    } else {
      setErrorCategoryOne("Vui lòng không bỏ trống");
    }
    const updatedRpQuantityAndRevenueLibraries =
      rpQuantityAndRevenueLibraries.map((projectLibrary) =>
        projectLibrary.id === id
          ? { ...projectLibrary, [key]: value }
          : projectLibrary
      );
    setRpQuantityAndRevenueLibraries(updatedRpQuantityAndRevenueLibraries);
  };

  const handleFileChange = (e, id) => {
    const chosenFiles = [...e.target.files];
    // const chosenfileNames = [...e.target.files.name];

    let chosenfileNames = chosenFiles.map((file) => file.name);
    // console.log(fileNames.join(";"));
    const updatedRpQuantityAndRevenueLibraries =
      rpQuantityAndRevenueLibraries.map((projectLibrary) =>
        projectLibrary.id === id
          ? {
              ...projectLibrary,
              files: chosenFiles,
              fileNames: chosenfileNames.join(";"),
            }
          : projectLibrary
      );

    setRpQuantityAndRevenueLibraries(updatedRpQuantityAndRevenueLibraries);

    // console.log(updatedRpQuantityAndRevenueLibraries);
  };
  const handleBlurInput = () => {
    setProject({
      ...project,
      rpQuantityAndRevenueLibraries: rpQuantityAndRevenueLibraries,
    });
  };
  useEffect(() => {
    async function fetchMyAPI() {
      let categoryOne = await getCategoriesAPI("PROJECT_ITEM_ONE");
      let categoryOneTwo = await getCategoriesOneAndTwoAPI("PROJECT_ITEM_ONE");
      // let categoryTwo = await getCategoriesAPI("PROJECT_ITEM_TWO");
      setCategoryOne(categoryOne);
      // setCategoryTwo(categoryTwo);
      setCategoryOneTwo(categoryOneTwo);
      console.log(categoryOneTwo);
    }
    fetchMyAPI();
  }, [idProject]);

  const handleSubmit = async (e) => {
    // debugger;
    e.preventDefault();
    if (project.name.trim().length === 0) {
      toast.error("Vui lòng nhập tên dự án");
      return;
    }
    console.log(project);
    try {
      const data = await saveProjectAPI(project);
      if (data) {
        setIsLoading(true);
        toast.success("Cập nhật dự án thành công");
        navigate("/report/listprojects");
      }
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
      <Toaster position="top-right" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-2 mb-5" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", left: "80px" }}>
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
                  <Tab
                    sx={{ fontWeight: "bold" }}
                    label="THƯ VIỆN DỰ ÁN"
                    value="2"
                  />
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
                          type="button"
                          className="btn btn-primary"
                          style={{ marginTop: "-10px", marginBottom: "20px" }}
                          onClick={addProjectItem}
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
                    {rpQuantityAndRevenueLibraries?.map((projectLibrary) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          marginBottom: "5px",
                          // height: "30px",
                        }}
                        key={projectLibrary.id}
                      >
                        <div
                          className=" me-4"
                          style={{
                            height: "50px",
                            width: "300px",
                          }}
                        >
                          <Autocomplete
                            size="small"
                            sx={{
                              display: "block",
                              height: "40px",
                            }}
                            // value={projectLibrary.categoryOne}
                            options={categoryOneTwo?.map(
                              (option) => option.name
                            )}
                            onChange={(e, value) =>
                              handleInputChange(
                                projectLibrary.id,
                                "categoryOne",
                                value
                              )
                            }
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Danh mục 1" />
                            )}
                          />
                          <span className="text-danger  ">
                            {errorCategoryOne}
                          </span>
                        </div>
                        {categoryTwo.name?.length > 0 &&
                        categoryTwo.id === projectLibrary.id ? (
                          <div
                            className=" me-4"
                            style={{ height: "50px", width: "300px" }}
                          >
                            <Autocomplete
                              size="small"
                              sx={{
                                display: "block",
                                height: "40px",
                              }}
                              disablePortal
                              options={categoryTwo.name?.map(
                                (option) => option.name
                              )}
                              onChange={(e, value) =>
                                handleInputChange(
                                  projectLibrary.id,
                                  "categoryTwo",
                                  value
                                )
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Danh mục 2"
                                />
                              )}
                            />
                            <span className="text-danger ">
                              {errorCategoryTwo}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <div
                          className=" me-4"
                          style={{ height: "50px", width: "300px" }}
                        >
                          <TextField
                            placeholder="Nội dung"
                            value={
                              projectLibrary?.linkLibrary ||
                              projectLibrary.files?.name ||
                              projectLibrary?.fileNames
                            }
                            title={
                              projectLibrary?.fileNames ||
                              projectLibrary?.linkLibrary
                            }
                            size="small"
                            sx={{
                              height: "40px",
                              width: "100%",
                              marginBottom: "5px",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                projectLibrary.id,
                                "linkLibrary",
                                e.target.value
                              )
                            }
                            onBlur={handleBlurInput}
                          />
                          <span className="text-danger ">{}</span>
                        </div>
                        <div
                          style={{
                            height: "50px",
                            display: "flex",
                            paddingTop: "7px",
                          }}
                        >
                          <input
                            type="file"
                            style={{ width: "110px" }}
                            className="custom-file-input "
                            id={`fileInput${projectLibrary.id}`}
                            name="filename"
                            multiple
                            // onChange={handleFileChange}
                            onChange={(e) =>
                              handleFileChange(e, projectLibrary.id)
                            }
                            onBlur={handleBlurInput}
                          />

                          <button
                            style={{
                              width: "30px",
                              height: "30px",
                              padding: 0,
                            }}
                            className="btn btn-danger"
                            onClick={() => deleteDiv(projectLibrary.id)}
                          >
                            <ClearIcon
                              sx={{ fontSize: "20px", fontWeight: "bold" }}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                    <p className="text-danger">{errorLibary}</p>
                    {/* <Button variant="contained" onClick={createDiv}>
                      Thêm
                    </Button> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ marginBottom: "20px" }}
                      onClick={createDiv}
                    >
                      Thêm
                    </button>
                  </div>
                </Container>
              </TabPanel>
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
