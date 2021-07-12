// account.js

// component containing user's account data, with option to edit

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import axios from 'axios';
import { authMiddleWare } from '../util/auth';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: {},
  details: {
    display: 'flex',
  },
  locationText: {
    paddingLeft: '15px',
  },
  buttonProperty: {
    position: 'absolute',
    top: '50%',
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  progess: {
    position: 'absolute',
  },
  uploadButton: {
    marginLeft: '8px',
    margin: theme.spacing(1),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  submitButton: {
    marginTop: '10px',
  },
});

class account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      netid: '',
      classification: '',
      major: '',
      otherMajor: '',
      uiLoading: true,
      buttonLoading: false,
      imageError: '',
      showAlum: false,
      alumDesc: '',
      race: '',
      lgbt: false,
      disability: false,
    };
  }

  // makes sure user is logged in
  componentWillMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('https://us-central1-swe-utd-portal.cloudfunctions.net/api/member')
      .then((response) => {
        this.setState({
          firstName: response.data.memberInfo.firstName,
          lastName: response.data.memberInfo.lastName,
          email: response.data.memberInfo.email,
          phoneNumber: response.data.memberInfo.phoneNumber,
          classification: response.data.memberInfo.classification,
          major: response.data.memberInfo.major,
          otherMajor: response.data.memberInfo.otherMajor,
          netid: response.data.memberInfo.netid,
          showAlum: response.data.memberInfo.showAlum || false,
          alumDesc: response.data.memberInfo.alumDesc || '',
          uiLoading: false,
          race: response.data.memberInfo.race || 'N/A',
          lgbt: response.data.memberInfo.lgbt || false,
          disability: response.data.disability || false,
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({ errorMsg: 'Error in retrieving the data' });
      });
  };

  // function for handling when a field is modified
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value || event.target.checked,
    });
  };

  // updates user in the database with modified information
  updateFormValues = (event) => {
    event.preventDefault();
    this.setState({ buttonLoading: true });
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    if (this.state.major !== 'Other') this.state.otherMajor = '';
    const formRequest = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      classification: this.state.classification,
      major: this.state.major,
      otherMajor: this.state.otherMajor,
      phoneNumber: this.state.phoneNumber,
      showAlum: this.state.showAlum,
      alumDesc: this.state.alumDesc,
      race: this.state.race,
      lgbt: this.state.lgbt,
      disability: this.state.disability,
    };

    axios
      .post(
        'https://us-central1-swe-utd-portal.cloudfunctions.net/api/member',
        formRequest
      )
      .then(() => {
        this.setState({ buttonLoading: false });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({
          buttonLoading: false,
        });
      });
  };

  render() {
    const { classes } = this.props;
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
          <Card
            className={classes.root}
            className="movingItem"
            variant="outlined"
          >
            <CardContent>
              <div className={classes.details}>
                <div>
                  <br />
                  <h1>
                    {this.state.firstName} {this.state.lastName}
                  </h1>
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
          </Card>
          <br />
          <Card
            className={classes.root}
            className="movingItem"
            variant="outlined"
          >
            <CardContent>
              <div className={classes.details}>
                <div>
                  <br />
                  <h1>Upload Resume Here</h1>
                  <br />
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => {
                      const url = 'https://forms.gle/62h6cNTnVyJ8JhVbA';
                      window.open(url, '_blank');
                    }}
                  >
                    Upload
                  </Button>
                  <br />
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
          </Card>
          <br />
          <Card
            className={classes.root}
            className="movingItem"
            variant="outlined"
          >
            <form autoComplete="off" noValidate>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="First name"
                      margin="dense"
                      name="firstName"
                      variant="outlined"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      margin="dense"
                      name="lastName"
                      variant="outlined"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      margin="dense"
                      name="email"
                      variant="outlined"
                      disabled={true}
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      margin="dense"
                      name="phone"
                      type="number"
                      variant="outlined"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="NetID"
                      margin="dense"
                      name="NetID"
                      disabled={true}
                      variant="outlined"
                      value={this.state.netid}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                      <InputLabel>Classification</InputLabel>
                      <Select
                        label="Classification"
                        name="classification"
                        value={this.state.classification}
                        onChange={this.handleChange}
                      >
                        <MenuItem selected value="Freshman">
                          Freshman
                        </MenuItem>
                        <MenuItem value="Sophomore">Sophomore</MenuItem>
                        <MenuItem value="Junior">Junior</MenuItem>
                        <MenuItem value="Senior">Senior</MenuItem>
                        <MenuItem value="Graduate Student">
                          Graduate Student
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                      <InputLabel>Major</InputLabel>
                      <Select
                        label="Major"
                        name="major"
                        value={this.state.major}
                        onChange={this.handleChange}
                      >
                        <MenuItem selected value="Biomedical Engineering">
                          Biomedical Engineering
                        </MenuItem>
                        <MenuItem value="Computer Engineering">
                          Computer Engineering
                        </MenuItem>
                        <MenuItem value="Computer Science">
                          Computer Science
                        </MenuItem>
                        <MenuItem value="Electrical Engineering">
                          Electrical Engineering
                        </MenuItem>
                        <MenuItem value="Mechanical Engineering">
                          Mechanical Engineering
                        </MenuItem>
                        <MenuItem value="Software Engineering">
                          Software Engineering
                        </MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Other Major"
                      margin="dense"
                      name="otherMajor"
                      variant="outlined"
                      value={this.state.otherMajor}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                      <InputLabel>Race/Ethnicity</InputLabel>
                      <Select
                        label="Race"
                        name="race"
                        value={this.state.race}
                        onChange={this.handleChange}
                      >
                        <MenuItem selected value="N/A">
                          I do not wish to provide this information
                        </MenuItem>
                        <MenuItem value="AmericanIndian">
                          American Indian or Alaska Native
                        </MenuItem>
                        <MenuItem value="Asian">Asian</MenuItem>
                        <MenuItem value="Black">
                          Black or African American
                        </MenuItem>
                        <MenuItem value="Hispanic">Hispanic or Latino</MenuItem>
                        <MenuItem value="NativeHawaiian">
                          Native Hawaiian or Other Pacific Islander
                        </MenuItem>
                        <MenuItem value="White">White</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.lgbt}
                          onChange={this.handleChange}
                          name="lgbt"
                          color="primary"
                        />
                      }
                      label="I identify as LGBT+"
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.disability}
                          onChange={this.handleChange}
                          name="disability"
                          color="primary"
                        />
                      }
                      label="I have a disability"
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.showAlum}
                          onChange={this.handleChange}
                          name="showAlum"
                          color="primary"
                        />
                      }
                      label="Show on Member List"
                    />
                  </Grid>
                  {this.state.showAlum && (
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        margin="dense"
                        helperText="This along with your name will show on the member list. Feel free to add any information such as graduate year, current company, and ways to contact you."
                        name="alumDesc"
                        variant="outlined"
                        value={this.state.alumDesc}
                        onChange={this.handleChange}
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
              <CardActions />
            </form>
          </Card>
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submitButton}
            className="movingItem"
            onClick={this.updateFormValues}
            disabled={
              this.state.buttonLoading ||
              !this.state.firstName ||
              !this.state.lastName ||
              !this.state.classification ||
              !this.state.major ||
              !this.state.phoneNumber
            }
          >
            Save details
            {this.state.buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
        </main>
      );
    }
  }
}

export default withStyles(styles)(account);
