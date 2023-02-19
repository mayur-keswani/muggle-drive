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
import { BIN, COMPUTER, MY_DRIVE, RECENT, SHARED, STARRED } from "../../context/constants";

const MenuDrawer = () => {
  const { sectionType } = useParams();
  const Navigate = useNavigate();

  return (
    <div>
      <MenuList>
        <MenuItem
          selected={sectionType === MY_DRIVE}
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
          selected={sectionType === COMPUTER}
          disabled={true}
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
          selected={sectionType === RECENT}
          disabled={true}
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
          selected={sectionType === SHARED}
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
          selected={sectionType === STARRED}
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
          selected={sectionType === BIN}
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
