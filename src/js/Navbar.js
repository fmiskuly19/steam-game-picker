import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import "../css/styles.css";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="navbar">
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
      </div>
    );
  }
}

export default Navbar;
