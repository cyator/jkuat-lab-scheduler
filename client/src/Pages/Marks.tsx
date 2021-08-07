import React from 'react';
import MarksTabs from '../features/tabs/MarksTabs';
import MarksTabChild from '../features/tabs/MarksTabsChild';

function Marks() {
	return (
		<div>
			<MarksTabs render={() => <MarksTabChild />} />
		</div>
	);
}

export default Marks;
