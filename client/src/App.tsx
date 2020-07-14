import React from 'react';
import Button from 'react-bootstrap/Button';

const App = (): JSX.Element => (
  <div>
    <h1>Check In</h1>
    <h2>My mood:</h2>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <h2>I'm feeling:</h2>
    <div>depressed</div>
    <div>optimistic</div>
    <div>bored</div>
    <div>happy</div>
    <h2>Comment:</h2>
    <Button>Submit</Button>
    <h1>Mood Insights</h1>
    <h2>Average mood</h2>
    <h2>0 check-ins</h2>
  </div>
);

export default App;
