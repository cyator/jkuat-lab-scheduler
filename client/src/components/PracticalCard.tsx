import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from '../app/hooks';
import { setIsOpen, setFile } from '../features/modal/modalSlice';
import authHeader from '../features/auth/authHeader';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

interface Props {
	title: string;
	abstract: string;
	lab_manual: string;
}

export default function PracticalCard({ title, abstract, lab_manual }: Props) {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const handleDownload = (file: string) => {
		fetch(`uploads/download/${file}`, {
			headers: {
				...authHeader(),
			},
		});
	};

	const handleModal = () => {
		dispatch(setIsOpen(true));
		dispatch(setFile(lab_manual));
	};

	return (
		<>
			<Card className={classes.root}>
				<CardActionArea onClick={handleModal}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{abstract}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						size="small"
						color="primary"
						onClick={() => handleDownload(lab_manual)}
					>
						Download
					</Button>
					<Button size="small" color="primary" onClick={handleModal}>
						Learn More
					</Button>
				</CardActions>
			</Card>
		</>
	);
}
