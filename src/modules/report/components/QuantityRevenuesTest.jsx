import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Tab,
  Tabs,
  tabsClasses,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  addActualQuantityAndRevenueAPI,
  getNextMondayAPI,
  getOldQuantityRevenueAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { QuantityRevenuePerWeek } from "./QuantityRevenuePerWeek";
import Loading from "../../home/components/Loading/Loading";
import GoToTop from "../../home/components/GoToTop/GoToTop";

export default function QuantityRevenuesTest() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState();
  const [quantityRevenues, setQuantityRevenues] = useState(); //set = API
  const [oldQuantityRevenues, setOldQuantityRevenues] = useState(); //set = API
  const [latestWeek, setLatestWeek] = useState(); //set = API
  const [errorGetMonday, setErrorGetMonday] = useState(false);
  const [actualWeek, setActualWeek] = useState("");
  const idProject = params.code;

  //tab panel
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const getNextModay = async (actualWeek, idProject) => {
    // debugger;
    try {
      const nextMonday = await getNextMondayAPI(actualWeek, idProject);
      setActualWeek(nextMonday);
    } catch (error) {
      setErrorGetMonday(true);
      console.error("Error fetching actualWeek:", error);
    }
  };
  const getProjects = async (idProject) => {
    // debugger;
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      getNextModay(0, idProject);
      return data;
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
  const getOldQuantityRevenues = async (idProject) => {
    // debugger;
    try {
      const oldQuantityRevenues = await getOldQuantityRevenueAPI(idProject);
      console.log(oldQuantityRevenues);
      setQuantityRevenues(oldQuantityRevenues);
      // let idLatest = oldQuantityRevenues?.pop().id;
      // console.log(idLatest);
      // setIdLatestWeek(idLatest);
      setValue(oldQuantityRevenues[oldQuantityRevenues.length - 1].id);

      // const tempQuantityRevenues = oldQuantityRevenues?.map(
      //   (quantityRevenue) => (
      //     <QuantityRevenuePerWeek
      //       idQuantityRevenue={quantityRevenue.id}
      //       week={quantityRevenue.week}
      //       fromDateToDate={quantityRevenue.fromDateToDate}
      //       actualQuantityAndRevenueDetails={
      //         quantityRevenue.actualQuantityAndRevenueDetails
      //       }
      //       key={quantityRevenue.id}
      //       onValueChange={handleChildValueChange}
      //     />
      //   )
      // );
      if (oldQuantityRevenues.length !== 0) {
        const actualWeek = oldQuantityRevenues?.map(
          (oldQuantityRevenuePerWeek) => oldQuantityRevenuePerWeek.week
        );
        getNextModay(actualWeek.pop(), idProject);
      }
      // setQuantityRevenues(tempQuantityRevenues);
      setIsLoading(false);
      return oldQuantityRevenues;
    } catch (error) {
      console.error("Error fetching QuantityAndRevenue:", error);
    }
  };

  useEffect(() => {
    getProjects(idProject);
    getOldQuantityRevenues(idProject);
  }, [idProject]);
  const [valueFromChild, setValueFromChild] = useState([]);

  const handleChildValueChange = (data, week, id) => {
    const tempWeek = {
      actualWeek: week,
      quantityRevenue: data,
      idQuantityRevenue: id,
    };
    setValueFromChild((prevState) => [
      ...prevState, // Giữ lại tất cả các giá trị hiện có của mảng prevState
      tempWeek, // Thêm tempWeek vào mảng prevState
    ]);
  };
  const emptyWeek = {
    id: -Date.now(),
    week: actualWeek.date,
    fromDateToDate: actualWeek.fromDateToDate,
    actualQuantityAndRevenueDetails: [],
  };
  const addQuantityRevenuePerWeek = () => {
    // setQuantityRevenues((oldQuantityRevenuePerWeeks) => {
    //   return [
    //     ...oldQuantityRevenuePerWeeks,
    //     <QuantityRevenuePerWeek
    //       idQuantityRevenue={-Date.now()}
    //       week={actualWeek.date}
    //       fromDateToDate={actualWeek.fromDateToDate}
    //       key={Date.now()}
    //       onValueChange={handleChildValueChange}
    //     />,
    //   ];
    // });

    setQuantityRevenues((oldQuantityRevenuePerWeeks) => {
      return [...oldQuantityRevenuePerWeeks, emptyWeek];
    });
    if (actualWeek === "") {
      getNextModay(project?.startDate, idProject);
      return;
    }
    getNextModay(actualWeek.date, idProject);
  };

  const handleSaveQuantityRevenue = async () => {
    // debugger;
    const tempData = [];
    const tempObject = {};
    valueFromChild.forEach((item) => {
      const week = item.actualWeek;
      tempObject[week] = item;
    });

    for (const key in tempObject) {
      tempData.push(tempObject[key]);
    }
    // console.log(tempData);
    try {
      const data = await addActualQuantityAndRevenueAPI(tempData, idProject);
      if (data) {
        setIsLoading(true);
      }
      //sau khi thêm thì lấy lại cái cũ để hiện thị ra giao diện
      await getOldQuantityRevenues(idProject);
      setIsLoading(false);
      toast.success("Cập nhật sản lượng thực tế thành công");
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
      toast.error("Cập nhật sản lượng thực tế thất bại");
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

          {/* <div>
            {quantityRevenues?.map((quantityRevenue, index) => (
              <div key={index}>{quantityRevenue}</div>
            ))}
          </div> */}
          <TabContext value={value}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ maxWidth: "70%" }}>
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
                    {quantityRevenues?.map((oldQuantityRevenue) => (
                      <Tab
                        label={oldQuantityRevenue.fromDateToDate}
                        value={oldQuantityRevenue.id}
                      />
                    ))}
                  </TabList>
                </Box>
              </div>
              <div style={{ maxWidth: "30%" }}>
                <button
                  style={{
                    padding: "0px",
                    height: "27px",
                    width: "27px",
                    lineHeight: "15px",
                    marginRight: "15px",
                  }}
                  className="btn btn-warning"
                  onClick={addQuantityRevenuePerWeek}
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
                  onClick={handleSaveQuantityRevenue}
                  title="Lưu"
                >
                  <SaveIcon sx={{ fontSize: "22px" }} />
                </button>
              </div>
            </div>

            {quantityRevenues?.map((quantityRevenue) => (
              <TabPanel sx={{ padding: 0 }} value={quantityRevenue.id}>
                <QuantityRevenuePerWeek
                  idQuantityRevenue={quantityRevenue.id}
                  week={quantityRevenue.week}
                  fromDateToDate={quantityRevenue.fromDateToDate}
                  actualQuantityAndRevenueDetails={
                    quantityRevenue.actualQuantityAndRevenueDetails
                  }
                  key={quantityRevenue.id}
                  onValueChange={handleChildValueChange}
                />
              </TabPanel>
            ))}
          </TabContext>

          <GoToTop />
        </Container>
      )}
    </div>
  );
}
