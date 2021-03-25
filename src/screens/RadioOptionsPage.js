import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"

const RadioOptionsPage = ({ title, questions, setQuestions, nextRoute }) => {
	const onChangehandler = (event) => {
		const temp = { ...questions }
		temp.answer = event.target.value
		setQuestions(temp)
	}
	return (
		<div>
			<h2>{title}</h2>
			{questions.options.map((ques, key) => (
				<div className="radio-option" key={key}>
					<h4>{ques.title}</h4>
					<input
						type="radio"
						name={ques.title}
						value={ques.title}
						onChange={onChangehandler}
						checked={questions.answer === ques.title}
					/>
				</div>
			))}
			<br />
			<Button
				disabled={questions.answer.length === 0}
				variant="contained"
				color="secondary"
			>
				<Link to={nextRoute}>Next</Link>
			</Button>
		</div>
	)
}
export default RadioOptionsPage
