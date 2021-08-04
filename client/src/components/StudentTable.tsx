import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Student } from '../features/students/studentsSlice';
import { useAppSelector } from '../app/hooks';
import { studentState } from '../features/students/studentsSlice';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			minWidth: 650,
		},
		heading: {
			fontWeight: theme.typography.fontWeightBold,
			textTransform: 'capitalize',
		},
		data: {
			textTransform: 'capitalize',
		},
	})
);

interface Props {
	group: number | null;
}

export default function StudentTable({ group }: Props) {
	const classes = useStyles();
	const { students } = useAppSelector(studentState);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="student table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.heading}>
							Registration Number
						</TableCell>
						<TableCell className={classes.heading} align="left">
							First Name
						</TableCell>
						<TableCell className={classes.heading} align="left">
							Last Name
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{students.map(
						({ reg_no, group_id, last_name, first_name }: Student) =>
							group === group_id && (
								<TableRow key={reg_no}>
									<TableCell component="th" scope="row">
										{reg_no}
									</TableCell>
									<TableCell className={classes.data} align="left">
										{first_name}
									</TableCell>
									<TableCell className={classes.data} align="left">
										{last_name}
									</TableCell>
								</TableRow>
							)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
