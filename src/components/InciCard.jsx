import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	CardLink, 
    Button,
    Container
} from "reactstrap";

function InciCard({ incident, handleDel }) {

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/addIncident", {state:incident});
	}

	

	return (
		<div  class="col-3" style={{margin: "2% 0 2% 5%"}}>
			<Card
				style={{
					width: "80%",
				}}
			>
				<CardBody>
					<CardTitle tag="h5">{incident.id}</CardTitle>
					<CardSubtitle className="mb-2 text-muted" tag="h6">
						{incident.inciName}
					</CardSubtitle>
				</CardBody>
				<CardBody>
                <p>Description:</p>
					<CardText>
						{incident.description}
					</CardText>
                    <CardText>Priority: {incident.inciPriority}</CardText>
                    <CardText>Category: {incident.inciCategory}</CardText>
                    <CardText>Status: {incident.inciStatus}</CardText>
                    <CardText>User Details:
                        <ul>
                            <li>Name: {incident.userName}</li>
                            <li>Id: {incident.userId}</li>
                            <li>Department: {incident.userDept}</li>
                        </ul>
                    </CardText>
				</CardBody>
                <CardBody>
                    <Container className="text-center">
                    <button type="button" class="btn btn-info" style={{color: 'white', marginRight:"10%"}} onClick={handleClick}>Update</button>
                    <button type="button" class="btn btn-danger" style={{marginLeft:"10%"}} onClick={() => {handleDel(incident.id)}}>Delete</button>
                    </Container>
                </CardBody>
			</Card>
		</div>
	);
}

export default InciCard;
