// portal.js

// page controlling what a user sees on the portal page

import React, { Component } from 'react';
import axios from 'axios';

import Account from '../components/account';
import Event from '../components/event';
import Recordings from '../components/recordings';

import { Box, CircularProgress, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';

// Icons
import AccountBoxIcon from '@material-ui/icons/Notes';
import NotesIcon from '@material-ui/icons/Notes';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavBar from '../components/navbar'

import { authMiddleWare } from '../util/auth'

const drawerWidth = "20%";

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
});

function Screen(props) {
	const screen = props.screen;
	if (screen === "account") {
	  return <Account />;
	}
	else if (screen === "event") {
		return <Event />
	}
	else if (screen === "recordings") {
		return <Recordings />
	}
	return <Event />
}

class portal extends Component {
	state = {
		render: "event"
	};

	loadAccountPage = (event) => {
		this.setState({ render: "account" });
	};

	loadEventPage = (event) => {
		this.setState({ render: "event" });
	};

	loadRecordings = (event) => {
		this.setState({ render: "recordings" });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		this.props.history.push('/login');
	};

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			uiLoading: true,
			imageLoading: false
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('https://us-central1-swe-utd-portal.cloudfunctions.net/api/member')
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
					uiLoading: false,
				});
			})
			.catch((error) => {
				if(error.response != undefined)
				{
					if(error.response.status === 403) {
						this.props.history.push('/login')
					}
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

	render() {
		const { classes } = this.props;		
		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<Toolbar position = 'fixed' className={classes.appBar}>
						<NavBar/>
					</Toolbar>
					<Drawer
						className={classes.drawer}
						variant="permanent"
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.toolbar} />
						<Divider />
						<br />
       					<center width="drawerWidth">
							<p>
								{this.state.firstName} {this.state.lastName}
							</p>
						</center>
						<Divider />
						
						<List width="drawerWidth">
							<ListItem button key="Points" onClick={this.loadEventPage} width="drawerWidth">
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Points" />
							</ListItem>

							<ListItem button key="Account" onClick={this.loadAccountPage}>
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>

							<ListItem button key="Recordings" onClick={this.loadRecordings}>
								<ListItemIcon>
									{' '}
									<VideoLibrary />{' '}
								</ListItemIcon>
								<ListItemText primary="Recordings" />
							</ListItem>

							<ListItem button key="Logout" onClick={this.logoutHandler}>
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Drawer>
					<div>
						<Screen screen={this.state.render}/>
					</div>
				</div>
				
			);
		}
	}
}

export default withStyles(styles)(portal);