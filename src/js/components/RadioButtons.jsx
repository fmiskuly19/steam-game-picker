import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function RadioButtons(props) {
    const [selectedValue, setSelectedValue] = React.useState("d");

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        props.onChange(e.target.value);
    };

    return (
        <RadioGroup onChange={handleChange}>
            <Paper style={{ padding: "10px" }}>
                <Grid container direction="row">
                    <FormControlLabel
                        style={{ marginLeft: "10px" }}
                        label="From Friends List"
                        labelPlacement="start"
                        control={
                            <Radio
                                checked={selectedValue === "a"}
                                value="a"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Add Manually"
                        labelPlacement="start"
                        control={
                            <Radio
                                checked={selectedValue === "b"}
                                value="b"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "B" }}
                            />
                        }
                    />
                    <FormControlLabel
                        style={{ marginRight: "10px" }}
                        label="Goin' Solo!"
                        labelPlacement="start"
                        control={
                            <Radio
                                checked={selectedValue === "c"}
                                value="c"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "C" }}
                            />
                        }
                    />
                </Grid>
            </Paper>
        </RadioGroup>
    );
}
