import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import firebase from "./../firebase";
const styles = {
  modal: {
    background: "white"
  },
  paper: {
    border: "2px solid white"
  }
};
export default class UserDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      subject: "",
      description: "",
      date: ""
    };
    console.log(this.props.data);
  }

  openModal = date => {
    this.setState({
      open: true,
      date: date
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  request = date => {
    var that = this;
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().empname === this.props.data.state) {
            db.collection("users")
              .doc(doc.id)
              .collection("reasons")
              .add({
                subject: that.state.subject,
                description: that.state.description,
                date: that.state.date,
                name: this.props.data.state
              });
          }
        });
      });
    db.collection("admin").add({
      subject: that.state.subject,
      description: that.state.description,
      date: that.state.date,
      name: this.props.data.state
    });
    this.handleClose();
  };
  render() {
    var array = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30
    ];
    return (
      <div style={{ display: "flex", flex: "1" }}>
        <Grid container spacing={2}>
          {array.map((item, index) => {
            return (
              <Grid item xs={3}>
                <Button color="primary" onClick={() => this.openModal(item)}>
                  {item}
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div style={{ backgroundColor: "blue", width: "460px" }}>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={this.state.subject}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="description"
                      name="description"
                      placeholder="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                    <button onClick={() => this.request()}>Request</button>
                  </div>
                </Modal>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}
