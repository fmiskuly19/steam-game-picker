import GetAppDetail from "./api/GetAppDetail";
import GameDetail from "./interfaces/GameDetail";
import OwnedGame from "./interfaces/OwnedGame";

const GetMultiplayerGameRecursive = (
    appids: OwnedGame[]
): Promise<GameDetail> => {
    const next = appids[Math.floor(Math.random() * appids.length)];
    return GetAppDetail(next.appid)
        .then((result) => {
            if (
                result.data?.categories?.some((x) =>
                    x.description.toLocaleLowerCase().includes("multi")
                )
            ) {
                return Promise.resolve(result.data);
            } else {
                return GetMultiplayerGameRecursive(appids);
            }
        })
        .catch((err) => Promise.reject(err));
};

export default GetMultiplayerGameRecursive;
