import React from "react";
import { Box, Grid } from "@mui/material";
import styled from "@mui/system/styled";
import Carousel from "react-material-ui-carousel";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));
export default function ConstructionCapacity() {
  return (
    <Carousel navButtonsAlwaysVisible={true} indicators={false}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container paddingLeft={"100px"}>
          <Grid lg={4}>
            <Item
              sx={{
                textAlign: "left",
              }}
            >
              <div>
                <h5>CÔNG NGHỆ MỚI</h5>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  Thi công công nghệ mới cho hạng mục cọc nền móng.
                </p>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  <b>NEW TECHNOLOGY</b> for foundation concrete piles.
                </p>
              </div>
            </Item>
          </Grid>
          <Grid lg={8}>
            <Item>
              <img
                style={{ maxHeight: "200px" }}
                src="./image/congnghemoi.png"
                alt=""
              />
            </Item>
          </Grid>
          <Grid lg={4}>
            <Item
              sx={{
                textAlign: "left",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <h5>TRUYỀN THỐNG</h5>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  Thi công phương pháp truyền thông cho hạng mục cọc nền móng.
                </p>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  <b>TRADITIONAL METHOD</b> for foundation concrete piles.
                </p>
              </div>
            </Item>
          </Grid>
          <Grid lg={8}>
            <Item>
              <img
                style={{ maxHeight: "200px" }}
                src="./image/truyenthong.png"
                alt=""
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container paddingLeft={"100px"}>
          <Grid lg={4}>
            <Item
              sx={{
                textAlign: "left",
              }}
            >
              <div>
                <h5>CÔNG TRÌNH HT - GT</h5>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  Thi công nền móng, lao phóng dầm cầu...
                </p>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  <b>INFRASTRUCTURE & TRANSPORTATION </b> Constructing
                  foundation, beams…
                </p>
              </div>
            </Item>
          </Grid>
          <Grid lg={8}>
            <Item>
              <img
                style={{ maxHeight: "200px" }}
                src="./image/cthtgt.png"
                alt=""
              />
            </Item>
          </Grid>
          <Grid lg={4}>
            <Item
              sx={{
                textAlign: "left",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <h5> THI CÔNG KHÁC</h5>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  Thi công các hạng mục khác như cọc xi măng đất, khoan nhồi...
                </p>
                <p style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                  <b>TRADITIONAL METHOD</b> such as CDM, bored-piles…
                </p>
              </div>
            </Item>
          </Grid>
          <Grid lg={8}>
            <Item>
              <img
                style={{ maxHeight: "200px" }}
                src="./image/thicongkhac.png"
                alt=""
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Carousel>
  );
}
