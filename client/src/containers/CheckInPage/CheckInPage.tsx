import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import { insertIfUnique } from '../../utils';
import { Feeling, CheckIns } from '../../types';
import FeelingButton from '../../components/FeelingButton';

enum Mood {
  Min = 1,
  Mid = 4,
  Max = 7,
}

const defaultFeelings = [
  Feeling.Happy,
  Feeling.Optimistic,
  Feeling.Depressed,
  Feeling.Bored,
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
  const [selectedMood, setSelectedMood] = useState(Mood.Mid);
  const [selectedFeelings, setSelectedFeelings] = useState<Feeling[]>([]);
  const [currentComment, setCurrentComment] = useState('');

  const selectFeeling = (feeling: Feeling) => {
    setSelectedFeelings(insertIfUnique(selectedFeelings, feeling));
  };

  const deselectFeeling = (feeling: Feeling) => {
    setSelectedFeelings(
      selectedFeelings.filter((selectedFeeling) => selectedFeeling !== feeling),
    );
  };

  const onCheckIn = () => {
    const newCheckIn = {
      date: new Date(),
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
          <div className='m-4'>
            <Form.Group controlId='formBasicRange'>
              <FormLabel label='My mood' />
              <RangeSlider
                min={Mood.Min}
                max={Mood.Max}
                tooltip='auto'
                value={selectedMood}
                onChange={(e: any) => {
                  setSelectedMood(parseInt(e.target.value, 10));
                }}
              />
            </Form.Group>
          </div>

          <div className='m-4'>
            <FormLabel label={"I'm feeling"} />
            <Row className='justify-content-center'>
              <ButtonGroup>
                {defaultFeelings.map((feeling) => (
                  <FeelingButton
                    key={feeling}
                    feeling={feeling}
                    selectedFeelings={selectedFeelings}
                    selectFeeling={selectFeeling}
                    deselectFeeling={deselectFeeling}
                  >
                    {feeling}
                  </FeelingButton>
                ))}
              </ButtonGroup>
            </Row>
          </div>
          <div className='m-4'>
            <InputGroup size='sm'>
              <FormControl
                value={currentComment}
                as='textarea'
                placeholder='Optional comment'
                onChange={(e) => {
                  setCurrentComment(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </Form>
      </div>
      {selectedFeelings.length ? (
        <Row className='justify-content-center'>
          <Button onClick={onCheckIn}>Submit</Button>
        </Row>
      ) : null}
    </div>
  );
};

export default CheckInPage;
