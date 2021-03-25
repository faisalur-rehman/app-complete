import React from "react"

const RadioQuestion = ({ question, questions, setQuestions }) => {
	const onChangehandler = (event) => {
		const temp = [...questions]
		temp[temp.findIndex((ques) => ques.title === question.title)].answer =
			event.target.value
		setQuestions(temp)
	}
	return (
		<div>
			<h4>{question.title}</h4>
			<input
				type="radio"
				name={question.title}
				value="Yes"
				onChange={onChangehandler}
				checked={question.answer === "Yes"}
			/>
			Yes
			<input
				type="radio"
				name={question.title}
				value="No"
				onChange={onChangehandler}
				checked={question.answer === "No"}
			/>
			No
		</div>
	)
}
export default RadioQuestion
