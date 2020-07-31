import React, { useState } from 'react';
import CheckInPage from '../CheckInPage';
import InsightsPage from '../InsightsPage';
import NavBar from '../../components/NavBar';
import { PageTitle } from '../../types';
import { useCheckIns } from '../../hooks';

const App = (): JSX.Element => {
  const [page, setPage] = useState<string>(PageTitle.CheckIn);

  const { isLoading, error, data: checkIns } = useCheckIns();

  if (isLoading) return <div>"Loading..."</div>;

  if (error) return <div>{`An error has occurred: ${error.message}`}</div>;

  return (
    <div>
      {<NavBar setPage={setPage} checkIns={checkIns!} />}
      {page === PageTitle.CheckIn && <CheckInPage />}
      {page === PageTitle.Insights && <InsightsPage checkIns={checkIns!} />}
    </div>
  );
};

export default App;
