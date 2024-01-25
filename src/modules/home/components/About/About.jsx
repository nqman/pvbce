import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React from "react";
import styles from "./About.module.css";
import ReactPlayer from "react-player";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.dark,
}));
export default function About() {
  return (
    <Box mt={4}>
      <Grid container="lg" maxWidth={"lg"} margin={"auto"}>
        <Grid lg={6} sm={12} className={styles.about_left}>
          <Typography className={styles.h5} variant="h5" fon>
            VỀ CHÚNG TÔI
          </Typography>
          <div className={`container ${styles.about_text}`}>
            <p className="mt-3">
              Công ty{" "}
              <span style={{ fontWeight: "bold" }}>
                Phan Vũ Bình Dương (PVB)
              </span>{" "}
              là một trong các công ty thành viên trực thuộc Tập đoàn Phan Vũ
              (Phan Vũ Group), tên đầy đủ là Công ty TNHH MTV Sản xuất Xây dựng
              Phan Vũ.
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Phan Vũ Bình Dương</span> là
              đơn vị đảm nhiệm công tác thi công hầu hết các hạng mục thuộc dự
              án nền móng bằng công nghệ mới và dự án lắp ghép, hạ tầng - giao
              thông… của Tập đoàn Phan Vũ. Ngoài ra, Phan Vũ Bình Dương còn cho
              thuê các loại thiết bị, máy móc chuyên dụng phục vụ công tác xây
              dựng khác nhau.
            </p>
          </div>
          <div className="ps-3">
            <ReactPlayer
              // config={{ file: { attributes: { controlsList: "nodownload" } } }}
              url="https://youtu.be/nLKIUTwDLEY?si=rfsg4fid3X63XKZ4"
              width="550px"
              height="310px"
              // controls={true}
              // muted="true"
              playing={true}
              light="./image/thietbithicong1.png"
            />
          </div>
        </Grid>
        <Grid
          container
          lg={6}
          sm={12}
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="./image/about.png"
            alt="about"
            style={{ height: "550px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
