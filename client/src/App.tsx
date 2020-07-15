import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState(0);
  const [averageMood, setAverageMood] = useState(0);

  const onCheckIn = () => {
    setCheckIns(checkIns + 1);
  };

  return (
    <div>
      <div>
        <h1>Check In</h1>
        <div>
          <h2>My mood:</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div
            onClick={() => {
              setAverageMood(4);
            }}
          >
            4
          </div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
        </div>
        <div>
          <h2>I'm feeling:</h2>
          <div>depressed</div>
          <div>optimistic</div>
          <div>bored</div>
          <div>happy</div>
        </div>
        <div>
          <h2>Comment:</h2>
        </div>
        <Button onClick={onCheckIn}>Submit</Button>
      </div>
      <div>
        <h1>Mood Insights</h1>
        <h2>{`Average mood${averageMood ? `: ${averageMood}` : ''}`}</h2>
        <h2>{`${checkIns} check-ins`}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Mood</th>
              <th>Feeling</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>4</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default App;
