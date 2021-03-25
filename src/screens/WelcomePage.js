import { Button, TextField } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RadioQuestion from "../components/RadioQuestion"
import SliderQuestion from "../components/SliderQuestion"
import "./WelcomePage.css"

const WelcomePage = ({ name, setName, questions, setQuestions }) => {
	const [buttonDisabled, setbuttonDisabled] = useState(true)
	useEffect(() => {
		if (name.length === 0) {
			setbuttonDisabled(true)
			return
		}
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].type === "radio" && questions[i].answer.length === 0) {
				setbuttonDisabled(true)
				return
			}
		}
		setbuttonDisabled(false)
	}, [questions, name])
	return (
		<div className="welcome-page">
			<TextField
				variant="outlined"
				value={name}
				onChange={(event) => setName(event.target.value)}
				label="Your Name"
				color="secondary"
			/>
			{questions.map((question, key) =>
				question.type === "radio" ? (
					<RadioQuestion
						key={key}
						question={question}
						questions={questions}
						setQuestions={setQuestions}
					/>
				) : (
					<SliderQuestion
						key={key}
						question={question}
						questions={questions}
						setQuestions={setQuestions}
					/>
				)
			)}
			<Button disabled={buttonDisabled} variant="contained" color="secondary">
				<Link to="/dinner">Next</Link>
			</Button>
		</div>
	)
}
export default WelcomePage
