import OwnedGame from "../interfaces/OwnedGame";

const target = "/v1/steam/GetOwnedGames/";
const includeFreeGames = true;
const includeAppInfo = false;

interface OwnedGamesResponse {
    response: {
        game_count: number;
        games: OwnedGame[];
    };
}

const GetOwnedGames = (steamid: number) => {
    return fetch(
        `${process.env.REACT_APP_HOST_URL}${target}${steamid}&${includeAppInfo}&${includeFreeGames}`
    )
        .then((response: Response) => {
            if (response.ok) return response.json();
            else
                return Promise.reject(
                    `Couldnt get owned games for user ${steamid}`
                );
        })
        .then((result: OwnedGamesResponse) => {
            //steam api returns an empty object instead of a bad result
            if (Object.keys(result.response).length > 0) {
                return Promise.resolve(result.response.games);
            } else
                return Promise.reject(
                    `Couldnt get owned games for user ${steamid}`
                );
        })
        .catch(() =>
            Promise.reject(`Couldnt get owned games for user ${steamid}`)
        );
};

export default GetOwnedGames;
