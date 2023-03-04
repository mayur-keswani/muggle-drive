// ** MUI Imports
import { Theme } from '@mui/material/styles'
import { hexToRGBA } from '../../../lib/helper'


const Backdrop = (theme: any) => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette?.customColors.main}, 0.5)`
              : hexToRGBA('#101121', 0.87)
        },
        invisible: {
          backgroundColor: 'transparent'
        }
      }
    }
  }
}

export default Backdrop
