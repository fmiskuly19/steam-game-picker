import React, { useState, useRef, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core/";
import SteamInput from "./SteamInput";
import GetSteamId from "../modules/api/GetSteamId";

const InputGrid = () => {
    const [canSubmit, setCanSubmit] = useState(false);
    const [inputStates, setInputStates] = useState([]);
    const numPlayers = useRef(0);
    const timeout = useRef(0);

    //can submit logic
    useEffect(() => {
        setCanSubmit(false);
        if (
            inputStates.every((x) => x.isValid === true) &&
            inputStates.length > 1
        )
            setCanSubmit(true);
    }, [inputStates]);

    const inputChanged = (inputData) => {
        //immediately send the new value back to the input
        let inputsCopy = [...inputStates];
        let index = inputsCopy.findIndex((x) => x.id === inputData.id);
        inputsCopy[index].value = inputData.value;
        inputsCopy[index].isDirty = true;
        inputsCopy[index].isValid = false;
        setInputStates(inputsCopy);

        if (timeout.current) clearTimeout(timeout.current);
        inputsCopy = [...inputStates];
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
                    setInputStates(inputsCopy);
                })
                .catch(() => {
                    inputsCopy[index].isValid = false;
                    inputsCopy[index].isDirty = false;
                    setInputStates(inputsCopy);
                });
        }, 800);
    };

    const addInput = () => {
        if (numPlayers.current < 8) {
            numPlayers.current = numPlayers.current + 1;
            setInputStates([
                ...inputStates,
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
        const inputsCopy = [...inputStates];
        let index = inputsCopy.findIndex((x) => x.id === id);
        inputsCopy.splice(index, 1);
        setInputStates(inputsCopy);
        numPlayers.current--;
    };

    const drawInputs = () => {
        return inputStates.map((input, index) => {
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
                    href={`/results/${inputStates.map((x) => x.steamid)}`}
                >
                    Pick a Game!
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default InputGrid;
