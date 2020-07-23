import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { insertIfUnique } from '../../utils';
import { CheckIns } from '../../types/checkin';
import FeelingButton from '../../components/FeelingButton';

enum moods {
  MIN = 1,
  MID = 4,
  MAX = 7,
}

enum feelings {
  DEPRESSED = 'depressed',
  OPTIMISTIC = 'optimistic',
  BORED = 'bored',
  HAPPY = 'happy',
}

const defaultFeelings = [
  feelings.DEPRESSED,
  feelings.OPTIMISTIC,
  feelings.BORED,
  feelings.HAPPY,
];

type CheckInPageProps = {
  checkIns: CheckIns;
  setCheckIns: (checkIns: CheckIns) => void;
};

const CheckInPage: React.FC<CheckInPageProps> = ({ checkIns, setCheckIns }) => {
  const [selectedMood, setSelectedMood] = useState(moods.MID);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [currentComment, setCurrentComment] = useState('');

  const selectFeeling = (feeling: string) => {
    setSelectedFeelings(insertIfUnique(selectedFeelings, feeling));
  };

  const deselectFeeling = (feeling: string) => {
    setSelectedFeelings(
      selectedFeelings.filter((selectedFeeling) => selectedFeeling !== feeling),
    );
  };

  const onCheckIn = () => {
    const newCheckIn = {
      date: Date(),
      mood: selectedMood,
      feelings: selectedFeelings,
      comment: currentComment,
    };
    const newCheckIns = [...checkIns, newCheckIn];
    setCheckIns(newCheckIns);
    setCurrentComment('');
    setSelectedFeelings([]);
  };
  return (
    <div>
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
          <FeelingButton
            key={feeling}
            feeling={feeling}
            selectFeeling={selectFeeling}
            deselectFeeling={deselectFeeling}
          >
            {feeling}
          </FeelingButton>
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
      {selectedFeelings.length ? (
        <Button onClick={onCheckIn}>Submit</Button>
      ) : null}
    </div>
  );
};

export default CheckInPage;
