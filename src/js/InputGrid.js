import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SteamInput from "./SteamInput";
import Box from "@material-ui/core";

class Main extends React.Component {
  constructor() {
    super();
    this.inputs = [];
    this.state = {
      numPlayers: 0,
      isValid: false,
      steamids: []
    };
  }
  async checkSubmitStatus(value) {
    let count = 0;
    let keys = Object.keys(this.refs);

    await this.setState({ steamids: [] });
    keys.forEach(key => {
      let steaminput = this.refs[key];
      console.log(
        `isValid: ${steaminput.state.steamid},${steaminput.state.isValid}`
      );
      if (steaminput.state.isValid === true) {
        //increment count of valid steam ids
        count++;
        //store valid steamids in state to be used in parent component
        this.state.steamids.push(steaminput.state.steamid);
      }
    });

    if (count == this.state.numPlayers && count > 1) {
      await this.setState({ isValid: true });
    } else {
      await this.setState({ isValid: false });
    }
  }
  render() {
    this.inputs = [];
    for (var i = 0; i < this.state.numPlayers; i++) {
      if (i < 8) {
        this.inputs.push(
          <SteamInput
            onChange={this.checkSubmitStatus.bind(this)} //function in parent to observe change in child gets bound as property
            hasChanged={false}
            key={"steam-input-" + i} //need key to get rid of react error
            ref={"steam-input-" + i}
          ></SteamInput>
        );
      }
    }

    return (
      <Box>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Paper>
              <TextField
                id="outlined-number"
                onChange={e =>
                  this.setState({ numPlayers: e.target.value }, () => {
                    this.checkSubmitStatus();
                  })
                }
                value={this.state.numPlayers}
                style={{
                  marginLeft: "15px",
                  marginTop: "10px",
                  marginBottom: "15px",
                  marginRight: "15px"
                }}
                error={this.state.numPlayers > 8}
                helperText={this.state.numPlayers > 8 ? "Max 8 players" : ""}
                label="Number of Players"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ marginTop: "15px" }}
          spacing={3}
        >
          {this.inputs}
        </Grid>
        <Grid
          container
          alignItems="center"
          direction="column"
          style={{ marginTop: "15px" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.isValid}
            href={`/results/${this.state.steamids}`}
          >
            Pick a Game!
          </Button>
        </Grid>
        <Grid container justify="center" direction="row"></Grid>
      </Box>
    );
  }
}

export default Main;
