import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
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

export default function SteamPlayerCard(props) {
  return (
    <Grid item lg={4}>
      <Paper className="paperContent">
        <Grid container direction="row">
          <Grid item lg={4}>
            <img className="steamAvatar" src={props.avatar} alt="avatarfull" />
          </Grid>
          <Grid item lg={8}>
            <Grid container direction="row">
              <Grid item lg={9} className="playercardcontent">
                <Typography variant="h6">{props.personaname}</Typography>
              </Grid>
              <Grid item lg={3} className="playercardcontent">
                {props.personastate === 0 ? (
                  <Tooltip title="Offline" placement="top">
                    <Offline />
                  </Tooltip>
                ) : (
                  <Tooltip title="Online" placement="top">
                    <Online />
                  </Tooltip>
                )}
              </Grid>
              <Grid item lg={6} className="playercardcontent">
                <Typography variant="h6">Games</Typography>
                <Typography variant="body1">{props.numGames}</Typography>
              </Grid>
              <Grid item lg={6} className="playercardcontent">
                {props.hasLocation ? (
                  <div>
                    <Typography variant="h6">Location</Typography>
                    <Typography variant="body1">
                      {props.state ? props.state + ", " : null}
                      {props.country}
                    </Typography>
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} className="playercardcontent">
            <Typography variant="h6">Most Played Game</Typography>
            <Typography variant="body1">{props.mostPlayedGame}</Typography>
          </Grid>
          <Grid item lg={4} className="playercardcontent">
            <Typography variant="h6">Time</Typography>
            <Typography variant="body1">{props.mostPlayedGameTime}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
