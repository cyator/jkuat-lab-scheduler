import React, { useEffect } from 'react';
import { Avatar, Button, Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StudentsIcon from '@material-ui/icons/SchoolOutlined';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	addGroup,
	clearError,
	groupState,
} from '../../../features/groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toast } from 'react-toastify';

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

export type FormData = {
	group_name: string;
	group_leader: string;
	member_1: string;
	member_2: string;
	member_3: string;
	member_4: string;
};

const schema = yup.object().shape({
	group_name: yup.string().trim().min(2).max(50).required(),
	group_leader: yup
		.string()
		.trim()
		.uppercase()
		.required()
		.uppercase()
		.matches(
			/^ITE[0-9]{3}-[0-9]{4}-[0-9]{4}$/i,
			'please use a valid registration number'
		),
	member_1: yup
		.string()
		.trim()
		.uppercase()
		.required()
		.uppercase()
		.matches(
			/^ITE[0-9]{3}-[0-9]{4}-[0-9]{4}$/i,
			'please use a valid registration number'
		),
	member_2: yup
		.string()
		.trim()
		.uppercase()
		.required()
		.uppercase()
		.matches(
			/^ITE[0-9]{3}-[0-9]{4}-[0-9]{4}$/i,
			'please use a valid registration number'
		),
	member_3: yup
		.string()
		.trim()
		.uppercase()
		.required()
		.uppercase()
		.matches(
			/^ITE[0-9]{3}-[0-9]{4}-[0-9]{4}$/i,
			'please use a registration number'
		),
	member_4: yup
		.string()
		.trim()
		.uppercase()
		.required()
		.uppercase()
		.matches(
			/^ITE[0-9]{3}-[0-9]{4}-[0-9]{4}$/i,
			'please use a valid registration number'
		),
});

export default function AddGroup() {
	const classes = useStyles();
	const { control, handleSubmit } = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const { error } = useAppSelector(groupState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (error.status) {
			console.log(error);
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	// const numberOfGroupMembers = useWatch({
	// 	control,
	// 	name: 'numberOfGroupMembers',
	// 	defaultValue: 5,
	// });
	// const member: number = useWatch({
	// 	control,
	// 	name: 'member',
	// 	defaultValue: 1,
	// });

	// const handleStudents = () => {
	// 	switch (member) {
	// 		case 1:
	// 			return 'leader';
	// 		case 2:
	// 			return 'two';
	// 		case 3:
	// 			return 'three';
	// 		case 4:
	// 			return 'four';
	// 		case 5:
	// 			return 'five';
	// 		default:
	// 			return 'six';
	// 	}
	// };

	const onSubmit = handleSubmit((data) => dispatch(addGroup(data)));

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
							{/* <Controller
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
							/> */}
							<Input name="group_name" control={control} />
						</Grid>
						<Grid item xs={12}>
							{/* <Controller
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
							/> */}
							<Input name="group_leader" control={control} />
						</Grid>

						{/* <Grid item xs={12} sm={6}>
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
						</Grid> */}
						<Grid item xs={12} sm={6}>
							{/* <Controller
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
							/> */}
							<Input name="member_1" control={control} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<Input name="member_2" control={control} />
							{/* <Controller
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
							/> */}
						</Grid>
						<Grid item xs={12} sm={6}>
							{/* <Controller
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
							/> */}
							<Input name="member_3" control={control} />
						</Grid>
						<Grid item xs={12} sm={6}>
							{/* <Controller
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
							/> */}
							<Input name="member_4" control={control} />
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
