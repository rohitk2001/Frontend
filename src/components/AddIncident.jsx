import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, FormGroup, Label, Input, Col, Container } from "reactstrap";
import base_url from "../api/Server";
import { useLocation } from "react-router-dom";

function AddIncident() {
  // useLocation Hook for retrieving the data sent to the current URL using useNavigation
  const location = useLocation();

  // incis represent a single Incident data
  // const [incis, setIncidents] = useState(() => {
  //   console.log("location.state: ", location.state);
  //   if (location.state !== null) return location.state;
  //   else return {};
  // });

  const initialiser = (prop) => {
    if (location.state !== null) {
      return location.state[prop];
    } else return "";
  }


  const [user, setUser] = useState(() => {
    if (location.state !== null) return location.state.user;
    else return {};
  });
  const [inciName, setInciName] = useState(initialiser("inciName"));
  const [inciCategory, setInciCategory] = useState(initialiser("inciCategory"));
  const [inciStatus, setInciStatus] = useState(initialiser("inciStatus"));
  const [inciPriority, setInciPriority] = useState(initialiser("inciPriority"));
  const [description, setDescription] = useState(initialiser("description"));
  const [incident, setIncident] = useState(()=>{
    if (location.state !== null) return location.state;
    else return {};
  })

  console.log("Incident Object on load ", incident);

  function handleForm(e) {
    e.preventDefault();
    // console.log("Incident Object: ", incis);

    if (Object.keys(incident).length === 0)
      alert("No Changes Found!! You may return to Home if you dont intend to");
    else {
      if (location.state !== null) {
        let inci = {
          inciName,
          inciCategory,
          inciPriority,
          inciStatus,
          description,
          user,
        };
        updateData(inci);
      } else {
        let incident = {
          inciName,
          inciCategory,
          inciPriority,
          inciStatus,
          description,
          user,
        };
        postData(incident);
        e.target.reset();
      }
    }
  }

  const handlePriority = (e) => {
    setInciPriority(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleStatus = (e) => {
    setInciStatus(e.target.value);
  };

  const handleCategory = (e) => {
    setInciCategory(e.target.value);
  };
  const handleName = (e) => {
    setInciName(e.target.value);
  };

  const postData = (data) => {
    axios.post(`${base_url}/incidents`, data).then(
      (response) => {
        console.log(response);
        console.log("Success Posting Data");
        alert("New Incident Created !!");
      },
      (error) => {
        alert("OOPS !! Some issue encountered. Please Try again");
        console.log(error);
      }
    );
  };

  const updateData = (data) => {
    console.log("incident for updation", data);
    axios.put(`${base_url}/incidents/${incident.inciId}`, data).then(
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

  const [userId, setUserId] = useState(()=>{
    if(user!=null) return user.userId
    else return ''
  });

  const getData = async (e) => {
    e.preventDefault();
    console.log("userId: ", userId);
    axios.get(`${base_url}/user/${userId}`).then(
      (response) => {
        console.log(response.data);
        setUser(response.data);
        setIncident({ ...incident, user: response.data });
      },
      (error) => {
        alert("Invalid User-id entered!!!");
        console.log(error);
        setUser("");
      }
    );
  };

  const clearAll = () => {
    setUser("");
    setDescription("");
    setInciCategory("");
    setInciName("");
    setInciPriority("");
    setInciStatus("");
    setIncident("");
    setUserId("");
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
                  value={incident ? incident.id : ""}
                  // onChange={(e) => {
                  //   setIncidents({ ...incis, id: e.target.value });
                  // }}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="inciName">Name</Label>
                <Input
                  required
                  id="inciName"
                  name="inciName"
                  placeholder="Enter Incident Name"
                  type="text"
                  value={inciName}
                  onChange={(e) => handleName(e)}
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
              value={description}
              onChange={(e) => handleDescription(e)}
            />
          </FormGroup>

          <FormGroup>
            <Row>
              <Col md={2}>
                <Label>Priority :</Label>
              </Col>

              <Col md={2}>
                <FormGroup check>
                  <Input
                    required="required"
                    name="radio1"
                    type="radio"
                    value={"Critical"}
                    onChange={handlePriority}
                    checked={inciPriority === "Critical"}
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
                    checked={inciPriority === "High"}
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
                    checked={inciPriority === "Medium"}
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
                    checked={inciPriority === "Low"}
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
                    checked={inciCategory === "Hardware_Issues"}
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
                    checked={inciCategory === "Software_Issues"}
                  />{" "}
                  <Label check>Software Issues</Label>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup check>
                  <Input
                    name="radio2"
                    type="radio"
                    value={"Accessory_Issues"}
                    onChange={handleCategory}
                    required
                    checked={inciCategory === "Accessory_Issues"}
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
                    checked={inciStatus === "New"}
                  />{" "}
                  <Label check>New</Label>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup check>
                  <Input
                    name="radio3"
                    type="radio"
                    value={"In_progress"}
                    onChange={handleStatus}
                    required
                    checked={inciStatus === "In_progress"}
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
                    checked={inciStatus === "Resolved"}
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
                    checked={inciStatus === "Rejected"}
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
                type="number"
                required
                defaultValue={user ? user.userId : ""}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
              <button
                className="btn btn-secondary"
                style={{ marginTop: "2%", width: "15%" }}
                onClick={getData}
              >
                Validate
              </button>
            </FormGroup>
            <FormGroup>
              <Label for="userName">User Name</Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                placeholder={user ? user.userName : ""}
                defaultValue={user ? user.userName : ""}
                readOnly
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
                      checked={user.department === "IT"}
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
                className="btn btn-dark"
                style={{ marginRight: "30%", width: "15%" }}
                onClick={clearAll}
              >
                Clear
              </button>
            )}

            <button
              type="button submit"
              className="btn btn-success"
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
