const GetSteamId = (input) => {
    let url = `${process.env.REACT_APP_HOST_URL}/v1/steam/resolveVanityURL/${input}`;
    return new Promise((resolve, reject) =>
        fetch(url)
            .then((res) => res.json()) //convert
            .then((res) => {
                let statusCode = res.response.success;

                //status code = 1 = it was successful
                if (statusCode !== 1) {
                    reject(0);
                } else {
                    resolve(res.response.steamid);
                }
            })
            .catch(reject)
    );
};

export default GetSteamId;
