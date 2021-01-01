import React from "react";
import Container from "@material-ui/core/Container";
import InputGrid from "./InputGrid";
import ResultsGrid from "./ResultsGrid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { FaSteam } from "react-icons/fa";
import "../css/styles.scss";

const Navbar = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className="navbar">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FaSteam />
          </IconButton>
          <Typography variant="h5">
            <Link className="navbarlink" href="/">
              SteamGamePicker
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

const Main = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar></Navbar>
      <main className="main">
        <Container fixed>
          <Router>
            <Route exact path="/" component={InputGrid} />
            <Route path="/results/:steamids" component={ResultsGrid} />
          </Router>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Main;
