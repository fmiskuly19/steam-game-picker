import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import "../css/styles.css";
import { FaSteam } from "react-icons/fa";

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <FaSteam />
            </IconButton>
            <Typography variant="h5">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/"
                color="primary"
              >
                SteamGamePicker
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Navbar;
