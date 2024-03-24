import React, { useEffect, useState } from "react";
import { Button, Container, Link } from "@mui/material";
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
import ActualCostPerWeek from "./ActualCostPerWeek";
import Loading from "../../home/components/Loading/Loading";

export default function ActualCosts() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState();
  const [actualCosts, setActualCosts] = useState(); //set = API
  const [errorGetMonday, setErrorGetMonday] = useState(false);
  const [actualCostWeek, setActualCostWeek] = useState("");
  const idProject = params.code;
  const getNextModay = async (actualCostWeek, idProject) => {
    try {
      const nextMonday = await getNextMondayAPI(actualCostWeek, idProject);
      setActualCostWeek(nextMonday);
    } catch (error) {
      setErrorGetMonday(true);
      console.error("Error fetching actualCostWeek:", error);
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
    // debugger;
    try {
      const oldCosts = await getOldActualCostAPI(idProject);
      // console.log(oldCosts);
      const tempCosts = oldCosts?.map((actualCost) => (
        <ActualCostPerWeek
          idActualCost={actualCost.id}
          week={actualCost.week}
          actualCostDetails={actualCost.actualCostDetails}
          key={actualCost.id}
          onValueChange={handleChildValueChange}
        />
      ));
      if (oldCosts.length !== 0) {
        const actualCostWeek = oldCosts?.map(
          (oldActualCostPerWeek) => oldActualCostPerWeek.week
        );
        getNextModay(actualCostWeek.pop(), idProject);
        // console.log(actualCostWeek.pop());
      }
      setActualCosts(tempCosts);
      setIsLoading(false);

      return oldCosts;
    } catch (error) {
      console.error("Error fetching QuantityAndRevenue:", error);
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
    setActualCostWeek(project?.startDate);
    setActualCosts((oldActualCostPerWeeks) => {
      return [
        ...oldActualCostPerWeeks,
        <ActualCostPerWeek
          idActualCost={-Date.now()}
          week={actualCostWeek === "" ? project?.startDate : actualCostWeek}
          key={Date.now()}
          onValueChange={handleChildValueChange}
        />,
      ];
    });
    if (actualCostWeek === "") {
      getNextModay(project?.startDate, idProject);
      return;
    }
    getNextModay(actualCostWeek, idProject);
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
    try {
      await addActualCostAPI(tempData, idProject);
      toast.success("Cập nhật chi phí thực tế thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật chi phí thực tế thất bại");
    }
    getOldCosts(idProject);

    setValueFromChild(tempData);
  };
  if (isLoading) {
    return <Loading />;
  }
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
          {actualCosts?.map((actualCost, index) => (
            <div key={index}>{actualCost}</div>
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
