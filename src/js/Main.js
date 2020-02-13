import React from "react";
import Container from "@material-ui/core/Container";
import InputGrid from "./InputGrid";
import Navbar from "./Navbar";
import ResultsGrid from "./ResultsGrid";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      phase: 1,
      steamids: []
    };
  }
  async getResults(steamids) {
    await this.setState({ phase: 2 });
    await this.setState({ steamids: steamids });
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Container fixed>
          {this.state.phase === 1 ? (
            <InputGrid getResults={this.getResults.bind(this)}></InputGrid>
          ) : (
            <ResultsGrid steamids={this.state.steamids}></ResultsGrid>
          )}
        </Container>
        <br />
      </div>
    );
  }
}

export default Main;
