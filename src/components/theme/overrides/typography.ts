// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Typography = (theme: any) => {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: theme.spacing(2)
        }
      }
    }
  }
}

export default Typography
