import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

export default function Loader(){
    return (
        <Box  display="flex"
              justifyContent="center"
              alignItems="center">
            <CircularProgress />
        </Box>
    )
}