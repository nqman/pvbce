import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
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
import {
  checkDivideCodeAPI,
  saveEmployeeAPI,
} from "../../../../apis/employeeAPI";
import { useNavigate } from "react-router-dom";
import Loading from "../../../home/components/Loading/Loading";
import NavigationButton from "../../../common/NavigationButton";

export default function CreateEmployee() {
  const emptyValue = {
    name: "",
    divideCode: "",
    constructionProject: "",
    location: "",
    note: "",
    productImages: "",
    productDetails: "",
    productDiaries: "",
  };
  const navigate = useNavigate();
  const [value, setValue] = useState(emptyValue);

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  const [isLoading, setIsLoading] = useState(false);

  // Thông số chung
  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleCheckDivideCode = async () => {
    if (value.divideCode) {
      const res = await checkDivideCodeAPI(value.divideCode);
      if (!res) {
        setErrorDivideCode("Mã nhân sự đã tồn tại");
        return;
      }
      setErrorDivideCode("");
    }
  };
  //Chọn ảnh
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 5) {
      alert("Số lượng ảnh không được quá 5");
    } else {
      const newImages = [...selectedImages];
      console.log(newImages);
      for (let i = 0; i < files.length; i++) {
        newImages.push({ id: -Date.now(), imageFile: files[i] });
      }
      setSelectedImages(newImages);
      setValue({ ...value, productImages: newImages });
    }
  };
  //Xóa ảnh
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setValue({ ...value, productImages: newImages });
  };

  //Thông số kỹ thuật
  const [productDetails, setProductDetails] = useState([
    { id: -Date.now(), name: "", value: "", file: null },
  ]);
  const [errorDetail, setErrorDetail] = useState("");

  const createDiv = () => {
    const newProductDetail = {
      id: -Date.now(),
      name: "",
      value: "",
      file: null,
    };
    setProductDetails([...productDetails, newProductDetail]);
  };

  const deleteDiv = (id) => {
    const updatedProductDetails = productDetails.filter(
      (productDetail) => productDetail.id !== id
    );
    setProductDetails(updatedProductDetails);
  };

  const handleInputChange = (id, key, value) => {
    const updatedProductDetails = productDetails.map((productDetail) =>
      productDetail.id === id
        ? { ...productDetail, [key]: value }
        : productDetail
    );
    setProductDetails(updatedProductDetails);
  };
  const handleBlurInput = () => {
    // debugger;
    console.log(productDetails);
    setValue({ ...value, productDetails: productDetails });
  };

  const handleFileChange = (id, file) => {
    const updatedProductDetails = productDetails.map((productDetail) =>
      productDetail.id === id ? { ...productDetail, file } : productDetail
    );

    setProductDetails(updatedProductDetails);
    setValue({ ...value, productDetails: updatedProductDetails });
  };

  //Nhật kí bảo dưỡng- sửa chữa
  const [productDiaries, setProductDiaries] = useState([
    { id: -Date.now(), name: "", file: null },
  ]);
  const [errorDiary, setErrorDiary] = useState("");

  const createDivDiary = () => {
    const newDiary = {
      id: -Date.now(),
      name: "",
      file: null,
    };
    setProductDiaries([...productDiaries, newDiary]);
  };

  const deleteDivDiary = (id) => {
    const updateDiaries = productDiaries.filter((diary) => diary.id !== id);
    setProductDiaries(updateDiaries);
  };

  const handleInputChangeDiary = (id, key, value) => {
    const updateDiaries = productDiaries.map((diary) =>
      diary.id === id ? { ...diary, [key]: value } : diary
    );
    setProductDiaries(updateDiaries);
  };

  const handleFileChangeDiary = (id, file) => {
    const updateDiaries = productDiaries.map((diary) =>
      diary.id === id ? { ...diary, file } : diary
    );
    setProductDiaries(updateDiaries);
    setValue({ ...value, productDiaries: updateDiaries });
  };
  const [errorDivideCode, setErrorDivideCode] = useState("");

  // Thêm nhân sự
  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    if (!value.name) {
      toast.error("Vui lòng nhập tên nhân sự");
    } else if (!value.divideCode) {
      toast.error("Vui lòng nhập mã nhân sự");
    } else {
      setIsLoading(true);
      try {
        await saveEmployeeAPI(value);
        setErrorDivideCode("");
        toast.success("Thêm nhân sự thành công");
        navigate("/catalogue");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
              <TabContext value={item}>
                <Box display="flex" justifyContent="center" alignItems="center">
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
                  <div className="ps-5 pe-5">
                    {/* TÊN NHÂN SỰ */}
                    <div className="form-group d-flex mb-2">
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
                      className="form-group d-flex mb-2"
                    >
                      <label
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          width: "170px",
                          marginRight: "20px",
                        }}
                        className="form-control"
                        htmlFor="divideCode"
                      >
                        Mã nhân sự{" "}
                        <span className="text-danger fw-bold">*</span>
                      </label>
                      <input
                        id="divideCode"
                        name="divideCode"
                        value={value.divideCode}
                        className=" form-control w-50 me-2"
                        type="text"
                        placeholder="Nhập mã nhân sự..."
                        onChange={handleChangeInput}
                        onBlur={handleCheckDivideCode}
                      />
                      <span className="text-danger ">{errorDivideCode}</span>
                    </div>
                    {/* PHÒNG BAN */}
                    <div className="form-group d-flex mb-2">
                      <label
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          width: "170px",
                          marginRight: "20px",
                        }}
                        className="form-control"
                        htmlFor="constructionProject"
                      >
                        Phòng ban
                      </label>
                      <input
                        id="constructionProject"
                        name="constructionProject"
                        value={value.constructionProject}
                        className=" form-control w-50"
                        type="text"
                        placeholder="Nhập phòng ban..."
                        onChange={handleChangeInput}
                      />
                    </div>
                    {/* CHỨC VỤ*/}
                    <div className="form-group d-flex mb-2">
                      <label
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          width: "170px",
                          marginRight: "20px",
                        }}
                        className="form-control"
                        htmlFor="location"
                      >
                        Chức vụ
                      </label>
                      <input
                        id="location"
                        name="location"
                        value={value.location}
                        className=" form-control w-50"
                        type="text"
                        placeholder="Nhập chức vụ..."
                        onChange={handleChangeInput}
                      />
                    </div>
                    {/* ĐỊA CHỈ*/}
                    <div className="form-group d-flex mb-2">
                      <label
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          width: "170px",
                          marginRight: "20px",
                        }}
                        className="form-control"
                        htmlFor="note"
                      >
                        Địa chỉ
                      </label>
                      <TextareaAutosize
                        id="note"
                        name="note"
                        value={value.note}
                        className=" form-control w-50"
                        type="text"
                        placeholder="Nhập địa chỉ..."
                        onChange={handleChangeInput}
                      />
                    </div>
                    {/* HÌNH THỨC*/}
                    <div className="form-group d-flex mb-2">
                      <label
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          width: "170px",
                          marginRight: "20px",
                        }}
                        className="form-control"
                        htmlFor="location"
                      >
                        Chức vụ
                      </label>
                      {/* <select
                        onChange={handleChangeInput}
                        class="custom-select"
                        name=""
                        id=""
                      >
                        <option value="Kí hợp đồng" selected>
                          Kí hợp đồng
                        </option>
                        <option value="Thử việc">Thử việc</option>
                        <option value="Nghỉ không lương">
                          Nghỉ không lương
                        </option>
                      </select> */}

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value.method}
                        defaultValue="Kí hợp đồng"
                        label="Age"
                        onChange={handleChangeInput}
                      >
                        <MenuItem value={10}> Kí hợp đồng</MenuItem>
                        <MenuItem value={20}>Thử việc</MenuItem>
                        <MenuItem value={30}>Nghỉ không lương</MenuItem>
                      </Select>
                      {/* <input
                        id="location"
                        name="location"
                        value={value.location}
                        className=" form-control w-50"
                        type="text"
                        placeholder="Nhập chức vụ..."
                        onChange={handleChangeInput}
                      /> */}
                    </div>
                  </div>
                  {/* upload ảnh */}
                  <div className=" ps-5">
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
                  </div>
                </TabPanel>
                {/* HỒ SƠ NĂNG LỰC */}
                <TabPanel style={{ marginLeft: "80px" }} value="2">
                  <div>
                    {productDetails.map((productDetail) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                          height: "30px",
                        }}
                        key={productDetail.id}
                      >
                        <TextField
                          placeholder="Thông số"
                          id="outlined-size-small"
                          value={productDetail.name}
                          size="small"
                          sx={{ marginRight: "20px", width: "40%" }}
                          onChange={(e) =>
                            handleInputChange(
                              productDetail.id,
                              "name",
                              e.target.value
                            )
                          }
                          onBlur={handleBlurInput}
                        />
                        <TextField
                          placeholder="Nội dung"
                          id="outlined-size-small"
                          disabled={productDetail.file?.name ? true : false}
                          value={
                            productDetail.file?.name
                              ? productDetail.file?.name
                              : productDetail.value
                          }
                          size="small"
                          sx={{ marginRight: "20px", width: "40%" }}
                          onChange={(e) =>
                            handleInputChange(
                              productDetail.id,
                              "value",
                              e.target.value
                            )
                          }
                          onBlur={handleBlurInput}
                        />
                        <div
                          style={{
                            width: "20%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="file"
                            style={{ width: "120px" }}
                            className="custom-file-input"
                            id={`fileInput${productDetail.id}`}
                            name="filename"
                            accept=".pdf, .xlsx, .xls"
                            onChange={(e) =>
                              handleFileChange(
                                productDetail.id,
                                e.target.files[0]
                              )
                            }
                          />

                          <button
                            style={{
                              width: "28px",
                              height: "28px",
                              padding: 0,
                            }}
                            className="btn btn-danger"
                            onClick={() => deleteDiv(productDetail.id)}
                          >
                            <ClearIcon
                              sx={{ fontSize: "20px", fontWeight: "bold" }}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                    <p className="text-danger">{errorDetail}</p>
                    <Button variant="contained" onClick={createDiv}>
                      Thêm
                    </Button>
                  </div>
                </TabPanel>
              </TabContext>
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
