/** @format */

import loginUser from "../assets/svg/login-user.svg";
import logOut from "../assets/svg/cerrar-sesion.svg";
import "./Header.css";
import React, { useState } from "react";
import logo from "../assets/svg/logo.svg";

function Header() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const handleMouseEnter = () => {
		setIsMenuVisible(true);
	};

	const handleMouseLeave = () => {
		setIsMenuVisible(false);
	};

	function deleteCookie(cookieName) {
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}

	function cerrarSesion(e) {
		deleteCookie("user_id");
		deleteCookie("name");
		deleteCookie("email");
		window.location.href = "/";
	}

	function getCookieValue(cookieName) {
		const cookieString = document.cookie;
		const cookies = cookieString.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.startsWith(cookieName + "=")) {
				const cookieValue = cookie.substring(cookieName.length + 1);
				return decodeURIComponent(cookieValue);
			}
		}
		return null;
	}

	let usuario = getCookieValue("name")
		? getCookieValue("name").split(":")[0]
		: null;

	return (
		<header>
			<div className="navbar">
				<ul>
					<li>
						<a href="/" className="header-link logo-img">
							<img src={logo} alt="home" height="35px" />
							Home
						</a>
					</li>
					<li>
						<a href="/Products" className="header-link">
							Productos
						</a>
					</li>
					<li>
						<a href="/Sponsor" className="header-link">
							Sponsor
						</a>
					</li>
				</ul>
			</div>

			<div className="sesiones">
				{usuario ? (
					<>
						<div
							className="menu-user-links"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}>
							<ul>
								<li>
									<p id="log-info" className="header-user">
										<img
											src={loginUser}
											alt="loginUser"
											height="20px"
										/>
										{usuario}
									</p>
								</li>
								<div
									id="optionss-user"
									className={`user-menu ${
										isMenuVisible ? "" : "hidden"
									}`}>
									<ul>
										<li
											className="user-menu-li"
											id="closeSesion">
											<img
												className="menu-icon"
												src={logOut}
												alt="log out"
												width="20px"
											/>
											<button onClick={cerrarSesion}>
												Cerrar sesión
											</button>
										</li>
									</ul>
								</div>
							</ul>
						</div>
					</>
				) : (
					<>
						<button
							onClick={() => {
								window.location.href = "/Login";
							}}>
							Inicia sesion
						</button>
						<button
							onClick={() => {
								window.location.href = "/Register";
							}}>
							Registrate
						</button>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
