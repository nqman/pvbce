import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";

import { addEquipmentAPI } from "../../../../apis/equipmentAPI";

const validationSchema = object({
  name: string().required("Tên thiết bị không được để trống"),
  divideCode: string().required("Mã thiết bị không được để trống"),
  // constructionProject: string().required("Tài khoản không được để trống"),
  // location: string().required("Tài khoản không được để trống"),
  // note: string().required("Tài khoản không được để trống"),
});

export default function CreateEquipment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      divideCode: "",
      constructionProject: "",
      location: "",
      note: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const [value, setValue] = useState("1");
  const handleChange = (evt, newValue) => {
    return setValue(newValue);
  };
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(values);
      await addEquipmentAPI(values);
      // navigate("/finish");
      alert("Thêm thiết bị" + values.name + "thành công");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //Chọn ảnh
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setSelectedImages(newImages);
  };
  //Xóa ảnh
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  //Thông số kỹ thuật
  const [divs, setDivs] = useState([{ id: 1 }]);

  const createDiv = () => {
    const newDiv = { id: Date.now() };

    setDivs([...divs, newDiv]);
  };

  const deleteDiv = (id) => {
    const updatedDivs = divs.filter((div) => div.id !== id);

    setDivs(updatedDivs);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="container">
      <h1 className="text-center pt-3">Thêm thiết bị</h1>

      <form noValidate onSubmit={handleSubmit(handleSave)}>
        <Box>
          <TabContext value={value}>
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
                    className=" form-control w-50"
                    type="text"
                    placeholder="Nhập tên thiết bị..."
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="ms-2 text-danger">
                      {errors.name.message}
                    </span>
                  )}
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
                    className=" form-control w-50"
                    type="text"
                    placeholder="Nhập mã thiết bị..."
                    {...register("divideCode")}
                  />
                  {errors.divideCode && (
                    <span className="ms-2 text-danger">
                      {errors.divideCode.message}
                    </span>
                  )}
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
                    className=" form-control w-50"
                    type="text"
                    placeholder="Nhập vị trí dự án..."
                    {...register("constructionProject")}
                  />
                  {errors.constructionProject && (
                    <span>{errors.constructionProject.message}</span>
                  )}
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
                    className=" form-control w-50"
                    type="text"
                    placeholder="Nhập vị trí kho bãi..."
                    {...register("location")}
                  />
                  {errors.location && <span>{errors.location.message}</span>}
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
                    className=" form-control w-50"
                    type="text"
                    placeholder="Nhập chú thích..."
                    {...register("note")}
                  />
                  {errors.note && <span>{errors.note.message}</span>}
                </div>

                {error && <p>{error}</p>}
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
                        height={"150px"}
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
                    <CloudUploadIcon sx={{ marginRight: "5px" }} /> Upload File
                  </label>
                </Button>

                <input
                  className="ps-5 d-none"
                  id="uploadImage"
                  type="file"
                  name="myImages"
                  onChange={handleImageChange}
                  multiple // Cho phép chọn nhiều tệp
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
                {divs.map((div) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      height: "30px",
                    }}
                    key={div.id}
                  >
                    <TextField
                      label="Thông tin"
                      id="outlined-size-small"
                      defaultValue=""
                      size="small"
                      sx={{ marginRight: "20px" }}
                    />
                    <TextField
                      label="Nội dung"
                      id="outlined-size-small"
                      defaultValue=""
                      size="small"
                      sx={{ marginRight: "20px" }}
                    />
                    <input type="file" id="myFile" name="filename" />

                    <Button
                      sx={{ padding: "0" }}
                      variant=""
                      color="error"
                      onClick={() => deleteDiv(div.id)}
                    >
                      Xoá
                    </Button>
                  </div>
                ))}

                <Button variant="contained" onClick={createDiv}>
                  Thêm
                </Button>
              </div>
            </TabPanel>
            {/* Bảo dưỡng sữa chửa */}
            <TabPanel value="3">
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={isLoading}
              >
                Lưu
              </Button>
            </TabPanel>
            <TabPanel value="4"></TabPanel>
          </TabContext>
        </Box>
      </form>
    </div>
  );
}
