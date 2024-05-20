import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Container,
  Link,
  Tab,
  TextField,
  tabsClasses,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  addActualCostAPI,
  getNextMondayAPI,
  getOldActualCostAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import ActualCostPerWeek from "./ActualCostPerWeek";
import Loading from "../../home/components/Loading/Loading";
import GoToTop from "../../home/components/GoToTop/GoToTop";

export default function ActualCosts() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState();
  const [actualCosts, setActualCosts] = useState(); //set = API
  const [oldCosts, setOldCosts] = useState(); //set = API

  const [errorGetMonday, setErrorGetMonday] = useState(false);
  const [actualWeek, setActualWeek] = useState(0);

  const idProject = params.code;
  //tab panel
  const [value, setValue] = useState("");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const getNextModay = async (actualWeek, idProject) => {
    try {
      const nextMonday = await getNextMondayAPI(actualWeek, idProject);
      setActualWeek(nextMonday);
      return nextMonday;
    } catch (error) {
      setErrorGetMonday(true);
      console.error("Error fetching actualWeek:", error);
    }
  };
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      return data;
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  const getOldCosts = async (idProject) => {
    try {
      const oldCosts = await getOldActualCostAPI(idProject);
      if (oldCosts.length !== 0) {
        setOldCosts(oldCosts);
        setValue(oldCosts[oldCosts.length - 1].week);
        const tempOldCosts = oldCosts?.map((oldCost) => (
          <ActualCostPerWeek
            idActualCost={oldCost.id}
            week={oldCost.week}
            fromDateToDate={oldCost.fromDateToDate}
            actualCostDetails={oldCost.actualCostDetails}
            key={oldCost.id}
            onValueChange={handleChildValueChange}
          />
        ));
        setActualCosts(tempOldCosts);
        const actualWeek = oldCosts?.map(
          (oldCostPerWeek) => oldCostPerWeek.week
        );
        getNextModay(actualWeek.pop(), idProject);
      } else if (oldCosts.length === 0) {
        let startWeek = await getNextModay(0, idProject);
        setOldCosts([
          {
            id: -Date.now(),
            week: startWeek.date,
            fromDateToDate: startWeek.fromDateToDate,
            key: Date.now(),
            actualCostDetails: [],
          },
        ]);
        setActualCosts([
          <ActualCostPerWeek
            idActualCost={-Date.now()}
            week={startWeek.date}
            fromDateToDate={startWeek.fromDateToDate}
            key={Date.now()}
            onValueChange={handleChildValueChange}
          />,
        ]);
        setValue(startWeek.date);
        getNextModay(startWeek.date, idProject);
      }
      setIsLoading(false);
      return oldCosts;
    } catch (error) {
      console.error("Error fetching Cost:", error);
    }
  };

  useEffect(() => {
    getProjects(idProject);
    getOldCosts(idProject);
  }, [idProject]);
  const [valueFromChild, setValueFromChild] = useState([]);

  const handleChildValueChange = (data, week, id) => {
    const tempWeek = {
      actualCostWeek: week,
      actualCost: data,
      idActualCost: id,
    };
    setValueFromChild((prevState) => [
      ...prevState, // Giữ lại tất cả các giá trị hiện có của mảng prevState
      tempWeek, // Thêm tempWeek vào mảng prevState
    ]);
  };
  const addActualCostPerWeek = () => {
    // debugger;
    setActualCosts((oldCostPerWeeks) => {
      return [
        ...oldCostPerWeeks,
        <ActualCostPerWeek
          idActualCost={-Date.now()}
          week={actualWeek.date}
          fromDateToDate={actualWeek.fromDateToDate}
          key={Date.now()}
          onValueChange={handleChildValueChange}
        />,
      ];
    });

    setOldCosts((oldCostPerWeeks) => {
      return [
        ...oldCostPerWeeks,
        {
          id: -Date.now(),
          week: actualWeek.date,
          fromDateToDate: actualWeek.fromDateToDate,
          key: Date.now(),
          actualCostDetails: [],
        },
      ];
    });

    if (actualWeek === "") {
      getNextModay(project?.startDate, idProject);
      return;
    }
    getNextModay(actualWeek.date, idProject);
  };

  const handleSaveActualCost = async () => {
    // debugger;
    const tempData = [];
    const tempObject = {};
    valueFromChild.forEach((item) => {
      const week = item.actualCostWeek;
      tempObject[week] = item;
    });

    for (const key in tempObject) {
      tempData.push(tempObject[key]);
    }
    console.log(tempData);
    try {
      const data = await addActualCostAPI(tempData, idProject);
      if (data) {
        setIsLoading(true);
      }
      await getOldCosts(idProject);
      setIsLoading(false);
      toast.success("Cập nhật chi phí thực tế thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật chi phí thực tế thất bại");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      {isLoading ? (
        <Loading />
      ) : (
        <Container sx={{ marginTop: "20px", marginBottom: "40px" }}>
          <Link
            sx={{ fontSize: "16px", marginBottom: "5px" }}
            component="button"
            variant="body2"
            onClick={() => {
              navigate(`/projects/${idProject}`);
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
            Quay lại dự án
          </Link>

          <TabContext value={value}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ maxWidth: "75%" }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                  }}
                >
                  <TabList
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons
                    aria-label="visible arrows tabs example"
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                    }}
                  >
                    {oldCosts?.map((oldCost, index) => (
                      <Tab
                        key={index}
                        label={oldCost.fromDateToDate}
                        value={oldCost.week}
                      />
                    ))}
                  </TabList>
                </Box>
              </div>
              <div style={{ maxWidth: "25%", display: "flex" }}>
                <Autocomplete
                  size="small"
                  sx={{
                    width: "150px",
                    marginRight: "15px",
                    fontSize: "14px",
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={oldCosts?.map((option) => option.week)}
                  defaultValue={actualWeek?.week}
                  onChange={handleChangeTab}
                  renderInput={(params) => (
                    <TextField
                      sx={{ fontSize: "14px" }}
                      {...params}
                      size="small"
                      variant="standard"
                      placeholder="Tìm tuần"
                    />
                  )}
                />
                <button
                  style={{
                    padding: "0px",
                    height: "27px",
                    width: "27px",
                    lineHeight: "15px",
                    marginRight: "15px",
                  }}
                  className="btn btn-warning"
                  onClick={addActualCostPerWeek}
                  disabled={errorGetMonday}
                  title="Thêm tuần"
                >
                  <AddIcon sx={{ fontSize: "22px" }} />
                </button>

                <button
                  style={{
                    padding: "0px",
                    height: "27px",
                    width: "27px",
                    lineHeight: "15px",
                  }}
                  className="btn btn-success"
                  onClick={handleSaveActualCost}
                  title="Lưu"
                >
                  <SaveIcon sx={{ fontSize: "22px" }} />
                </button>
              </div>
            </div>
            {/* {console.log(quantityRevenues)} */}
            {actualCosts?.map((actualCost, index) => (
              <TabPanel
                sx={{ padding: 0 }}
                key={index}
                value={actualCost.props.week}
              >
                {actualCost}
              </TabPanel>
            ))}
          </TabContext>

          <GoToTop />
        </Container>
      )}
    </div>
  );
}
