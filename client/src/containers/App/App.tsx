import React, { useState, useEffect } from 'react';
import CheckInPage from '../CheckInPage';
import InsightsPage from '../InsightsPage';
import NavBar from '../../components/NavBar';
import { CheckIns, PageTitle } from '../../types';
import { getCheckIns } from '../../utils/apiroutes';

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState<CheckIns>([]);
  const [page, setPage] = useState<string>(PageTitle.CheckIn);

  useEffect(() => {
    let mounted = true;

    const fetchCheckIns = async () => {
      const checkIns = await getCheckIns();
      if (mounted) {
        setCheckIns(checkIns);
      }
    };
    fetchCheckIns();

    return () => {
      mounted = false;
    };
  });

  return (
    <div>
      {<NavBar setPage={setPage} checkIns={checkIns} />}
      {page === PageTitle.CheckIn && <CheckInPage />}
      {page === PageTitle.Insights && <InsightsPage checkIns={checkIns} />}
    </div>
  );
};

export default App;
