import React from "react";
import Container from "@material-ui/core/Container";
import InputGrid from "./InputGrid";
import Navbar from "./Navbar";
import ResultsGrid from "./ResultsGrid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

class Main extends React.Component {
  render() {
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
          <br />
        </main>
      </React.Fragment>
    );
  }
}

export default Main;
