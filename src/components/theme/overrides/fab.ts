// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Button = (theme: any) => {
  return {
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[5]
        }
      }
    }
  }
}

export default Button
