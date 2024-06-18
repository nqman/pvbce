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
      <div className="container  pt-3 pb-3">
        <div className="row">
          <div
            className="footer_left col-lg-4 col-md-4 col-sm-12"
            style={{ borderLeft: "3px solid " }}
          >
            <div>
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
            style={{ borderLeft: "3px solid " }}
          >
            <div>
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
            style={{
              borderLeft: "3px solid ",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div className="footer_logo">
              <img
                src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
                alt="logo"
                style={{
                  // height: "54px",
                  width: "250px",
                  zIndex: "10",
                }}
              />
              <p style={{ marginBottom: "15px" }}>
                © 2024 PhanVuBinhDuong. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
