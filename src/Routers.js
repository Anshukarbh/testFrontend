import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import HomePage from './component/HomePage';

function Routers() {
	return (
		<div className="Routers">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route exact path="/homepage" element={<HomePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default Routers;
