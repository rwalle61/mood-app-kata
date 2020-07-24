import React from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { reverseArray, arrayToString } from '../../utils';
import { CheckIn, CheckIns } from '../../types';

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

export default CheckInsTable;
