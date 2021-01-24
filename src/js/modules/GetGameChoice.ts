import GetOwnedGames from "./api/GetOwnedGames";
import OwnedGame from "./interfaces/OwnedGame";
import GetMultiplayerGameRecursive from "./GetMultiplayerGameRecursive";

const GetGameChoice = (steamids: number[]) => {
    let gamesPromises: Promise<OwnedGame[]>[] = [];
    steamids.forEach((id) => {
        gamesPromises.push(GetOwnedGames(id));
    });

    return Promise.all(gamesPromises)
        .then((ownedGames) => {
            let gamesInCommon: OwnedGame[] = [
                ...new Map(
                    ownedGames
                        .flat()
                        .map((ownedGame: OwnedGame) => [
                            ownedGame.appid,
                            ownedGame,
                        ])
                ).values(),
            ];

            return GetMultiplayerGameRecursive(gamesInCommon);
        })
        .catch((err) => Promise.reject(err));
};

export default GetGameChoice;
