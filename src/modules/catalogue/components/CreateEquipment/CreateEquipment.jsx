import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Link, Tab, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toast, { Toaster } from "react-hot-toast";

// API
import { addEquipmentAPI } from "../../../../apis/equipmentAPI";
import { useNavigate } from "react-router-dom";

const emptyValue = {
  name: "",
  divideCode: "",
  constructionProject: "",
  location: "",
  note: "",
  productImages: "",
  productDetails: "",
};
export default function CreateEquipment() {
  const navigate = useNavigate();
  const [value, setValue] = useState(emptyValue);

  const [item, setItem] = useState("1");
  const handleChange = (evt, newValue) => {
    setItem(newValue);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Chọn ảnh
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    // const imageNames = newImages.map((imageName) => {
    //   return imageName.name;
    // });
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

  const [productDetails, setProductDetails] = useState([
    { id: 1, detailName: "", detailValue: "", file: null },
  ]);
  const [errorDetail, setErrorDetail] = useState("");

  const createDiv = () => {
    const newProductDetail = {
      id: Date.now(),
      detailName: "",
      detailValue: "",
      file: null,
    };
    setProductDetails([...productDetails, newProductDetail]);

    console.log(productDetails);
  };

  const deleteDiv = (id) => {
    const updatedProductDetails = productDetails.filter(
      (productDetail) => productDetail.id !== id
    );

    setProductDetails(updatedProductDetails);
    console.log(updatedProductDetails);
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
    const updatedProductDetails = productDetails.map((productDetail) =>
      productDetail.id === id ? { ...productDetail, file } : productDetail
    );
    setProductDetails(updatedProductDetails);
  };

  // Thêm thiết bị
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      const response = await addEquipmentAPI(value);
      console.log(response);
      toast.success("Thêm thiết bị thành công");
    } catch (error) {
      console.log(error);
      toast.error("Thêm thiết bị thất bị");
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
        <h1 className="text-center pt-3">Thêm thiết bị</h1>
        <form noValidate onSubmit={handleSubmit}>
          <Box>
            <TabContext value={item}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TabList onChange={handleChange}>
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
                <div className=" ps-5">
                  <label
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    className="form-control"
                    // htmlFor="uploadImage"
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
                          src={URL.createObjectURL(image)}
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
                      <TextField
                        label="Thông số"
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
                      <TextField
                        label="Nội dung"
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
              <TabPanel value="4">
                <div style={{ textAlign: "center", paddingTop: "50px" }}>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src="https://images.unsplash.com/photo-1503427073713-8e991db6befe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNsYXNofGVufDB8fDB8fHww"
                    alt=""
                  />
                  <h3 style={{ marginTop: "20px" }}>DH507-NIKON</h3>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </form>
      </div>
    </div>
  );
}
