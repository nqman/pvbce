import React from "react";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Signin, SpanHeader, Navbar } from "./styleHeader";

export default function Header(props) {
  const pages = [
    { id: "introduce", label: "GIỚI THIỆU" },
    { id: "business", label: "LĨNH VỰC KINH DOANH" },
    { id: "award", label: "GIẢI THƯỞNG" },
    { id: "partner", label: "ĐỐI TÁC" },
    { id: "contact", label: "LIÊN HỆ" },
    { id: "catalogue", label: "CATALOGUE" },
  ];

  return (
    <>
      <AppBar color="default">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                my: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "Nunito Sans",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                fontsize: "15px",
              }}
            >
              <img
                src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
                alt="logo"
                style={{
                  height: "50px",
                  width: "100%",
                  zIndex: "10",
                }}
              />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
              justifyContent="center"
            >
              {pages.map((page) => (
                <Navbar className="navbar" key={page.id}>
                  {page.label}
                </Navbar>
              ))}
            </Box>

            {/* Signin */}
            <Box sx={{ flexGrow: 0 }}>
              <Signin borderRight="1px solid #9e9e9e">
                <Tooltip title="Đăng nhập">
                  <AccountCircle fontSize="large" />
                </Tooltip>
                <SpanHeader>Đăng nhập</SpanHeader>
              </Signin>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
