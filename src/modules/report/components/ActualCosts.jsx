import React, { useEffect, useState } from "react";
import { ActualCostPerWeek } from "./ActualCostPerWeek";
import { Button, Container } from "@mui/material";
import { selectProjectAPI } from "../../../apis/reportAPI";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function ActualCosts() {
  const [actualCostPerWeeks, setActualCostPerWeeks] = useState([]);
  const addActualCostPerWeek = () => {
    setActualCostPerWeeks((oldActualCostPerWeeks) => {
      return [
        ...oldActualCostPerWeeks,
        <ActualCostPerWeek
          data={project}
          currentWeek={idProject}
          key={Date.now()}
        />,
      ];
    });
  };
  const params = useParams();
  const [project, setProject] = useState();
  const idProject = params.code;
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  useEffect(() => {
    getProjects(idProject);
  }, [idProject]);
  return (
    <div>
      <Container className="mt-5">
        {actualCostPerWeeks.map((actualCostPerWeek, index) => (
          <div key={index}>{actualCostPerWeek}</div>
        ))}
        <button
          className="btn btn-warning"
          style={{ marginTop: "-30px" }}
          onClick={addActualCostPerWeek}
        >
          Thêm tuần
        </button>
      </Container>
    </div>
  );
}
