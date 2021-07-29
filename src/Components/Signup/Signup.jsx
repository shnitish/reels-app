import React, { useContext, useState } from "react";
import { firebaseDB, firebaseStorage } from "../../Config/firebase";
import { AuthContext } from "../../Context/Authprovider";

const Signup = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [message, setMessage] = useState("");
	const { signUp } = useContext(AuthContext);

	const handleFileSubmit = (event) => {
		let fileObject = event.target.files[0];
		setProfileImage(fileObject);
	};

	const handleSignUp = async () => {
		try {
			let response = await signUp(email, password);
			let uid = response.user.uid;
			const uploadPhotoObject = firebaseStorage
				.ref(`/profilePhotos/${uid}/image.jpg`)
				.put(profileImage);
			uploadPhotoObject.on("state_changed", fun1, fun2, fun3);

			function fun1(snapshot) {
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(progress);
			}

			function fun2(error) {
				console.log(error);
			}

			async function fun3() {
				let profileImageUrl =
					await uploadPhotoObject.snapshot.ref.getDownloadURL();
				firebaseDB.collection("users").doc(uid).set({
					email: email,
					userId: uid,
					username: username,
					profileImageUrl: profileImageUrl,
					postsCreated: []
				});
				props.history.push("/");
			}
		} catch (err) {
			setMessage(err.message);
		}
	};

	return (
		<>
			<h1>Signup Page</h1>
			<div>
				<div>
					Username
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></input>
				</div>
				<div>
					Email
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>
				<div>
					Password
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					Profile Image
					<input
						type="file"
						accept="image/*"
						onChange={(e) => {
							handleFileSubmit(e);
						}}
					></input>
				</div>
			</div>
			<button onClick={handleSignUp}>SignUp</button>
			<h2 style={{ color: "red" }}>{message}</h2>{" "}
		</>
	);
};

export default Signup;
