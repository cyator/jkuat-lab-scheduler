import React, { useEffect } from 'react';
import StudentTabs from '../components/StudentTabs';
import StudentsTabChild from '../features/tabs/StudentsTabChild';
import {
	fetchAllGroups,
	clearError,
	groupState,
} from '../features/groups/groupsSlice';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
	fetchAllStudents,
	clearError as clearStudentError,
	studentState,
} from '../features/students/studentsSlice';

function Students() {
	const { error } = useAppSelector(groupState);
	const { error: studentError } = useAppSelector(studentState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllGroups());
	}, [dispatch]);

	useEffect(() => {
		if (error.status) {
			console.log(error);
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	useEffect(() => {
		dispatch(fetchAllStudents());
	}, [dispatch]);

	useEffect(() => {
		if (studentError.status) {
			console.log(studentError);
			toast.error(studentError.message);
			dispatch(clearStudentError());
		}
	}, [dispatch, studentError]);

	return (
		<div>
			<StudentTabs render={() => <StudentsTabChild />} />
		</div>
	);
}

export default Students;
