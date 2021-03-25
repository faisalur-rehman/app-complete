import React, { useState, useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import "./App.css"
import AdminLoginPage from "./screens/AdminLoginPage"
import DinnerPage from "./screens/DinnerPage"
import NotificationPage from "./screens/NotificationPage"
import RadioOptionsPage from "./screens/RadioOptionsPage"
import WelcomePage from "./screens/WelcomePage"
import firebase from "firebase"

const firstpageQuestions = [
	{
		title: "Hey Girl, I'm learning to code. Do you like this?",
		answer: "",
		type: "radio",
	},
]
const nations = {
	options: [{ title: "Chinese" }, { title: "Japanese" }],
	answer: "",
}
const dateOptions = {
	options: [{ title: "8PM Wednesday" }],
	answer: "",
}
const dummyOptions = {
	title: "Confirmation",
	options: [{ title: "Option 1" }],
	answer: "",
}
const App = () => {
	const [loading, setloading] = useState(true)
	const [users, setUsers] = useState([])
	const [welcomeQuestions, setwelcomeQuestions] = useState(firstpageQuestions)
	const [name, setName] = useState("")
	const [nationQuestions, setNationQuestions] = useState(nations)
	const [dateQuestions, setDateQuestions] = useState(dateOptions)
	const [lastQuestion, setLastQuestion] = useState(dummyOptions)

	const acceptHandler = (comment) => {
		// Perform Data Submission
		const db = firebase.firestore()
		const responseRef = db.collection("responses").doc("responses")

		responseRef
			.collection("name")
			.add({ name: name })
			.then((docRef) => {
				const tempQues = []
				welcomeQuestions.forEach((quest) => {
					tempQues.push({ title: quest.title, answer: quest.answer })
					// responseRef
					// 	.collection("welcome-question")
					// 	.doc(docRef.id)
					// 	.set({ title: quest.title, answer: quest.answer })
				})
				tempQues.push({ title: "Nationality", answer: nationQuestions.answer })
				tempQues.push({ title: "Date", answer: dateQuestions.answer })
				tempQues.push({ title: "Last Question", answer: lastQuestion.answer })

				// responseRef
				// 	.collection("nation-question")
				// 	.doc(docRef.id)
				// 	.set({ answer: nationQuestions.answer })
				// responseRef
				// 	.collection("date-question")
				// 	.doc(docRef.id)
				// 	.set({ answer: dateQuestions.answer })
				// responseRef
				// 	.collection("last-question")
				// 	.doc(docRef.id)
				// 	.set({ title: lastQuestion.title, answer: lastQuestion.answer })
				responseRef
					.collection("comments")
					.doc(docRef.id)
					.set({ answer: comment })
				responseRef
					.collection("questions")
					.doc(docRef.id)
					.set({ ...Object(tempQues) })
					.then(() => window.location.reload())
			})
	}
	useEffect(() => {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyBrhalFpbyxMl9VBtc4nkuqPwjtAWvH59Q",
				authDomain: "react-dating-app-a0b84.firebaseapp.com",
				projectId: "react-dating-app-a0b84",
				storageBucket: "react-dating-app-a0b84.appspot.com",
				messagingSenderId: "605924883197",
				appId: "1:605924883197:web:c39a4e6f0eb0927119dc94",
			})
		} else {
			firebase.app() // if already initialized, use that one
		}
		const db = firebase.firestore()
		// Welcome Page Questions
		db.collection("welcome-page")
			.get()
			.then((snapshot) => {
				const temp = []
				if (snapshot)
					snapshot.forEach((doc) => {
						temp.push({
							title: doc.data().title,
							type: doc.data().type,
							answer: "",
						})
					})
				setwelcomeQuestions(temp)
			})
			.catch((e) => console.log(e))
		// Nations Page Questions
		db.collection("dates")
			.doc("dates")
			.get()
			.then((doc) => {
				const temp = { options: [], answer: "" }
				if (doc) {
					doc
						.data()
						["dates"].forEach((date) => temp["options"].push({ title: date }))
				}
				setDateQuestions(temp)
			})
			.catch((e) => console.log(e))
		// Last Page Questions
		db.collection("last-page")
			.doc("last-page")
			.get()
			.then((doc) => {
				const temp = { options: [], answer: "" }
				if (doc) {
					temp["title"] = doc.data().title
					doc
						.data()
						["last-page"].forEach((option) =>
							temp["options"].push({ title: option })
						)
				}
				setLastQuestion(temp)
			})
			.catch((e) => console.log(e))
		// Date Options
		db.collection("nations")
			.doc("nationality")
			.get()
			.then((doc) => {
				const temp = { options: [], answer: "" }
				if (doc) {
					doc
						.data()
						.nations.forEach((nation) =>
							temp["options"].push({ title: nation })
						)
				}
				setNationQuestions(temp)
			})
			.catch((e) => console.log(e))
		// Users
		db.collection("users")
			.get()
			.then((snapshot) => {
				const temp = []
				if (snapshot) snapshot.forEach((doc) => temp.push(doc.data()))
				setUsers(temp)
			})
			.then(() => setloading(false))
			.catch((e) => console.log(e))
	}, [])
	return (
		<div className="App">
			<h1>WELCOME TO DATING APP</h1>
			{!loading && (
				<div className="body">
					<Switch>
						<Route exact path="/">
							<WelcomePage
								name={name}
								setName={setName}
								questions={welcomeQuestions}
								setQuestions={setwelcomeQuestions}
							/>
						</Route>
						<Route path="/dinner">
							<DinnerPage />
						</Route>
						<Route path="/nation">
							<RadioOptionsPage
								title="What's your nationality?"
								questions={nationQuestions}
								setQuestions={setNationQuestions}
								nextRoute="/date"
							/>
						</Route>
						<Route path="/date">
							<RadioOptionsPage
								title="When do you want to go on a date with me?"
								questions={dateQuestions}
								setQuestions={setDateQuestions}
								nextRoute="/second-last"
							/>
						</Route>
						<Route path="/second-last">
							<RadioOptionsPage
								title={lastQuestion.title}
								questions={lastQuestion}
								setQuestions={setLastQuestion}
								nextRoute="/notification"
							/>
						</Route>
						<Route path="/notification">
							{name.length === 0 ||
							nationQuestions.answer.length === 0 ||
							dateQuestions.answer.length === 0 ? (
								<Redirect to="/" />
							) : (
								<NotificationPage
									nationality={nationQuestions.answer}
									date={dateQuestions.answer}
									acceptHandler={acceptHandler}
								/>
							)}
						</Route>
						<Route path="/admin">
							<AdminLoginPage users={users} />
						</Route>
					</Switch>
				</div>
			)}
		</div>
	)
}

export default App
