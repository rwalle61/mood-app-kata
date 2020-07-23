import React, { useState } from 'react';

import CheckInPage from '../CheckInPage';
import MoodInsightsPage from '../MoodInsightsPage';
import NavBar from '../../components/NavBar';
import { CheckIns } from '../../types/checkin';
import { pageTitles } from '../../types/index';

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState<CheckIns>([]);
  const [page, setPage] = useState<string>(pageTitles.CHECK_IN);

  return (
    <div>
      {<NavBar page={page} setPage={setPage} checkIns={checkIns} />}
      {page === pageTitles.CHECK_IN && (
        <CheckInPage checkIns={checkIns} setCheckIns={setCheckIns} />
      )}
      {page === pageTitles.MOOD_INSIGHTS && (
        <MoodInsightsPage checkIns={checkIns} />
      )}
    </div>
  );
};

export default App;
