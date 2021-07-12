// login.js

// Handles user login to portal

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {
  Button,
  Grid,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { auth } from '../components/firebase';

import axios from 'axios';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  login: {
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progess: {
    position: 'absolute',
  },
});

class login extends Component {
  constructor(props) {
    super(props);

    this.state = { headerReady: false };

    this.state = {
      email: '',
      password: '',
      errors: [],
      loginLoading: false,
    };

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      classification: '',
      major: '',
      netid: '',
      email: '',
      password: '',
      confirmPassword: '',
      resume: null,
      race: '',
      lgbt: false,
      disability: false,
      errors: [],
      signupLoading: false,
    };

    this.state = {
      email: '',
      message: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI != undefined) {
      if (nextProps.UI.errors) {
        this.setState({
          errors: nextProps.UI.errors,
        });
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleReset = () => {
    auth
      .sendPasswordResetEmail(this.state.email.toLowerCase())
      .then(() => {
        this.setState({
          message:
            'Check your email for a reset password link. You might need to check spam/junk.',
        });
      })
      .catch((err) =>
        this.setState({
          message: err.message,
        })
      );
  };

  handleFileChange = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    this.setState({ loginLoading: true });
    const memberData = {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    };
    axios
      .post(
        'https://us-central1-swe-utd-portal.cloudfunctions.net/api/login',
        memberData
      )
      .then((response) => {
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        this.setState({
          loginLoading: false,
        });
        this.props.history.push('/portal');
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
          loginLoading: false,
        });
      });
  };

  handleSignup = (event) => {
    event.preventDefault();
    this.setState({ signupLoading: true });
    if (this.state.major != 'Other') this.state.otherMajor = '';
    const newMemberData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      classification: this.state.classification,
      major: this.state.major,
      otherMajor: this.state.otherMajor,
      netid: this.state.netid.toLowerCase(),
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      race: this.state.race,
      lgbt: this.state.lgbt,
      disability: this.state.disability,
    };
    axios
      .post(
        'https://us-central1-swe-utd-portal.cloudfunctions.net/api/signup',
        newMemberData
      )
      .then((response) => {
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        this.setState({
          signupLoading: false,
        });
        this.props.history.push('/portal');
        // if SWE account not made copy code here
        if (this.state.resume != null) {
          this.handleResumeUpload();
        }
      })
      .catch((error) => {
        this.setState({
          errors: error.response,
          signupLoading: false,
        });
      });
  };

  handleResumeUpload() {
    let fileData = new FormData();
    console.log(this.state.resume);
    // Setting the 'image' field and the selected file
    fileData.set(
      'file',
      this.state.resume,
      `${this.state.resume.lastModified}-${this.state.resume.name}`
    );

    console.log(fileData);
    axios
      .post(
        'https://us-central1-swe-utd-portal.cloudfunctions.net/upload',
        fileData
      )
      .then((response) => {
        console.log('Resume Uploaded');
      })
      .catch((error) => {
        this.setState({
          errors: error.response,
          signupLoading: false,
        });
      });
  }

  // needed for header animation
  componentDidMount() {
    setTimeout(() => {
      this.setState({ headerReady: true });
    }, 0);
  }
  render() {
    const { headerReady } = this.state;
    const { classes } = this.props;
    const { errors, loginLoading, signupLoading } = this.state;
    return (
      <div>
        <NavBar />
        <div className={classNames('header', { ready: headerReady })}>
          <p className="heading">Access the Portal to View Your SWE Points</p>
        </div>
        <Container width="75%">
          <Grid
            container
            spacing={10}
            height="100%"
            width="80%"
            alignItems="stretch"
            justify="space-evenly"
          >
            <Grid item sm={6} xs={12}>
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <br />
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      //helperText={errors.email}
                      //error={errors.email ? true : false}
                      onChange={this.handleChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      //helperText={errors.password}
                      //error={errors.password ? true : false}
                      onChange={this.handleChange}
                    />
                    <Button
                      type="login"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.login}
                      onClick={this.handleLogin}
                      disabled={
                        loginLoading ||
                        !this.state.email ||
                        !this.state.password
                      }
                    >
                      Sign In
                      {loginLoading && (
                        <CircularProgress
                          size={30}
                          className={classes.progess}
                        />
                      )}
                    </Button>
                    {errors && errors.general && (
                      <Typography
                        variant="body2"
                        className={classes.customError}
                      >
                        {errors.general}
                      </Typography>
                    )}
                  </Grid>
                </form>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ marginTop: '20px' }}
                >
                  Forgot Password?
                </Typography>
                <form className={classes.form} noValidate>
                  <br />
                  <Grid container spacing={2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      //helperText={errors.email}
                      //error={errors.email ? true : false}
                      onChange={this.handleChange}
                    />
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.login}
                      onClick={this.handleReset}
                      disabled={loginLoading || !this.state.email}
                    >
                      Reset Password
                    </Button>
                  </Grid>
                  {this.state.message && (
                    <Typography variant="body2">
                      {this.state.message}
                    </Typography>
                  )}
                </form>
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <br />
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        //helperText={errors.firstName}
                        //error={errors.firstName ? true : false}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        //helperText={errors.lastName}
                        //error={errors.lastName ? true : false}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        //helperText={errors.phoneNumber}
                        //error={errors.phoneNumber ? true : false}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" required>
                        <InputLabel>Classification</InputLabel>
                        <Select
                          id="classification"
                          label="Classification"
                          name="classification"
                          autoComplete="classification"
                          //helperText={errors.classification}
                          //error={errors.classification ? true : false}
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
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="netid"
                        label="NetID"
                        name="netid"
                        autoComplete="netid"
                        //helperText={errors.netid}
                        //error={errors.netid ? true : false}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" required>
                        <InputLabel>Major</InputLabel>
                        <Select
                          id="major"
                          label="Major"
                          name="major"
                          autoComplete="major"
                          //helperText={errors.major}
                          //error={errors.major ? true : false}
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="otherMajor"
                        label="Other Major"
                        name="otherMajor"
                        autoComplete="otherMajor"
                        //helperText={errors.otherMajor}
                        //error={errors.otherMajor ? true : false}
                        onChange={this.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        //helperText={errors.email}
                        //error={errors.email ? true : false}
                        onChange={this.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                          <MenuItem value="Hispanic">
                            Hispanic or Latino
                          </MenuItem>
                          <MenuItem value="NativeHawaiian">
                            Native Hawaiian or Other Pacific Islander
                          </MenuItem>
                          <MenuItem value="White">White</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                    {/* <Grid item xs={12}>
											<p>Upload Resume (Optional):</p>
											<OutlinedInput
												fullWidth
												name="resume"
												label="Upload Resume"
												type="resume"
												id="resume"
												type="file"
												onChange={this.handleFileChange}
											/>
										</Grid> */}
                  </Grid>
                  <Button
                    type="signup"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.signup}
                    onClick={this.handleSignup}
                    disabled={
                      signupLoading ||
                      !this.state.email ||
                      !this.state.password ||
                      !this.state.confirmPassword || //?
                      !this.state.firstName ||
                      !this.state.lastName ||
                      !this.state.classification ||
                      !this.state.major ||
                      !this.state.netid ||
                      !this.state.phoneNumber
                    }
                  >
                    Sign Up
                    {signupLoading && (
                      <CircularProgress size={30} className={classes.progess} />
                    )}
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Container>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(login);
