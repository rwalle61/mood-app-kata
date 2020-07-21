import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

const moods = {
  MIN: 1,
  MID: 4,
  MAX: 7,
};

interface CheckIn {
  date: string;
  mood: number;
}

const sumArray = (array: number[]) =>
  array.reduce((subTotal, element) => subTotal + element);
const averageArray = (array: number[]) => sumArray(array) / array.length;

const getAverageMood = (checkIns: CheckIn[]) => {
  const moods = checkIns.map(({ mood }) => mood);
  return averageArray(moods);
};

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [selectedMood, setSelectedMood] = useState(moods.MID);
  const [averageMood, setAverageMood] = useState(0);

  const onCheckIn = () => {
    const newCheckIns = [...checkIns, { date: Date(), mood: selectedMood }];
    setCheckIns(newCheckIns);
    setAverageMood(getAverageMood(newCheckIns));
  };

  return (
    <div>
      <div>
        <h1>Check In</h1>
        <div>
          <Form>
            <Form.Group controlId='formBasicRange'>
              <Form.Label>My mood</Form.Label>
              <Form.Control
                type='range'
                min={1}
                max={7}
                onChange={(e) => {
                  setSelectedMood(parseInt(e.target.value, 10));
                }}
              />
            </Form.Group>
          </Form>
        </div>
        <div>
          <h2>I'm feeling:</h2>
          <div>depressed</div>
          <div>optimistic</div>
          <div>bored</div>
          <div>happy</div>
        </div>
        <div>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Comment?</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as='textarea' aria-label='With textarea' />
          </InputGroup>
        </div>
        <Button onClick={onCheckIn}>Submit</Button>
      </div>
      <div>
        <h1>Mood Insights</h1>
        <h2>{`Average mood${averageMood ? `: ${averageMood}` : ''}`}</h2>
        <h2>{`${checkIns.length} check-ins`}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Mood</th>
              <th>Feeling</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{checkIns.length && checkIns[0].date}</td>
              <td>4</td>
              <td>happy</td>
              <td>Yay</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default App;
