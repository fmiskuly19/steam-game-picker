import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import GamepadTwoToneIcon from "@material-ui/icons/GamepadTwoTone";
import { Checkmark } from "react-checkmark";
import { PulseLoader } from "react-spinners";

class SteamInput extends React.Component {
  constructor() {
    super();
    this.timeout = 0;
    this.state = {
      isValid: false,
      steamid: 0,
      vanityURL: ""
    };
  }
  onInputChange(e) {
    //set isValid to false immediately to get rid of checkmark if previous input was correct
    this.setState({ isValid: false });

    //store vanityURL in input state
    var vanityURL = e.target.value;
    this.setState({ vanityURL: vanityURL });

    //timeout for typing username so we are not calling api every letter
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.timeout = 0;

      this.resolveVanityURL(vanityURL);
    }, 800);
  }
  resolveVanityURL(vanityURL) {
    //check if vanityURL is blank, in the case that it is, we cannot send no param in steamapi call, so send gibberish instead so we at least get a proper response telling us that the username doesnt exist. This probably isnt the best solution but it works for now
    if (!vanityURL)
      vanityURL =
        "thisisnotarealvanityurlitsjusttogetaroundsendingablankcharacter";

    //resolve vanity url and get internal steam id
    fetch(`http://localhost:8080/v1/steam/resolveVanityURL/${vanityURL}`)
      .then(res => res.json()) //convert
      .then(res => {
        let success = res.response.success;

        //if success code is 1 it was successful and the id is correct, code is 42 or other number if not
        if (success !== 1) {
          this.setState({ isValid: false });
          this.setState({ steamid: 0 });
          console.log(`error code: ${success}`);

          //onchange event to notify parent of change, doesnt matter what we send back because we are looking at all inputs through this.refs
          this.props.onChange(vanityURL);
        } else {
          let steamid = res.response.steamid;
          this.setState({ steamid: steamid });
          this.setState({ isValid: true });
          console.log(`steamid: ${steamid}`);

          //onchange event to notify parent of change, doesnt matter what we send back because we are looking at all inputs through this.refs
          this.props.onChange(vanityURL);
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Grid item lg={5}>
        <Paper style={{ padding: "15px" }}>
          <TextField
            id="input-with-icon-adornment"
            onChange={this.onInputChange.bind(this)}
            placeholder="Steam Profile ID"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GamepadTwoToneIcon></GamepadTwoToneIcon>
                  &nbsp;http://steamcommunity.com/id/
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {this.state.isValid ? (
                    <Checkmark size="medium"></Checkmark>
                  ) : null}
                  {this.timeout !== 0 ? (
                    <PulseLoader size={10} color="#7AC142"></PulseLoader>
                  ) : null}
                  &nbsp;
                </InputAdornment>
              )
            }}
          ></TextField>
        </Paper>
      </Grid>
    );
  }
}

export default SteamInput;
