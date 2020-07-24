import React, { useState } from 'react';

import CheckInPage from '../CheckInPage';
import InsightsPage from '../InsightsPage';
import NavBar from '../../components/NavBar';
import { CheckIns, PageTitle } from '../../types';

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState<CheckIns>([]);
  const [page, setPage] = useState<string>(PageTitle.CheckIn);

  return (
    <div>
      {<NavBar setPage={setPage} checkIns={checkIns} />}
      {page === PageTitle.CheckIn && (
        <CheckInPage checkIns={checkIns} setCheckIns={setCheckIns} />
      )}
      {page === PageTitle.Insights && <InsightsPage checkIns={checkIns} />}
    </div>
  );
};

export default App;
