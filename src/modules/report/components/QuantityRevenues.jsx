import React, { useEffect, useState } from "react";
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
import { QuantityRevenuePerWeek } from "./QuantityRevenuePerWeek";
import Loading from "../../home/components/Loading/Loading";

export default function QuantityRevenues() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState();
  const [quantityRevenues, setQuantityRevenues] = useState(); //set = API
  const [errorGetMonday, setErrorGetMonday] = useState(false);
  const [actualWeek, setActualWeek] = useState("");
  const idProject = params.code;
  const getNextModay = async (actualWeek, idProject) => {
    try {
      const nextMonday = await getNextMondayAPI(actualWeek, idProject);
      setActualWeek(nextMonday);
      // console.log(nextMonday);
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
  const getOldQuantityRevenues = async (idProject) => {
    // debugger;
    try {
      const oldQuantityRevenues = await getOldQuantityRevenueAPI(idProject);
      console.log(oldQuantityRevenues);
      const tempQuantityRevenues = oldQuantityRevenues?.map(
        (quantityRevenue) => (
          <QuantityRevenuePerWeek
            idQuantityRevenue={quantityRevenue.id}
            week={quantityRevenue.week}
            actualQuantityAndRevenueDetails={
              quantityRevenue.actualQuantityAndRevenueDetails
            }
            key={quantityRevenue.id}
            onValueChange={handleChildValueChange}
          />
        )
      );
      if (oldQuantityRevenues.length !== 0) {
        const actualWeek = oldQuantityRevenues?.map(
          (oldQuantityRevenuePerWeek) => oldQuantityRevenuePerWeek.week
        );
        getNextModay(actualWeek.pop(), idProject);
        console.log(actualWeek.pop());
      }
      setQuantityRevenues(tempQuantityRevenues);
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
  const addQuantityRevenuePerWeek = () => {
    // debugger;
    setActualWeek(project?.startDate);
    setQuantityRevenues((oldQuantityRevenuePerWeeks) => {
      return [
        ...oldQuantityRevenuePerWeeks,
        <QuantityRevenuePerWeek
          // data={project?.rpQuantityAndRevenueDetails}
          // startDate={project?.startDate}
          idQuantityRevenue={-Date.now()}
          week={actualWeek === "" ? project?.startDate : actualWeek}
          key={Date.now()}
          onValueChange={handleChildValueChange}
        />,
      ];
    });
    if (actualWeek === "") {
      getNextModay(project?.startDate, idProject);
      return;
    }
    getNextModay(actualWeek, idProject);
  };

  const handleSaveQuantityRevenue = async () => {
    // debugger;
    setIsLoading(true);
    const tempData = [];

    const tempObject = {};
    valueFromChild.forEach((item) => {
      const week = item.actualWeek;
      tempObject[week] = item;
    });

    for (const key in tempObject) {
      tempData.push(tempObject[key]);
    }
    try {
      await addActualQuantityAndRevenueAPI(tempData, idProject);
      setIsLoading(false);
      toast.success("Cập nhật sản lượng thực tế thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật sản lượng thực tế thất bại");
    }
    getOldQuantityRevenues(idProject);

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
          {quantityRevenues?.map((quantityRevenue, index) => (
            <div key={index}>{quantityRevenue}</div>
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
            onClick={addQuantityRevenuePerWeek}
            disabled={errorGetMonday}
          >
            Thêm tuần
          </button>
          <button
            className="btn btn-success"
            onClick={handleSaveQuantityRevenue}
          >
            Lưu
          </button>
        </div>
      </Container>
    </div>
  );
}
