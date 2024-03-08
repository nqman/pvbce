import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjectAPI } from "../../../apis/reportAPI";
// import {
//   fetchPdfproject,
//   selectEquipmentAPI,
// } from "../../../../apis/equipmentAPI";
const ProjectDetail = () => {
  const navigate = useNavigate();
  // READ
  //   const getPdfDetail = async (id, type) => {
  //     try {
  //       const url = await fetchPdfproject(id, type);
  //       window.open(url, "_blank");
  //     } catch (error) {}
  //   };

  const params = useParams();
  const [project, setProject] = useState();
  const [rpQuantityAndRevenueDetails, setRpQuantityAndRevenueDetails] =
    useState([]);
  const [projectLibraries, setProjectLibraries] = useState([]);

  const idProject = params.code;
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      setRpQuantityAndRevenueDetails(data.rpQuantityAndRevenueDetails);
      setProjectLibraries(data.projectLibraries);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  useEffect(() => {
    getProjects(idProject);
  }, [idProject]);
  //   if (!project) {
  //     return;
  //   }

  return (
    <div>
      <Container className="mt-4">
        <div style={{ textAlign: "end" }}>
          <button className="btn btn-primary" onClick={() => navigate("")}>
            Thông tin thực tế
          </button>
        </div>

        {/* <Grid container spacing={5} style={{ overflow: "hidden" }}>
          <Grid item xs={12} lg={6}></Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" gutterBottom>
              Thông tin chung:
            </Typography>
            <List>
              <ul>
                {
                  <li className="mb-2">
                    {" "}
                    <b>Tên thiết bị: </b>
                    {project.name}
                  </li>
                }
                {
                  <li className="mb-2">
                    <b>Mã thiết bị: </b> {project.divideCode}
                  </li>
                }
                {project.constructionProject ? (
                  <li className="mb-2">
                    <b>Thi công dự án:</b> {project.constructionProject}
                  </li>
                ) : (
                  ""
                )}
                {project.location ? (
                  <li className="mb-2">
                    <b>Nằm ở kho bãi: </b>
                    {project.location}
                  </li>
                ) : (
                  ""
                )}
                {
                  <li className="mb-2">
                    <b>Ghi chú: </b>
                    {project.note}
                  </li>
                }
              </ul>
            </List>
            <Typography variant="h5" gutterBottom>
              Mã QR:
            </Typography>
            <div>
              <img
                style={{ width: "200px", border: "1px solid" }}
                src={project.imageOfQR}
                alt={project.divideCode}
              />
            </div>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant="h5" gutterBottom>
              Thông số kỹ thuật:
            </Typography>
            <List>
              <ul>
                {projectLibraries.map((detail) => (
                  <li className="mb-2">
                    <b>{detail.name}: </b>
                    {detail.pathFile ? (
                      <span
                        className="link-primary"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        // onClick={() => getPdfDetail(detail.id, "detail")}
                      >
                        {detail.value}
                      </span>
                    ) : (
                      <span>{detail.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </List>
          </Grid>
        </Grid> */}
      </Container>
    </div>
  );
};

export default ProjectDetail;
