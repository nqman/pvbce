import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  Container,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjectAPI, fetchPdfProject } from "../../../apis/reportAPI";
import "./styles.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  // MENU Xuất báo cáo
  const [anchorElCost, setAnchorElCost] = React.useState(null);
  const [anchorElQuantity, setAnchorElQuantity] = React.useState(null);
  const openCost = Boolean(anchorElCost);
  const openQuantity = Boolean(anchorElQuantity);
  const handleClickCost = (event) => {
    setAnchorElCost(event.currentTarget);
  };
  const handleClickQuantity = (event) => {
    setAnchorElQuantity(event.currentTarget);
  };
  const handleCloseCost = () => {
    setAnchorElCost(null);
  };
  const handleCloseQuantity = () => {
    setAnchorElQuantity(null);
  };
  //   if (!project) {
  //     return;
  //   }

  return (
    <div>
      <Container className="mt-4">
        <div style={{ justifyContent: "end", display: "flex" }}>
          {/* <div>
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

          </div> */}
          {/* BUTTON SẢN LƯỢNG THỰC TẾ */}
          <div>
            <Button
              id="basic-button"
              aria-controls={openQuantity ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openQuantity ? "true" : undefined}
              onClick={handleClickQuantity}
              sx={{
                textTransform: "inherit",
                marginRight: "10px",
              }}
              variant="contained"
            >
              Sản lượng thực tế
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElQuantity}
              open={openQuantity}
              onClose={handleCloseQuantity}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() =>
                  navigate(`/projects/actual-quantity-revenue/${idProject}`)
                }
              >
                Nhập báo cáo sản lượng thực tế
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate(`/project/report-quantity-revenue/${idProject}`)
                }
              >
                Xuất báo cáo sản lượng thực tế
              </MenuItem>
            </Menu>
          </div>
          {/* BUTTON CHI PHÍ THỰC TẾ */}
          <div>
            <Button
              id="basic-button"
              aria-controls={openCost ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openCost ? "true" : undefined}
              onClick={handleClickCost}
              sx={{
                textTransform: "inherit",
                marginRight: "10px",
              }}
              variant="contained"
              color="success"
            >
              Chi phí thực tế
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElCost}
              open={openCost}
              onClose={handleCloseCost}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => navigate(`/projects/actual-cost/${idProject}`)}
              >
                Nhập báo cáo chi phí thực tế
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/project/report-cost/${idProject}`)}
              >
                Xuất báo cáo chi phí thực tế
              </MenuItem>
            </Menu>
          </div>
          {/* <div>
            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: "inherit", marginRight: "10px" }}
              onClick={() => navigate(`/projects/actual-cost/${idProject}`)}
            >
              Chi phí thực tế
            </Button>
          </div> */}
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
