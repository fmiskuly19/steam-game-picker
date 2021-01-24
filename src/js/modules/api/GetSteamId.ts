const target = "/v1/steam/resolveVanityURL/";

interface VanityUrlResponse {
    response: VanityUrl;
}

interface VanityUrl {
    steamid: number;
    success: number;
}

const GetSteamId = (input: string) => {
    return fetch(`${process.env.REACT_APP_HOST_URL}${target}${input}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(
                    `Could not resolve vanityUrl for input: ${input}`
                );
            }
        })
        .then((result: VanityUrlResponse) => {
            if (result.response.success === 1) {
                return Promise.resolve(result.response.steamid);
            } else {
                return Promise.reject(
                    `Could not resolve vanityUrl for input: ${input}`
                );
            }
        })
        .catch((err) =>
            Promise.reject(
                `Could not resolve vanityUrl for input: ${input}. Error: ${err}`
            )
        );
};

export default GetSteamId;
