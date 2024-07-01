import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Tab,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import toast, { Toaster } from "react-hot-toast";

// API
import { checkCodeAPI, saveEmployeeAPI } from "../../../../apis/employeeAPI";
import { useNavigate } from "react-router-dom";
import Loading from "../../../home/components/Loading/Loading";
import NavigationButton from "../../../common/NavigationButton";

export default function CreateEmployee() {
  const emptyValue = {
    id: Date.now(),
    name: "",
    code: "",
    department: "",
    position: "",
    method: "",
    contact: "",
    IDCard: null,
    degree: null,
    safetyCard: null,
    contract: null,
    healthCer: null,
  };
  const navigate = useNavigate();
  const [value, setValue] = useState(emptyValue);

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errorcode, setErrorCode] = useState("");

  // Thông số chung
  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleCheckCode = async () => {
    if (value.code) {
      // const res = await checkCodeAPI(value.code);
      // if (!res) {
      //   setErrorCode("Mã nhân sự đã tồn tại");
      //   return;
      // }
      setErrorCode("");
    }
  };
  // //Chọn ảnh
  // const [selectedImages, setSelectedImages] = useState([]);
  // const handleImageChange = (event) => {
  //   const files = event.target.files;
  //   if (files.length > 5) {
  //     alert("Số lượng ảnh không được quá 5");
  //   } else {
  //     const newImages = [...selectedImages];
  //     console.log(newImages);
  //     for (let i = 0; i < files.length; i++) {
  //       newImages.push({ id: -Date.now(), imageFile: files[i] });
  //     }
  //     setSelectedImages(newImages);
  //     setValue({ ...value, productImages: newImages });
  //   }
  // };
  // //Xóa ảnh
  // const handleRemoveImage = (index) => {
  //   const newImages = [...selectedImages];
  //   newImages.splice(index, 1);
  //   setSelectedImages(newImages);
  //   setValue({ ...value, productImages: newImages });
  // };

  //Thông số kỹ thuật
  // const [employeeDetails, setEmployeeDetails] = useState([
  //   { id: -Date.now(), name: "", value: "", file: null },
  // ]);
  // const [errorDetail, setErrorDetail] = useState("");

  // const handleInputChange = (id, key, value) => {
  //   const updatedEmployeeDetails = employeeDetails.map((productDetail) =>
  //     productDetail.id === id
  //       ? { ...productDetail, [key]: value }
  //       : productDetail
  //   );
  //   setEmployeeDetails(updatedEmployeeDetails);
  // };
  // const handleBlurInput = () => {
  //   // debugger;
  //   setValue({ ...value, employeeDetails: employeeDetails });
  // };

  const handleFileChange = (e) => {
    debugger;
    setValue({ ...value, [e.target.name]: e.target.files[0] });
  };
  console.log(value);

  // Thêm nhân sự
  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    console.log(value);
    if (!value.name) {
      toast.error("Vui lòng nhập tên nhân sự");
    } else if (!value.code) {
      toast.error("Vui lòng nhập mã nhân sự");
    } else {
      setIsLoading(true);
      try {
        setErrorCode("");
        const data = await saveEmployeeAPI(value);
        if (data) {
          toast.success("Thêm nhân sự thành công");
          setIsLoading(false);
          // navigate("/catalogue/employees");
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error("Thêm nhân sự thất bại");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-2 mb-5" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", left: "80px" }}>
            <NavigationButton
              url="/catalogue/employees"
              name="Danh sách nhân sự"
            />
          </div>
          <div>
            <Toaster position="top-right" />
            <h1 className="text-center pt-3">THÊM NHÂN SỰ</h1>
            <form noValidate onSubmit={handleSaveEmployee}>
              <Container>
                <TabContext value={item}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TabList onChange={handleChangeItem}>
                      <Tab
                        sx={{ fontWeight: "bold" }}
                        label="THÔNG TIN CHUNG"
                        value="1"
                      />
                      <Tab
                        sx={{ fontWeight: "bold" }}
                        label="HỒ SƠ NĂNG LỰC"
                        value="2"
                      />
                    </TabList>
                  </Box>
                  {/* Thông số chung */}
                  <TabPanel value="1">
                    <div className="ps-5 pe-5" style={{ marginLeft: "150px" }}>
                      {/* TÊN NHÂN SỰ */}
                      <div className="form-group d-flex mb-3">
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                            marginRight: "20px",
                          }}
                          className="form-control"
                          htmlFor="name"
                        >
                          Tên nhân sự{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          // ref={nameRef}
                          value={value.name}
                          className=" form-control w-50"
                          type="text"
                          placeholder="Nhập tên nhân sự..."
                          onChange={handleChangeInput}
                        />
                      </div>
                      {/* MÃ NHÂN SỰ */}
                      <div
                        style={{ alignItems: "center" }}
                        className="form-group d-flex mb-3"
                      >
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                            marginRight: "20px",
                          }}
                          className="form-control"
                          htmlFor="code"
                        >
                          Mã nhân sự{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <input
                          id="code"
                          name="code"
                          value={value.code}
                          className=" form-control w-50 me-2"
                          type="text"
                          placeholder="Nhập mã nhân sự..."
                          onChange={handleChangeInput}
                          onBlur={handleCheckCode}
                        />
                        <span className="text-danger ">{errorcode}</span>
                      </div>
                      {/* PHÒNG BAN */}
                      <div className="form-group d-flex mb-3">
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                            marginRight: "20px",
                          }}
                          className="form-control"
                          htmlFor="department"
                        >
                          Phòng ban{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <input
                          id="department"
                          name="department"
                          value={value.department}
                          className=" form-control w-50"
                          type="text"
                          placeholder="Nhập phòng ban..."
                          onChange={handleChangeInput}
                        />
                      </div>
                      {/* CHỨC VỤ*/}
                      <div className="form-group d-flex mb-3">
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                            marginRight: "20px",
                          }}
                          className="form-control"
                          htmlFor="position"
                        >
                          Chức vụ <span className="text-danger fw-bold">*</span>
                        </label>
                        <input
                          id="position"
                          name="position"
                          value={value.position}
                          className=" form-control w-50"
                          type="text"
                          placeholder="Nhập chức vụ..."
                          onChange={handleChangeInput}
                        />
                      </div>

                      {/* HÌNH THỨC*/}
                      <div className="form-group d-flex mb-3">
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                            marginRight: "20px",
                          }}
                          className="form-control"
                        >
                          Hình thức{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <FormControl>
                          <InputLabel size="small" sx={{}}>
                            Chọn hình thức hợp đồng
                          </InputLabel>

                          <Select
                            size="small"
                            value={value.method}
                            label="Chọn hình thức hợp đồng"
                            name="method"
                            onChange={handleChangeInput}
                            sx={{ width: "250px" }}
                          >
                            <MenuItem
                              sx={{ height: "40px" }}
                              value="Kí hợp đồng"
                            >
                              Kí hợp đồng
                            </MenuItem>
                            <MenuItem value="Thử việc">Thử việc</MenuItem>
                            <MenuItem value="Nghỉ không lương">
                              Nghỉ không lương
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      {/* ĐỊA CHỈ*/}
                      <div className="form-group d-flex">
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                            marginRight: "20px",
                          }}
                          className="form-control"
                          htmlFor="contact"
                        >
                          Địa chỉ <span className="text-danger fw-bold">*</span>
                        </label>
                        <textarea
                          id="contact"
                          name="contact"
                          value={value.contact}
                          className=" form-control w-50"
                          type="text"
                          placeholder="Nhập địa chỉ..."
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    {/* upload ảnh */}
                    {/* <div className=" ps-5">
                    <label
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      className="form-control"
                    >
                      Tải lên hình ảnh
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <div className="d-flex">
                      {selectedImages.map((image, index) => (
                        <div
                          key={index}
                          style={{ overflow: "hidden" }}
                          className="me-2"
                        >
                          <img
                            alt={image.imageFile}
                            height={"100px"}
                            src={URL.createObjectURL(image.imageFile) || ""}
                          />
                          <div className="text-center mt-1 ">
                            {image.imageFile ? (
                              <Button
                                sx={{
                                  padding: "0px",
                                  fontSize: "12px",
                                  marginBottom: "10px",
                                }}
                                variant=""
                                size="small"
                                color="error"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <HighlightOffIcon />
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="ms-2" variant="outlined" size="small">
                      <label
                        htmlFor="uploadImage"
                        style={{ fontSize: "13px", textTransform: "initial" }}
                      >
                        <CloudUploadIcon sx={{ marginRight: "5px" }} /> Upload
                        File
                      </label>
                    </Button>

                    <input
                      className="ps-5 d-none"
                      id="uploadImage"
                      type="file"
                      accept="image/*"
                      name="myImages"
                      onChange={handleImageChange}
                      multiple
                    />
                  </div> */}
                  </TabPanel>
                  {/* HỒ SƠ NĂNG LỰC */}
                  <TabPanel value="2">
                    <div className="ps-5 pe-5">
                      {/* CĂN CƯỚC CÔNG DÂN*/}
                      <div
                        className="d-flex mb-3"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                          }}
                          className="form-control"
                          htmlFor="IDCard"
                        >
                          Căn cước công dân{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="IDCard"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      {/* BẰNG CẤP - CHỨNG CHỈ*/}
                      <div
                        className="d-flex mb-3"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                          }}
                          className="form-control"
                          htmlFor="degree"
                        >
                          Bằng cấp - chứng chỉ{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="degree"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      {/* Thẻ an toàn lao động*/}
                      <div
                        className="d-flex mb-3"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                          }}
                          className="form-control"
                          htmlFor="safetyCard"
                        >
                          Thẻ an toàn lao động{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="safetyCard"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      {/* Hợp đồng lao động*/}
                      <div
                        className="d-flex mb-3"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                          }}
                          className="form-control"
                          htmlFor="contract"
                        >
                          Hợp đồng lao động{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="contract"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      {/* Giấy khám sức khỏe*/}
                      <div
                        className="d-flex mb-3"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <label
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            width: "170px",
                          }}
                          className="form-control"
                          htmlFor="healthCer"
                        >
                          Giấy khám sức khỏe{" "}
                          <span className="text-danger fw-bold">*</span>
                        </label>
                        <div style={{ width: "50%" }}>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="healthCer"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabContext>
              </Container>
              {/* SUBMIT */}
              <div
                style={{
                  marginTop: "20px",
                  marginRight: "20px",
                  textAlign: "end",
                }}
              >
                <button
                  style={{
                    width: "45px",
                    height: "45px",
                    padding: 0,
                  }}
                  className="btn btn-outline-success"
                  type="submit"
                >
                  <SaveIcon
                    sx={{
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
