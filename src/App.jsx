import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.scss';
import Main from './Main';
import About from './About';

class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<div className="mobile-message">
						<div className="logo d-flex large">
							<i className="fas fa-dollar-sign"></i>
							<div className="spacing-h small"></div>
							<h1>World debt</h1>
						</div>
						<div className="spacing"></div>
						<p>Please visit us from a desktop, this visualization is not very responsive...</p>
					</div>
					<Route path="/" exact component={Main} />
					<Route path="/about/" component={About} />
				</div>
			</Router>
		);
	}
}

export default App;
