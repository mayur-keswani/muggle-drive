// ** MUI Imports
import { Theme } from '@mui/material/styles'
import { hexToRGBA } from '../../../lib/helper'


const Tooltip = (theme: any) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          lineHeight: 1.455,
          backgroundColor: hexToRGBA(theme.palette.customColors.tooltipBg, 0.9)
        },
        arrow: {
          color: hexToRGBA(theme.palette.customColors.tooltipBg, 0.9)
        }
      }
    }
  }
}

export default Tooltip
