import { React, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AuthContext } from "../../Context/Authprovider";
import Upload from "../../Components/Upload/Upload";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	black: {
		color: "black",
	},
	medium: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	white: {
		backgroundColor: "white",
	},
}));

toast.configure();
const Header = () => {
	let classes = useStyles();
	const { signOut, currentUser } = useContext(AuthContext);

	const ShowProfile = ({ isLoggedIn }) => {
		if (isLoggedIn) {
			return (
				<div className="header">
					<div className="avatar">
						<Link to="/profile" className={classes.black}>
							<AccountCircleIcon className={classes.medium}></AccountCircleIcon>
						</Link>
					</div>
				</div>
			);
		} else {
			return null;
		}
	};

	const ShowHome = ({ isLoggedIn }) => {
		if (isLoggedIn) {
			return (
				<Link to="/" className={classes.black}>
					<HomeIcon className={classes.medium}></HomeIcon>
				</Link>
			);
		} else {
			return null;
		}
	};

	const ShowLogout = ({ isLoggedIn, handleLogout }) => {
		if (isLoggedIn) {
			return (
				<Button onClick={handleLogout} color="primary" variant="outlined">
					Logout
				</Button>
			);
		} else {
			return null;
		}
	};

	const handle_Logout = async (props) => {
		try {
			await signOut();
			toast.success("Logged Out successfully !", { autoClose: 2000 });
			props.history.push("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AppBar id="header" position="sticky" className={classes.white}>
			<Toolbar>
				{currentUser != null ? (
					<div className="upload-Video">
						<label>
							<Upload></Upload>
						</label>
					</div>
				) : null}
				<div className={classes.grow} />
				<ShowHome isLoggedIn={currentUser}></ShowHome>
				<ShowProfile isLoggedIn={currentUser}></ShowProfile>
				<ShowLogout
					isLoggedIn={currentUser}
					handleLogout={handle_Logout}
				></ShowLogout>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
