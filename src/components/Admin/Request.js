import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import firebase from "./../../firebase";
export default class Request extends React.Component {
  state = {
    values: []
  };
  componentDidMount() {
    const db = firebase.firestore();
    var that = this;
    var list = [];
    db.collection("admin")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().Admin != this.props.data.state)
            list = list.concat(doc);
        });
        that.setState({
          values: list
        });
      });

    setTimeout(() => {
      console.log(this.state.values);
    }, 5000);
  }

  accept = id => {
    const db = firebase.firestore();
    // db.collection("").doc()
  };
  render() {
    return (
      <div>
        {this.state.values.map((item, index) => {
          return (
            <div>
              <List style={{ width: "100%" }}>
                <ListItem>
                  <ListItemText
                    primary={`${item.data().name}`}
                    secondary={
                      <div>
                        {item.data().subject} {item.data().description}
                      </div>
                    }
                  />
                </ListItem>
              </List>
              <Check onClick={() => this.accept(item.id)} />
              <Clear onClick={() => this.reject(item.id)} />
              <Divider />
            </div>
          );
        })}
      </div>
    );
  }
}
