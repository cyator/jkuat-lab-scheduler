import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from '../app/hooks';
import { setIsOpen } from '../features/modal/modalSlice';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

interface Props {
	title: string;
	abstract: string;
}

export default function PracticalCard({ title, abstract }: Props) {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const handleDownload = () => {
		alert('downloading...');
	};

	const handleModal = () => {
		dispatch(setIsOpen(true));
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
					<Button size="small" color="primary" onClick={handleDownload}>
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
