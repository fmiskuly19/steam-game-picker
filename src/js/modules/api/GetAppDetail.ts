import GameDetail from "../interfaces/GameDetail";

const target = "/v1/steam/GetAppDetails/";

interface AppDetailResponse {
    [appid: number]: AppDetailResult;
}

interface AppDetailResult {
    success: boolean;
    data: GameDetail;
}

const GetAppDetail = (appid: number): Promise<AppDetailResult> => {
    return fetch(`${process.env.REACT_APP_HOST_URL}${target}${appid}`)
        .then((response: Response) => {
            if (response.ok) return response.json();
            else
                return Promise.reject(
                    `Couldnt get app details for game: ${appid}`
                );
        })
        .then((result: AppDetailResponse) => {
            return Promise.resolve(result[appid]);
        })
        .catch((err) =>
            Promise.reject(
                `Couldnt get app details for game: ${appid}. Error: ${err}`
            )
        );
};

export default GetAppDetail;
