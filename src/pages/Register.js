/** @format */
import MainLayout from "layouts/MainLayout";
import loginUser from "../assets/svg/login-user.svg";
import { useState } from "react";

function Register() {
	let [formData, setFormData] = useState({});
	let handleChange = (event) => {
		const fieldName = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [fieldName]: value });
	};

	function EnviarRegistro() {
		const csrfCookie = document.cookie.match(
			"(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"
		);
		const csrfToken = csrfCookie ? csrfCookie.pop() : null;
		fetch(
			// "http://localhost:8000/api/Users/create/",
			"/api/Users/create/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken,
				},
				body: JSON.stringify({
					name: formData.nombre,
					last_name: formData.apellidos,
					email: formData.email,
					password: formData.contrasenha,
					birth_date: formData.birth_date,
				}),
			}
		)
			.then((response) => {
				if (!response.ok) {
					return response.json();
				}
				window.location.href = "/Login";
			})
			.then((data) => {
				//errores
				console.log(data);
			});
	}

	function Registrar(e) {
		e.preventDefault();
		const contrasena = document.getElementById("contrasenha").value;

		if (contrasena.length < 5) {
			alert(
				"Por favor ingrese una contraseña con al menos 5 caracteres."
			);
			return;
		}

		EnviarRegistro();
	}

	return (
		<MainLayout>
			<div className="register">
				<div className="div-center">
					<div className="card login" style={{ marginTop: "50px" }}>
						<div className="login-img div-center">
							<img
								src={loginUser}
								style={{ borderRadius: "50%" }}
								alt=""></img>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
							}}>
							<form>
								<input
									type="hidden"
									name="csrf_token"
									value="el_valor_del_token"></input>
								<p
									style={{
										fontSize: "30px",
										marginTop: "0px",
										fontWeight: 700,
										marginBottom: "10px",
									}}>
									Registrarse
								</p>
								<div className="form-div-stile">
									<input
										type="text"
										placeholder="Nombre"
										name="nombre"
										value={
											formData.nombre
												? formData.nombre
												: ""
										}
										onChange={handleChange}
										required></input>
								</div>
								<div className="form-div-stile">
									<input
										type="text"
										placeholder="Apellidos"
										name="apellidos"
										value={
											formData.apellidos
												? formData.apellidos
												: ""
										}
										onChange={handleChange}
										required></input>
								</div>
								<div className="form-div-stile">
									<input
										id="email"
										type="text"
										placeholder="E-mail"
										name="email"
										value={
											formData.email ? formData.email : ""
										}
										onChange={handleChange}
										required></input>
								</div>
								<div className="form-div-stile">
									<input
										type="date"
										name="birth_date"
										value={
											formData.birth_date
												? formData.birth_date
												: ""
										}
										onChange={handleChange}
										required></input>
								</div>
								<div className="form-div-stile">
									<input
										id="contrasenha"
										type="password"
										placeholder="Contraseña"
										name="contrasenha"
										value={
											formData.contrasenha
												? formData.contrasenha
												: ""
										}
										onChange={handleChange}
										required></input>
								</div>
								<div
									className="form-div-stile"
									style={{
										width: "auto",
										marginTop: "10px",
									}}>
									<input
										onClick={Registrar}
										type="submit"
										value="Registrarse"
										style={{
											margin: "0px",
											padding: "0px 20px",
										}}></input>
								</div>
								<div
									style={{
										width: "100%",
										marginBottom: "10px",
										display: "flex",
										justifyContent: "center",
									}}>
									<a style={{ color: "black" }} href="/login">
										Inicia sesion
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export default Register;
