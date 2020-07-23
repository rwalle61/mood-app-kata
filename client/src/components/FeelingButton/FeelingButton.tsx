import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

type FeelingButtonProps = {
  feeling: string;
  selectFeeling: (feeling: string) => void;
  deselectFeeling: (feeling: string) => void;
};

const FeelingButton: React.FC<FeelingButtonProps> = ({
  feeling,
  selectFeeling,
  deselectFeeling,
}): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const toggleSelectFeeling = checked ? deselectFeeling : selectFeeling;

  return (
    <ButtonGroup toggle>
      <ToggleButton
        type='checkbox'
        checked={checked}
        value='foo'
        variant={checked ? 'outline-primary' : 'link'}
        onChange={(e) => {
          toggleSelectFeeling(feeling);
          setChecked(e.currentTarget.checked);
        }}
      >
        {feeling}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default FeelingButton;
