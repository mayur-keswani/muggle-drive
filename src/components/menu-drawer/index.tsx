import React, { useState, useEffect } from "react";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TopicIcon from "@mui/icons-material/Topic";
import DevicesIcon from "@mui/icons-material/Devices";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { MenuItem, MenuList, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const MenuDrawer = () => {
  const [selectMenu, setSelectMenu] = useState("drive");
  const { path } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    console.log(path)
    if (path) {
      if (path === "my-drive") {
        setSelectMenu("drive");
      } else if (path === "starred") {
        setSelectMenu("starred");
      } else if (path === "bin") {
        setSelectMenu("bin");
      } else if (path === "recent") {
        setSelectMenu("recent");
      } else if (path === "computers") {
        setSelectMenu("computers");
      } else if (path === "sharred") {
        setSelectMenu("sharred");
      }
    }
  }, [path]);
  return (
    <div>
      <MenuList
       
      >
        <MenuItem
          selected={selectMenu === "drive"}
          onClick={() => {
            Navigate("/dashboard/my-drive");
          }}
        >
          <ListItemIcon>
            <TopicIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Drive</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectMenu === "computers"}
          onClick={() => {
            Navigate("/dashboard/computers");
          }}
        >
          <ListItemIcon>
            <DevicesIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Computers</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectMenu === "recent"}
          onClick={() => {
            Navigate("/dashboard/recent");
          }}
        >
          <ListItemIcon>
            <AccessTimeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Recent</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectMenu === "shared"}
          onClick={() => {
            Navigate("/dashboard/shared");
          }}
        >
          <ListItemIcon>
            <PeopleAltOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shared with me</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectMenu === "starred"}
          onClick={() => {
            Navigate("/dashboard/starred");
          }}
        >
          <ListItemIcon>
            <StarRateOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Starred</ListItemText>
        </MenuItem>

        <MenuItem
          selected={selectMenu === "bin"}
          onClick={() => {
            Navigate("/dashboard/bin");
          }}
        >
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Bin</ListItemText>
        </MenuItem>
      </MenuList>
    </div>
  );
};

export default MenuDrawer;
