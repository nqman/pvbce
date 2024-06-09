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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Loading from "../../home/components/Loading/Loading";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { addDocumentAPI } from "../../../apis/documentAPI";

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
      let categoryOne = await getCategoriesAPI("Project_ITEM_ONE");
      let categoryTwo = await getCategoriesAPI("Project_ITEM_TWO");
      setCategoryOne(categoryOne);
      setCategoryTwo(categoryTwo);
    }
    fetchMyAPI();
  }, [idProject]);
  // MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryOne, setCategoryOne] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [selectedCategoryOne, setSelectedCategoryOne] = useState("");
  const [selectedCategoryTwo, setSelectedCategoryTwo] = useState("");
  const [errorCategoryOne, setErrorCategoryOne] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorCategoryTwo, setErrorCategoryTwo] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorFile, setErrorFile] = useState("Vui lòng không bỏ trống");
  const [errorType, setErrorType] = useState("");

  const handleSelectCategoryOne = async (event, value) => {
    setDocument({ ...document, categoryOne: value });
    setSelectedCategoryOne(value);
    if (value) {
      setErrorCategoryOne("");
    } else {
      setErrorCategoryOne("Vui lòng không bỏ trống");
    }
  };
  const handleSelectCategoryTwo = async (event, value) => {
    setDocument({ ...document, categoryTwo: value });
    setSelectedCategoryTwo(value);
    if (value) {
      setErrorCategoryTwo("");
    } else {
      setErrorCategoryTwo("Vui lòng không bỏ trống");
    }
  };
  // SELECT type
  const [type, setType] = useState("");
  const handleChangeType = (e, value) => {
    setType(value);
    if (value === "File") {
      setDocument({ ...document, link: "" });
    } else if (value === "Link") {
      setDocument({ ...document, files: [] });
    }
  };
  const emptyValue = {
    categoryOne: "",
    categoryTwo: "",
    link: "",
    files: [],
    type: "PROJECT",
  };
  const [document, setDocument] = useState(emptyValue);
  const handleInputChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const chosenFiles = [...e.target.files];
    setDocument({ ...document, files: chosenFiles });
    if (chosenFiles.length > 0) {
      setErrorFile("");
    }
  };
  const handleSaveProjectLibrary = async () => {
    // console.log(document);
    try {
      const data = await addDocumentAPI(document);
      if (data) {
        setShow(false);
        toast.success("Thêm tài liệu thành công");
      }
      getProjects(idProject);
    } catch (error) {
      toast.error("Thêm tài liệu thất bại");
      setIsLoading(false);
    }
  };

  if (!project) {
    return <Loading />;
  }

  return (
    <div>
      <Toaster position="top-right" />
      <Container className="mt-4 mb-4">
        <div>
          <Button
            sx={{
              textTransform: "initial",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
            onClick={() => {
              navigate("/report/listprojects");
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: "12px" }} />
            Danh sách dự án
          </Button>
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
            <>
              <Button
                variant="contained"
                sx={{ textTransform: "initial", marginLeft: "20px" }}
                onClick={handleShow}
              >
                <DriveFolderUploadIcon sx={{ mr: 1 }} />
                Cập nhật thư viện
              </Button>

              <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                style={{ marginTop: "100px" }}
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ fontWeight: "bold" }}>
                    Tải lên thư viện
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className=" me-4"
                      style={{ height: "50px", width: "40%" }}
                    >
                      <Autocomplete
                        size="small"
                        sx={{
                          marginBottom: "5px",
                          display: "block",
                          height: "40px",
                        }}
                        disablePortal
                        options={categoryOne.map((option) => option.name)}
                        onChange={handleSelectCategoryOne}
                        renderInput={(params) => (
                          <TextField {...params} label="Danh mục 1" />
                        )}
                      />
                      <span className="text-danger  ">{errorCategoryOne}</span>
                    </div>
                    {selectedCategoryOne === "Báo cáo ngày (1)" ||
                    selectedCategoryOne === "Báo cáo tuần (1)" ? (
                      <div
                        className=" me-4"
                        style={{ height: "50px", width: "40%" }}
                      >
                        <Autocomplete
                          size="small"
                          sx={{
                            marginBottom: "5px",
                            display: "block",
                            height: "40px",
                          }}
                          disablePortal
                          options={categoryTwo?.map((option) => option.name)}
                          onChange={handleSelectCategoryTwo}
                          renderInput={(params) => (
                            <TextField {...params} label="Danh mục 2" />
                          )}
                        />
                        <span className="text-danger ">{errorCategoryTwo}</span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      // className=" me-4"
                      style={{ height: "50px", width: "20%" }}
                    >
                      <Autocomplete
                        size="small"
                        sx={{
                          marginBottom: "5px",
                          display: "block",
                          height: "40px",
                        }}
                        disablePortal
                        options={["File", "Link"]}
                        onChange={handleChangeType}
                        renderInput={(params) => (
                          <TextField {...params} label="Định dạng" />
                        )}
                      />
                      <span className="text-danger ">{errorType}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {type === "File" ? (
                      <>
                        <Button
                          sx={{
                            width: "100%",
                            padding: 0,
                            marginBottom: "5px",
                          }}
                          component="label"
                        >
                          <input
                            style={{}}
                            className="form-control"
                            type="file"
                            multiple
                            id="formFile"
                            onChange={handleFileChange}
                          />
                        </Button>
                        <span className="text-danger ">{errorFile}</span>
                      </>
                    ) : (
                      ""
                    )}
                    {type === "Link" ? (
                      <>
                        <TextField
                          label="Đường dẫn tài liệu"
                          id="outlined-size-small"
                          value={document.link}
                          name="link"
                          size="small"
                          sx={{
                            width: "100%",
                            padding: 0,
                          }}
                          onChange={handleInputChange}
                        />
                        <span className="text-danger ">{errorFile}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    style={{
                      width: "30px",
                      height: "30px",
                      padding: 0,
                    }}
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={handleSaveProjectLibrary}
                  >
                    <SaveIcon
                      sx={{
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                    />
                  </button>
                </Modal.Footer>
              </Modal>
            </>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProjectDetail;
