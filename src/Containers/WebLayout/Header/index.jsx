import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../stores/Auth/actions";
import { useNavigate } from "react-router";
import AdbIcon from "@mui/icons-material/Adb";
import "./style.scss";

const settings = [
  { name: "Profile", route: "/account/profile" },
  { name: "News Preference", route: "/account/newsfeed" },
];

function Header() {
  const { isAuthenticated } = useSelector((state) => state?.AuthReducer);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
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
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1a1a1a", py: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 2,
            }}
          >
            <img
              src="/assets/innos.jpg"
              alt="Logo"
              style={{ width: "50px", marginRight: "10px" }}
            />
          </Box>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Innos News
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "white" }}
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  component={Link}
                  to={setting.route}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem key="logout" onClick={() => callLogout()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Innos News
          </Typography>
          {!isAuthenticated ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row-reverse",
              }}
            >
              <MenuItem key="register" component={Link} to="/register">
                <Typography textAlign="center" sx={{ color: "white" }}>
                  Register
                </Typography>
              </MenuItem>
              <MenuItem key="login" component={Link} to="/login">
                <Typography textAlign="center" sx={{ color: "white" }}>
                  Login
                </Typography>
              </MenuItem>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row-reverse",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    component={Link}
                    to={setting.route}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key="logout" onClick={() => callLogout()}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
