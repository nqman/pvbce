import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CreateProject() {
  const [item, setItem] = useState("1");
  const handleChangeItem = (evt, newValue) => {
    setItem(newValue);
  };
  //   const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // try {
    //   await addEquipmentAPI(value);
    //   toast.success("Thêm thiết bị thành công");
    //   navigate("/catalogue");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Thêm thiết bị thất bại");
    // }
  };

  // RpQuantityDetailMode----Hạng mục và đơn giá
  const [quantityDetails, setQuantityDetails] = useState([
    {
      id: -Date.now(),
      category: "",
      quantity: "",
      price: "",
      amount: "",
    },
  ]);

  const [errorDetail, setErrorDetail] = useState("");

  const createDiv = () => {
    const newQuantityDetail = {
      id: -Date.now(),
      category: "",
      quantity: "",
      price: "",
      amount: "",
    };
    setQuantityDetails([...quantityDetails, newQuantityDetail]);
  };

  const deleteDiv = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa? ",
        text: "Hạng mục này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa hạng mục",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        const updatedQuantityDetails = quantityDetails.filter(
          (quantityDetail) => quantityDetail.id !== id
        );
        Swal.fire({
          title: "Đã xóa!",
          text: "Hạng mục đã được xóa thành công.",
          icon: "success",
        });
        setQuantityDetails(updatedQuantityDetails);
      }
    } catch (error) {}
  };

  const handleInputChange = (id, key, value) => {
    const updatedQuantityDetails = quantityDetails.map((quantityDetail) =>
      quantityDetail.id === id
        ? { ...quantityDetail, [key]: value }
        : quantityDetail
    );
    setQuantityDetails(updatedQuantityDetails);
  };

  //Thư viện dự án ---projectDiary
  const [projectDiaries, setProjectDiaries] = useState([
    { id: -Date.now(), name: "", value: "", file: null },
  ]);

  const [errorDiary, setErrorDiary] = useState("");

  const createDivDiary = () => {
    const newDiary = {
      id: -Date.now(),
      name: "",
      file: null,
    };
    setProjectDiaries([...projectDiaries, newDiary]);
  };

  const deleteDivDiary = (id) => {
    const updatedProjectDiaries = projectDiaries.filter(
      (projectDiary) => projectDiary.id !== id
    );
    setProjectDiaries(updatedProjectDiaries);
  };

  const handleInputChangeDiary = (id, key, value) => {
    const updateDiaries = projectDiaries.map((projectDiary) =>
      projectDiary.id === id ? { ...projectDiary, [key]: value } : projectDiary
    );
    setProjectDiaries(updateDiaries);
  };

  const handleFileChangeDiary = (id, file) => {
    const updateDiaries = projectDiaries.map((projectDiary) =>
      projectDiary.id === id ? { ...projectDiary, file } : projectDiary
    );
    setProjectDiaries(updateDiaries);
    // setValue({ ...value, projectDiaries: updateDiaries });
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <TabContext value={item}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TabList onChange={handleChangeItem}>
              <Tab label="THÔNG TIN HỢP ĐỒNG" value="1" />
              <Tab label="THƯ VIỆN" value="2" />
              <Tab label="KHÁC" value="3" />
            </TabList>
          </Box>
          {/* Thông tin hợp đồng */}
          <TabPanel value="1">
            <Container className="">
              <div>
                <div>
                  {quantityDetails.map((quantityDetail) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "25px",
                        height: "30px",
                      }}
                      key={quantityDetail.id}
                    >
                      <TextField
                        label="Hạng mục"
                        id="outlined-size-small"
                        value={quantityDetail.category}
                        size="small"
                        type="text"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            quantityDetail.id,
                            "category",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        label="Sản lượng"
                        id="outlined-size-small"
                        value={quantityDetail.quantity}
                        size="small"
                        type="number"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            quantityDetail.id,
                            "quantity",
                            e.target.value
                          )
                        }
                      />

                      <TextField
                        label="Đơn giá"
                        id="outlined-size-small"
                        value={quantityDetail.price}
                        size="small"
                        type="number"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            quantityDetail.id,
                            "price",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        label="Thành tiền"
                        id="outlined-size-small"
                        value={(
                          quantityDetail.quantity * quantityDetail.price
                        ).toLocaleString()}
                        size="small"
                        disabled={true}
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChange(
                            quantityDetail.id,
                            "price",
                            e.target.value
                          )
                        }
                      />

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDiv(quantityDetail.id)}
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
              </div>
            </Container>
          </TabPanel>
          {/* Thư viện */}
          <TabPanel value="2">
            <Container className="">
              <div className="library">
                <div>
                  {projectDiaries.map((projectDiary) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                        height: "30px",
                      }}
                      key={projectDiary.id}
                    >
                      <TextField
                        placeholder="Thông số"
                        id="outlined-size-small"
                        value={projectDiary.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChangeDiary(
                            projectDiary.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        placeholder="Nội dung"
                        id="outlined-size-small"
                        value={projectDiary.value || projectDiary.file?.name}
                        size="small"
                        sx={{ marginRight: "20px" }}
                        onChange={(e) =>
                          handleInputChangeDiary(
                            projectDiary.id,
                            "value",
                            e.target.value
                          )
                        }
                      />
                      <input
                        style={{ width: "130px" }}
                        className="custom-file-input"
                        type="file"
                        id={`fileInput${projectDiary.id}`}
                        name="filename"
                        onChange={(e) =>
                          handleFileChangeDiary(
                            projectDiary.id,
                            e.target.files[0]
                          )
                        }
                      />

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDivDiary(projectDiary.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <p className="text-danger">{errorDetail}</p>
                  <Button variant="contained" onClick={createDivDiary}>
                    Thêm
                  </Button>
                </div>
              </div>
            </Container>
          </TabPanel>
        </TabContext>
      </form>
    </div>
  );
}
