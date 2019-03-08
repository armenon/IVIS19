import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './About.scss';
import { Container, Row, Col } from 'react-bootstrap';

class About extends Component {
	render() {
		return (
			<div className="world-debt-about">
				<Container>
					<div className="spacing large"></div>
					<Row>
						<Col md="5">
							<Link to="/" className="sidebar-button dark"><i className="fas fa-arrow-left"></i> Back to visualization</Link>
							<div className="spacing"></div>
							<div className="logo d-flex">
								<i className="fas fa-dollar-sign"></i>
								<div className="spacing-h small"></div>
								<span>
									<h1>World debt</h1>
									<p>Relation of debt and happiness</p>
								</span>
							</div>
							<div className="spacing medium"></div>
							<p className="label color-dark">Created by</p>
							<div className="person">
								<img src="" alt=""/>
								<div>
									<p>
										<b>Marco Koivisto</b> <br/>
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="" alt="" />
								<div>
									<p>
										<b>Marco Koivisto</b> <br />
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="" alt="" />
								<div>
									<p>
										<b>Marco Koivisto</b> <br />
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="" alt="" />
								<div>
									<p>
										<b>Marco Koivisto</b> <br />
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="" alt="" />
								<div>
									<p>
										<b>Marco Koivisto</b> <br />
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="" alt="" />
								<div>
									<p>
										<b>Marco Koivisto</b> <br />
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="" alt="" />
								<div>
									<p>
										<b>Marco Koivisto</b> <br />
										marcoko@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
						</Col>
						<Col md="7">
							Video here
							<div className="spacing large"></div>
							<h1>What is the purpose of the visualization?</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet libero sed mauris venenatis mollis nec ullamcorper tellus. Nam nec diam et quam viverra varius. <br/> <br/>
								Vestibulum finibus metus et lectus ullamcorper aliquet. Aenean varius orci ut velit volutpat, a sagittis ligula elementum. Nulla a elit lectus. Nam leo diam, ultricies ac nisl eu, pretium fermentum turpis.
							</p>
							<div className="spacing medium"></div>
							<h2>What was learnt during the creation?</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet libero sed mauris venenatis mollis nec ullamcorper tellus. Nam nec diam et quam viverra varius. <br /> <br />
								Vestibulum finibus metus et lectus ullamcorper aliquet. Aenean varius orci ut velit volutpat, a sagittis ligula elementum. Nulla a elit lectus. Nam leo diam, ultricies ac nisl eu, pretium fermentum turpis.
							</p>
						</Col>
					</Row>
					<div className="spacing large"></div>
				</Container>
			</div>
		);
	}
}

export default About;
