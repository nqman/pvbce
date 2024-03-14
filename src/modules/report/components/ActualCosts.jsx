import React, { useEffect, useState } from "react";
import { ActualCostPerWeek } from "./ActualCostPerWeek";
import { Container } from "@mui/material";
import {
  addActualQuantityAndRevenueAPI,
  getActualQuantityRevenueAPI,
  getNextMondayAPI,
  selectProjectAPI,
} from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";

export default function ActualCosts() {
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
  const getActualQuantityRevenues = async (idProject) => {
    // debugger;
    try {
      const data = await getActualQuantityRevenueAPI(idProject);
      setActualQuantityAndRevenues(data);
      setOldCostPerWeeks(data?.actualQuantityAndRevenueWeeks);
      return data;
    } catch (error) {
      console.error("Error fetching actualQuantityAndRevenue:", error);
    }
  };

  useEffect(() => {
    getProjects(idProject);
    getActualQuantityRevenues(idProject);
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

    // Cập nhật valueFromChild với tempData
    setValueFromChild(tempData);

    // Log tempData
    console.log(tempData);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <Container className="mt-5">
        {oldCostPerWeeks
          ? oldCostPerWeeks.map((oldCostPerWeek) => (
              <ActualCostPerWeek
                oldCostPerWeek={oldCostPerWeek}
                oldWeek={oldCostPerWeek.week}
                actualQuantityAndRevenueDetails={
                  oldCostPerWeek.actualQuantityAndRevenueDetails
                }
                key={oldCostPerWeek.id}
                // sendDataToAPI={sendDataToAPI}
              />
            ))
          : ""}

        {actualCostPerWeeks.map((actualCostPerWeek, index) => (
          <div key={index}>{actualCostPerWeek}</div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-30px",
          }}
        >
          <button
            className="btn btn-warning"
            // style={{ marginTop: "-30px" }}
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
