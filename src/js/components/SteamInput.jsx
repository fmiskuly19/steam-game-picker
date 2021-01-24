import React from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
    InputAdornment,
} from "@material-ui/core";
import { Checkmark } from "react-checkmark";
import { PulseLoader } from "react-spinners";
import { IconContext } from "react-icons";
import { FaTimes, FaBan } from "react-icons/fa";
import GamepadTwoToneIcon from "@material-ui/icons/GamepadTwoTone";

const SteamInput = (props) => {
    const onInputChange = (e) => {
        props.onInputChange({ id: props.id, value: e.target.value });
    };
    const removeInput = () => {
        props.removeInput(props.id);
    };

    return (
        <React.Fragment key={props.key}>
            <Grid item xl={5} lg={5} md={7} sm={12} xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper style={{ padding: "15px" }}>
                            <TextField
                                id="input-with-icon-adornment"
                                value={props.value}
                                onChange={onInputChange}
                                placeholder="Steam Profile ID"
                                helperText={
                                    !props.isValid &&
                                    props.value &&
                                    !props.isDirty
                                        ? "Please enter a valid Steam ID"
                                        : null
                                }
                                error={
                                    !props.isValid &&
                                    props.value !== "" &&
                                    !props.isDirty
                                }
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GamepadTwoToneIcon></GamepadTwoToneIcon>
                                            {/* &nbsp;http://steamcommunity.com/id/ */}
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {props.isValid ? (
                                                <Checkmark
                                                    size={"medium"}
                                                ></Checkmark>
                                            ) : null}
                                            {props.isDirty ? (
                                                <PulseLoader
                                                    size={10}
                                                    color="#7AC142"
                                                ></PulseLoader>
                                            ) : null}
                                            {!props.isValid &&
                                            props.value !== "" &&
                                            !props.isDirty ? (
                                                <div style={{ color: "red" }}>
                                                    <FaBan size={20}></FaBan>
                                                </div>
                                            ) : null}
                                            &nbsp;
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </Paper>
                        <Button onClick={removeInput}>
                            remove player&nbsp;
                            <IconContext.Provider value={{ color: "red" }}>
                                <FaTimes></FaTimes>
                            </IconContext.Provider>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default SteamInput;
