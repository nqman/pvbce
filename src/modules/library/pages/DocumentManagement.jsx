import {
  Autocomplete,
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
  const [categoryTwoList, setCategoryTwoList] = useState();
  const [selectedCategoryOneList, setSelectedCategoryOneList] = useState("Tất cả");
  const [selectedCategoryTwoList, setSelectedCategoryTwoList] = useState("Tất cả");

  // const [linkLibrary, setLinkLibrary] = useState([]);
  // const [errorLibary, setErrorLibrary] = useState("");

  const role = Cookies.get("role")?.replace(/"/g, "");
  const [listDocs, setListDocs] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      fetchDocuments();
    };
    asyncFn();
  }, [selectedCategoryOneList, selectedCategoryTwoList]);

  const fetchDocuments = async () => {
    try {
      const data = await listDocumentsAPI(
        selectedCategoryOneList,
        selectedCategoryTwoList
      );
      setListDocs(data);
      let categoryOneTwo = await getCategoriesOneAndTwoAPI("LIBRARY_ITEM_ONE");
      setCategoryOneTwo(categoryOneTwo);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const [valueOne, setValueOne] = useState("1");
  const [valueTwo, setValueTwo] = useState("1");

  const handleSelectCategoryOneList = (event, value) => {
    let selectedCategoryOneList = categoryOneTwo.filter(
      (category) => category.id === value
    );
    setCategoryTwoList(selectedCategoryOneList[0]?.categories);
    setSelectedCategoryTwoList("Tất cả");
    setValueTwo("1");
    // setSelectedCategoryOneList(value);
    setSelectedCategoryOneList(event.target.innerText);

    setValueOne(value);
  };

  const handleSelectCategoryTwoList = (event, value) => {
    setValueTwo(value);
    setSelectedCategoryTwoList(event.target.innerText);
  };
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

  //MODAL
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
  const [show, setShow] = useState(false);
  const [document, setDocument] = useState(emptyValue);
  const [type, setType] = useState("");
  const [scope, setScope] = useState("");
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [selectedCategoryOne, setSelectedCategoryOne] = useState();
  const [errorCategoryOne, setErrorCategoryOne] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorName, setErrorName] = useState("Vui lòng không bỏ trống");
  const [errorLink, setErrorLink] = useState("Vui lòng không bỏ trống");
  const [errorCategoryTwo, setErrorCategoryTwo] = useState(
    "Vui lòng không bỏ trống"
  );
  const handleSelectCategoryOne = (key, value) => {
    // debugger;
    if (value) {
      setErrorCategoryOne("");
      setSelectedCategoryOne(value);
      let selectedCategory = categoryOneTwo.filter(
        (category) => category.name === value
      );
      setCategoryTwo(selectedCategory[0].categories);
      setDocument({ ...document, [key]: value });
    } else {
      setErrorCategoryOne("Vui lòng không bỏ trống");
    }
  };
  const handleInputChange = (key, value) => {
    // debugger;
    if (key === "categoryTwo") {
      if (value) {
        setErrorCategoryTwo("");
        setSelectedCategoryTwo(value);
      } else {
        setErrorCategoryOne("Vui lòng không bỏ trống");
      }
    } else if (key === "name") {
      if (value) {
        setErrorName("");
      } else {
        setErrorName("Vui lòng không bỏ trống");
      }
    } else if (key === "link") {
      if (value) {
        setErrorLink("");
      } else {
        setErrorLink("Vui lòng không bỏ trống");
      }
    }

    setDocument({ ...document, [key]: value });
  };
  const handleFileChange = (e) => {
    setDocument({ ...document, file: e.target.files[0] });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // SELECT type

  const handleChangeType = (e) => {
    setType(e.target.value);
  };
  const handleChangeScope = (e) => {
    setScope(e.target.value);
    setDocument({ ...document, scope: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = await addDocumentAPI(document);
      if (data) {
        setShow(false);
        toast.success("Thêm tài liệu thành công");
        setDocument(emptyValue);
      }
      fetchDocuments();
    } catch (error) {
      toast.error("Thêm tài liệu thất bại");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
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
          <TabContext value={valueOne}>
            <Box>
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleSelectCategoryOneList}
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
                    backgroundColor: "#F5F5F5",
                    textTransform: "inherit",

                    padding: "0px 8px",

                    borderTopLeftRadius: "5px",

                    borderRight: 1,
                    borderColor: "divider",
                  }}
                  label="Tất cả"
                  value="1"
                />
                {categoryOneTwo.map((category, index) => (
                  <Tab
                    key={index}
                    sx={{
                      color: "black",

                      textTransform: "inherit",
                      padding: "0px 8px",

                      borderRight: 1,
                      borderColor: "divider",
                      backgroundColor: "#F5F5F5",
                    }}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </TabList>
            </Box>
            {categoryTwoList?.length > 0 ? (
              categoryOneTwo.map((category) => (
                <TabPanel
                  sx={{
                    padding: 0,
                    display: "flex",
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                  value={category.id}
                >
                  <Tabs
                    value={valueTwo}
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleSelectCategoryTwoList}
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

                        backgroundColor: "#F5F5F5",
                        textTransform: "inherit",
                        padding: "0px 8px",
                        borderRight: 1,
                        borderColor: "divider",
                      }}
                      label="Tất cả"
                      value="1"
                    />
                    {categoryTwoList?.map((item, index) => (
                      <Tab
                        key={index}
                        sx={{
                          color: "black",
                          textTransform: "inherit",
                          padding: "0px 8px",
                          borderRight: 1,
                          borderColor: "divider",
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

        <ListDocuments
          role={role}
          onDelete={handleDelete}
          listDocs={listDocs}
          selectedCategoryOneList={selectedCategoryOneList}
          selectedCategoryTwoList={selectedCategoryTwoList}
        />

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
            <Modal.Body style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginBottom: "5px",
                }}
              >
                <div
                  className=" mb-2"
                  style={{
                    height: "50px",
                    width: "50%",
                    marginRight: "20px",
                  }}
                >
                  <Autocomplete
                    size="small"
                    sx={{
                      display: "block",
                      height: "40px",
                    }}
                    options={categoryOneTwo?.map((option) => option.name)}
                    onChange={(e, value) =>
                      handleSelectCategoryOne("categoryOne", value)
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Danh mục 1" />
                    )}
                  />
                  <span className="text-danger  ">{errorCategoryOne}</span>
                </div>
                {categoryTwo?.length > 0 ? (
                  <div style={{ height: "50px", width: "50%" }}>
                    <Autocomplete
                      size="small"
                      sx={{
                        display: "block",
                        height: "40px",
                      }}
                      disablePortal
                      options={categoryTwo?.map((option) => option.name)}
                      onChange={(e, value) =>
                        handleInputChange("categoryTwo", value)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Danh mục 2" />
                      )}
                    />
                    <span className="text-danger ">
                      {errorCategoryTwo}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Box sx={{ marginRight: "20px", marginTop: "10px" }}>
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
                <Box sx={{ marginTop: "10px" }}>
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
                      onChange={handleChangeScope}
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
                  alignItems: "start",
                  height: "60px",
                }}
              >
                <div style={{ width: "50%", marginRight: "20px" }}>
                  <TextField
                    label="Tên tài liệu"
                    id="outlined-size-small"
                    value={document.name}
                    name="name"
                    size="small"
                    sx={{ width: "100%" }}
                    onChange={(e, value) =>
                      handleInputChange("name", e.target.value)
                    }
                  />
                  <span className="text-danger d-block  ">{errorName}</span>
                </div>
                {type === "file" ? (
                  <div style={{ width: "50%" }}>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  ""
                )}
                {type === "link" ? (
                  <div
                    style={{
                      width: "50%",
                      height: "60px",
                    }}
                  >
                    <TextField
                      label="Đường dẫn tài liệu"
                      id="outlined-size-small"
                      value={document.link}
                      name="link"
                      size="small"
                      sx={{
                        width: "100%",
                      }}
                      onChange={(e, value) =>
                        handleInputChange("link", e.target.value)
                      }
                    />
                    <p className="text-danger  ">{errorLink}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
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
