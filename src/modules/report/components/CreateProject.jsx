import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function CreateProject() {
  return (
    <div>
      <Container className="mt-5">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <div>
              <TextField
                label={"Hạng mục"}
                style={{ width: "300px" }}
                size="small"
              />
              <button className="btn btn-primary ms-3">Thêm</button>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <table class="table table-striped table-inverse table-responsive">
              <thead class="thead-inverse">
                <tr>
                  <th
                    style={{
                      border: "1px solid #000",
                      fontWeight: "bold",
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    STT
                  </th>
                  <th style={{ border: "1px solid #000", fontWeight: "bold" }}>
                    Hạng mục
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #000", textAlign: "center" }}>
                    1
                  </td>
                  <td style={{ border: "1px solid #000" }}>áddasdasd</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000", textAlign: "center" }}>
                    2
                  </td>
                  <td style={{ border: "1px solid #000" }}>áddasdasd</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
        <h2>Thông tin hợp đồng</h2>

        <h3>Hạng mục</h3>
      </Container>
    </div>
  );
}
