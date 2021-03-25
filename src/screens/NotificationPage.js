import { Button, Paper, TextField } from "@material-ui/core"
import React, { useState } from "react"
import "./NotificationPage.css"

const NotificationPage = ({ nationality, date, acceptHandler }) => {
	const [comment, setComment] = useState("")
	const [submitted, setSubmitted] = useState(false)
	return (
		<div className="wrapper">
			<Paper className="notification-page" elevation={5}>
				<h2>Confirmation</h2>
				<p>
					Dinner: <strong>{date}</strong>💕
					<br />
					{nationality}, with <em>the Owner</em>
				</p>
				<h4>Comments or any Special Request?</h4>
				<TextField
					color="secondary"
					label="Let me know"
					multiline
					rows={4}
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					variant="outlined"
				/>
				<div className="submit-button">
					<Button
						onClick={() => {
							setSubmitted(true)
							acceptHandler(comment)
						}}
						variant="outlined"
						disabled={submitted}
						color="secondary"
					>
						Accept
					</Button>
				</div>
			</Paper>
		</div>
	)
}

export default NotificationPage
