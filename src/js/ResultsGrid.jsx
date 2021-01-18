import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core/";
import { MoonLoader } from "react-spinners";
import GameChoiceCard from "./GameChoiceCard";

const ResultsGrid = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameChoiceData, setGameChoiceData] = useState({});

    useEffect(() => {
        let steamids = props.match.params.steamids;
        let url = `${process.env.REACT_APP_HOST_URL}/v1/steam/GetPlayerSummaries/${steamids}`;

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                let promises = [];
                let playerProfiles = [];

                res.response.players.player.forEach((player) => {
                    playerProfiles.push(player);

                    promises.push(
                        fetch(
                            `${
                                process.env.REACT_APP_HOST_URL
                            }/v1/steam/GetOwnedGames/${
                                player.steamid
                            }&${true}&${true}`
                        )
                    );
                });

                promises.push(playerProfiles);
                return Promise.all(promises);
            })
            .then((results) => {
                let playerProfiles = results.pop();
                let promises = [];
                //iterate over promises
                results.forEach((result) => {
                    //still need to resolve all promises as we are using multiple fetch calls
                    promises.push(result.json());
                });

                promises.push(playerProfiles);
                return Promise.all(promises);
            })
            .then((results) => {
                let playerProfiles = results.pop();

                let ownedGames = [];
                let numGames = [];
                results.forEach((result) => {
                    ownedGames.push(result.response.games);
                    numGames.push(result.response.game_count);
                });

                //map profiles to game lists
                let userInfo = playerProfiles.map((profile, index) => {
                    return {
                        p: profile,
                        g: ownedGames[index],
                        n: numGames[index],
                    };
                });

                let gamesInCommon = ownedGames.shift().filter((toCompare) => {
                    return ownedGames.every((list) => {
                        return list.find(
                            (game) => game.appid === toCompare.appid
                        );
                    });
                });

                if (gamesInCommon.length < 1) {
                    throw new Error("Users had no games in common!");
                }

                var gameChoice =
                    gamesInCommon[
                        Math.floor(Math.random() * gamesInCommon.length)
                    ];

                let promises = [];

                promises.push(
                    fetch(
                        `${process.env.REACT_APP_HOST_URL}/v1/steam/GetAppDetails/${gameChoice.appid}`
                    )
                );
                promises.push(gamesInCommon);
                promises.push(gameChoice);
                promises.push(userInfo);

                return Promise.all(promises);
            })
            .then(([gameInfoResponse, userInfo, gameChoice, gamesInCommon]) => {
                let promises = [];

                promises.push(gameInfoResponse.json());
                promises.push(gameChoice);

                return Promise.all(promises);
            })
            .then(([gameInfo, gameChoice]) => {
                Object.keys(gameInfo).forEach((key) => {
                    let object = gameInfo[key];
                    gameInfo = object.data;
                });

                let background = gameInfo.background;
                if (background) {
                    background = background.substring(
                        0,
                        gameInfo.background.indexOf("?")
                    );
                }

                let movie = "";
                if (gameInfo.movies) {
                    movie = gameInfo.movies[0].webm["max"];
                }

                setGameChoiceData({
                    name: gameChoice.name,
                    desc: gameInfo.short_description,
                    steamid: gameInfo.steam_appid,
                    about: gameInfo.about_the_game,
                    movie: movie,
                    background: background,
                });
            });
    }, []);

    useEffect(() => {
        if (gameChoiceData.steamid) setIsLoading(false);
    }, [gameChoiceData]);

    const drawgameChoiceData = () => {
        return (
            <GameChoiceCard
                background={gameChoiceData.background}
                name={gameChoiceData.name}
                desc={gameChoiceData.desc}
                steamid={gameChoiceData.steamid}
                about={gameChoiceData.about}
                movie={gameChoiceData.movie}
            ></GameChoiceCard>
        );
    };

    return (
        <React.Fragment>
            <br></br>
            {isLoading ? (
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
                        {drawgameChoiceData()}
                    </Grid>
                </div>
            )}
        </React.Fragment>
    );
};

export default ResultsGrid;
