/** @format */

import "index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Error from "pages/Error";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Products from "pages/Products";
import IndvProduct from "pages/IndvProduct";
import Sponsor from "pages/Sponsor";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Error></Error>}></Route>

				<Route path="/" element={<Home></Home>}></Route>

				<Route path="/Login" element={<Login></Login>}></Route>

				<Route path="/Register" element={<Register></Register>}></Route>

				<Route path="/Products" element={<Products></Products>}></Route>

				<Route
					path="/Products/:id"
					element={<IndvProduct></IndvProduct>}></Route>

				<Route path="/Sponsor" element={<Sponsor></Sponsor>}></Route>
			</Routes>
		</Router>
	);
}

export default App;
