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
		navigate("/", { state: { userId: e.target.value } });
	};

	return (
		<div>
			{/* <!-- Navbar --> */}
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				{/* <!-- Container wrapper --> */}
				<div className="container">
					{/* <!-- Navbar brand --> */}
					<a className="navbar-brand" href="/">
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
						className="navbar-toggler"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i className="fas fa-bars"></i>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-3">
							<li className="nav-item me-3">
								<NavLink to="/" className="nav-link d-flex align-items-center">
									<span>Home</span>
								</NavLink>
							</li>
						</ul>

						<form className="d-flex align-items-center w-100 form-search">
							<div className="input-group">
								<button
									className="btn btn-light dropdown-toggle shadow-0"
									type="button"
									data-mdb-toggle="dropdown"
									aria-expanded="false"
									style={{ paddingBottom: "0.4rem" }}
								>
									All
								</button>
								<ul className="dropdown-menu dropdown-menu-dark fa-ul">
									<li>
										<a className="dropdown-item" href="#">
											<span className="fa-li pe-2">
												<i className="fas fa-search"></i>
											</span>
											All
										</a>
									</li>
								</ul>
								<input
									type="search"
									className="form-control"
									placeholder="Search By UserId"
									aria-label="Search"
									value={searchVal}
									onChange={handleChange}
								/>
							</div>
							<a href="#!" className="text-white">
								<i className="fas fa-search ps-3"></i>
							</a>
						</form>

						<ul className="navbar-nav ms-3">
							<li className="nav-item me-3">
								<NavLink
									to="/addIncident"
									className="nav-link d-flex align-items-center"
								>
									<span>Add Incident</span>
								</NavLink>
							</li>
						</ul>

						<ul className="navbar-nav ms-3">
							<li className="nav-item me-3">
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
