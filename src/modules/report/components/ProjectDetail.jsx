import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  Container,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectProjectAPI,
  fetchPdfProject,
  getCategoriesAPI,
} from "../../../apis/reportAPI";
import Loading from "../../home/components/Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import NavigationButton from "../../common/NavigationButton";

const ProjectDetail = () => {
  const navigate = useNavigate();
  // READ
  const getPdfDetail = async (id, type) => {
    try {
      const url = await fetchPdfProject(id, type);
      window.open(url, "_blank");
    } catch (error) {}
  };
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const idProject = params.code;

  const [project, setProject] = useState();
  const [rpQuantityAndRevenueDetails, setRpQuantityAndRevenueDetails] =
    useState([]);
  const [rpQuantityAndRevenueLibraries, setRpQuantityAndRevenueLibraries] =
    useState([]);

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
    async function fetchMyAPI() {
      let project = await getProjects(idProject);
    }
    fetchMyAPI();
  }, [idProject]);

  if (!project) {
    return <Loading />;
  }

  return (
    <div>
      <Toaster position="top-right" />
      <Container className="mt-4 mb-4">
        <div>
          <NavigationButton url="/report/listprojects" name="Danh sách dự án" />
        </div>
        <div style={{ justifyContent: "end", display: "flex" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0B5ED7",
              textTransform: "inherit",
              marginRight: "15px",
            }}
            onClick={() =>
              navigate(`/projects/actual-quantity-revenue/${idProject}`)
            }
          >
            Sản lượng thực tế
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "inherit", marginRight: "15px" }}
            onClick={() => navigate(`/projects/actual-cost/${idProject}`)}
            color="success"
          >
            Chi phí thực tế
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "inherit" }}
            onClick={() =>
              navigate(`/projects/report-cost-quantity-revenue/${idProject}`)
            }
            color="warning"
          >
            Xuất báo cáo
          </Button>
        </div>

        <Grid container spacing={5} style={{ overflow: "hidden" }}>
          {/* Thông tin hợp đồng */}
          <Grid item xs={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
              I. THÔNG TIN HỢP ĐỒNG
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
            <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
              II. DANH SÁCH CÁC HẠNG MỤC CỦA DỰ ÁN
            </Typography>
            <table className="table table-striped table-inverse table-responsive table-bordered">
              <thead className="thead-inverse">
                <tr>
                  <th style={{ width: "450px", fontWeight: "bold" }}>
                    HẠNG MỤC
                  </th>
                  <th
                    style={{
                      width: "100px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    ĐƠN VỊ
                  </th>
                  <th
                    style={{
                      width: "150px",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    KHỐI LƯỢNG
                  </th>
                  <th
                    style={{
                      width: "150px",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    ĐƠN GIÁ (VNĐ)
                  </th>
                  <th
                    style={{
                      width: "150px",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    THÀNH TIỀN (VNĐ)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log(rpQuantityAndRevenueDetails)} */}
                {rpQuantityAndRevenueDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail?.category}</td>
                    <td style={{ textAlign: "center" }}>{detail?.unit}</td>
                    <td style={{ textAlign: "right" }}>
                      {detail?.quantity.toLocaleString()}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {detail?.price.toLocaleString()}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {detail?.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ fontWeight: "bold" }} align="right">
                    Tổng cộng
                  </td>
                  <td style={{ fontWeight: "bold" }} colSpan="1" align="right">
                    {(() => {
                      let totalAmount = 0;
                      rpQuantityAndRevenueDetails.forEach((item) => {
                        totalAmount += item.amount;
                      });
                      return totalAmount.toLocaleString();
                    })()}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Thư viện dự án */}
            <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
              III. THƯ VIỆN DỰ ÁN
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
