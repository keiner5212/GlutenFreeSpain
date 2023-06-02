/** @format */

import GeneralLayout from "layouts/GeneralLayout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import "./Sponsor.css";

function Sponsor(props) {
	const [isSdkReady, setIsSdkReady] = useState(false);

	useEffect(() => {
		const loadPayPalSdk = async () => {
			if (window.paypal) {
				setIsSdkReady(true);
			} else {
				await new Promise((resolve) => {
					const script = document.createElement("script");
					script.src =
						"https://www.paypal.com/sdk/js?client-id=AatTLieRXMKMnKWmsiedes6NT--VTKE2frT1xDUuMuXDWK1I7DrhByJgclzM9FSU-ahxOo6Lv08ullxJ";
					script.async = true;
					script.onload = resolve;
					document.body.appendChild(script);
				});
				setIsSdkReady(true);
			}
		};
		loadPayPalSdk();
	}, []);

	let [formData, setFormData] = useState({});
	let [Subscriptions, setSubscriptions] = useState([]);
	let [selectedSub, setselectedSub] = useState(null);
	let [Registrado, setRegistrado] = useState(false);
	let idBill = "";

	let handleChange = (event) => {
		const fieldName = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [fieldName]: value });
	};

	let handleFileChange = (event) => {
		const fieldName = event.target.name;
		const value = event.target.files[0];
		setFormData({ ...formData, [fieldName]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const csrfCookie = document.cookie.match(
			"(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"
		);
		const csrfToken = csrfCookie ? csrfCookie.pop() : null;
		const formData1 = new FormData();
		formData1.append("CIF", formData.CIF);
		formData1.append("name", formData.name);
		formData1.append("icon", formData.icon);
		formData1.append("email", formData.email);
		return fetch(
			// "http://localhost:8000/api/Sponsors/create",
			"/api/Sponsors/create",
			{
				method: "POST",
				headers: {
					"X-CSRFToken": csrfToken,
				},
				body: formData1,
			}
		)
			.then((response) => {
				setRegistrado(response.ok);
				if (!response.ok) {
					throw new Error();
				}
			})
			.catch((error) => {
				alert(
					"No se pudo registrar el sponsor, revisa los campos del formulario"
				);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					// "http://localhost:8000/api/suscriptionTypes/list"
					"/api/suscriptionTypes/list"
				);
				const data = await response.json();
				setSubscriptions(data.suscriptionTypes);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	async function addNewBill() {
		const csrfCookie = document.cookie.match(
			"(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"
		);
		const csrfToken = csrfCookie ? csrfCookie.pop() : null;
		const formData1 = new FormData();
		formData1.append("is_paid", "False");
		formData1.append("CIF_sponsor", formData.CIF);
		formData1.append("suscription", selectedSub.id);
		try {
			const response = await fetch(
				// "http://localhost:8000/api/Bills/create",
				"/api/Bills/create",
				{
					method: "POST",
					headers: {
						"X-CSRFToken": csrfToken,
					},
					body: formData1,
				}
			);
			if (!response.ok) {
				throw new Error();
			}
			const data = await response.json();
			idBill = data.id;
		} catch (error) {
			alert("No se pudo crear el Bill");
		}
	}

	async function markBillAsPaid() {
		const csrfCookie = document.cookie.match(
			"(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"
		);
		const csrfToken = csrfCookie ? csrfCookie.pop() : null;
		const formData = new FormData();
		formData.append("id", idBill);

		try {
			const response = await fetch(
				// "http://localhost:8000/api/Bills/validate",
				"/api/Bills/validate",
				{
					method: "PUT",
					headers: {
						"X-CSRFToken": csrfToken,
					},
					body: formData,
				}
			);
			if (!response.ok) {
				throw new Error();
			}
		} catch (error) {
			alert("No se pudo marcar el Bill como pagado");
		}
	}

	const createOrder = (data, actions) => {
		addNewBill();
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: selectedSub.price,
					},
				},
			],
		});
	};

	const onApprove = (data, actions) => {
		markBillAsPaid();
		new Promise((resolve, reject) => {
			window.location.href = `/api/Bills/generatePdf/${formData.CIF}/${idBill}`;
			setTimeout(() => {
				resolve("");
			}, 3000);
		}).then((result) => {
			window.location.href = "/";
		});
	};

	const onError = (err) => {
		alert("Error en la transacción de PayPal:", err);
	};

	return (
		<GeneralLayout>
			<div className="div-center">
				<div className="card sponsor-form">
					<div
						style={{
							display: "flex",
							justifyContent: "center",
						}}>
						<form id="form-sponsor" encType="multipart/form-data">
							<h2>Registro Sponsor</h2>
							<div className="form-div-stile">
								<input
									type="CIF"
									placeholder="CIF"
									name="CIF"
									value={formData.CIF}
									onChange={handleChange}
									required></input>
							</div>
							<div className="form-div-stile">
								<input
									type="text"
									placeholder="Nombre"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required></input>
							</div>
							<div className="form-div-stile">
								<input
									type="file"
									placeholder="icon"
									name="icon"
									onChange={handleFileChange}
									required></input>
							</div>
							<div className="form-div-stile">
								<input
									type="text"
									placeholder="E-mail"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required></input>
							</div>
							{selectedSub != null ? (
								<div className="form-div-stile">
									{Registrado ? (
										<div
											id="paypal-button"
											style={{
												display: "flex",
												justifyContent: "center",
												width: "100%",
											}}>
											{isSdkReady ? (
												<PayPalScriptProvider
													options={{
														"client-id":
															"AatTLieRXMKMnKWmsiedes6NT--VTKE2frT1xDUuMuXDWK1I7DrhByJgclzM9FSU-ahxOo6Lv08ullxJ",
													}}>
													<PayPalButtons
														createOrder={
															createOrder
														}
														onApprove={onApprove}
														onError={onError}
													/>
												</PayPalScriptProvider>
											) : (
												<></>
											)}
										</div>
									) : (
										<input
											onClick={handleSubmit}
											type="submit"
											value="Aceptar"
											style={{
												margin: "0px",
												padding: "0px 20px",
											}}></input>
									)}
								</div>
							) : (
								<></>
							)}
						</form>
					</div>
				</div>
				<div className="suscription-types">
					{Subscriptions.map((sub) => {
						const handleClick = (e) => {
							const targetDiv = e.currentTarget;
							const isAlreadySelected =
								targetDiv.classList.contains("selected");
							const subTypeElements =
								document.querySelectorAll(".sub-type");
							subTypeElements.forEach((element) => {
								if (element !== targetDiv) {
									element.classList.remove("selected");
								}
							});
							if (isAlreadySelected) {
								targetDiv.classList.remove("selected");
								setselectedSub(null);
							} else {
								targetDiv.classList.add("selected");
								setselectedSub(sub);
							}
						};
						return (
							<div
								className={`sub-type`}
								onClick={handleClick}
								key={sub.id}>
								<h3>{sub.name}</h3>
								<p className="sub-description">
									{sub.description}
								</p>
								<p>
									Precio:{" "}
									<span className="sub-price">
										${sub.price}
									</span>
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</GeneralLayout>
	);
}

export default Sponsor;
