import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Link, Tab, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toast, { Toaster } from "react-hot-toast";

// API

import { useNavigate, useParams } from "react-router-dom";
import {
  saveEquipmentAPI,
  selectEquipmentAPI,
} from "../../../../apis/equipmentAPI";

export default function EditEquipment() {
  const [value, setValue] = useState();
  const params = useParams();
  const idEquip = params.id;
  const [selectedImages, setSelectedImages] = useState([]);

  const getEquip = async (idEquip) => {
    try {
      const data = await selectEquipmentAPI(idEquip);
      setValue(data);

      setProductDetails(data.productDetails); // set them gia tri cho productDetail
      setSelectedImages(data.productImages);
      setProductDiaries(data.productDiaries);

      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };

  useEffect(() => {
    // Call the asynchronous function inside the useEffect
    getEquip(idEquip);
  }, [idEquip]); // Add idEquip as a dependency if needed

  const navigate = useNavigate();

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
    setValue({ ...value, productDetails: productDetails });
  };
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    // debugger;
    const files = event.target.files;
    console.log(files);
    const newImages = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      newImages.push({ id: -Date.now(), imageFile: files[i] });
    }
    setSelectedImages(newImages);
    setValue({ ...value, productImages: newImages });
    console.log(newImages);
  };
  //Xóa ảnh
  const handleRemoveImage = (index) => {
    // debugger;
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setValue({ ...value, productImages: newImages });
  };

  //Thông số kỹ thuật
  const [productDetails, setProductDetails] = useState([]); // default la mang rong chu khong phai object
  const [errorDetail, setErrorDetail] = useState("");

  const createDiv = () => {
    const newProductDetail = {
      id: -Date.now(),
      name: "",
      value: "",
      file: null,
      fileName: "",
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

  const handleFileChange = (id, file) => {
    const updatedProductDetails = productDetails.map((productDetail) => {
      if (productDetail.id === id) {
        return { ...productDetail, file: file };
      }
      return productDetail;
    });

    setProductDetails(updatedProductDetails);
  };

  //nhật ký bảo dưỡng
  const [productDiaries, setProductDiaries] = useState([]);
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
    console.log(updateDiaries);
    setProductDiaries(updateDiaries);
    setValue({ ...value, productDiaries: updateDiaries });
  };

  const handleInputChangeDiary = (id, key, value) => {
    const updateDiaries = productDiaries.map((diary) =>
      diary.id === id ? { ...diary, [key]: value } : diary
    );
    setProductDiaries(updateDiaries);
  };

  const handleFileChangeDiary = (id, file) => {
    const updateDiaries = productDiaries.map((diary) => {
      if (diary.id === id) {
        return { ...diary, file: file };
      }
      return diary;
    });
    setProductDiaries(updateDiaries);
    setValue({ ...value, productDiaries: updateDiaries });
  };

  // cập nhật thiết bị
  const handleSaveEquipment = async (e) => {
    e.preventDefault();
    // console.log(value);
    try {
      const response = await saveEquipmentAPI(value);
      console.log(response);
      toast.success("Cập nhật thiết bị thành công");
      navigate("/catalogue");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thiết bị thất bại");
    }
  };

  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return value ? ( // check value != null truoc khi render
    <div className="container">
      <Link
        sx={{ marginTop: "20px", fontSize: "16px" }}
        component="button"
        variant="body2"
        onClick={() => {
          navigate("/catalogue");
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
        Danh sách thiết bị
      </Link>
      <div>
        <Toaster position="top-right" />
        <h1 className="text-center pt-3">Cập nhật thiết bị</h1>
        <form noValidate onSubmit={handleSaveEquipment}>
          <Box>
            <TabContext value={item}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TabList onChange={handleChangeItem}>
                  <Tab label="THÔNG SỐ CHUNG" value="1" />
                  <Tab label="THÔNG SỐ KỸ THUẬT" value="2" />
                  <Tab label="NHẬT KÝ BẢO DƯỠNG - SỬA CHỮA" value="3" />
                  <Tab label="QR" value="4" />
                </TabList>
              </Box>
              {/* Thông số chung */}
              <TabPanel value="1">
                <div className="ps-5 pe-5">
                  {/* name */}
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
                      Tên thiết bị<span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={value.name}
                      className=" form-control w-50"
                      type="text"
                      placeholder="Nhập tên thiết bị..."
                      onChange={handleChangeInput}
                    />
                  </div>
                  {/* divideCode */}
                  <div className="form-group d-flex mb-2">
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
                      Mã thiết bị<span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      id="divideCode"
                      name="divideCode"
                      value={value.divideCode}
                      className=" form-control w-50"
                      type="text"
                      placeholder="Nhập mã thiết bị..."
                      onChange={handleChangeInput}
                    />
                  </div>
                  {/* constructionProject  */}
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
                      Thi công dự án
                    </label>
                    <input
                      id="constructionProject"
                      name="constructionProject"
                      value={value.constructionProject}
                      className=" form-control w-50"
                      type="text"
                      placeholder="Nhập vị trí dự án..."
                      onChange={handleChangeInput}
                    />
                  </div>
                  {/* location*/}
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
                      Đang ở kho bãi
                    </label>
                    <input
                      id="location"
                      name="location"
                      value={value.location}
                      className=" form-control w-50"
                      type="text"
                      placeholder="Nhập vị trí kho bãi..."
                      onChange={handleChangeInput}
                    />
                  </div>
                  {/* note*/}
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
                      Ghi chú
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={value.note}
                      className=" form-control w-50"
                      type="text"
                      placeholder="Nhập chú thích..."
                      onChange={handleChangeInput}
                    />
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
                          alt={`Image ${index + 1}`}
                          height={"100px"}
                          src={
                            image.imageOfProduct ||
                            URL.createObjectURL(image.imageFile)
                          }
                        />
                        <div className="text-center mt-1 ">
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
              {/* Thông số kỹ thuật */}
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
                      key={productDetail.id || ""}
                    >
                      <TextField
                        placeholder="Thông số"
                        id="outlined-size-small"
                        value={productDetail.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            productDetail.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        placeholder="Nội dung"
                        id="outlined-size-small"
                        value={productDetail.value || productDetail.file?.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            productDetail.id,
                            "value",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="file"
                        id={`fileInput${productDetail.id}`}
                        name="filename"
                        onChange={(e) =>
                          handleFileChange(productDetail.id, e.target.files[0])
                        }
                      />

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDiv(productDetail.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <p className="text-danger">{errorDetail}</p>
                  <Button variant="contained" onClick={createDiv}>
                    Thêm
                  </Button>
                </div>
              </TabPanel>
              {/* Bảo dưỡng sửa chữa */}
              <TabPanel value="3" style={{ marginLeft: "80px" }}>
                <div>
                  {productDiaries.map((diary) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                        height: "30px",
                      }}
                      key={diary.id}
                    >
                      <TextField
                        placeholder="Thông số"
                        id="outlined-size-small"
                        value={diary.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChangeDiary(
                            diary.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      {diary?.value ? (
                        <TextField
                          value={diary.value}
                          size="small"
                          sx={{ marginRight: "20px", width: "250px" }}
                          disabled={true}
                          title={diary.value}
                        />
                      ) : (
                        ""
                      )}
                      <Button component="label">
                        <input
                          style={{
                            width: "300px",
                          }}
                          className="form-control"
                          type="file"
                          id={`fileInput${diary.id}`}
                          name="filename"
                          accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) =>
                            handleFileChangeDiary(diary.id, e.target.files[0])
                          }
                        />
                      </Button>

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDivDiary(diary.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <p className="text-danger">{errorDiary}</p>
                  <Button variant="contained" onClick={createDivDiary}>
                    Thêm
                  </Button>
                </div>
                {/* SUBMIT */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    right: "130px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    disabled={isLoading}
                    type="submit"
                  >
                    Lưu
                  </Button>
                </div>
              </TabPanel>
              {/* Mã QR */}
              <TabPanel value="4">
                <div style={{ textAlign: "center", paddingTop: "50px" }}>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src={`${value.imageOfQR}`}
                    alt=""
                  />
                  <h3 style={{ marginTop: "20px" }}>{value.divideCode}</h3>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </form>
      </div>
    </div>
  ) : null;
}
