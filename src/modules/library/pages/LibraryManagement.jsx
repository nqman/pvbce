import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import ListLibrary from "../components/ListLibrary/ListLibrary";
import { useNavigate } from "react-router-dom";
import ButtonBT from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
export default function LibraryManagement() {
  //MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // SELECT
  const [type, setType] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <>
      <Container maxWidth="lg" className="mt-4">
        <div className="d-flex justify-content-between">
          <h4
            className=" d-inline text-white p-1 ps-3 pe-3 text-center"
            style={{ backgroundColor: "#BF1B2C", color: "#BF1B2C" }}
          >
            TÀI LIỆU
          </h4>
          <div>
            <button className="btn btn-primary" onClick={handleShow}>
              Thêm tài liệu
            </button>
          </div>
        </div>

        <ListLibrary />

        {/* MODAL */}
        <>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm tài liệu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center">
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
                      onChange={handleChange}
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
                  // value={productDetail.value || productDetail.file?.name}
                  sx={{ marginLeft: "20px" }}
                  // onChange={(e) =>
                  //   handleInputChange(
                  //     productDetail.id,
                  //     "value",
                  //     e.target.value
                  //   )
                  // }
                />
                {type === "file" ? (
                  <Button
                    sx={{ marginLeft: "20px" }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
                ) : (
                  <TextField
                    label="Đường dẫn tài liệu"
                    id="outlined-size-small"
                    // value={productDetail.value || productDetail.file?.name}
                    sx={{
                      marginLeft: "20px",
                    }}
                    // onChange={(e) =>
                    //   handleInputChange(
                    //     productDetail.id,
                    //     "value",
                    //     e.target.value
                    //   )
                    // }
                  />
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
                onClick={handleClose}
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
