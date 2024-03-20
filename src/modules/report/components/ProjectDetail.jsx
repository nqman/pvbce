import React, { useEffect, useState } from "react";
import { Grid, Typography, List, Container, Button } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjectAPI, fetchPdfProject } from "../../../apis/reportAPI";
import "./styles.css";

const ProjectDetail = () => {
  const navigate = useNavigate();
  // READ
  const getPdfDetail = async (id, type) => {
    try {
      const url = await fetchPdfProject(id, type);
      window.open(url, "_blank");
    } catch (error) {}
  };

  const params = useParams();
  const [project, setProject] = useState();
  const [rpQuantityAndRevenueDetails, setRpQuantityAndRevenueDetails] =
    useState([]);
  const [rpQuantityAndRevenueLibraries, setRpQuantityAndRevenueLibraries] =
    useState([]);

  const idProject = params.code;
  const getProjects = async (idProject) => {
    try {
      const data = await selectProjectAPI(idProject);
      setProject(data);
      setRpQuantityAndRevenueDetails(data.rpQuantityAndRevenueDetails);
      setRpQuantityAndRevenueLibraries(data.rpQuantityAndRevenueLibraries);
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0B5ED7",
              textTransform: "inherit",
              marginRight: "10px",
            }}
            onClick={() =>
              navigate(`/projects/actual-quantity-revenue/${idProject}`)
            }
          >
            Sản lượng thực tế
          </Button>
          <Button
            variant="outlined"
            sx={{ textTransform: "inherit" }}
            onClick={() => navigate(`/projects/actual-cost/${idProject}`)}
          >
            Chi phí thực tế
          </Button>
        </div>

        <Grid container spacing={5} style={{ overflow: "hidden" }}>
          {/* Thông tin hợp đồng */}
          <Grid item xs={12} lg={12}>
            <Typography variant="h5" gutterBottom>
              Thông tin hợp đồng:
            </Typography>
            <List>
              <ul>
                <li className="mb-2">
                  <b>Tên dự án: </b>
                  {project?.name}
                </li>
                <li className="mb-2">
                  <b>Ngày bắt đầu: </b>
                  {project?.startDate}
                </li>
                <li className="mb-2">
                  <b>Ngày kết thúc: </b>
                  {project?.endDate}
                </li>
                <li className="mb-2">
                  <b>Tổng thời gian: </b>
                  {`${project?.totalTime} ngày`}
                </li>

                <li className="mb-2">
                  <b>Ghi chú: </b>
                  {project?.note}
                </li>
              </ul>
            </List>
            <table className="table table-striped table-inverse table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th style={{ width: "300px" }}>Hạng mục</th>
                  <th style={{ width: "100px" }}>Đơn vị</th>
                  <th style={{ width: "200px" }}>Khối lượng</th>
                  <th style={{ width: "200px" }}>Đơn giá (VNĐ)</th>
                  <th style={{ width: "200px" }}>Thành tiền (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {rpQuantityAndRevenueDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail?.category}</td>
                    <td style={{ textAlign: "center" }}>{detail?.unit}</td>
                    <td style={{ textAlign: "right" }}>{detail?.quantity}</td>
                    <td style={{ textAlign: "right" }}>{detail?.price}</td>
                    <td style={{ textAlign: "right" }}>{detail?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          {/* Thư viện dự án */}
          <Grid item xs={12} lg={12}>
            <Typography variant="h5" gutterBottom>
              Thư viện dự án:
            </Typography>
            <List>
              <ul>
                {rpQuantityAndRevenueLibraries.map((detail, index) => (
                  <li className="mb-2" key={index}>
                    <b>{detail.name}: </b>
                    {detail.pathLibrary ? (
                      <span
                        className="link-primary"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => getPdfDetail(detail.id, "detail")}
                      >
                        {detail.fileName}
                      </span>
                    ) : (
                      <span
                        className="link-primary"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => getPdfDetail(detail.id, "detail")}
                      >
                        {detail.linkLibrary}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProjectDetail;
