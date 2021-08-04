import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Error } from '../auth/authSlice';
import authHeader from '../auth/authHeader';

export interface PracticalState {
	practicals: PracticalRes[];
	isLoading: boolean;
	error: Error;
}

interface Practical {
	prac_id: number | null;
	unit_code: string;
	labtech_id: string;
	prac_name: string;
	abstract: string;
}
export interface PracticalRes extends Practical {
	lab_manual: string;
}

export interface PracticalReq extends Practical {
	lab_manual: FileList;
}

const initialState: PracticalState = {
	practicals: [
		{
			prac_id: null,
			unit_code: '',
			labtech_id: '',
			prac_name: '',
			abstract: '',
			lab_manual: '',
		},
	],
	isLoading: false,
	error: {
		status: null,
		message: '',
	},
};

export const fetchAllPracticals = createAsyncThunk(
	'practicals/fetchAllPracticals',
	async (value, thunkAPI) => {
		try {
			const response = await fetch('/practicals', {
				headers: {
					'Content-Type': 'application/json',
					...authHeader(),
				},
			});
			const data = (await response.json()) as PracticalRes[];
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

export const addPractical = createAsyncThunk(
	'practicals/addPractical',
	async ({ unit_code, prac_name, abstract, lab_manual }: any, thunkAPI) => {
		console.log(unit_code);

		try {
			const formData = new FormData();
			formData.append('file', lab_manual[0]);
			formData.append('unit_code', unit_code);
			formData.append('prac_name', prac_name);
			formData.append('abstract', abstract);

			const response = await fetch('/practicals', {
				method: 'POST',
				body: formData,
				headers: {
					...authHeader(),
				},
			});
			const data = await response.json();
			if (response.status === 200) {
				console.log('add prac res', data[0]);
				return data[0];
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (error) {
			console.log(error.response.data);
			thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const practicalSlice = createSlice({
	name: 'practicals',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = {
				status: null,
				message: '',
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPracticals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllPracticals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.practicals = action.payload ?? [
					{
						prac_id: null,
						unit_code: '',
						labtech_id: '',
						prac_name: '',
						abstract: '',
						lab_manual: '',
					},
				];
				state.error = {
					status: null,
					message: '',
				};
			})
			.addCase(fetchAllPracticals.rejected, (state, action: any) => {
				state.isLoading = false;
				state.error = action?.payload;
			})
			.addCase(addPractical.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addPractical.fulfilled, (state) => {
				state.isLoading = false;
				state.error = {
					status: null,
					message: '',
				};
			})
			.addCase(addPractical.rejected, (state, action: any) => {
				state.isLoading = true;
				state.error = action?.payload;
			});
	},
});

export const { clearError } = practicalSlice.actions;
export const practicalState = (state: RootState) => state.practicals;

export default practicalSlice.reducer;
