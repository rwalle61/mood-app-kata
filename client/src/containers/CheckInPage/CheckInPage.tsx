import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
  feelings.HAPPY,
  feelings.OPTIMISTIC,
  feelings.DEPRESSED,
  feelings.BORED,
];

type FormLabelProps = {
  label: string;
};

const FormLabel: React.FC<FormLabelProps> = ({ label }) => (
  <Form.Label column='lg'>
    <h5>{label}</h5>
  </Form.Label>
);

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
          <div>
            <Form.Group controlId='formBasicRange'>
              <FormLabel label='My mood' />
              <Form.Control
                type='range'
                min={1}
                max={7}
                onChange={(e) => {
                  setSelectedMood(parseInt(e.target.value, 10));
                }}
              />
            </Form.Group>
          </div>

          <div>
            <FormLabel label={"I'm feeling"} />
            <Row>
              <ButtonGroup>
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
              </ButtonGroup>
            </Row>
          </div>
          <div>
            <FormLabel label='Comment?' />
            <InputGroup>
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
        </Form>
      </div>
      {selectedFeelings.length ? (
        <Button onClick={onCheckIn}>Submit</Button>
      ) : null}
    </div>
  );
};

export default CheckInPage;
