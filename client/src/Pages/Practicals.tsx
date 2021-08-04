import React, { useEffect } from 'react';
import { Add as AddIcon } from '@material-ui/icons';
import StudentTabs from '../components/StudentTabs';
import PracticalTabChild from '../features/tabs/PracticalTabChild';
import FloatingActionButton from '../components/FloatingActionButton';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	fetchAllUnits,
	clearError,
	unitState,
} from '../features/units/unitsSlice';
import {
	practicalState,
	clearError as clearPracticalsError,
	fetchAllPracticals,
} from '../features/practicals/practicalSlice';
import { toast } from 'react-toastify';

function Practicals() {
	const { error } = useAppSelector(unitState);
	const { error: PracticalsError } = useAppSelector(practicalState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUnits());
	}, [dispatch]);

	useEffect(() => {
		if (error.status) {
			console.log(error);
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	useEffect(() => {
		dispatch(fetchAllPracticals());
	}, [dispatch]);

	useEffect(() => {
		if (PracticalsError.status) {
			console.log(PracticalsError);
			toast.error(PracticalsError.message);
			dispatch(clearPracticalsError());
		}
	}, [error, dispatch, PracticalsError]);

	return (
		<div>
			<StudentTabs render={() => <PracticalTabChild />} />
			<Link to="/add-practical">
				<FloatingActionButton icon={<AddIcon />} />
			</Link>
		</div>
	);
}

export default Practicals;
