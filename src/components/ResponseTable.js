import React, { useState, useEffect, forwardRef } from "react"
import firebase from "firebase"
import { makeStyles } from "@material-ui/core/styles"
import {
	Box,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core/"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"

const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
})

function createData({ name, comment, questions }) {
	return {
		name,
		comment,
		data: Object.values(questions),
	}
}

function Row(props) {
	const { row } = props
	const [open, setOpen] = React.useState(false)
	const classes = useRowStyles()
	const PersistentCollapse = forwardRef(({ open, row }, ref) => (
		<Collapse in={open} timeout="auto">
			<Box margin={1}>
				<Table size="small" aria-label="purchases">
					<TableHead>
						<TableRow>
							<TableCell>Question</TableCell>
							<TableCell>Answer</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{row.data.map((dataRow) => (
							<TableRow key={dataRow.title}>
								<TableCell component="th" scope="row">
									{dataRow.title}
								</TableCell>
								<TableCell>{dataRow.answer}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{row.comment && (
					<div>
						<h4> Comments </h4>
						<p>{row.comment}</p>
					</div>
				)}
			</Box>
		</Collapse>
	))
	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						{row.name}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<PersistentCollapse open={open} row={row} />
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

// const rows = [
// 	createData("Frozen yoghurt"),
// 	createData("Ice cream sandwich"),
// 	createData("Eclair"),
// 	createData("Cupcake"),
// 	createData("Gingerbread"),
// ]

export default function ResponseTable() {
	const [responses, setResponses] = useState([])

	useEffect(() => {
		const fetchResponses = async () => {
			const db = firebase.firestore()
			const responseRef = db.collection("responses").doc("responses")
			const tempRes = []
			await responseRef
				.collection("name")
				.get()
				.then(async (snapshot) => {
					await snapshot.forEach(async (doc) => {
						const temp = {}
						temp["name"] = doc.data()["name"]
						temp["questions"] = await responseRef
							.collection("questions")
							.doc(doc.id)
							.get()
							.then((ques) => {
								return ques.data()
							})
						temp["comment"] = await responseRef
							.collection("comments")
							.doc(doc.id)
							.get()
							.then((item) => {
								if (item.exists) return item.data()["answer"]
							})
						await tempRes.push(temp)
						setResponses([...tempRes])
					})
				})
		}
		fetchResponses()
	}, [])
	let rows = []
	if (responses.length !== 0) rows = responses.map((res) => createData(res))
	return (
		responses && (
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Responses</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row key={row.name} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	)
}
