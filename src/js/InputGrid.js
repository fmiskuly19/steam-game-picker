import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SteamInput from "./SteamInput";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import RadioButtons from "./RadioButtons";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      numPlayers: 0,
      isValid: false,
      steamid: 0,
      playerSelection: ""
    };
  }
  async checkSubmitStatus(value) {
    let keys = Object.keys(this.refs);

    await this.setState({ steamid: 0 });
    keys.forEach(key => {
      let steaminput = this.refs[key];
      console.log(
        `isValid: ${steaminput.state.steamid},${steaminput.state.isValid}`
      );
      this.setState({ steamid: steaminput.state.steamid });
    });
  }
  async handleRadioChoice(value) {
    await this.setState({ playerSelection: value });

    console.log(value);
    if (value === "c") {
      await this.setState({ isValid: true });
    } else {
      await this.setState({ isValid: false });
    }
  }
  render() {
    return (
      <React.Fragment>
        {/* Steaminput text field and label */}
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: "15px" }}
        >
          <Typography variant="overline" display="block" gutterBottom>
            Step 1: Enter SteamID
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "15px" }}
          spacing={4}
        >
          <SteamInput
            key={"steam-input"} //need key to get rid of react error
            ref={"steam-input"}
            onChange={this.checkSubmitStatus.bind(this)}
          ></SteamInput>
        </Grid>

        {/* Add Players input */}

        {this.state.steamid > 0 ? (
          <>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginTop: "15px", marginBottom: "15px" }}
              spacing={4}
            >
              <Typography variant="overline" display="block" gutterBottom>
                Step 2: Add Players
              </Typography>
              <RadioButtons onChange={this.handleRadioChoice.bind(this)} />
            </Grid>
          </>
        ) : null}

        {/* Add players from friends list */}
        {this.state.playerSelection === "a" ? (
          <>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <Select></Select>
            </Grid>
          </>
        ) : null}

        {/* Add players manually */}
        {this.state.playerSelection === "b" ? (
          <>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              Hello this will be a number input
            </Grid>
          </>
        ) : null}

        {/* <Grid
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
        </Grid> */}
      </React.Fragment>
    );
  }
}

export default Main;
