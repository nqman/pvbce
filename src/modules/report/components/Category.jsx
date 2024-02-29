import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addCategoryAPI, getCategoriesAPI } from "../../../apis/reportAPI";

export default function Category() {
  const [category, setCategory] = useState("");
  const testCategories = [
    { id: 1, value: "Nhật kí bảo dưỡng" },
    { id: 2, value: "Nhật kí sửa chữa" },
    { id: 3, value: "Chi phí khác" },
  ];
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(category);
    try {
      // await addCategoryAPI(category);
      testCategories.push({ id: 0, value: category });
      // console.log(testCategories);
      setCategories(testCategories);

      setCategory("");
    } catch (error) {}
  };

  const [categories, setCategories] = useState(testCategories);
  useEffect(() => {
    // setCategories(getCategoriesAPI());
    console.log(categories);
  }, [testCategories]);
  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Thêm hạng mục</h3>
            <form
              style={{ display: "flex", alignItems: "center" }}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Tên hạng mục"
                id="outlined-size-small"
                value={category}
                sx={{ marginRight: "20px" }}
                onChange={handleChange}
                size="small"
                style={{ width: "300px" }}
              />
              <button
                className="btn btn-primary"
                // disabled={isLoading}
                type="submit"
              >
                Thêm
              </button>
            </form>
          </div>
          <div>
            <TableContainer
              style={{ width: "500px", fontSize: "16px", textAlign: "center" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ border: 1, textAlign: "center" }}
                      width={"50px"}
                    >
                      STT
                    </TableCell>
                    <TableCell sx={{ border: 1 }} align="center">
                      CÁC HẠNG MỤC
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.map((category) => (
                    <TableRow>
                      <TableCell sx={{ border: 1 }}>{category.id}</TableCell>
                      <TableCell sx={{ border: 1 }}>{category.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </div>
  );
}
