import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Authprovider";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	let { login } = useContext(AuthContext);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleLogin();
		}
	};

	const handleLogin = async () => {
		try {
			await login(email, password);
			props.history.push("/"); // navigate to feeds
		} catch (err) {
			setMessage(err.message);
			setEmail("");
			setPassword("");
		}
	};

	return (
		<div>
			<div>
				<h1>Login</h1>
			</div>
			<div>
				Email
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				Password
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
			</div>
			<button onClick={handleLogin}>Login</button>
			<h2 style={{ color: "red" }}>{message}</h2>
		</div>
	);
};

export default Login;
