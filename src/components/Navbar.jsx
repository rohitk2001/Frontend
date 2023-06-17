import React, { useState } from "react";
import "../css/navbar.css";
import Loweslogo from "../resources/lowes_logo2.png";
import Loweslogo2 from "../resources/lowes_logo.png";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();

  // Shows the search Text that is typed in
	const [searchVal, setSearch] = useState("");

	const handleChange = (e) => {
		console.log("Search bar is activated");
		setSearch(e.target.value);
		//  console.log(e.target.value)
		console.log(searchVal);
		navigate("/", { state: { id: e.target.value } });
	};

	return (
		<div>
			{/* <!-- Navbar --> */}
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				{/* <!-- Container wrapper --> */}
				<div class="container">
					{/* <!-- Navbar brand --> */}
					<a class="navbar-brand" href="#">
						<img
							id="lowes-logo"
							src={Loweslogo2}
							alt="Lowes Logo"
							draggable="false"
							height="45"
						/>
					</a>

					{/* <!-- Toggle button --> */}
					<button
						class="navbar-toggler"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i class="fas fa-bars"></i>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ms-3">
							<li class="nav-item me-3">
								<NavLink to="/" className="nav-link d-flex align-items-center">
									<span>Home</span>
								</NavLink>
							</li>
						</ul>

						<form class="d-flex align-items-center w-100 form-search">
							<div class="input-group">
								<button
									class="btn btn-light dropdown-toggle shadow-0"
									type="button"
									data-mdb-toggle="dropdown"
									aria-expanded="false"
									style={{ paddingBottom: "0.4rem" }}
								>
									All
								</button>
								<ul class="dropdown-menu dropdown-menu-dark fa-ul">
									<li>
										<a class="dropdown-item" href="#">
											<span class="fa-li pe-2">
												<i class="fas fa-search"></i>
											</span>
											All
										</a>
									</li>
								</ul>
								<input
									type="search"
									class="form-control"
									placeholder="Search By UserId"
									aria-label="Search"
									value={searchVal}
									onChange={handleChange}
								/>
							</div>
							<a href="#!" class="text-white">
								<i class="fas fa-search ps-3"></i>
							</a>
						</form>

						<ul class="navbar-nav ms-3">
							<li class="nav-item me-3">
								<NavLink
									to="/addIncident"
									className="nav-link d-flex align-items-center"
								>
									<span>Add Incident</span>
								</NavLink>
							</li>
						</ul>

						<ul class="navbar-nav ms-3">
							<li class="nav-item me-3">
								<NavLink
									to="/addUser"
									className="nav-link d-flex align-items-center"
								>
									<span>Create New User</span>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
