import React, { useState } from 'react';
import CheckInPage from '../CheckInPage';
import MoodInsightsPage from '../MoodInsightsPage';
import { CheckIns } from '../../types/checkin';

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState<CheckIns>([]);

  return (
    <div>
      {<CheckInPage checkIns={checkIns} setCheckIns={setCheckIns} />}
      {<MoodInsightsPage checkIns={checkIns} />}
    </div>
  );
};

export default App;
