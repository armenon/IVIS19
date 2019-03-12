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
										<span><i className="fa fa-circle"></i> Data collection</span>
									</p>
								</div>
							</div>
						</Col>
						<Col md="7">
							
							<div className="spacing large"></div>
							<h1>What is the purpose of the visualization?</h1>
							<p>
								The purpose of this visualization is to visualize how macroeconomics affect everyday lives, increasing people's conscience by displaying data that matters. <br/> <br/>
								
							</p>
							<div className="spacing medium"></div>
							<h2>What was learnt during the creation?</h2>
							<p>
								Thanks to this visualziation we learned how to retrieve data from different sources and blend them all together. Most of us also learned how to use web frameworks and work on a tema for a web project, which is an important skill for nowaday's emplyment market. <br /> <br />
								Regarding technology, we learned how to use D3, React and a lot of JavaScript, which are widely used in projects of all fields.
							</p>
							<iframe src="https://player.vimeo.com/video/322717207" className="video" title="This is a unique title" frameBorder="0" allowFullScreen></iframe>
						</Col>
					</Row>
					<div className="spacing large"></div>
				</Container>
			</div>
		);
	}
}

export default About;
