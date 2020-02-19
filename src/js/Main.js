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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: "10px"
  }
}));

const Navbar = () => {
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
};

export default function Main() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar></Navbar>
      <main>
        <Container fixed>
          <Router>
            <Route exact path="/" component={InputGrid} />
            <Route path="/results/:steamids" component={ResultsGrid} />
          </Router>
        </Container>
      </main>
      <footer className={classes.footer}>Hello World</footer>
    </React.Fragment>
  );
}
