import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core/";
import { MoonLoader } from "react-spinners";
import GameChoiceCard from "./GameChoiceCard";
import GetGameChoice from "../modules/GetGameChoice";

const ResultsGrid = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameChoiceData, setGameChoiceData] = useState({});

    useEffect(() => {
        let ids = props.match.params.steamids;
        let steamids = ids.split(",");

        GetGameChoice(steamids)
            .then((gameChoice) => {
                setGameChoiceData({
                    name: gameChoice.name,
                    desc: gameChoice.short_description,
                    steamid: gameChoice.steam_appid,
                    about: gameChoice.about_the_game,
                    movie: gameChoice.movies
                        ? gameChoice.movies[0].webm?.max
                        : null,
                    background: gameChoice.background,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.steamids]);

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
        <div>
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
        </div>
    );
};

export default ResultsGrid;
