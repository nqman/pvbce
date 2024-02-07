import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

const pages = ["GIỚI THIỆU", "BÁO CÁO", "CATALOGUE", "THƯ VIỆN"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const settings = ["Account", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const handleLogin = () => {
    navigate("/login");
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

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", color: "#007cd7" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
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
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={
                    handleCloseNavMenu && (() => handleChangeNavBar(page))
                  }
                  sx={{
                    my: 1,
                    color: "#00477b",
                    fontSize: "18px",
                    display: "block",
                    margin: "0 5px 0px 5px",
                    fontWeight: "600",
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu && (() => handleChangeNavBar(page))}
                sx={{
                  my: 1,
                  color: "#00477b",
                  fontSize: "18px",
                  display: "block",
                  margin: "0 5px 0px 5px",
                  fontWeight: "600",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <button
            style={{
              backgroundColor: "#405CF5",
              color: "white",
              fontSize: "16px",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => handleLogin()}
          >
            Đăng nhập
          </button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
