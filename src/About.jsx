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
								<img src="/img/marco.jpg" alt=""/>
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
								<img src="/img/rafa.jpg" alt="" />
								<div>
									<p>
										<b>Rafael Lucena</b> <br />
										rafaella@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Interaction</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="/img/freddie.png" alt="" />
								<div>
									<p>
										<b>Fredilyn Villarin</b> <br />
										fredilyn@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Interaction</span>
										<span><i className="fa fa-circle"></i> Research</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="/img/arjun.jpg" alt="" />
								<div>
									<p>
										<b>Arjun Rajendran</b> <br />
										armenon@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Wireframing</span>
										<span><i className="fa fa-circle"></i> Prototyping</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="/img/magnus.jpg" alt="" />
								<div>
									<p>
										<b>Magnus Lundh Haaland</b> <br />
										magnuslh@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Design</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="/img/diego.jpg" alt="" />
								<div>
									<p>
										<b>Diego Martin</b> <br />
										diegom@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Frontend</span>
										<span><i className="fa fa-circle"></i> Interaction</span>
									</p>
								</div>
							</div>
							<div className="person">
								<img src="/img/jonathan.jpg" alt="" />
								<div>
									<p>
										<b>Jonathan Ramirez</b> <br />
										jramirez@kth.se
									</p>
									<p>
										<span><i className="fa fa-circle"></i> Design</span>
										<span><i className="fa fa-circle"></i> Video Edition</span>
									</p>
								</div>
							</div>
						</Col>
						<Col md="7">
							<iframe src="https://player.vimeo.com/video/322717207" title="This is a unique title" frameBorder="0" allowFullScreen></iframe>
							<div className="spacing medium"></div>
							<h1>What is the purpose of the visualization?</h1>
							<p>
								The visualization shows how macroeconomics affect everyday lives. We hope the visualization can increase people's conscience by displaying data which matters. <br/> <br/>
							</p>
							<h2>What was learnt during the creation?</h2>
							<p>
								Thanks to the creation of this visualziation we as a group have learnt how to retrieve data from different sources and blend them together in a easy consumable matter. Most of us also incresed our knowledge of using web frameworks and working in team for a web project. Which we see as an important skill for today's employment market. <br/> <br/>
								When it comes to technology, we increased our knowledge in the use of D3, React and a JavaScript in general.
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
