import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Form,
	Row,
	FormGroup,
	Label,
	Input,
	Col,
	Button,
	Container,
} from "reactstrap";
import base_url from "../api/Server";
import { useLocation } from "react-router-dom";

function AddUser() {
	// useLocation Hook for retrieving the data sent to the current URL using useNavigation
	const location = useLocation();
	

	// let user = {id:"", inciName:"", description:"", inciPriority:"", inciCategory:"", inciStatus:"", userName:"", userId:"", userDept:""};
	let user = {};

	// singleUser represent a single Incident data
	const [singleUser, setUsers] = useState(() => {
		if (location.state !== null) return location.state;
		else return {};
	});

	if (location.state !== null) {
		user = location.state;
	}

	function handleForm(e) {
		console.log(singleUser);

		if (Object.keys(singleUser).length === 0)
			alert("No Changes Found!! You may return to Home if you dont intend to");
		else {
			if (location.state !== null) {
				updateData(singleUser);
			} else {
				postData(singleUser);
				e.target.reset();
			}
		}

		e.preventDefault();
	}

	const handleDept = (e) => {
		user.department = e.target.value;
		setUsers({ ...singleUser, department: e.target.value });
	};

	const updateData = (data) => {
		console.log(data);
		axios.put(`${base_url}/users`, data).then(
			(response) => {
				console.log(response);
				console.log("Success Updating Data");
				alert("User Updated !!");
			},
			(error) => {
				alert("OOPS !! Some issue encountered. Please Try again");
				console.log("Something went wrong while Posting To server");
			}
		);
	};

	const postData = (data) => {
		console.log(data);
		axios.post(`${base_url}/user/add`, data).then(
			(response) => {
				console.log(response);
				console.log("Success Posting Data");
				alert("New User Created !!");
			},
			(error) => {
				alert("OOPS !! Some issue encountered. Please Try again");
				console.log("Something went wrong while Posting To server");
			}
		);
	};

	return (
		<div>
			<h2 className="text-center" style={{ marginTop: "3%" }}>
				Create User
			</h2>

			<div style={{ margin: "4% 20%" }}>
				<Form onSubmit={handleForm}>
					<FormGroup>
						<Row>
							<Col md={6}>
								<FormGroup>
									<Label for="userId">User ID</Label>
									<Input
										id="userId"
										name="userId"
										placeholder="System Generated"
										type="text"
										required
										readOnly
										onChange={(e) => {
											setUsers({ ...singleUser, userId: e.target.value });
										}}
									/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="userName">User Name</Label>
									<Input
										id="userName"
										name="userName"
										placeholder="Enter User Name"
										type="text"
										onChange={(e) => {
											setUsers({ ...singleUser, userName: e.target.value });
										}}
									/>
								</FormGroup>
							</Col>
						</Row>
					</FormGroup>

					<FormGroup>
						<Row>
							<Col md={6}>
								<FormGroup>
									<Label for="usermail">Email Id:</Label>
									<Input
										id="userMail"
										name="userMail"
										placeholder="Enter e-mail"
										type="email"
										onChange={(e) => {
											setUsers({ ...singleUser, email: e.target.value });
										}}
									/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="userTel">Mobile No.</Label>
									<Input
										id="userTel"
										name="userTel"
										placeholder="Enter User Name"
										type="tel"
										onChange={(e) => {
											setUsers({ ...singleUser, phone: e.target.value });
										}}
									/>
								</FormGroup>
							</Col>
						</Row>
					</FormGroup>

                    {/* <FormGroup>
						<Row>
							<Col md={6}>
								<FormGroup>
									<Label for="userDesg">Designation:</Label>
									<Input
										id="userDesg"
										name="userDesg"
										placeholder="Enter Designation"
										type="text"
									/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="userGrade">Grade</Label>
									<Input
										id="userGrade"
										name="userGrade"
										placeholder="Enter Grade"
										type="number"
									/>
								</FormGroup>
							</Col>
						</Row>
					</FormGroup> */}

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
											onChange={handleDept}
											checked={singleUser.department === "IT"}
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
											onChange={handleDept}
											checked={singleUser.department === "HR"}
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
											onChange={handleDept}
											checked={singleUser.department === "Marketing"}
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
											onChange={handleDept}
											checked={singleUser.department === "Finance"}
										/>{" "}
										<Label check>Finance</Label>
									</FormGroup>
								</Col>
							</Row>
					</FormGroup>

					<Container
						className="text-center"
						style={{ margin: "5% auto 2% auto" }}
					>
						<button
							type="button submit"
							class="btn btn-success"
							style={{ width: "15%" }}
						>
							Done
						</button>
					</Container>
				</Form>
			</div>
		</div>
	);
}

export default AddUser;
