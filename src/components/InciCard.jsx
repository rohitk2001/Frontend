import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../api/Server";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Button,
  Container,
} from "reactstrap";

function InciCard({ incident, handleDel }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addIncident", { state: incident });
  };

  useEffect(() => {
    //console.log(incident);
    axios.get(`${base_url}/user/${incident.user.userId}`).then(
      (response) => {
        // console.log(response.data);
        setUser(response.data);
      },
      (error) => {
        alert("Something went wrong: " + error.message);
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="col-3" style={{ margin: "2% 0 2% 5%" }}>
      <Card
        style={{
          width: "80%",
        }}
      >
        <CardBody>
          <CardTitle tag="h5"><b>{incident.inciName}</b></CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
			ID: {incident.inciId}
          </CardSubtitle>
        </CardBody>
        <hr style={{marginBottom: 0}} />
        <CardBody>
          <p style={{ fontFamily: "sans-serif" }}>
            <strong>Description</strong>
            <CardText style={{marginTop: 0}}>{incident.description}</CardText>
          </p>

          <CardText>
            <span style={{ fontFamily: "sans-serif" }}>Priority: </span>
            <span style={{ fontWeight: "bold" }}>{incident.inciPriority}</span>
          </CardText>
          <CardText>
            <span style={{ fontFamily: "sans-serif" }}>Category: </span>
            <span style={{ fontWeight: "bold" }}>{incident.inciCategory}</span>
          </CardText>
          <CardText>
            <span style={{ fontFamily: "sans-serif" }}>Status: </span>
            <span style={{ fontWeight: "bold" }}>{incident.inciStatus}</span>
          </CardText>
          <CardText style={{ fontFamily: "sans-serif" }}>
            <strong>Reported By</strong>
            <ul>
              <li><strong>name</strong>: {user.userName}</li>
              <li><strong>userId</strong>: {incident.user.userId}</li>
              <li><strong>department</strong>: {user.department}</li>
            </ul>
          </CardText>
        </CardBody>
        <hr />
        <CardBody>
          <Container className="text-center">
            <button
              type="button"
              className="btn btn-info"
              style={{ color: "white", marginRight: "10%" }}
              onClick={handleClick}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginLeft: "10%" }}
              onClick={() => {
                handleDel(incident.id);
              }}
            >
              Delete
            </button>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
}

export default InciCard;
