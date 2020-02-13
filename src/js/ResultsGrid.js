import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SteamPlayerCard from "./SteamPlayerCard";
import GameChoiceCard from "./GameChoiceCard";
import { MoonLoader } from "react-spinners";
import { Typography } from "@material-ui/core";

class Main extends React.Component {
  constructor() {
    super();
    this.steamPlayerCards = [];
    this.gameChoiceCard = [];
    this.state = {
      loading: false
    };
  }
  async componentDidMount() {
    await this.setState({ loading: true });
    console.log("hit results grid");

    console.log(this.props.steamids);

    console.log("starting promise chain");
    let url = `http://localhost:8080/v1/steam/GetPlayerSummaries/${this.props.steamids.join(
      ","
    )}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("got player profile response: ");

        console.log("");
        console.log("res");
        console.log(res);

        let promises = [];
        let playerProfiles = [];

        res.response.players.player.forEach(player => {
          playerProfiles.push(player);

          promises.push(
            fetch(
              `http://localhost:8080/v1/steam/GetOwnedGames/${
                player.steamid
              }&${true}&${true}`
            )
          );
        });

        promises.push(playerProfiles);

        console.log("");
        console.log("playerProfiles");
        console.log(playerProfiles);

        return Promise.all(promises);
      })
      .then(results => {
        console.log("");
        console.log("got owned game response, converting to json");

        console.log("");
        console.log("ownedGameResponse");
        console.log(results);

        let playerProfiles = results.pop();
        let promises = [];
        //iterate over promises
        results.forEach(result => {
          //still need to resolve all promises as we are using multiple fetch calls
          promises.push(result.json());
        });

        promises.push(playerProfiles);
        return Promise.all(promises);
      })
      .then(results => {
        console.log("");
        console.log("got owned games response");

        let playerProfiles = results.pop();

        console.log("");
        console.log("playerProfiles");
        console.log(playerProfiles);

        let ownedGames = [];
        let numGames = [];
        results.forEach(result => {
          ownedGames.push(result.response.games);
          numGames.push(result.response.game_count);
        });

        console.log("");
        console.log("ownedGames");
        console.log(ownedGames);

        //map profiles to game lists
        let userInfo = playerProfiles.map((profile, index) => {
          return { p: profile, g: ownedGames[index], n: numGames[index] };
        });

        console.log("");
        console.log("userInfo");
        console.log(userInfo);

        let gamesInCommon = ownedGames.shift().filter(toCompare => {
          return ownedGames.every(list => {
            return list.find(game => game.appid === toCompare.appid);
          });
        });

        console.log("");
        console.log("gamesInCommon");
        console.log(gamesInCommon);

        if (gamesInCommon.length < 1) {
          throw new Error("Users had no games in common!");
        }

        var gameChoice =
          gamesInCommon[Math.floor(Math.random() * gamesInCommon.length)];

        console.log("");
        console.log("gameChoice");
        console.log(gameChoice);

        let promises = [];

        promises.push(
          fetch(
            `http://localhost:8080/v1/steam/GetAppDetails/${gameChoice.appid}`
          )
        );
        promises.push(gamesInCommon);
        promises.push(gameChoice);
        promises.push(userInfo);

        return Promise.all(promises);
      })
      .then(([gameInfoResponse, userInfo, gameChoice, gamesInCommon]) => {
        console.log("");
        console.log("got game info response, converting to json ");
        let promises = [];

        console.log("");
        console.log("gameInfoResponse");
        console.log(gameInfoResponse);
        console.log("");
        console.log("gamesInCommon");
        console.log(gamesInCommon);
        console.log("");
        console.log("gameChoice");
        console.log(gameChoice);
        console.log("");
        console.log("userInfo");
        console.log(userInfo);

        promises.push(gameInfoResponse.json());
        promises.push(userInfo);
        promises.push(gameChoice);
        promises.push(gamesInCommon);

        return Promise.all(promises);
      })
      .then(([gameInfo, gamesInCommon, gameChoice, userInfo]) => {
        //build game info cards
        //build player cards
        console.log("");
        console.log("gameInfo");
        console.log(gameInfo);
        console.log("");
        console.log("gamesInCommon");
        console.log(gamesInCommon);
        console.log("");
        console.log("gameChoice");
        console.log(gameChoice);
        console.log("");
        console.log("userInfo");
        console.log(userInfo);

        userInfo.forEach(user => {
          let hasLocation = false;

          if (user.p.loccountrycode || user.p.locstatecode) hasLocation = true;

          let mostPlayedGameTime = Math.max.apply(
            Math,
            user.g.map(function(game) {
              return game.playtime_forever;
            })
          );
          console.log("");
          console.log("most played game");
          let mostPlayedGame = user.g.find(
            g => g.playtime_forever == mostPlayedGameTime
          );
          mostPlayedGameTime = Math.floor(mostPlayedGameTime / 60);
          console.log("most played game time");
          console.log(mostPlayedGameTime);

          this.steamPlayerCards.push(
            <SteamPlayerCard
              key={"steam-player-card-" + user.p.steamid}
              avatar={user.p.avatarfull}
              personaname={user.p.personaname}
              profileurl={user.p.profileurl}
              lastOnline={user.p.lastonline}
              country={user.p.loccountrycode}
              state={user.p.locstatecode}
              numGames={user.n}
              hasLocation={hasLocation}
              mostPlayedGame={mostPlayedGame.name}
              mostPlayedGameTime={mostPlayedGameTime + " hours"}
            ></SteamPlayerCard>
          );
        });

        Object.keys(gameInfo).forEach(key => {
          gameInfo = gameInfo[key];
          gameInfo = gameInfo.data;
        });
        console.log("gameInfo");
        console.log(gameInfo);

        let background = gameInfo.background.toString();
        background = background.substring(0, gameInfo.background.indexOf("?"));

        let movie = "";
        if (gameInfo.movies) {
          movie = gameInfo.movies[0].webm["max"];
        }

        this.gameChoiceCard.push(
          <GameChoiceCard
            background={background}
            name={gameChoice.name}
            desc={gameInfo.short_description}
            steamid={gameInfo.steam_appid}
            about={gameInfo.about_the_game}
            movie={movie}
          ></GameChoiceCard>
        );

        this.setState({ loading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <Grid container justify="center" alignItems="center">
            <Grid item lg={1}>
              <MoonLoader></MoonLoader>
            </Grid>
          </Grid>
        ) : (
          <div style={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              style={{ padding: "20px" }}
            >
              {this.gameChoiceCard}
            </Grid>
            <Grid>
              <Typography variant="h4">Players</Typography>
            </Grid>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              style={{ padding: "20px" }}
            >
              {this.steamPlayerCards}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
