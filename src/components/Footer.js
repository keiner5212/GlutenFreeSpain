/** @format */

import { useState, useEffect } from "react";
import "./Footer.css"

function Footer() {
	const [Sponsors, setSponsors] = useState([]);
	const [Bills, setBills] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// "http://localhost:8000/api/Bills/list"
					"/api/Bills/list"
				);
				const data = await response.json();
				setBills(
					data.Bills.filter(
						(obj) =>
							obj.fields.suscription === 2 ||
							obj.fields.suscription === 4
					).map((obj) => obj.fields.CIF_sponsor)
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// "http://localhost:8000/api/Sponsors/list"
					"/api/Sponsors/list"
				);
				const data = await response.json();
				setSponsors(data.Sponsors);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<footer>
			<div className="sponsors-imgs">
				{Sponsors.map((element) => {
					if (Bills.includes(element.CIF)) {
						return <img src={element.icon} alt="sponsorImg" />;
					}
					return <></>;
				})}
			</div>
			<ul>
				<li>
					<a href="/admin/">Administrador</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
