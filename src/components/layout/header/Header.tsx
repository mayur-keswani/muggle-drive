import React,{useState} from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Logo from "../../commons/logo/Logo";
import AccountMenu from "./account-menu";
import { styled, useTheme, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Header.css";
import { Drawer } from "@mui/material";
import MenuDrawer from "../../menu-drawer";
import ThemeChanger from "./ThemeChanger";
const Header:React.FC = () => {

  const [isSideMenuOpen, setIsSideMenuOpen] =useState(false);
  const theme = useTheme();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    width: "80%",
    height: "46px",
    display: "flex",
    alignItems: "center",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",

    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  
  return (
    <Grid container className="header">
      <Grid
        xs={1}
        md={0}
        xl={0}
        sx={{ display: { md: "none", xs: "flex" } }}
        className="align-items-center justify-content-center"
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => {
            setIsSideMenuOpen(true);
          }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={isSideMenuOpen}
          onClose={() => {
            setIsSideMenuOpen(false);
          }}
        >
          <DrawerHeader>
            <ThemeChanger/>
            <IconButton
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <MenuDrawer />
        </Drawer>
      </Grid>

      <Grid md={2} xs={4} className="d-flex align-items-center px-2">
        <Logo />
      </Grid>

      <Grid
        md={7}
        xs={5}
        sx={{ justifyContent: { xs: "flex-end", md: "flex-start" } }}
        mdOffset={0}
        xlOffset={0}
        className="d-flex align-items-center"
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Grid>

      <Grid
        md={3}
        xs={2}
        className="d-flex align-items-center justify-content-end"
      >
        <AccountMenu />
      </Grid>
    </Grid>
  );
};

export default Header;
