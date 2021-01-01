// resources.js

// component for displaying exclusive resources for SWEsters

import React, { Component } from "react";
import Faq from 'react-faq-component';

import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import { authMiddleWare } from "../util/auth";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  details: {
    display: "flex",
  },
  locationText: {
    paddingLeft: "15px",
  },
  gridItem: {
    display: "flex",
    width: "100%",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  },
  buttonProperty: {
    position: "absolute",
    top: "50%",
  },
  uiProgess: {
    position: "fixed",
    zIndex: "1000",
    height: "31px",
    width: "31px",
    left: "50%",
    top: "35%",
  },
  progess: {
    position: "absolute",
  },
  uploadButton: {
    marginLeft: "8px",
    margin: theme.spacing(1),
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  submitButton: {
    marginTop: "10px",
  },
});

const data = {
  title: "FAQ (How it works)",
  rows: [
    {
      title: "Lorem ipsum dolor sit amet,",
      content: "Lorem ipsum dolor sit amet, consectetur "
    },
    {
      title: "Nunc maximus, magna at ultricies elementum",
      content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam."
    },
    {
      title: "Curabitur laoreet, mauris vel blandit fringilla",
      content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc"
    },
    {
      title: "What is the package version",
      content: "v1.0.5"
    }]
}

class event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      netid: "",
      classification: "",
      major: "",
      otherMajor: "",
      events: [],
      points: 0,
      previousPoints: [],
      uiLoading: true,
      buttonLoading: false,
      imageError: "",
    };
  }

  // makes sure user is logged in
  componentWillMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("https://us-central1-swe-utd-portal.cloudfunctions.net/api/member")
      .then((response) => {
        console.log(response.data);
        this.setState({
          firstName: response.data.memberInfo.firstName,
          lastName: response.data.memberInfo.lastName,
          email: response.data.memberInfo.email,
          phoneNumber: response.data.memberInfo.phoneNumber,
          classification: response.data.memberInfo.classification,
          major: response.data.memberInfo.major,
          otherMajor: response.data.memberInfo.otherMajor,
          netid: response.data.memberInfo.netid,
          events: response.data.memberInfo.events,
          points: response.data.memberInfo.points,
          previousPoints: response.data.memberInfo.previousPoints || [],
          uiLoading: false,
        });
      })
      .catch((error) => {
        if (error.response !== undefined) {
          if (error.response.status === 403) {
            this.props.history.push("/login");
          }
        }
        console.log(error);
        this.setState({ errorMsg: "Error in retrieving the data" });
      });
  };

  render() {
    
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <br />
        <Faq data={data}/>
      </main>
      </div>
      );
    } else {
      return (
        <div>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <br />
          <Card
            className={classes.details}
            className="movingItem"
            variant="outlined"
          >
            <CardContent>
              <div className={classes.details}>
                <div>
                  <br />
                  <h1>Resources</h1>
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
          </Card>
          <br />
          <Card
            className={classes.details}
            className="movingItem"
            variant="outlined"
          >
            <CardContent>
              <div className={classes.details}>
                <div>
                  <br />
                  <h5>Question question question question question?</h5>
                  <p>Quis amet tempor magna mollit ad voluptate exercitation magna duis ea. 
                    Pariatur ea qui nisi aliquip laboris consectetur consequat consectetur laboris. 
                    Pariatur anim eiusmod deserunt ad consequat eu. Adipisicing proident id nulla et et labore sunt anim esse pariatur ea. 
                    Fugiat enim ea mollit nostrud esse anim ut ipsum est. Veniam aute aute pariatur est. 
                    Qui mollit excepteur nisi est tempor voluptate.</p>
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
          </Card>
        </main>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <br />
        <Faq data={data}/>
      </main>
      </div>
      );
    }
  }
}

export default withStyles(styles)(event);
