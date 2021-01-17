import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SteamInput from "./SteamInput";
import Typography from "@material-ui/core/Typography";

import GetSteamId from "./modules/GetSteamId.js";

const InputGrid = () => {
    const [canSubmit, setCanSubmit] = useState(false);
    const [inputs, setInputs] = useState([]);
    const numPlayers = useRef(0);
    const timeout = useRef(0);

    //can submit logic
    useEffect(() => {
        setCanSubmit(false);
        if (inputs.every((x) => x.isValid === true) && inputs.length > 1)
            setCanSubmit(true);
    }, [inputs]);

    const inputChanged = (inputData) => {
        //immediately send the new value back to the input
        let inputsCopy = [...inputs];
        let index = inputsCopy.findIndex((x) => x.id === inputData.id);
        inputsCopy[index].value = inputData.value;
        inputsCopy[index].isDirty = true;
        inputsCopy[index].isValid = false;
        setInputs(inputsCopy);

        if (timeout.current) clearTimeout(timeout.current);
        inputsCopy = [...inputs];
        timeout.current = setTimeout(() => {
            GetSteamId(inputData.value)
                .then((steamid) => {
                    inputsCopy[index] = {
                        id: inputData.id,
                        value: inputData.value,
                        isDirty: false,
                        isValid: true,
                        steamid: steamid,
                    };
                    setInputs(inputsCopy);
                })
                .catch(() => {
                    inputsCopy[index].isValid = false;
                    inputsCopy[index].isDirty = false;
                    setInputs(inputsCopy);
                });
        }, 800);
    };

    const addInput = () => {
        if (numPlayers.current < 8) {
            numPlayers.current = numPlayers.current + 1;
            setInputs([
                ...inputs,
                {
                    id: numPlayers.current,
                    value: "",
                    isDirty: false,
                    isValid: false,
                    steamid: 0,
                },
            ]);
        }
    };

    const removeInput = (id) => {
        const inputsCopy = [...inputs];
        let index = inputsCopy.findIndex((x) => x.id === id);
        inputsCopy.splice(index, 1);
        setInputs(inputsCopy);
    };

    const drawInputs = () => {
        return inputs.map((input, index) => {
            return (
                <React.Fragment key={index}>
                    <SteamInput
                        id={input.id}
                        value={input.value}
                        isDirty={input.isDirty}
                        isValid={input.isValid}
                        onInputChange={inputChanged}
                        removeInput={removeInput}
                    ></SteamInput>
                </React.Fragment>
            );
        });
    };

    return (
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ marginTop: "15px" }}
                spacing={3}
            >
                <Grid item xs={12}>
                    <Typography variant="h4">SteamGamePicker</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={addInput}>Add Player!</Button>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                style={{ marginTop: "15px" }}
                spacing={3}
            >
                {drawInputs()}
            </Grid>
            <Grid
                container
                alignItems="center"
                direction="column"
                style={{ marginTop: "15px" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!canSubmit}
                    href={`/results/${inputs.map((x) => x.steamid + ",")}`}
                >
                    Pick a Game!
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default InputGrid;
