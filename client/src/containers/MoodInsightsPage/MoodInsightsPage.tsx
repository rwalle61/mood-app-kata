import React from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { reverseArray, arrayToString, averageArray } from '../../utils';
import { CheckIn, CheckIns } from '../../types/checkin';

const getAverageMood = (checkIns: CheckIns) => {
  if (!checkIns.length) {
    return 0;
  }
  const moods = checkIns.map(({ mood }) => mood);
  return averageArray(moods);
};

type CheckInsTableProps = {
  checkIns: CheckIns;
};

const CheckInsTable: React.FC<CheckInsTableProps> = ({ checkIns }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Date</th>
        <th>Mood</th>
        <th>Feelings</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>
      {reverseArray(checkIns).map((checkIn: CheckIn) => (
        <tr key={uuid()}>
          <td>{moment(checkIn.date).format('dddd, D MMMM YYYY, h:mma')}</td>
          <td>{checkIn.mood}</td>
          <td>{arrayToString(checkIn.feelings)}</td>
          <td>{checkIn.comment}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

type MoodInsightsPageProps = {
  checkIns: CheckIns;
};

const MoodInsightsPage: React.FC<MoodInsightsPageProps> = ({ checkIns }) => {
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

export default MoodInsightsPage;
