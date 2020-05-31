import React, { Component } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import NavBar from '../components/navbar'

const styles = (theme) => ({
	root:  {
		flexGrow: 1
	},
	gridItem: {
		display: 'flex',
	},
	card: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		width:'100%'
	}
});

class join extends Component {
	// needed for header animation
    constructor(props) {
        super(props);
        this.state = { headerReady: false };
      }
      componentDidMount() {
        setTimeout(() => {
          this.setState({ headerReady: true });
        }, 0);
    }
    render() {
        const { headerReady } = this.state;
		const { classes } = this.props;
		return (
			<div>
				<NavBar />
				<div className={classNames('header', { 'ready': headerReady })}>
		            <p className="heading">Become a Member</p>
                </div>
				<div className="fullscreen">
				<Grid container>
					<Grid xs={12} md={6} className={classes.gridItem}>
						<Grid container
							spacing={2}
							height="100%"
							width="100%"
							alignItems="stretch"
							justify="space-evenly"
							className={classes.gridItem}
							style={{padding:'40px',backgroundColor:"#DBC554"}}
						>
							<Grid item xs={12} className={classes.gridItem}>
									<Card style={{width:'100%'}} className="movingItem" variant="outlined">
										<CardContent align="center" fullWidth>
											<h1>Chapter Membership</h1>	
									<br/>
									<Divider/>
									<br/>
											<h5>Click <a href="/portal">here</a> to visit the member portal and create an account with UTD SWE</h5>
										</CardContent>
									</Card>
							</Grid>
							<Grid item sm={6} xs={12} className={classes.gridItem}>
								<Card style={{verticalAlign: 'top',height:'100%', width:'100%'}} className="movingItem" variant="outlined">
									<CardContent>
										<h5 align="left">Membership Benefits:</h5>
											<List dense="true" align="center">
												<ListItem>Company Tours</ListItem>
												<ListItem>Outreach</ListItem>
												<ListItem>Socials/Gatherings</ListItem>
												<ListItem>SWE Conference</ListItem>
												<ListItem>Networking</ListItem>
												<ListItem>Workshops</ListItem>
												<ListItem>Tech Talks</ListItem>
												<ListItem>Meeting some awesome women in STEM!</ListItem>
											</List>
									</CardContent>
								</Card>
							</Grid>
							<Grid item sm={6} xs={12} className={classes.gridItem}>
								<Card style={{verticalAlign: 'top',height:'100%', width:'100%'}} className="movingItem" variant="outlined">
									<CardContent>
										<h5 align="left">Membership Costs:</h5>
										<List dense="true" align="center">
											<ListItem>None!</ListItem>
										</List>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
					<Grid xs={12} md={6}>
						<Grid container
							spacing={2}
							height="100%"
							width="100%"
							alignItems="stretch"
							justify="space-evenly"
							className={classes.gridItem}
							style={{padding:'40px',backgroundColor:"#A9A8A9"}}
						>
							<Grid item xs={12} align="center" className={classes.gridItem}>
									<Card style={{width:'100%'}} className="movingItem" variant="outlined">
										<CardContent align="center" fullWidth>
											<h1>National Membership</h1>	
									<br/>
									<Divider/>
									<br/>
											<h5>Click <a href="swe.org/join">here</a> to become a member of the National SWE Organization</h5>
										</CardContent>
									</Card>
							</Grid>
							<Grid item sm={6} xs={12} className={classes.gridItem}>
								<Card style={{width:'100%'}} className="movingItem" variant="outlined">
									<CardContent align="center">
										<h5 align="left">Membership Benefits:</h5>
											<List dense="true" align="center">
												<ListItem>Eligibility for scholarships</ListItem>
												<ListItem>Access to the SWE Career Center</ListItem>
												<ListItem>Networking opportunities with practicing women engineers and other collegiates</ListItem>
												<ListItem>SWE Annual and Regional Conferences</ListItem>
												<ListItem>Annual subscription to the award-winning SWE Magazine</ListItem>
											</List>
									</CardContent>
								</Card>
							</Grid>
							<Grid  item sm={6} xs={12} className={classes.gridItem}>
								<Card style={{width:'100%'}} className="movingItem" variant="outlined">
									<CardContent align="center">
										<h5 align="left">Membership Costs:</h5>
										<List dense="true" align="center">
											<ListItem>$20 for yearlong membership</ListItem>
											<ListItem>$50 for five-year membership with the the Collegiate to Career option</ListItem>
										</List>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(join);
