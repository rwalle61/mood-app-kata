import React from 'react';
import { averageArray } from '../../utils';
import { CheckIns } from '../../types/checkin';
import CheckInsTable from '../../components/CheckInsTable';

const getAverageMood = (checkIns: CheckIns) => {
  if (!checkIns.length) {
    return 0;
  }
  const moods = checkIns.map(({ mood }) => mood);
  return averageArray(moods);
};

type InsightsPageProps = {
  checkIns: CheckIns;
};

const InsightsPage: React.FC<InsightsPageProps> = ({ checkIns }) => {
  const averageMood = getAverageMood(checkIns);
  return (
    <div>
      <h5 className='m-4'>{`Average mood: ${averageMood}`}</h5>
      <h5 className='m-4'>{`${checkIns.length} check-in${
        checkIns.length > 1 ? 's' : ''
      }`}</h5>
      <div className='m-4'>
        <CheckInsTable checkIns={checkIns} />
      </div>
    </div>
  );
};

export default InsightsPage;
