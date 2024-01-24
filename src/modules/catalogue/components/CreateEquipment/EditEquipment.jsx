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
  editEquipmentAPI,
  selectEquipmentAPI,
} from "../../../../apis/equipmentAPI";

// const emptyValue = {
//   name: "",
//   divideCode: "",
//   constructionProject: "",
//   location: "",
//   note: "",
//   productImages: "",
//   productDetails: "",
// };

export default function EditEquipment() {
  // const data = {
  //   id: 2,
  //   name: "mantest",
  //   divideCode: "mantest",
  //   constructionProject: "mantest",
  //   location: "mantest",
  //   note: "mantest",
  //   productImages: [
  //     {
  //       id: 3,
  //       pathImage:
  //         "https://res.cloudinary.com/dxvbucvch/image/upload/v1705983072/vd6kvsweandbea2sqzr5.png",
  //       imageOfProduct: null,
  //     },
  //     {
  //       id: 4,
  //       pathImage:
  //         "https://images.unsplash.com/photo-1519929125787-88a2485dc4f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       imageOfProduct: null,
  //     },
  //   ],
  //   productDetails: [
  //     {
  //       id: 1,
  //       detailName: "mantest",
  //       detailValue: "download.png",
  //       detailFile:
  //         "https://res.cloudinary.com/dxvbucvch/image/upload/v1705983071/wnwteqp5pquabyinfjem.png",
  //       fileName: "tên file322432",
  //     },
  //     {
  //       id: 3,
  //       detailName: "mantest1231323",
  //       detailValue: "hehehe.png",
  //       detailFile:
  //         "https://res.cloudinary.com/dxvbucvch/image/upload/v1705983071/wnwteqp5pquabyinfjem.png",
  //       fileName: "tên file",
  //     },
  //     {
  //       id: 5,
  //       detailName: "mantest1231323",
  //       detailValue: "hihiha.png",
  //       detailFile:
  //         "https://res.cloudinary.com/dxvbucvch/image/upload/v1705983071/wnwteqp5pquabyinfjem.png",
  //       fileName: "tên file",
  //     },
  //   ],
  //   createdTime: 1705983069995,
  //   updatedTime: 1705983074244,
  //   pathOfQR:
  //     "https://res.cloudinary.com/dxvbucvch/image/upload/v1705983073/zzc5ghf62levqgynnork.png",
  //   imageOfQR: null,
  // };

  const [value, setValue] = useState();

  const params = useParams();
  const idEquip = params.id;
  const [selectedImages, setSelectedImages] = useState([]);

  const getEquip = async (idEquip) => {
    try {
      const data = await selectEquipmentAPI(idEquip);
      setValue(data);
      // console.log(data.productImages);
      setSelectedImages(data.productImages);
      return data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };
  // getEquip(idEquip);
  useEffect(() => {
    // Call the asynchronous function inside the useEffect
    getEquip(idEquip);
  }, [idEquip]); // Add idEquip as a dependency if needed

  // Now you can log selectedImages here, and it should reflect the updated state
  console.log(selectedImages);

  const navigate = useNavigate();

  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
    setValue({ ...value, productDetails: productDetails });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // if (value.productImages !== []) {
  // }

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      newImages.id.push(i);
      newImages.pathImage.push(files[i]);
    }

    setSelectedImages(newImages);
    setValue({ ...value, productImages: newImages });
  };
  //Xóa ảnh
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  //Thông số kỹ thuật
  const [productDetails, setProductDetails] = useState(value.productDetails);
  const [errorDetail, setErrorDetail] = useState("");

  const createDiv = () => {
    const newProductDetail = {
      id: -Date.now(),
      detailName: "",
      detailValue: "",
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
  const fileExists = value.productDetails.map((file) => file.pathFile);
  const handleFileChange = (id, file) => {
    const updatedProductDetails = productDetails.map((productDetail) => {
      if (fileExists) {
        return { ...productDetail, file: fileExists };
      } else {
        return productDetail.id === id
          ? { ...productDetail, file }
          : productDetail;
      }
    });

    // Cập nhật trạng thái với mảng sản phẩm đã được cập nhật.
    setProductDetails(updatedProductDetails);
  };

  // cập nhật thiết bị
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      const response = await editEquipmentAPI(value);
      console.log(response);
      toast.success("Cập nhật thiết bị thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thiết bị thất bại");
    }
  };

  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
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
        <form noValidate onSubmit={handleSubmit}>
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
                      Tên thiết bị
                    </label>
                    <input
                      id="name"
                      name="name"
                      // ref={nameRef}
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
                      Mã thiết bị
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
                    Tải lên hình ảnh :
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
                          src={image.pathImage}
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
              <TabPanel
                style={{ marginLeft: "80px" }}
                // className="ps-5"
                value="2"
              >
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
                      {/* <label className="me-2">Thông số:</label> */}
                      <TextField
                        // label="Thông số"
                        placeholder="Thông số"
                        id="outlined-size-small"
                        value={productDetail.detailName}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            productDetail.id,
                            "detailName",
                            e.target.value
                          )
                        }
                      />
                      {/* <label className="me-2">Nội dung:</label> */}
                      <TextField
                        placeholder="Nội dung"
                        id="outlined-size-small"
                        value={productDetail.detailValue}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            productDetail.id,
                            "detailValue",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="file"
                        id={`fileInput${productDetail.id}`}
                        name="filename"
                        value={productDetail.pathFile}
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
              <TabPanel value="3">
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
                    src={`${value.pathOfQR}`}
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
  );
}
