import React, { useState } from 'react';
import { uuid } from 'uuidv4';
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

const feelings = {
  DEPRESSED: 'depressed',
  OPTIMISTIC: 'optimistic',
  BORED: 'bored',
  HAPPY: 'happy',
};

const defaultFeelings = [
  feelings.DEPRESSED,
  feelings.OPTIMISTIC,
  feelings.BORED,
  feelings.HAPPY,
];

interface CheckIn {
  date: string;
  mood: number;
  feelings: string[];
  comment: string;
}

const insertIfUnique = (array: string[], element: string) =>
  array.some((e) => e === element) ? array : [...array, element];

const arrayToString = (array: string[]) => array.join(', ');

const sumArray = (array: number[]) =>
  array.reduce((subTotal, element) => subTotal + element);

const averageArray = (array: number[]) => sumArray(array) / array.length;

const deepClone = (array: any[]) => JSON.parse(JSON.stringify(array));

const reverseArray = (array: any[]) => {
  const arrayClone = deepClone(array);
  arrayClone.reverse();
  return arrayClone;
};

const getAverageMood = (checkIns: CheckIn[]) => {
  const moods = checkIns.map(({ mood }) => mood);
  return averageArray(moods);
};

const App = (): JSX.Element => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [selectedMood, setSelectedMood] = useState(moods.MID);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [currentComment, setCurrentComment] = useState('');
  const [averageMood, setAverageMood] = useState(0);

  const onCheckIn = () => {
    const newCheckIns = [
      ...checkIns,
      {
        date: Date(),
        mood: selectedMood,
        feelings: selectedFeelings,
        comment: currentComment,
      },
    ];
    setCheckIns(newCheckIns);
    setAverageMood(getAverageMood(newCheckIns));
    setCurrentComment('');
    setSelectedFeelings([]);
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
          {defaultFeelings.map((feeling) => (
            <Button
              key={feeling}
              onClick={() => {
                setSelectedFeelings(insertIfUnique(selectedFeelings, feeling));
              }}
            >
              {feeling}
            </Button>
          ))}
        </div>
        <div>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Comment?</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={currentComment}
              as='textarea'
              aria-label='With textarea'
              onChange={(e) => {
                setCurrentComment(e.target.value);
              }}
            />
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
              <th>Feelings</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {reverseArray(checkIns).map((checkIn: CheckIn) => (
              <tr key={uuid()}>
                <td>{checkIn.date}</td>
                <td>{checkIn.mood}</td>
                <td>{arrayToString(checkIn.feelings)}</td>
                <td>{checkIn.comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default App;
