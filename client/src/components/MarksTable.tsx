import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

interface Data {
	unit_code: string;
	group_name: string;
	prac_name: string;
	marks: number;
}

const rows: Data[] = [
	{
		unit_code: 'vhgvkhg',
		group_name: 'jgfjvhgb',
		prac_name: 'hgvhb',
		marks: 5,
	},
];

export default function MarksTable() {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Unit Code</TableCell>
						<TableCell>Group Name</TableCell>
						<TableCell>Prac Name</TableCell>
						<TableCell align="right">Marks</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.unit_code}>
							<TableCell component="th" scope="row">
								{row.unit_code}
							</TableCell>
							<TableCell>{row.group_name}</TableCell>
							<TableCell>{row.prac_name}</TableCell>
							<TableCell align="right">
								<TextField type="number" value={5} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
