import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { useAppSelector } from '../../app/hooks';
import { tabValue } from './tabsSlice';
import { groupState } from '../groups/groupsSlice';
import { levels } from './StudentTabs';
import TabPanel from '../../components/TabPanel';
import StudentTable from '../../components/StudentTable';
import Accordion from '../../components/Accordion';
import MarksTable from '../../components/MarksTable';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordion: {
			width: '100%',
		},
	})
);

function MarksTabChild() {
	const value = useAppSelector(tabValue);

	return (
		<>
			{levels.map((level, index) => (
				<TabPanel value={value} index={index} key={index}>
					<MarksTable />
				</TabPanel>
			))}
		</>
	);
}

export default MarksTabChild;
