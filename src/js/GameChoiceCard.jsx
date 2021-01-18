import React, { useState } from "react";
import clsx from "clsx";
import {
    Card,
    Grid,
    Button,
    Tooltip,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Typography,
    IconButton,
    makeStyles,
    Divider,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    divider: {
        marginLeft: "10px",
        marginRight: "10px",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
}));

const GameChoiceCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item lg={8}>
            <Card>
                <CardMedia>
                    {props.movie !== "" ? (
                        <video
                            controls
                            autoPlay
                            muted
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                minWidth: "100%",
                                minHeight: "100%",
                            }}
                        >
                            <source src={props.movie} type="video/webm" />
                        </video>
                    ) : (
                        <img
                            src={props.background}
                            alt="background"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        ></img>
                    )}
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        You Should Play: {props.name}!
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {props.desc}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        variant="contained"
                        color="primary"
                        href={"steam://run/" + props.steamid}
                    >
                        Play!
                    </Button>
                    &nbsp;
                    <Button
                        variant="contained"
                        color="secondary"
                        href={
                            "https://store.steampowered.com/app/" +
                            props.steamid
                        }
                    >
                        View on Steam store
                    </Button>
                    <Tooltip title="Learn more" placement="top-end">
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto">
                    <Divider className={classes.divider} />
                    <CardContent>
                        {/* this is not good but it is the only solution I have found that works (its called dangerously insert for a reason)*/}

                        <Typography
                            dangerouslySetInnerHTML={{ __html: props.about }}
                        ></Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
};

export default GameChoiceCard;
