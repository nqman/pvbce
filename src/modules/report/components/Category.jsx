import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Category() {
  const [category, setCategory] = useState("");
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category);
    try {
      // await addCategoryAPI(category);
      setCategory("");
    } catch (error) {}
  };
  return (
    <div>
      <Container>
        <div style={{ display: "flex", marginTop: "100px" }}>
          <div>
            <h3>Các hạng mục</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                placeholder="Tên hạng mục"
                id="outlined-size-small"
                value={category}
                sx={{ marginRight: "20px" }}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="success"
                // disabled={isLoading}
                type="submit"
              >
                Thêm
              </Button>
            </form>
          </div>
          <div>
            <table class="table table-bordered border-dark">
              <thead class="table-light">
                <tr>
                  <th>STT</th>
                  <th>Tên hạng mục</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
