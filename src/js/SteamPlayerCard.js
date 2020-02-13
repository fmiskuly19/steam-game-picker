import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WifiIcon from "@material-ui/icons/Wifi";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import "../css/styles.css";
import { styled } from "@material-ui/styles";

const Online = styled(WifiIcon)({
  color: "green"
});

const Offline = styled(WifiOffIcon)({
  color: "red"
});

class SteamPlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: false
    };
  }
  componentDidMount() {
    if (this.props.lastlogoff) {
      this.setState({ isOnline: false });
    } else {
      this.setState({ isOnline: true });
    }
  }
  render() {
    return (
      <Grid item lg={4}>
        <Paper className="paperContent">
          <Grid container direction="row">
            <Grid item lg={4}>
              <img
                className="steamAvatar"
                src={this.props.avatar}
                alt="avatarfull"
              />
            </Grid>
            <Grid item lg={8}>
              <Grid container direction="row">
                <Grid item lg={9} className="playercardcontent">
                  <Typography variant="h6">{this.props.personaname}</Typography>
                </Grid>
                <Grid item lg={3} className="playercardcontent">
                  {this.state.isOnline ? <Online /> : <Offline />}
                </Grid>
                <Grid item lg={6} className="playercardcontent">
                  <Typography variant="h6">Games</Typography>
                  <Typography variant="body1">{this.props.numGames}</Typography>
                </Grid>
                <Grid item lg={6} className="playercardcontent">
                  {this.props.hasLocation ? (
                    <div>
                      <Typography variant="h6">Location</Typography>
                      <Typography variant="body1">
                        {this.props.state ? this.props.state + ", " : null}
                        {this.props.country}
                      </Typography>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} className="playercardcontent">
              <Typography variant="h6">Most Played Game</Typography>
              <Typography variant="body1">
                {this.props.mostPlayedGame}
              </Typography>
            </Grid>
            <Grid item lg={4} className="playercardcontent">
              <Typography variant="h6">Time</Typography>
              <Typography variant="body1">
                {this.props.mostPlayedGameTime}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default SteamPlayerCard;
