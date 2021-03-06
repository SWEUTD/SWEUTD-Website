// swecrets.js

// component for displaying exclusive resources for SWEsters

// goals for improvement: 
// allow users to upload resources directly from website instead of google forms
// have document viewer so users can view document in same window, improve design of buttons

import React, { Component } from "react";
import Collapsible from 'react-collapsible';

import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardContent,
  CircularProgress,
  Button,
  ButtonGroup,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import { authMiddleWare } from "../util/auth";

import Referrals from "../components/referrals";
import Interview from "../components/interviewQs";
import Resources from "../components/resources";
import Recruit from "../components/recruiters";

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
  body: {
    display: "flex",
  },
  linkBtns: {
    borderRadius: "10px",
    flexDirection: "row",
    margin: "20px",
  },
  iconImg: {
    width: "100px",
    padding: "10px",
  },
  box: {
    display: "inline-block",
    margin: "20px",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    boxShadow: "0 2px 2px #eee",
  },
});

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
      currentSection: "",
      uiLoading: true,
      buttonLoading: false,
      imageError: "",
      height: 0
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
          currentSection: "Resources",
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
    const { currentSection } = this.state;
    const sectionList = [
        "Resources",
        "Referrals",
        "Interview Questions",
        "Recruiters"
    ];

    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
      );
    } else {
      return (
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
                  <h1>SWEcrets</h1>
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
                <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                    fullWidth="true"
                    orientation={window.innerWidth < 900 ? "vertical" : "horizontal"}
                >
                    {sectionList.map((sectionName) => (
                    <Button
                        size="large"
                        variant={
                        sectionName === currentSection
                            ? "contained"
                            : "outlined"
                        } 
                        onClick={() =>
                        this.setState({
                            ...this.state,
                            currentSection: sectionName,
                        })
                        }
                    >
                        {sectionName}
                    </Button>
                    ))}
                </ButtonGroup>
              </div>
              <div className={classes.progress} />
            </CardContent>
          </Card>
          <br />
            {(() => {
              switch (this.state.currentSection) {
                case "Referrals": return <Referrals />;
                case "Interview Questions": return <Interview />;
                case "Resources": return <Resources />;
                case "Recruiters": return <Recruit />;
                default: return null;
              }
            })()}
          <br />
        </main>
      );
    }
  }
}

export default withStyles(styles)(event);
