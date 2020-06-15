import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container'

import NavBar from '../components/navbar'
import Logo from '../assets/MatchLogo.png'

const styles = (theme) => ({

});

class swematch extends Component {
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
			<div className={classes.root}>
				<NavBar />
				<div className={classNames('header', { 'ready': headerReady })}>
		            <p className="heading">SWEMatch</p>
                </div>
				<Container className={classes.container}>
					<p align="center" class="movingItem">
						Introducing a new SWE UTD program, <strong>SWE Match</strong>! 
						The purpose of SWE Match is to get more all-female teams in engineering competitions. 
						Starting next semester, SWE will be taking applications to join SWE Match and be matched 
						with women in other engineering disciplines in order to build a comprehensive engineering 
						project to the specifications of the <strong>WE21 Team Tech Competition</strong>. 
						The cohort will be set up with all of the equipment and space needed to build the product 
						so they can focus on the engineering. If this sounds like a great opportunity for you, 
						make sure to <strong>follow SWE UTD on social media to keep up to date!</strong>
					</p>
					<p align="center" class="movingItem">
						<strong>All engineering majors are welcome and encouraged to apply!</strong>
					</p>
					<h3 class="movingItem">Get Involved!</h3>
					<Row>
						<Col>
							<h4 class="movingItem">Participant</h4>
							<p class="movingItem">
								Participants are beginner collegiate engineers looking to hone their craft and get some experience. 
								Participants should be excited about engineering and willing to learn!
							</p>
						</Col>
						<Col>
							<h4 class="movingItem">Mentor</h4>
							<p class="movingItem">
								Mentors are more experienced collegiate engineers looking to teach, lead, and guide the design and construction of the project.
								Mentors will be required to show their qualification by bringing in some portfolio work.
							</p>
						</Col>
					</Row>
					<p align="center" class="movingItem">Each of these two paths constitute being a full member of the team. Participants will be partnered up with a mentor as a point of contact for technical questions.</p>
					<h3 class="movingItem">About <a href="https://swe.org/awards/collegiate-competitions/">Team Tech:</a></h3>
					<p class="movingItem">
						For the Team Tech competition, we will be partnering up with an industry partner to help us
						come up with a great engineering project. To start off with, we will be writing comprehensive proposal
						and design documents to be sent to the Team Tech judges for approval in early January 2021. Then we will
						spend the whole Spring semester building a prototype and writing a final report and draft presentation
						to be sent to the Team Tech judges by June 2021. Finally, we will find out if we are selected in August 2021, and if we are,
						Team Tech will sponsor one of us to go to WE21 to present our project and possibly win awards. We will, of course,
						be fundraising in an attempt to get most, if not all of us to WE21 to see our teammate present!
					</p>
					<h3 class="movingItem">Dates to Save:</h3>
					<ul class="movingItem">
						<li><strong>7 September 2020:</strong> SWE Match Mentor and Participant Applications open</li>
						<li><strong>2 October 2020:</strong> Applications close</li>
						<li><strong>5-9 October 2020:</strong> Interviews!</li>
						<li><strong>11 October 2020:</strong> Candidates notified of their statuses; there will be a waitlist</li>
						<li><strong>15 October 2020:</strong> RSVP due</li>
						<li><strong>19 October 2020 at 7PM:</strong> Mentor Training</li>
						<li><strong>20 October 2020 at 8:30PM:</strong> First General Meeting!</li>
					</ul>
					<div align="center">
						<img class="movingItem" alt="SWEMatch logo" src={Logo} height={200}/>
					</div>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(swematch);