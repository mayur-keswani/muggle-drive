import React from 'react'
import { Box, Typography } from "@mui/material";

import './Logo.css'

const Logo:React.FC = () => {
  return (
    <Box className="logo">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_Drive_logo.png/1200px-Google_Drive_logo.png"
        }
        width="48px"
        height="48px"
        alt='Muggle Drive'
      />
      <Typography variant='h6' className='mx-1'>Muggle Drive</Typography>
    </Box>
  );
}

export default Logo;