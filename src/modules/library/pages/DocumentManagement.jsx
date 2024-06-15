import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  TextField,
  tabsClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  addDocumentAPI,
  deleteDocumentAPI,
  listDocumentsAPI,
} from "../../../apis/documentAPI";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Loading from "../../home/components/Loading/Loading";
import ListDocuments from "../components/ListDocuments";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  getCategoriesAPI,
  getCategoriesOneAndTwoAPI,
} from "../../../apis/reportAPI";

export default function DocumentManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOneTwo, setCategoryOneTwo] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState();
  const role = Cookies.get("role")?.replace(/"/g, "");

  //MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // SELECT type
  const [type, setType] = useState("");

  const handleChangeType = (e) => {
    setType(e.target.value);
    setDocument(emptyValue);
  };

  const [scope, setScope] = useState("");

  const handleChangescope = (e) => {
    setScope(e.target.value);
    setDocument({ ...document, scope: e.target.value });
  };

  // FORM
  const emptyValue = {
    categoryOne: "",
    categoryTwo: "",
    scope: "",
    name: "",
    link: "",
    file: null,
    type: "LIBRARY",
  };
  const [listDocs, setListDocs] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      fetchDocuments();
    };
    asyncFn();
  }, []);

  const fetchDocuments = async () => {
    try {
      let categoryOneTwo = await getCategoriesOneAndTwoAPI("LIBRARY_ITEM_ONE");
      const data = await listDocumentsAPI();
      // console.log(categoryOneTwo);
      toast.success("Lấy danh sách thư viện thành công");
      setListDocs(data);
      setIsLoading(false);
      setCategoryOneTwo(categoryOneTwo);
      // setValue(categoryOneTwo[0].id);
    } catch (error) {
      console.log(error);
      toast.error("Lấy danh sách thư viện thất bại");
    }
  };

  const [document, setDocument] = useState(emptyValue);
  const handleInputChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setDocument({ ...document, file: e.target.files[0] });
  };
  const handleSubmit = async () => {
    try {
      const data = await addDocumentAPI(document);
      if (data) {
        setShow(false);
        toast.success("Thêm tài liệu thành công");
      }
      // setIsLoading(false);
      fetchDocuments();
    } catch (error) {
      toast.error("Thêm tài liệu thất bại");
      setIsLoading(false);
    }
  };

  // xóa tài liệu
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa? ",
        text: "Tài liệu này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa tài liệu",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await deleteDocumentAPI(id);
        Swal.fire({
          title: "Đã xóa!",
          text: "Tài liệu đã được xóa thành công.",
          icon: "success",
        });
        fetchDocuments();
      }
    } catch (error) {
      toast.error("Xóa tài liệu thất bại");
    }
  };

  const [value, setValue] = useState("1");

  const handleSelectCategoryOne = (event, value) => {
    let selectedCategory = categoryOneTwo.filter(
      (category) => category.id === value
    );
    setCategoryTwo(selectedCategory[0]?.categories);

    setValue(value);
  };
  const [valueTwo, setValueTwo] = useState("1");

  const handleSelectCategoryTwo = (event, value) => {
    debugger;
    let selectedCategoryTwo = categoryTwo.filter(
      (category) => category.id === value
    );
    // setCategoryTwo(selectedCategory[0]?.categories);
    setValueTwo(value);
  };

  return (
    <>
      <Container maxWidth="lg" className="mt-4">
        <Toaster position="top-right" />
        {role && role === "Admin" && (
          <div className="d-flex justify-content-end mb-2">
            <button className="btn btn-primary " onClick={handleShow}>
              Thêm tài liệu
            </button>
          </div>
        )}
        <Box
          sx={{
            width: "100%",
            border: 1,
            borderColor: "#E0E0E0",
            borderRadius: " 5px 5px 0 0",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleSelectCategoryOne}
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                  "& button.Mui-selected": {
                    backgroundColor: "white",
                  },
                  "& button": {
                    minHeight: "35px",
                  },
                  minHeight: "35px",
                }}
              >
                <Tab
                  sx={{
                    color: "black",
                    // fontWeight: "bold",
                    backgroundColor: "#F5F5F5",
                    textTransform: "capitalize",
                    padding: "0px 8px",
                    marginRight: "2px",
                  }}
                  label="All"
                  value="1"
                />
                {categoryOneTwo.map((category, index) => (
                  <Tab
                    key={index}
                    sx={{
                      color: "black",
                      // fontWeight: "bold",
                      textTransform: "capitalize",
                      padding: "0px 8px",
                      marginRight: "2px",
                      backgroundColor: "#F5F5F5",
                    }}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </TabList>
            </Box>
            {categoryTwo?.length > 0 ? (
              categoryOneTwo.map((category) => (
                <TabPanel
                  sx={{ padding: 0, display: "flex" }}
                  value={category.id}
                >
                  <Tabs
                    value={valueTwo}
                    onChange={handleSelectCategoryTwo}
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                      "& button.Mui-selected": {
                        backgroundColor: "white",
                      },
                      "& button": {
                        minHeight: "35px",
                      },
                      minHeight: "35px",
                    }}
                  >
                    <Tab
                      sx={{
                        color: "black",
                        // fontWeight: "bold",
                        backgroundColor: "#F5F5F5",
                        textTransform: "capitalize",
                        padding: "0px 8px",
                        marginRight: "2px",
                      }}
                      label="All"
                      value="1"
                    />
                    {categoryTwo?.map((item, index) => (
                      <Tab
                        key={index}
                        sx={{
                          color: "black",
                          // fontWeight: "bold",
                          textTransform: "capitalize",
                          padding: "0px 8px",
                          marginRight: "2px",
                          backgroundColor: "#F5F5F5",
                        }}
                        label={item.name}
                        value={item.id}
                      />
                    ))}
                  </Tabs>
                </TabPanel>
              ))
            ) : (
              <></>
            )}
          </TabContext>
        </Box>
        {!isLoading ? (
          <ListDocuments
            role={role}
            onDelete={handleDelete}
            listDocs={listDocs}
          />
        ) : (
          <Loading />
        )}

        {/* MODAL */}
        <>
          <Modal
            style={{ marginTop: "100px" }}
            size="lg"
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm tài liệu</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Box sx={{ marginRight: "20px" }}>
                  <FormControl fullWidth>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Định dạng
                    </InputLabel>

                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Định dạng"
                      onChange={handleChangeType}
                      sx={{ width: "130px" }}
                    >
                      <MenuItem value={"file"}>File</MenuItem>
                      <MenuItem value={"link"}>Link</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Hiển thị
                    </InputLabel>

                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={scope}
                      label="Hiển thị"
                      onChange={handleChangescope}
                      sx={{ width: "130px" }}
                    >
                      <MenuItem value={"public"}>Công khai</MenuItem>
                      <MenuItem value={"private"}>Nội bộ</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "50px",
                }}
              >
                <TextField
                  label="Tên tài liệu"
                  id="outlined-size-small"
                  value={document.name}
                  name="name"
                  size="small"
                  sx={{ width: "50%", marginRight: "20px" }}
                  onChange={handleInputChange}
                />

                {type === "file" ? (
                  <Button sx={{ width: "50%" }} component="label">
                    <input
                      style={{}}
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={handleFileChange}
                    />
                  </Button>
                ) : (
                  ""
                )}
                {type === "link" ? (
                  <TextField
                    label="Đường dẫn tài liệu"
                    id="outlined-size-small"
                    value={document.link}
                    name="link"
                    size="small"
                    sx={{
                      width: "50%",
                    }}
                    onChange={handleInputChange}
                  />
                ) : (
                  ""
                )}
              </div>

              {/* </div> */}
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Đóng
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="success"
                onClick={handleSubmit}
              >
                Lưu
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </>
  );
}
