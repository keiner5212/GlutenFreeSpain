/** @format */

import GeneralLayout from "layouts/GeneralLayout";
import Product from "components/Product";
import { useState, useEffect } from "react";
import "./Home.css";
import "./Products.css";
// import { Link } from "react-router-dom";

function Products(props) {
	const [Productos, setProductos] = useState([]);
	const [categories, setcategories] = useState([]);
	const [Filter, setFilter] = useState("General");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// "http://localhost:8000/api/Products/list"
					"/api/Products/list"
				);
				const data = await response.json();
				if (Filter === "General") {
					setProductos(data.Products);
				} else {
					setProductos(
						data.Products.filter(
							(element) => element.category.name === Filter
						)
					);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [Filter]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// "http://localhost:8000/api/Categories/list"
					"/api/Categories/list"
				);
				const data = await response.json();
				setcategories(data.Categories);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	return (
		<GeneralLayout>
			<div className="products-center">
				<div className="center-categories">
					<h2>Categorias</h2>
					<div className="categories">
						<button
							className="categ-button"
							onClick={() => {
								setFilter("General");
							}}>
							General
						</button>
						{categories.map((element) => {
							return (
								<button
									className="categ-button"
									onClick={() => {
										setFilter(element.name);
									}}>
									{element.name}
								</button>
							);
						})}
					</div>
				</div>
				<h2>Productos de: {Filter}</h2>
				<div className="all-products">
					{Productos.map((product, index) => (
						<Product product={product}></Product>
					))}
				</div>
			</div>
		</GeneralLayout>
	);
}

export default Products;
