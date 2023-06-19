import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import InciCard from "./InciCard";
import { Jumbotron, Button } from "reactstrap";
import "../css/home.css";
import base_url from "../api/Server";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {

	// To keep track of the data sent to this URL from Navbar
	const location = useLocation();

	const [incidents, setInci] = useState([]);

	const getAllIncidents = () => {
		axios.get(`${base_url}/incidents`).then(
			(res) => {
				setInci(res.data);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const deleteIncident = (id) => {
		axios.delete(`${base_url}/incidents/${id}`).then(
			(res) => {
				getAllIncidents();
				alert("The Incident deleted Successfully");
			},
			(error) => {
				console.log(error);
			}
		);
	};

	// When the componenet Mounts for the First time , getAllIncidents() is called to populate the screen
	useEffect(() => {
		getAllIncidents();
	}, []);

	const getfiltered = () => {
		axios.get(`${base_url}/user/incidents/${location.state.userId}`).then(
			(res) => {
				console.log(res.data);
				setInci(res.data);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	if (location.state !== null) {
		console.log("Value has been passed !!");
		// const filteredInci = incidents.filter((item) => { return item.userId.toString().includes(location.state.id) });
		// setInci(filteredInci);
		console.log(typeof location.state.userId);

		// This line ensures that whenever we pass in empty text in search box it loads all the Incidents on Home
		if (location.state.userId != "") getfiltered();
		else getAllIncidents();

		console.log(incidents);
		location.state = null;
	}

	return (
		<div>
			<div className="jumbotron text-center">
				<h1 className="display-4">Welcome to Incident Management !!</h1>
				<p className="lead">
					Easily report and track incidents in real-time, empowering our team to
					promptly address and resolve them.
				</p>
				<hr className="my-4" />
				<p>
					Our dedicated platform provides a streamlined and centralized approach
					to managing incidents, ensuring minimal disruption to our operations
					and optimal customer satisfaction.
				</p>
				{/* <p class="lead">
					<a class="btn btn-primary btn-lg" href="#" role="button">
						Learn more
					</a>
				</p> */}
			</div>

			<div className="row">
				{incidents.length > 0 ? (
					incidents.map((item) => (
						<InciCard incident={item} handleDel={() => deleteIncident(item.inciId)} />
					))
				) : (
					<div className="text-center">No Incidents</div>
				)}
			</div>
		</div>
	);
}

export default Home;
