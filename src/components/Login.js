import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Input } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import firebase from "./../firebase";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing(1)
  },
  box: {
    marginLeft: "50px",
    marginRight: "auto",
    border: "2px solid black"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
class Login extends React.Component {
  state = {
    empname: "",
    password: "",
    userExists: false,
    userIsAdmin: false,
    doc: {}
  };

  handleCheck = () => {
    var that = this;
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().empname == that.state.empname) {
            if (doc.data().password === that.state.password) {
              that.setState(
                {
                  userExists: true,
                  doc: doc.data()
                },
                () => {
                  console.log(this.state);
                }
              );
            }
          }
        });
      });
    db.collection("admin")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().Admin == that.state.empname) {
            if (doc.data().Password === that.state.password) {
              that.setState(
                {
                  userIsAdmin: true
                },
                () => {
                  console.log(this.state);
                }
              );
            }
          }
        });
      });
    setTimeout(() => {
      if (this.state.userExists) {
        this.props.history.push("/user/dashboard", this.state.empname);
      } else if (this.state.userIsAdmin) {
        this.props.history.push("/admin/dashboard", this.state.empname);
      } else {
        console.log("Neither an user nor an admin");
      }
    }, 3000);
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { empname, password } = this.state;

    return (
      <div>
        <input
          type="text"
          name="empname"
          placeholder="EmployeeName"
          value={empname}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleCheck}>Log In</button>
      </div>
    );
  }
}

export default Login;
/**const handleCheck = () => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().empname == values.empname) {
            if (doc.data().password === values.password) {
              setValues({ ...values, userExists: true });
              console.log(doc);
            }
          }
        });
      });
    if (values.userExists) {
      this.props.history.push("/dashboard");
    }
  }; */
