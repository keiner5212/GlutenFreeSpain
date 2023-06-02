/** @format */

import MainLayout from "layouts/MainLayout";
import React, { useState, useEffect } from "react";
import baner from "../assets/img/banner.jpg";
import vegetarian from "../assets/svg/vegetariano_adobe_express.svg";
import not_vegetarian from "../assets/svg/no-vegetarian_adobe_express.svg";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	const [top4Objetos, setTop4Objetos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// "http://localhost:8000/api/Products/list"
					"/api/Products/list"
				);
				const data = await response.json();
				let productos = data.Products;
				productos.sort((a, b) => b.votaciones - a.votaciones);
				const top4 = productos.slice(0, 4);
				setTop4Objetos(top4);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<MainLayout>
			<div className="home">
				<div className="banner">
					<img src={baner} alt="Banner"></img>
				</div>

				<hr />
				<h2>Productos destacados</h2>
				<hr />
				<div className="top4-products">
					{top4Objetos.map((product, index) => {
						return (
							<>
								{index % 2 === 0 ? (
									<div className="products">
										<img
											src={product.image}
											alt="imagen-producto"
										/>
										<div className="informacion">
											<Link
												className="custom-link"
												to={"/Products/" + product.id}>
												<h3>{product.name}</h3>
											</Link>
											<p className="desc">
												{product.description}
											</p>
											<p>
												Precio:{" "}
												<span className="price">
													${product.price}
												</span>
											</p>
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
											<p>
												Valoraciones:{" "}
												{product.votaciones}
											</p>
										</div>
									</div>
								) : (
									<div className="products">
										<div className="informacion">
											<Link
												to={"/Products/" + product.id}>
												<h3>{product.name}</h3>
											</Link>
											<p className="desc">
												{product.description}
											</p>
											<p>
												Precio:{" "}
												<span className="price">
													${product.price}
												</span>
											</p>
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
											<p>
												Valoraciones:{" "}
												{product.votaciones}
											</p>
										</div>
										<img
											src={product.image}
											alt="imagen-producto"
										/>
									</div>
								)}
							</>
						);
					})}
				</div>
				<span className="view-more">
					<Link className="custom-link" to="/Products">
						Ver mas ➤
					</Link>
				</span>
			</div>
		</MainLayout>
	);
}

export default Home;
