// ** React Imports
import { forwardRef } from "react";

// ** MUI Imports
import MuiAvatar from "@mui/material/Avatar";
import { lighten, useTheme } from "@mui/material/styles";


const CustomAvatar: React.FC<any> = (props) => {
  // ** Props
  const { sx, src } = props;

  return <MuiAvatar {...props} sx={sx} />;
};


export default CustomAvatar;
