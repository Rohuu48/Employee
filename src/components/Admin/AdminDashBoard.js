import React from "react";
import Request from "./Request";
import Create from "./Create";
import { ListItem, ListItemText, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  /*  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",

    color: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "blue"
    },
    "&:select": {
      backgroundColor: "yellow"
    }
  },
  drawerPaper: {
    display: "block",
    height: "50rem",

    backgroundSize: "cover",
    border: "none",
    opacity: "0.7",

    width: "50px",

    "&,&:hover": {
      color: "black"
    }
  }*/
});

export default function DashBoard(props) {
  const classes = useStyles();
  const [component, setComponent] = React.useState("Request");
  const handleClick = text => {
    setComponent(`${text}`);
  };
  console.log(props.location);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        // className={classes.drawerPaper}
        style={{
          backgroundSize: "cover"
        }}
        role="presentation"
      >
        <List>
          {["Request", "Create"].map((text, index) => (
            <ListItem
              // className={classes.itemLink}
              button
              key={text}
              onClick={() => handleClick(text)}
            >
              <ListItemText
                primary={text}
                onClick={() => {
                  // check(text);
                  console.log("HMMM");
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>{" "}
      <div>
        {component === "Request" ? (
          <Request data={props.location} />
        ) : component === "Create" ? (
          <Create />
        ) : null}
      </div>
    </div>
  );
}
