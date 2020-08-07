import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Table from './views/Tables';
import Pabellon from './views/Pabellon';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './views/NavigationBar'





function App() {
	const marginTop = {
		marginTop: "20px"
	};

	return (
		<Router>

			<NavigationBar></NavigationBar>
			<Container>
				<Row>
					<Col lg={12} style={marginTop}>
						<Switch>
							<Route path="/pabellon/list" exact component={Table} />
							<Route path="/pabellon/addPabellon" exact component={Pabellon} />

						</Switch>
					</Col>
				</Row>
			</Container>
		</Router>
	);
}

export default App;
