import { Grid, Typography, Box, IconButton, Avatar } from "@mui/material";
import maruti from "../../assets/maruti-logo.png";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

Navbar.propTypes = { title: PropTypes.string };

function Navbar({ title }) {
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid item xs={4}>
        <Box sx={{ backgroundColor: "#2D3394", px: 3, py: 1, maxWidth: 350 }}>
          <img src={maruti} alt="maruti_logo" />
        </Box>
      </Grid>
      <Grid item xs={4} alignItems="center" marginY="auto">
        <Typography textAlign="center" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: 2,
          }}
        >
          <IconButton onClick={() => navigate("/cards")}>
            <HomeIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} />
          <Typography>Test User</Typography>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Navbar;
