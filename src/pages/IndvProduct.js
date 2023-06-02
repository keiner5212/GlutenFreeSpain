/** @format */

import vegetarian from "../assets/svg/vegetariano_adobe_express.svg";
import not_vegetarian from "../assets/svg/no-vegetarian_adobe_express.svg";
import { useParams } from "react-router-dom";
import GeneralLayout from "layouts/GeneralLayout";
import React, { useState, useEffect } from "react";
import "./IndvProduct.css";
import "./Home.css";

function IndvProduct(props) {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [Sponsors, setSponsors] = useState([]);
	const [Bills, setBills] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// `http://localhost:8000/api/Products/${id}`
					`/api/Products/${id}`
				);
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [id]);

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
							obj.fields.suscription === 3 ||
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
		<>
			<GeneralLayout>
				<div className="home">
					<div className="info-product">
						<img
							className="product-img"
							src={product.image}
							alt={product.name}
						/>
						<div className="product-indv-detail">
							<p>
								<h2>
									{product.name + "   "}
									<img
										className="vegetarian"
										src={
											product.is_vegetarian
												? vegetarian
												: not_vegetarian
										}
										alt=""
										height="20px"
									/>
								</h2>
							</p>
							<p className="descIndv">{product.description}</p>
							<p>
								Precio:{" "}
								<span className="price">${product.price}</span>
							</p>
							<p>Valoraciones: {product.votaciones}</p>
						</div>
					</div>

					<div className="sponsors-imgs">
						{Sponsors.map((element) => {
							if (Bills.includes(element.CIF)) {
								return (
									<img src={element.icon} alt="sponsorImg" />
								);
							}
							return <></>;
						})}
					</div>
					<div className="comentarios">
						<h3>Comentarios</h3>
						<div className="cont-comentarios">En desarrollo</div>
					</div>
				</div>
			</GeneralLayout>
		</>
	);
}

export default IndvProduct;
