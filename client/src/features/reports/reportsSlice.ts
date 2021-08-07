import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Error } from '../auth/authSlice';
import authHeader from '../auth/authHeader';
import { toast } from 'react-toastify';

export interface PracticalState {
	markedReports: Report[];
	pendingReports: Report[];
	status: 'loading' | 'failed' | 'success' | 'idle';
	error: Error;
}

interface Report {
	unit_code: string;
	lec_id: string;
	prac_name: string;
	report: string;
}

const initialState: PracticalState = {
	markedReports: [
		{
			unit_code: '',
			lec_id: '',
			prac_name: '',
			report: '',
		},
	],
	pendingReports: [
		{
			unit_code: '',
			lec_id: '',
			prac_name: '',
			report: '',
		},
	],
	status: 'idle',
	error: {
		status: null,
		message: '',
	},
};

export const fetchMarkedReports = createAsyncThunk(
	'reports/fetchMarkedReports',
	async (value, thunkAPI) => {
		try {
			const response = await fetch('/reports/marked', {
				headers: {
					'Content-Type': 'application/json',
					...authHeader(),
				},
			});
			const data = (await response.json()) as Report[];
			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (error) {
			console.log(error.response.data);
			thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchPendingReports = createAsyncThunk(
	'reports/fetchPendingReports',
	async (value, thunkAPI) => {
		try {
			const response = await fetch('/reports/pending', {
				headers: {
					'Content-Type': 'application/json',
					...authHeader(),
				},
			});
			const data = (await response.json()) as Report[];
			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (error) {
			console.log(error.response.data);
			thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const addReport = createAsyncThunk(
	'reports/addReport',
	async (
		{
			unit_code,
			prac_name,
			report,
		}: {
			unit_code: string;
			prac_name: string;
			report: FileList;
		},
		{ getState, rejectWithValue }
	) => {
		try {
			const { auth } = getState() as RootState;
			const formData = new FormData();
			formData.append('file', report[0]);
			formData.append('unit_code', unit_code);
			formData.append('prac_name', prac_name);
			formData.append('reg_no', auth.user.id);
			console.log(formData);

			const response = await fetch('/reports', {
				method: 'POST',
				body: formData,
				headers: {
					...authHeader(),
				},
			});
			const data = await response.json();
			if (response.status === 200) {
				toast.success('report added successfully');
				console.log('add prac res', data[0]);
				return data[0];
			} else {
				return rejectWithValue(data);
			}
		} catch (error) {
			console.log(error.response.data);
			rejectWithValue(error.response.data);
		}
	}
);

export const reportsSlice = createSlice({
	name: 'reports',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = {
				status: null,
				message: '',
			};
		},
		setStatusIdle: (state) => {
			state.status = 'idle';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMarkedReports.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMarkedReports.fulfilled, (state, action) => {
				state.status = 'success';
				state.markedReports = action.payload ?? [
					{
						unit_code: '',
						lec_id: '',
						prac_name: '',
						report: '',
					},
				];
				state.error = {
					status: null,
					message: '',
				};
			})
			.addCase(fetchMarkedReports.rejected, (state, action: any) => {
				state.status = 'failed';
				state.error = action?.payload;
			})
			.addCase(fetchPendingReports.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPendingReports.fulfilled, (state, action) => {
				state.status = 'success';
				state.pendingReports = action.payload ?? [
					{
						unit_code: '',
						lec_id: '',
						prac_name: '',
						report: '',
					},
				];
				state.error = {
					status: null,
					message: '',
				};
			})
			.addCase(fetchPendingReports.rejected, (state, action: any) => {
				state.status = 'failed';
				state.error = action?.payload;
			})
			.addCase(addReport.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addReport.fulfilled, (state) => {
				state.status = 'success';
				state.error = {
					status: null,
					message: '',
				};
			})
			.addCase(addReport.rejected, (state, action: any) => {
				state.status = 'failed';
				state.error = action?.payload;
			});
	},
});

export const { clearError, setStatusIdle } = reportsSlice.actions;
export const practicalState = (state: RootState) => state.reports;

export default reportsSlice.reducer;
