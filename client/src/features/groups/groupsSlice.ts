import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Error } from '../auth/authSlice';
import authHeader from '../auth/authHeader';

export interface GroupState {
	groups: [Group];
	error: Error;
	isLoading: boolean;
}

export interface Group {
	group_id: number | null;
	group_name: string;
	year_of_study: number | null;
}

const initialState: GroupState = {
	groups: [
		{
			group_id: null,
			group_name: '',
			year_of_study: null,
		},
	],
	error: {
		status: null,
		message: '',
	},
	isLoading: false,
};

export const fetchAllGroups = createAsyncThunk(
	'groups/fetchAllGroups',
	async (value, thunkAPI) => {
		try {
			const response = await fetch('/groups', {
				headers: {
					'Content-Type': 'application/json',
					...authHeader(),
				},
			});
			const data = (await response.json()) as [Group];
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

export const groupsSlice = createSlice({
	name: 'groups',
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
			.addCase(fetchAllGroups.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllGroups.fulfilled, (state, action) => {
				state.isLoading = false;
				state.groups = action.payload ?? [
					{
						group_id: null,
						group_name: '',
						year_of_study: null,
					},
				];
				state.error = {
					status: null,
					message: '',
				};
			})
			.addCase(fetchAllGroups.rejected, (state, { payload }: any) => {
				state.isLoading = false;
				state.error = payload;
			});
	},
});

export const { clearError } = groupsSlice.actions;
export const groupState = (state: RootState) => state.groups;

export default groupsSlice.reducer;