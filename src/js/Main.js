import React from "react";
import Container from "@material-ui/core/Container";
import InputGrid from "./InputGrid";
import Navbar from "./Navbar";
import ResultsGrid from "./ResultsGrid";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Container fixed>
          <Router>
            <Route exact path="/" component={InputGrid} />
            <Route path="/results/:steamids" component={ResultsGrid} />
          </Router>
        </Container>
        <br />
      </div>
    );
  }
}

export default Main;
