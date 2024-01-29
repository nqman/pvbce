import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListLibrary from "../components/ListDocuments/ListDocuments";
import Modal from "react-bootstrap/Modal";
import {
  addDocumentAPI,
  deleteDocumentAPI,
  listDocumentsAPI,
} from "../../../apis/documentAPI";
import toast from "react-hot-toast";

export default function DocumentManagement() {
  //MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // SELECT
  const [type, setType] = useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
    setDocument(emptyValue);
  };

  // FORM
  const emptyValue = {
    name: "",
    link: "",
    file: null,
  };
  const [listDocs, setListDocs] = useState(
    []
    // { name: "người lái đò", link: "https://google.com", file: null },
    // {
    //   name: "TCVN 7888:2014 - Cọc bê tông ly tâm ứng suất trước",
    //   link: "",
    //   file: "FILE.pdf",
    // },
    // { name: "người lái thuyền", link: "youtybe.com", file: null },
  );

  useEffect(() => fetchDocuments(), []);

  const fetchDocuments = async () => {
    try {
      const data = await listDocumentsAPI();
      toast.success("Lấy danh sách thư viện thành công");
      // console.log(data)
      setListDocs(data);
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
    console.log(document);
    try {
      await addDocumentAPI(document);
      toast.success("Thêm tài liệu thành công");
    } catch (error) {
      toast.error("Thêm tài liệu thất bại");
    }
    setShow(false);
  };

  // xóa tài liệu
  const handleDelete = async (id) => {
    try {
      await deleteDocumentAPI(id);
      toast.success("Xóa tài liệu thành công");
    } catch (error) {
      toast.error("Xóa tài liệu thất bại");
    }
  };

  // READ

  return (
    <>
      <Container maxWidth="lg" className="mt-4">
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary " onClick={handleShow}>
            Thêm tài liệu
          </button>
        </div>

        <ListLibrary onDelete={handleDelete} listDocs={listDocs} />

        {/* MODAL */}
        <>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm tài liệu</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "10px" }}>
              <div
                className="d-flex align-items-center"
                style={{ height: "56px" }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Định dạng
                    </InputLabel>
                    <Select
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

                <TextField
                  label="Tên tài liệu"
                  id="outlined-size-small"
                  value={document.name}
                  name="name"
                  sx={{ margin: "20px", width: "250px" }}
                  onChange={handleInputChange}
                />
                {type === "file" ? (
                  <Button component="label">
                    <input
                      style={{
                        width: "300px",
                        padding: "16.5px",
                        lineHeight: "23px",
                      }}
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
                    sx={{
                      width: "300px",
                    }}
                    onChange={handleInputChange}
                  />
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
