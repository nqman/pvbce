import React, { useEffect, useState } from "react";
import { ActualCostPerWeek } from "./ActualCostPerWeek";
import { Button, Container, Link } from "@mui/material";
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

export default function ActualCosts() {
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState();
  const [actualQuantityAndRevenues, setActualQuantityAndRevenues] = useState();
  const [errorGetMonday, setErrorGetMonday] = useState(false);
  const [actualCostPerWeeks, setActualCostPerWeeks] = useState([]); //set = API
  const [oldCostPerWeeks, setOldCostPerWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState("");
  const idProject = params.code;
  const getNextModay = async (currentWeek, idProject) => {
    try {
      const nextMonday = await getNextMondayAPI(currentWeek, idProject);
      setCurrentWeek(nextMonday);
      // console.log(nextMonday);
    } catch (error) {
      setErrorGetMonday(true);
      console.error("Error fetching currentWeek:", error);
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
  const getOldQuantityRevenues = async (idProject) => {
    // debugger;
    try {
      const data = await getOldQuantityRevenueAPI(idProject);
      // setActualQuantityAndRevenues(data);
      // setActualCostPerWeeks(data);
      setOldCostPerWeeks(data);
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error fetching actualQuantityAndRevenue:", error);
    }
  };

  useEffect(() => {
    getProjects(idProject);
    getOldQuantityRevenues(idProject);
  }, [idProject]);
  const [valueFromChild, setValueFromChild] = useState([]);

  const handleChildValueChange = (data, currentWeek) => {
    const tempWeek = { currentWeek: currentWeek, actualCostPerWeek: data };
    setValueFromChild((prevState) => [
      ...prevState, // Giữ lại tất cả các giá trị hiện có của mảng prevState
      tempWeek, // Thêm tempWeek vào mảng prevState
    ]);
  };
  const addActualCostPerWeek = () => {
    // debugger;
    setCurrentWeek(project?.startDate);
    setActualCostPerWeeks((oldActualCostPerWeeks) => {
      return [
        ...oldActualCostPerWeeks,
        <ActualCostPerWeek
          // data={project?.rpQuantityAndRevenueDetails}
          // startDate={project?.startDate}
          currentWeek={currentWeek === "" ? project?.startDate : currentWeek}
          key={Date.now()}
          onValueChange={handleChildValueChange}
        />,
      ];
    });
    if (currentWeek === "") {
      getNextModay(project?.startDate, idProject);
      return;
    }
    getNextModay(currentWeek, idProject);
    // console.log(currentWeek);
  };

  const handleSaveActualCost = async () => {
    debugger;
    const tempData = [];

    // Tạo một đối tượng tạm thời để lưu các object cuối cùng của mỗi currentWeek
    const tempObject = {};
    valueFromChild.forEach((item) => {
      const week = item.currentWeek;
      tempObject[week] = item;
    });

    // Chuyển đổi đối tượng tempObject thành một mảng các object và thêm vào tempData
    for (const key in tempObject) {
      tempData.push(tempObject[key]);
    }
    try {
      await addActualQuantityAndRevenueAPI(tempData, idProject);
      toast.success("Cập nhật sản lượng thực tế thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật sản lượng thực tế thất bại");
    }
    getOldQuantityRevenues(idProject);

    // Cập nhật valueFromChild với tempData
    setValueFromChild(tempData);

    // Log tempData
    console.log(tempData);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <Container sx={{ marginTop: "20px" }}>
        <Link
          sx={{ fontSize: "16px", marginBottom: "50px" }}
          component="button"
          variant="body2"
          onClick={() => {
            navigate(`/projects/${idProject}`);
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
          Quay lại dự án
        </Link>

        <div>
          {oldCostPerWeeks
            ? oldCostPerWeeks.map((oldCostPerWeek) => (
                <ActualCostPerWeek
                  oldCostPerWeek={oldCostPerWeek}
                  oldWeek={oldCostPerWeek.week}
                  actualQuantityAndRevenueDetails={
                    oldCostPerWeek.actualQuantityAndRevenueDetails
                  }
                  key={oldCostPerWeek.id}
                  onValueChange={handleChildValueChange}
                />
              ))
            : ""}

          {actualCostPerWeeks.map((actualCostPerWeek, index) => (
            <div key={index}>{actualCostPerWeek}</div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-30px",
          }}
        >
          <button
            className="btn btn-warning"
            onClick={addActualCostPerWeek}
            disabled={errorGetMonday}
          >
            Thêm tuần
          </button>
          <button className="btn btn-success" onClick={handleSaveActualCost}>
            Lưu
          </button>
        </div>
      </Container>
    </div>
  );
}
