import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item lg={8}>
      <Card>
        <CardMedia>
          {props.movie !== "" ? (
            <video controls style={{ maxWidth: "100%", maxHeight: "100%" }}>
              <source src={props.movie} type="video/webm" />>
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
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button variant="contained" href={"steam://" + props.steamid}>
            Play
          </Button>
          <Tooltip title="Learn more" placement="top-end">
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
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
}
