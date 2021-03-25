import React, { useState } from "react"
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Box,
	Typography,
} from "@material-ui/core/"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import AdminPanel from "./AdminPanel"
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function AdminLoginPage({ users }) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [matchData, setmatchData] = useState(false)
	const classes = useStyles()
	const verifyCredentials = () => {
		users.forEach((user) => {
			if (user.username === username && user.password === password) {
				setmatchData(true)
				return
			}
		})
	}
	return (
		<>
			{matchData ? (
				<AdminPanel />
			) : (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}></Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<form className={classes.form}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								onChange={(event) => setUsername(event.target.value)}
								value={username}
								label="Username"
								name="username"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={verifyCredentials}
							>
								Sign In
							</Button>
						</form>
					</div>
					<Box mt={8}></Box>
				</Container>
			)}
		</>
	)
}
