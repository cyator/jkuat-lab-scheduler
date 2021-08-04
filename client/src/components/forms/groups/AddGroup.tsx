import React from 'react';
import {
	Avatar,
	Button,
	TextField,
	Typography,
	Container,
	MenuItem,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StudentsIcon from '@material-ui/icons/SchoolOutlined';
import { useForm, Controller, useWatch } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

type FormData = {
	groupName: string;
	numberOfGroupMembers: number;
	member: number;
	leader: string;
	two: string;
	three: string;
	four: string;
	five: string;
	six: string;
};

export default function AddGroup() {
	const classes = useStyles();
	const { control, handleSubmit } = useForm<FormData>();
	const numberOfGroupMembers = useWatch({
		control,
		name: 'numberOfGroupMembers',
		defaultValue: 5,
	});
	const member: number = useWatch({
		control,
		name: 'member',
		defaultValue: 1,
	});

	const handleStudents = () => {
		switch (member) {
			case 1:
				return 'leader';
			case 2:
				return 'two';
			case 3:
				return 'three';
			case 4:
				return 'four';
			case 5:
				return 'five';
			default:
				return 'six';
		}
	};

	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<Container maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<StudentsIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Add Group
				</Typography>
				<form onSubmit={onSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Controller
								name="groupName"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										variant="outlined"
										required
										fullWidth
										label="Group Name"
										id="groupName"
										autoFocus
										helperText="Please type in a unique group name"
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="numberOfGroupMembers"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										id="numberOfGroupMembers"
										select
										label="Number of group members"
										helperText="Please select the number of group members"
										variant="outlined"
										required
										fullWidth
										defaultValue={6}
									>
										{[4, 5, 6].map((value) => (
											<MenuItem key={value} value={value}>
												{value}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Controller
								name="member"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										id="member"
										select
										label="Member"
										variant="outlined"
										required
										fullWidth
										helperText="Select member"
									>
										{[...Array(numberOfGroupMembers)].map(
											(value, index: number) => (
												<MenuItem key={index} value={index + 1}>
													{index + 1 === 1 ? `${1} (leader)` : index + 1}
												</MenuItem>
											)
										)}
									</TextField>
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Controller
								name={handleStudents()}
								control={control}
								defaultValue="hg"
								render={({ field }) => (
									<TextField
										{...field}
										variant="outlined"
										required
										label={handleStudents()}
										id={handleStudents()}
										fullWidth
										helperText="type in registration number of member"
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Submit
					</Button>
				</form>
			</div>
		</Container>
	);
}
