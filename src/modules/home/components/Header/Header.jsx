import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CategoryIcon from "@mui/icons-material/Category";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { useNavigate } from "react-router-dom";
import { Logout, Person, PersonSearch } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import "./style.css";

function Header() {
  const [user, setUser] = useState();
  const role = Cookies.get("role")?.replace(/"/g, "");

  useEffect(() => {
    const getUser = {
      token: JSON.parse(
        Cookies.get("token") !== undefined ? Cookies.get("token") : null
      ),
      email: JSON.parse(
        Cookies.get("email") !== undefined ? Cookies.get("email") : null
      ),
      role: JSON.parse(
        Cookies.get("role") !== undefined ? Cookies.get("role") : null
      ),
      name: JSON.parse(
        Cookies.get("name") !== undefined ? Cookies.get("name") : null
      ),
    };
    setUser(getUser);
  }, []);

  const _onlogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("email", { path: "/" });
    Cookies.remove("name", { path: "/" });
    Cookies.remove("role", { path: "/" });
    setUser({});
    navigate("/");
    window.location.reload();
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 17,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenSubmenu = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleCloseSubmenu = () => {
    setSubmenuAnchorEl(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignIn = () => {
    navigate("/signin");
  };

  const navigate = useNavigate();
  const handleChangeNavBar = (page) => {
    switch (page) {
      case "GIỚI THIỆU":
        navigate("/");
        break;
      case "CATALOGUE":
        navigate("/catalogue");
        break;
      case "BÁO CÁO":
        navigate("/report");
        break;
      case "THƯ VIỆN":
        navigate("/library");
        break;

      default:
        break;
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNavigate = (value) => {
    setAnchorEl(null);
    navigate(`setup/${value}`);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
  };

  const [anchorElReport, setAnchorElReport] = React.useState(null);
  const openReport = Boolean(anchorElReport);
  const handleClickReport = (event) => {
    setAnchorElReport(event.currentTarget);
  };
  const handleNavigateReport = (value) => {
    setAnchorElReport(null);
    navigate(`report/${value}`);
  };
  const handleCloseReport = (value) => {
    setAnchorElReport(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        position: "fixed",
        top: "0",
        zIndex: "999",
      }}
    >
      <Container maxWidth="xl" sx={{ height: "60px" }}>
        <Toolbar disableGutters>
          {/* LOGO */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} href="/">
            <img
              src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
              alt="logo"
              style={{
                height: "40px",
                width: "200px",
                zIndex: "10",
                cursor: "pointer",
              }}
              onClick={() => navigate("./")}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                textAlign: "start",
              }}
            >
              <MenuItem
                key={"GIỚI THIỆU"}
                onClick={
                  handleCloseNavMenu && (() => handleChangeNavBar("GIỚI THIỆU"))
                }
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                GIỚI THIỆU
              </MenuItem>

              {role &&
              role !== "null" &&
              (role === "Admin" || role === "Employee") ? (
                <>
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    disableElevation
                    onClick={handleClickReport}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    BÁO CÁO
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorElReport}
                    open={openReport}
                    onClose={handleCloseReport}
                  >
                    <MenuItem
                      onClick={() => handleNavigateReport("listprojects")}
                      disableRipple
                    >
                      <FormatListNumberedIcon />
                      Danh sách dự án
                    </MenuItem>

                    <MenuItem
                      onClick={() => handleNavigateReport("rpcosttotal")}
                      disableRipple
                    >
                      <AssessmentIcon />
                      Báo cáo tổng
                    </MenuItem>
                  </StyledMenu>
                </>
              ) : (
                <></>
              )}
              <Button
                key={"CATALOGUE"}
                onClick={
                  handleCloseNavMenu && (() => handleChangeNavBar("CATALOGUE"))
                }
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "13px",
                  display: "block",
                }}
              >
                CATALOGUE
              </Button>
              <Button
                key={"THƯ VIỆN"}
                onClick={
                  handleCloseNavMenu && (() => handleChangeNavBar("THƯ VIỆN"))
                }
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  display: "block",
                  fontSize: "13px",
                }}
              >
                THƯ VIỆN
              </Button>
              {role &&
              role !== "null" &&
              (role === "Admin" || role === "Employee") ? (
                <>
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "13px",
                      display: "block",
                    }}
                  >
                    CÀI ĐẶT
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => handleNavigate("categorylist")}
                      disableRipple
                    >
                      <CategoryIcon />
                      Hạng mục
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("costlist")}
                      disableRipple
                    >
                      <PriceChangeIcon />
                      Chi phí
                    </MenuItem>
                  </StyledMenu>
                </>
              ) : (
                <></>
              )}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
              paddingLeft: "5%",
            }}
            href="/"
          >
            <img
              src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
              alt="logo"
              style={{
                height: "40px",
                width: "auto",
                zIndex: "10",
                cursor: "pointer",
              }}
              onClick={() => navigate("./")}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              key={"GIỚI THIỆU"}
              onClick={() => handleChangeNavBar("GIỚI THIỆU")}
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "17px",
                margin: "10px",
              }}
            >
              GIỚI THIỆU
            </Button>

            {role &&
            role !== "null" &&
            (role === "Admin" || role === "Employee") ? (
              <>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  disableElevation
                  onClick={handleClickReport}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px",
                    fontSize: "17px",
                  }}
                >
                  BÁO CÁO
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorElReport}
                  open={openReport}
                  onClose={handleCloseReport}
                >
                  <MenuItem
                    onClick={() => handleNavigateReport("listprojects")}
                    disableRipple
                  >
                    <FormatListNumberedIcon />
                    Danh sách dự án
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleNavigateReport("rpcosttotal")}
                    disableRipple
                  >
                    <AssessmentIcon />
                    Báo cáo tổng
                  </MenuItem>
                </StyledMenu>
              </>
            ) : (
              <></>
            )}

            <Button
              key={"CATALOGUE"}
              onClick={
                handleCloseNavMenu && (() => handleChangeNavBar("CATALOGUE"))
              }
              sx={{
                color: "black",
                fontWeight: "bold",
                margin: "10px",
                fontSize: "17px",
              }}
            >
              CATALOGUE
            </Button>
            <Button
              key={"THƯ VIỆN"}
              onClick={
                handleCloseNavMenu && (() => handleChangeNavBar("THƯ VIỆN"))
              }
              sx={{
                color: "black",
                fontWeight: "bold",
                margin: "10px",
                fontSize: "17px",
              }}
            >
              THƯ VIỆN
            </Button>
            {role &&
            role !== "null" &&
            (role === "Admin" || role === "Employee") ? (
              <>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "10px",
                    fontSize: "17px",
                  }}
                >
                  CÀI ĐẶT
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => handleNavigate("categorylist")}
                    disableRipple
                  >
                    <CategoryIcon />
                    Hạng mục
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate("costlist")}
                    disableRipple
                  >
                    <PriceChangeIcon />
                    Chi phí
                  </MenuItem>

                  <Accordion>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                      <Typography>Danh mục dự án</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{ display: "block", mb: 1, cursor: "pointer" }}
                        variant="outlined"
                        onClick={() => handleNavigate("category01-project")}
                      >
                        <ArrowRightIcon />
                        Danh mục 1
                      </Box>
                      <Box
                        sx={{ display: "block", cursor: "pointer" }}
                        variant="outlined"
                        onClick={() => handleNavigate("category02-project")}
                      >
                        <ArrowRightIcon />
                        Danh mục 2
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                      <Typography>Danh mục thư viện</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{ display: "block", mb: 1, cursor: "pointer" }}
                        variant="outlined"
                        onClick={() => handleNavigate("category01-library")}
                      >
                        <ArrowRightIcon />
                        Danh mục 1
                      </Box>
                      <Box
                        sx={{ display: "block", cursor: "pointer" }}
                        variant="outlined"
                        onClick={() => handleNavigate("category02-library")}
                      >
                        <ArrowRightIcon />
                        Danh mục 2
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </StyledMenu>
              </>
            ) : (
              <></>
            )}
          </Box>
          <div style={{ paddingRight: "5%" }}>
            {user?.name ? (
              <Box>
                <Button
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-user"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                  color="inherit"
                  sx={{
                    my: 1,
                    // color: "#00477b",
                    color: "black",
                    fontSize: 14,
                    margin: "0 5px 0px 5px",
                    fontWeight: "500",
                  }}
                >
                  <Person />
                  {user?.name}
                </Button>
                <StyledMenu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate("/profile")} disableRipple>
                    <PersonSearch />
                    Thông tin cá nhân
                  </MenuItem>
                  {user?.role === "Admin" && (
                    <MenuItem
                      onClick={() => navigate("/user-management")}
                      disableRipple
                    >
                      <PersonSearch />
                      Quản lý tài khoản
                    </MenuItem>
                  )}
                  <MenuItem onClick={_onlogout} disableRipple>
                    <Logout />
                    Đăng xuất
                  </MenuItem>
                </StyledMenu>
              </Box>
            ) : (
              <button
                style={{
                  fontSize: "14px",
                  textTransform: "inherit",
                }}
                className="btn btn-primary "
                onClick={() => handleSignIn()}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
