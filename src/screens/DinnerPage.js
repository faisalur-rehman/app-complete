import "./DinnerPage.css"
import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { Link } from "react-router-dom"

const DinnerPage = () => {
	const [hideButton, sethideButton] = useState(false)
	const hideonClick = () => {
		const animatedButton = document.getElementById("animated-button")
		animatedButton.classList.add("bouncing-button")
		setTimeout(() => {
			sethideButton(true)
		}, 1000)
	}

	return (
		<div className="dinner-page">
			<h2>Would you like to go on a Dinner with me?</h2>
			<div>
				<Link className="dinner-button" to="/nation">
					<Button variant="contained" color="secondary">
						Yes
					</Button>
				</Link>
				{!hideButton && (
					<span className="dinner-button" id="animated-button">
						<Button onClick={hideonClick} variant="contained" color="primary">
							No!
						</Button>
					</span>
				)}
			</div>
		</div>
	)
}
export default DinnerPage
