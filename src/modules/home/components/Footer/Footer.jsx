import React from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "divider",
        marginTop: "8px",
      }}
      id="footer"
    >
      <div className="container  pt-3 pb-2">
        <div className="row">
          <div
            className="footer_left col-lg-4 col-md-4 col-sm-12"
            style={{ borderRight: "1px solid " }}
          >
            <div
              style={{
                marginTop: "20px",
                // borderRight: "1px solid",
              }}
            >
              <b>VĂN PHÒNG TẠI HCM:</b>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li style={{ margin: "8px 0" }}>
                  <PinDropIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: "#00477B",
                    }}
                  />
                  11A Trường Sơn, Quận Tân Bình, TP. HCM
                </li>
                <li style={{ margin: "8px 0" }}>
                  <PhoneIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: "#00477B",
                    }}
                  />
                  (027).23639572
                </li>
                <li style={{ margin: "8px 0" }}>
                  <EmailIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: "#00477B",
                    }}
                  />
                  pvbd@phanvu.com
                </li>
              </ul>
            </div>
          </div>
          <div
            className="footer_middle col-lg-4 col-md-4 col-sm-12"
            style={{ borderRight: "1px solid " }}
          >
            <div style={{ marginTop: "20px" }}>
              <b>XƯỞNG THIẾT BỊ TẠI LONG AN:</b>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li style={{ margin: "8px 0" }}>
                  <PinDropIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: "#00477B",
                    }}
                  />
                  Đường 830, Lương Bình, H. Bến Lức, Long An
                </li>
                <li style={{ margin: "8px 0" }}>
                  <PhoneIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: "#00477B",
                    }}
                  />
                  (027).23639572
                </li>
                <li style={{ margin: "8px 0" }}>
                  <EmailIcon
                    sx={{
                      fontSize: "15px",
                      marginRight: "10px",
                      color: "#00477B",
                    }}
                  />
                  pvbd@phanvu.com
                </li>
              </ul>
            </div>
          </div>
          <div
            className="footer__right col-lg-4 col-md-4 col-sm-12 "
            style={{ marginTop: "65px" }}
          >
            <div className="footer_logo">
              <img
                src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
                alt="logo"
                style={{
                  // height: "54px",
                  width: "150px",
                  zIndex: "10",
                }}
              />
            </div>
            {/* <div className="footer_social mt-2">
              <a href="https://www.facebook.com/wanman26">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.linkedin.com/">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com/?lang=en">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.google.com.vn/">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="https://github.com/wanman26">
                <i className="fab fa-github"></i>
              </a>
            </div> */}
            <p>© 2024 PhanVuBinhDuong. All rights reserved.</p>
          </div>
        </div>
      </div>
    </Box>
  );
}
