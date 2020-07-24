import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Feeling } from '../../types';

type FeelingButtonProps = {
  feeling: Feeling;
  selectedFeelings: Feeling[];
  selectFeeling: (feeling: Feeling) => void;
  deselectFeeling: (feeling: Feeling) => void;
};

const FeelingButton: React.FC<FeelingButtonProps> = ({
  feeling,
  selectedFeelings,
  selectFeeling,
  deselectFeeling,
}): JSX.Element => {
  const checked = selectedFeelings.includes(feeling);
  const toggleSelectFeeling = checked ? deselectFeeling : selectFeeling;
  return (
    <ButtonGroup toggle>
      <ToggleButton
        type='checkbox'
        checked={checked}
        value='foo'
        variant={checked ? 'outline-primary' : 'link'}
        onChange={() => toggleSelectFeeling(feeling)}
      >
        {feeling}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default FeelingButton;
