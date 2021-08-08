import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import {
	addMarks,
	downloadReport,
	Report,
} from '../features/reports/reportsSlice';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../app/hooks';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

interface Props {
	rows: Report[];
}

export type FormData = {
	marks: number;
	report_id: number | null;
};

const schema = yup.object().shape({
	marks: yup.number().required(),
});

export default function MarksTable({ rows }: Props) {
	const classes = useStyles();
	const { control, handleSubmit } = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const dispatch = useAppDispatch();

	const onSubmit =
		(report_id: number | null): SubmitHandler<FormData> =>
		(data) =>
			dispatch(addMarks({ marks: data.marks, report_id }));

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Unit Code</TableCell>
						<TableCell>Group Name</TableCell>
						<TableCell>Prac Name</TableCell>
						<TableCell>Report</TableCell>
						<TableCell>Marks</TableCell>
						<TableCell></TableCell>
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
							<TableCell>
								{row.prac_name && (
									<Button
										color="primary"
										variant="outlined"
										onClick={() => dispatch(downloadReport(row.report_name))}
									>
										Download report
									</Button>
								)}
							</TableCell>

							<TableCell>
								{row.prac_name && (
									<Controller
										control={control}
										name="marks"
										// defaultValue={row.marks ?? 0}
										render={({
											field: { ref, ...inputProps },
											fieldState: { error },
										}) => (
											<TextField
												type="number"
												disabled={row.marks ? true : false}
												{...inputProps}
												required
												value={row.marks && row.marks}
												id="marks"
												inputRef={ref}
												error={error ? true : false}
												helperText={
													error?.message ?? !row.marks
														? `please type in the marks of the report`
														: ''
												}
											/>
										)}
									/>
								)}
							</TableCell>
							<TableCell>
								{row.prac_name && (
									<Button
										onClick={
											row.marks
												? () => alert('coming soon')
												: handleSubmit(onSubmit(row.report_id))
										}
										variant="contained"
										color="primary"
									>
										{row.marks ? 'Edit' : 'Submit'}
									</Button>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
