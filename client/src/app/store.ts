import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import drawerReducer from '../features/drawer/drawerSlice';
import tabsReducer from '../features/tabs/tabsSlice';
import groupsReducer from '../features/groups/groupsSlice';
import studentReducer from '../features/students/studentsSlice';
import unitsReducer from '../features/units/unitsSlice';
import modalReducer from '../features/modal/modalSlice';
import authReducer from '../features/auth/authSlice';
import equipmentReducer from '../features/equipment/equipmentSlice';
import profileReducer from '../features/profile/profileSlice';
import practicalsReducer from '../features/practicals/practicalSlice';
import componentsReducer from '../features/equipment/componentsSlice';
import reportsReducer from '../features/reports/reportsSlice';

export const store = configureStore({
	reducer: {
		drawer: drawerReducer,
		tabs: tabsReducer,
		groups: groupsReducer,
		students: studentReducer,
		units: unitsReducer,
		modal: modalReducer,
		auth: authReducer,
		equipments: equipmentReducer,
		profile: profileReducer,
		practicals: practicalsReducer,
		components: componentsReducer,
		reports: reportsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
