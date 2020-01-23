import React from "react";
import firebase from "./../../firebase";
export default class Create extends React.Component {
  state = {
    empname: "",
    password: ""
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  create = () => {
    const db = firebase.firestore();
    var that = this;
    db.collection("users").add({
      empname: that.state.empname,
      password: that.state.password
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Employee"
          value={this.state.empname}
          name="empname"
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          name="password"
          onChange={this.handleInputChange}
        />
        <button onClick={this.create}>Create</button>
      </div>
    );
  }
}
