import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CategoryIcon from "@mui/icons-material/Category";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Logout,
  ManageAccounts,
  Person,
  PersonSearch,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { selectUserAPI } from "../../../../apis/authenticationAPI";

const pages = ["GIỚI THIỆU", "BÁO CÁO", "CATALOGUE", "THƯ VIỆN"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = ["Account", "Logout"];

function Header() {
  const [user, setUser] = useState();
  const role = Cookies.get("role");

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
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("name");
    Cookies.remove("role");
    setUser({});
    navigate("/");
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
          fontSize: 18,
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
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const loggedUser = useSelector((state) => state.user.loggedUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    navigate(`report/${value}`);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", color: "#007cd7" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },

              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginRight: "100px",
            }}
          >
            <img
              src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
              alt="logo"
              style={{
                height: "54px",
                width: "270px",
                zIndex: "10",
              }}
              onClick={() => navigate("./")}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              }}
            >
              {/* {pages.map((page) => ( */}
              <MenuItem
                key={"GIỚI THIỆU"}
                onClick={
                  handleCloseNavMenu && (() => handleChangeNavBar("GIỚI THIỆU"))
                }
                sx={{
                  my: 1,
                  color: "#00477b",
                  fontSize: "18px",
                  display: "block",
                  margin: "0 5px 0px 5px",
                  fontWeight: "800",
                }}
              >
                <Typography textAlign="center">GIỚI THIỆU</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png"
              alt="logo"
              style={{
                height: "54px",
                width: "270px",
                zIndex: "10",
              }}
              onClick={() => navigate("./")}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* GIỚI THIỆU */}

            <Button
              key={"GIỚI THIỆU"}
              onClick={
                handleCloseNavMenu && (() => handleChangeNavBar("GIỚI THIỆU"))
              }
              sx={{
                my: 1,
                color: "#00477b",
                fontSize: "18px",
                display: "block",
                margin: "0 5px 0px 5px",
                fontWeight: "800",
              }}
            >
              {"GIỚI THIỆU"}
            </Button>
            {/* BÁO CÁO */}
            {/* {console.log(role)} */}
            {role &&
            role !== "null" &&
            (!role !== "Admin" || !role !== "Employee") ? (
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
                    my: 1,
                    color: "#00477b",
                    fontSize: "18px",
                    margin: "0 5px 0px 5px",
                    fontWeight: "800",
                  }}
                >
                  BÁO CÁO
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
                    <CategoryIcon />
                    Chi phí
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate("listprojects")}
                    disableRipple
                  >
                    <FormatListNumberedIcon />
                    Danh sách dự án
                  </MenuItem>
                  {/* <Divider sx={{ my: 0.5 }} /> */}
                  {/* GẠCH NGĂN CÁCH */}
                  <MenuItem
                    onClick={() => handleNavigate("rp_total")}
                    disableRipple
                  >
                    <AssessmentIcon />
                    Báo cáo tổng
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate("rp_revenue")}
                    disableRipple
                  >
                    <SummarizeIcon />
                    Báo cáo doanh thu
                  </MenuItem>
                </StyledMenu>
              </>
            ) : (
              <></>
            )}

            {/* CATALOGUE */}
            <Button
              key={"CATALOGUE"}
              onClick={
                handleCloseNavMenu && (() => handleChangeNavBar("CATALOGUE"))
              }
              sx={{
                my: 1,
                color: "#00477b",
                fontSize: "18px",
                display: "block",
                margin: "0 5px 0px 5px",
                fontWeight: "800",
              }}
            >
              {"CATALOGUE"}
            </Button>
            <Button
              key={"THƯ VIỆN"}
              onClick={
                handleCloseNavMenu && (() => handleChangeNavBar("THƯ VIỆN"))
              }
              sx={{
                my: 1,
                color: "#00477b",
                fontSize: "18px",
                display: "block",
                margin: "0 5px 0px 5px",
                fontWeight: "800",
              }}
            >
              {"THƯ VIỆN"}
            </Button>
          </Box>

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
                  color: "#00477b",
                  fontSize: 15,
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
                // backgroundColor: "#3B65B3",
                // color: "white",
                fontSize: "14px",
                // padding: "8px 15px",
                // border: "none",
                // borderRadius: "5px",
              }}
              className="btn btn-outline-primary"
              onClick={() => handleSignIn()}
            >
              Đăng nhập
            </button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
