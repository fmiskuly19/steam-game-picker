import PlayerSummary from "../interfaces/PlayerSummary";

const target = "/v1/steam/GetPlayerSummaries/";

interface PlayerSummaryResponse {
    response: {
        players: {
            player: PlayerSummary[];
        };
    };
}

const GetPlayerSummaries = (steamids: number[]): Promise<PlayerSummary[]> => {
    return fetch(`${process.env.REACT_APP_HOST_URL}${target}${steamids}`)
        .then((response) => {
            if (response.ok) return response.json();
            else return Promise.reject(`Couldnt get player summary for user`);
        })
        .then((result: PlayerSummaryResponse) => {
            return Promise.resolve(result.response.players.player);
        })
        .catch(() => Promise.reject(`Couldnt get player summary for user`));
};

export default GetPlayerSummaries;
