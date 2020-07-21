import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

const labels = {
  MOOD: 'My mood',
  FEELING: "I'm feeling:",
  COMMENT: 'Comment?',
  INSIGHTS: 'Mood Insights',
  AVE_MOOD: 'Average mood',
  CHECK_INS: 'check-ins',
  SUBMIT: 'Submit',
};

describe('App - as a user', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('when I load the page', () => {
    test('I see the Check In title', () => {
      expect(screen.getByText('Check In')).toBeInTheDocument();
    });
    test('I can select my mood on a scale of 1-7', () => {
      const moodSelector = screen.getByText(labels.MOOD).parentElement;
      expect(moodSelector).toBeInTheDocument();
      const slider = within(moodSelector!).getByRole('slider');
      expect(slider).toHaveAttribute('min', '1');
      expect(slider).toHaveAttribute('max', '7');
    });
    test("I can select how I'm feeling", () => {
      const feelingSelector = screen.getByText(labels.FEELING).parentElement;
      expect(feelingSelector).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText(labels.FEELING),
      ).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText('depressed'),
      ).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText('optimistic'),
      ).toBeInTheDocument();
      expect(within(feelingSelector!).getByText('bored')).toBeInTheDocument();
      expect(within(feelingSelector!).getByText('happy')).toBeInTheDocument();
    });
    test('I can write a comment', () => {
      expect(screen.getByText(labels.COMMENT)).toBeInTheDocument();
      const commentSection = screen.getByText(labels.COMMENT).parentElement!
        .parentElement;
      expect(within(commentSection!).getByRole('textbox')).toBeInTheDocument();
    });
    test('I see a button to check in my mood', () => {
      expect(
        screen.getByText(labels.SUBMIT).closest('button'),
      ).toBeInTheDocument();
    });
    test('I can see the Mood insights information', () => {
      expect(screen.getByText(labels.INSIGHTS)).toBeInTheDocument();
      expect(screen.getByText(labels.AVE_MOOD)).toBeInTheDocument();
      expect(screen.getByText('0 check-ins')).toBeInTheDocument();
    });
  });
  describe('when I check in my mood', () => {
    test('I see the check-ins count increase', () => {
      const checkInButton = screen.getByText(labels.SUBMIT);
      userEvent.click(checkInButton);

      expect(screen.getByText('1 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted', () => {
      const checkInButton = screen.getByText(labels.SUBMIT);
      userEvent.click(checkInButton);

      expect(screen.getByText(`${labels.AVE_MOOD}: 4`)).toBeInTheDocument();
    });
    test('I see the check-in I submitted', () => {
      const checkinDate = Date();

      const feelingSelector = screen.getByText(labels.FEELING).parentElement;
      const feelingHappyButton = within(feelingSelector!).getByText('happy');
      userEvent.click(feelingHappyButton);
      const commentSection = screen.getByText(labels.COMMENT).parentElement!
        .parentElement;
      const textBox = within(commentSection!).getByRole('textbox');
      userEvent.type(textBox, 'Yay');
      const checkInButton = screen.getByText(labels.SUBMIT);
      userEvent.click(checkInButton);

      const [head, ...rows] = screen.getAllByRole('row');
      expect(within(head).getByText('Date')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feeling')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(rows[0]).getByText(checkinDate)).toBeInTheDocument();
      expect(within(rows[0]).getByText('4')).toBeInTheDocument();
      expect(within(rows[0]).getByText('happy')).toBeInTheDocument();
      expect(within(rows[0]).getByText('Yay')).toBeInTheDocument();
    });
  });
  describe('when I check in my mood twice', () => {
    test('I see the check-ins count increase twice', () => {
      const checkInButton = screen.getByText(labels.SUBMIT);
      userEvent.click(checkInButton);
      userEvent.click(checkInButton);

      expect(screen.getByText('2 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted those 2 times', () => {
      const moodSelector = screen.getByText(labels.MOOD).parentElement;
      const slider = within(moodSelector!).getByRole('slider');
      const checkInButton = screen.getByText(labels.SUBMIT);

      userEvent.click(checkInButton);
      fireEvent.change(slider, { target: { value: '2' } });
      userEvent.click(checkInButton);

      expect(screen.getByText(`${labels.AVE_MOOD}: 3`)).toBeInTheDocument();
    });
    test('I see the 2 check-ins I submit, ordered by most recent date', () => {
      const checkinDate = Date();

      const feelingSelector = screen.getByText(labels.FEELING).parentElement;
      const feelingHappyButton = within(feelingSelector!).getByText('happy');
      userEvent.click(feelingHappyButton);
      const commentSection = screen.getByText(labels.COMMENT).parentElement!
        .parentElement;
      const textBox = within(commentSection!).getByRole('textbox');
      userEvent.type(textBox, 'Yay');
      const checkInButton = screen.getByText(labels.SUBMIT);
      userEvent.click(checkInButton);

      const checkinDate2 = Date();
      userEvent.click(feelingHappyButton);
      const moodSelector = screen.getByText(labels.MOOD).parentElement;
      const slider = within(moodSelector!).getByRole('slider');
      fireEvent.change(slider, { target: { value: '2' } });
      userEvent.type(textBox, 'Yay');
      userEvent.click(checkInButton);

      const [head, ...rows] = screen.getAllByRole('row');
      expect(within(head).getByText('Date')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feeling')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(rows[0]).getByText(checkinDate2)).toBeInTheDocument();
      expect(within(rows[0]).getByText('2')).toBeInTheDocument();
      expect(within(rows[0]).getByText('happy')).toBeInTheDocument();
      expect(within(rows[0]).getByText('Yay')).toBeInTheDocument();

      expect(within(rows[1]).getByText(checkinDate)).toBeInTheDocument();
      expect(within(rows[1]).getByText('4')).toBeInTheDocument();
      expect(within(rows[1]).getByText('happy')).toBeInTheDocument();
      expect(within(rows[1]).getByText('Yay')).toBeInTheDocument();
    });
  });
});
