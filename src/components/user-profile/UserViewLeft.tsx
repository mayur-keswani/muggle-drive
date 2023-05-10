// ** React Imports
import { useState, useContext } from "react";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CustomAvatar from "../Avatars/CustomAvatar";
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import { Divider } from "@mui/material";
import { FoldersContent } from "../../context/FolderContext";
import { FilesContext } from "../../context/FileContext";


const UserViewLeft:React.FC<{data:any}> = ({ data }) => {
  const { files } = useContext(FilesContext);


  const renderUserAvatar = () => {
    if (data) {
      if (data.avatar) {
        return (
          <CustomAvatar
            alt="User Image"
            src={data.avatar}
            variant="rounded"
            sx={{ width: 120, height: 120, mb: 4 }}
          />
        );
      } else {
        return (
          <CustomAvatar
            skin="light"
            variant="rounded"
            color={data.avatarColor}
            sx={{
              width: 120,
              height: 120,
              fontWeight: 600,
              mb: 4,
              fontSize: "3rem",
            }}
          >
            {(data.Username).split(/\s/).reduce((response:string, word:string) => (response += word.slice(0, 1)), '')}
          </CustomAvatar>
        );
      }
    } else {
      return null;
    }
  };
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 15,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {renderUserAvatar()}
              <Typography variant="h6" sx={{ mb: 4 }}>
                {data.fullName}
              </Typography>
              {/* <CustomChip
                skin="light"
                size="small"
                label={data.role}
                color={"info"}
                sx={{
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                  "& .MuiChip-label": { mt: -0.25 },
                }}
              /> */}
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ mr: 6, display: "flex", alignItems: "center" }}>
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    sx={{ mr: 4, width: 44, height: 44 }}
                  >
                    <SnippetFolderOutlinedIcon />
                  </CustomAvatar>
                  <Box>
                    <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                      {files.length}
                    </Typography>
                    <Typography variant="body1">Resouces</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    sx={{ mr: 4, width: 44, height: 44 }}
                  >
                    <StarOutlineIcon />
                  </CustomAvatar>
                  <Box>
                    <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                      5MB
                    </Typography>
                    <Typography variant="body1">Available</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              {/* <Typography variant="h5">Details</Typography> */}
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, color: "text.primary" }}
                  >
                    Username:
                  </Typography>
                  <Typography variant="body1">@{data.Username}</Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, color: "text.primary" }}
                  >
                    Billing Email:
                  </Typography>
                  <Typography variant="body1">{data.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, color: "text.primary" }}
                  >
                    Status:
                  </Typography>
                  <Typography variant="body1">
                    {data.email_verified ? "Verified" : "Not Verified"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h6"
                    sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                  >
                    Language:
                  </Typography>
                  <Typography variant="body1">English</Typography>
                </Box>
              </Box>
            </CardContent>

            {/* <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" sx={{ mr: 2 }} onClick={() => {}}>
                Edit
              </Button>
              <Button color="error" variant="outlined">
                Suspend
              </Button>
            </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewLeft;
