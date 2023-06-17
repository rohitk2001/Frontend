import axios from "axios";
import React, { useState } from "react";
import {
	Form,
	Row,
	FormGroup,
	Label,
	Input,
	Col,
	Container,
} from "reactstrap";
import base_url from "../api/Server";
import { useLocation } from "react-router-dom";

function AddIncident() {

	// useLocation Hook for retrieving the data sent to the current URL using useNavigation
	const location = useLocation();
	

	// let incident = {id:"", inciName:"", description:"", inciPriority:"", inciCategory:"", inciStatus:"", userName:"", userId:"", userDept:""};
	let incident = {};

	// incis represent a single Incident data
	const [incis, setIncidents] = useState(() => {
		if (location.state !== null) return location.state;
		else return {};
	});
	const [data,setData] = useState();
	const [user,setUserData] = useState({});

	if (location.state !== null) {
		incident = location.state;
	}

	function handleForm(e) {
		console.log(incis);

		if (Object.keys(incis).length === 0)
			alert("No Changes Found!! You may return to Home if you dont intend to");
		else {
			if (location.state !== null) {
				updateData(incis);
			} else {
				postData(incis);
				e.target.reset();
			}
		}

		e.preventDefault();
	}

	const handlePriority = (e) => {
		// console.log(e.target.value);
		incident.inciPriority = e.target.value;
		setIncidents({ ...incis, inciPriority: e.target.value });
		console.log(incis);
	};

	const handleStatus = (e) => {
		incident.inciStatus = e.target.value;
		setIncidents({ ...incis, inciStatus: e.target.value });
		console.log(incis);
	};

	const handleCategory = (e) => {
		incident.inciCategory = e.target.value;
		setIncidents({ ...incis, inciCategory: e.target.value });
		console.log(incis);
	};

	const handleDept = () => {
		incident.userDept = user ? user.department : '';
		setIncidents({ ...incis, userDept: incident.userDept });
	};

	const postData = (data) => {
		setIncidents({...incis,user});
		axios.post(`${base_url}/incidents`, data).then(
			(response) => {
				console.log(response);
				console.log("Success Posting Data");
				alert("New Incident Created !!");
			},
			(error) => {
				alert("OOPS !! Some issue encountered. Please Try again");
				console.log("Something went wrong while Posting To server");
			}
		);
	};

	const updateData = (data) => {
		console.log(data);
		axios.put(`${base_url}/incidents`, data).then(
			(response) => {
				console.log(response);
				console.log("Success Updating Data");
				alert("Incident Updated !!");
			},
			(error) => {
				alert("OOPS !! Some issue encountered. Please Try again");
				console.log("Something went wrong while Posting To server");
			}
		);
	};

	const [userid,setUser] = useState();
	const getData = async (e) => {
		e.preventDefault();
		console.log(userid);	
		try{
			const response = await fetch(`${base_url}/user/${userid}`);
			console.log(response.data);
			setUserData(response.data);
		}
		catch(error){
			alert("OOPS !! Some issue encountered. Please Try again");
			console.log(error);
		}
		
		// axios.get(`${base_url}/user/${userid}`).then(
		// 	(response) => {
		// 		console.log(response.data);
		// 		setUserData(response.data);
		// 	},
		// 	(error) => {
		// 		alert("OOPS !! Some issue encountered. Please Try again");
		// 		console.log("Something went wrong while Posting To server");
		// 	}
		// );
		handleDept();
	}

	return (
		<div>
			<h2 className="text-center" style={{ marginTop: "3%" }}>
				{location.state === null ? "Create New Incident" : "Update Incident"}
			</h2>

			<div style={{ margin: "4% 20%" }}>
				<Form onSubmit={handleForm}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="inciId">Incident ID</Label>
								<Input
									id="inciId"
									name="inciId"
									placeholder="System Generated"
									type="text"
									readOnly
									value={incident.id}
									onChange={(e) => {
										setIncidents({ ...incis, id: e.target.value });
									}}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="inciName">Name</Label>
								<Input
									required="required"
									id="inciName"
									name="inciName"
									placeholder="Enter Incident Name"
									type="text"
									defaultValue={incident.inciName}
									onChange={(e) => {
										setIncidents({ ...incis, inciName: e.target.value });
									}}
								/>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label for="desc">Description</Label>
						<Input
							id="desc"
							name="desc"
							placeholder="Describe Incident"
							type="textarea"
							defaultValue={incident.description}
							onChange={(e) => {
								setIncidents({ ...incis, description: e.target.value });
							}}
						/>
					</FormGroup>

					<FormGroup>
						<Row>
							<Col md={2}>
								<Label >Priority :</Label>
							</Col>

							<Col md={2}>
								<FormGroup check>
									<Input
										required="required"
										name="radio1"
										type="radio"
										value={"Critical"}
										onChange={handlePriority}
										checked={incis.inciPriority === "Critical"}
									/>{" "}
									<Label check>Critical</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										required="required"
										name="radio1"
										type="radio"
										value={"High"}
										onChange={handlePriority}
										checked={incis.inciPriority === "High"}
									/>{" "}
									<Label check>High</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio1"
										type="radio"
										value={"Medium"}
										required
										onChange={handlePriority}
										checked={incis.inciPriority === "Medium"}
									/>{" "}
									<Label check>Medium</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio1"
										type="radio"
										value={"Low"}
										required
										checked={incis.inciPriority === "Low"}
										onChange={handlePriority}
									/>{" "}
									<Label check>Low</Label>
								</FormGroup>
							</Col>
						</Row>
					</FormGroup>

					<FormGroup>
						<Row>
							<Col md={2}>
								<Label>Category :</Label>
							</Col>

							<Col md={2}>
								<FormGroup check>
									<Input
										required="required"
										name="radio2"
										type="radio"
										value={"Hardware_Issues"}
										onChange={handleCategory}
										checked={incis.inciCategory === "Hardware_Issues"}
									/>{" "}
									<Label check>Hardware Issues</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio2"
										type="radio"
										value={"Software_Issues"}
										onChange={handleCategory}
										required
										checked={incis.inciCategory === "Software_Issues"}
									/>{" "}
									<Label check>Software Issues</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio2"
										type="radio"
										value={"Accessories_Issues"}
										onChange={handleCategory}
										required
										checked={incis.inciCategory === "Accessories_Issues"}
									/>{" "}
									<Label check>Accessories Issues</Label>
								</FormGroup>
							</Col>
						</Row>
					</FormGroup>

					<FormGroup>
						<Row>
							<Col md={2}>
								<Label>Status :</Label>
							</Col>

							<Col md={2}>
								<FormGroup check>
									<Input
										required="required"
										name="radio3"
										type="radio"
										value={"New"}
										onChange={handleStatus}
										checked={incis.inciStatus === "New"}
									/>{" "}
									<Label check>New</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio3"
										type="radio"
										value={"Inprogress"}
										onChange={handleStatus}
										required
										checked={incis.inciStatus === "Inprogress"}
									/>{" "}
									<Label check>Inprogress</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio3"
										type="radio"
										value={"Resolved"}
										onChange={handleStatus}
										required
										checked={incis.inciStatus === "Resolved"}
									/>{" "}
									<Label check>Resolved</Label>
								</FormGroup>
							</Col>
							<Col md={2}>
								<FormGroup check>
									<Input
										name="radio3"
										type="radio"
										value={"Rejected"}
										onChange={handleStatus}
										required
										checked={incis.inciStatus === "Rejected"}
									/>{" "}
									<Label check>Rejected</Label>
								</FormGroup>
							</Col>
						</Row>
					</FormGroup>

					<FormGroup>
						<div>User Details:</div>

						<FormGroup>
							<Label for="userId">User ID</Label>
							<Input
								id="userId"
								name="userId"
								placeholder="Enter User Id"
								type="text"
								required
								defaultValue={user ? user.userId : incident.userId}
								onClick={(e) => {
									setUser(e.target.value);
								}}
							/>
							{/* <button 
								class="btn btn-secondary"
								style={{ marginTop: "2%", width: "15%" }}
								onClick={getData}
							>
								Validate
							</button> */}
						</FormGroup>
						<FormGroup>
							<Label for="userName">User Name</Label>
							<Input
								id="userName"
								name="userName"
								type="text"
								placeholder={user.userName}
								defaultValue={user.userName}
								readonly
							/>
						</FormGroup>

						<FormGroup>
							<Row>
								<Col md={2}>
									<Label>Department :</Label>
								</Col>

								<Col md={2}>
									<FormGroup check>
										<Input
											name="radio4"
											type="radio"
											value={"IT"}
											checked={"IT" === "IT"}
										/>{" "}
										<Label check>IT</Label>
									</FormGroup>
								</Col>
								<Col md={2}>
									<FormGroup check>
										<Input
											name="radio4"
											type="radio"
											value={"HR"}
											checked={user.department === "HR"}
										/>{" "}
										<Label check>HR</Label>
									</FormGroup>
								</Col>
								<Col md={2}>
									<FormGroup check>
										<Input
											name="radio4"
											type="radio"
											value={"Marketing"}
											checked={user.department === "Marketing"}
										/>{" "}
										<Label check>Marketing</Label>
									</FormGroup>
								</Col>
								<Col md={2}>
									<FormGroup check>
										<Input
											name="radio4"
											type="radio"
											value={"Finance"}
 											checked={user.department === "Finance"}
										/>{" "}
										<Label check>Finance</Label>
									</FormGroup>
								</Col>
							</Row>
						</FormGroup>
					</FormGroup>

					<Container
						className="text-center"
						style={{ margin: "5% auto 2% auto" }}
					>
						{location.state !== null ? null : (
							<button
								type="reset"
								class="btn btn-dark"
								style={{ marginRight: "30%", width: "15%" }}
							>
								Clear
							</button>
						)}

						<button
							type="button submit"
							class="btn btn-success"
							style={{ width: "15%" }}
						>
							Submit
						</button>
					</Container>
				</Form>
			</div>
		</div>
	);
}

export default AddIncident;
