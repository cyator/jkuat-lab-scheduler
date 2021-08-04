import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ModalState {
	isOpen: boolean;
}

const initialState: ModalState = {
	isOpen: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { setIsOpen } = modalSlice.actions;

export const modalState = (state: RootState) => state.modal;

export default modalSlice.reducer;
