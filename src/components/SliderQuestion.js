import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"

const useStyles = makeStyles({
	root: {
		padding: "5px",
		width: 300,
	},
})

export default function SliderQuestion({ question, questions, setQuestions }) {
	const classes = useStyles()
	const onChangeHandler = (event, newValue) => {
		const temp = [...questions]
		temp[
			temp.findIndex((ques) => ques.title === question.title)
		].answer = newValue
		setQuestions(temp)
	}
	return (
		<div className={classes.root}>
			<h4>{question.title}</h4>
			<Slider
				value={typeof question.answer === "number" ? question.answer : 5}
				onChange={onChangeHandler}
				getAriaValueText={(value) => `${value}`}
				aria-labelledby="discrete-slider"
				valueLabelDisplay="auto"
				step={1}
				marks
				color="secondary"
				min={0}
				max={10}
			/>
		</div>
	)
}
