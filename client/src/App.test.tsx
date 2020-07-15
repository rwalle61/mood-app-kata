import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App - as a user', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('when I load the page', () => {
    test('I see the Check In title', () => {
      expect(screen.getByText('Check In')).toBeInTheDocument();
    });
    test('I can select my mood on a scale of 1-7', () => {
      const moodSelector = screen.getByText('My mood:').parentElement;
      expect(moodSelector).toBeInTheDocument();
      expect(within(moodSelector!).getByText('1')).toBeInTheDocument();
      expect(within(moodSelector!).getByText('2')).toBeInTheDocument();
      expect(within(moodSelector!).getByText('3')).toBeInTheDocument();
      expect(within(moodSelector!).getByText('4')).toBeInTheDocument();
      expect(within(moodSelector!).getByText('5')).toBeInTheDocument();
      expect(within(moodSelector!).getByText('6')).toBeInTheDocument();
      expect(within(moodSelector!).getByText('7')).toBeInTheDocument();
    });
    test("I can select how I'm feeling", () => {
      const feelingSelector = screen.getByText("I'm feeling:").parentElement;
      expect(feelingSelector).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText("I'm feeling:"),
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
      expect(screen.getByText('Comment:')).toBeInTheDocument();
    });
    test('I see a button to check in my mood', () => {
      expect(screen.getByText('Submit').closest('button')).toBeInTheDocument();
    });
    test('I can see the Mood insights information', () => {
      expect(screen.getByText('Mood Insights')).toBeInTheDocument();
      expect(screen.getByText('Average mood')).toBeInTheDocument();
      expect(screen.getByText('0 check-ins')).toBeInTheDocument();
    });
  });
  describe('when I check in my mood', () => {
    test('I see the check-ins count increase', () => {
      const checkInButton = screen.getByText('Submit');
      userEvent.click(checkInButton);

      expect(screen.getByText('1 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted', () => {
      const moodSelector = screen.getByText('My mood:').parentElement;
      const mood4Button = within(moodSelector!).getByText('4');
      userEvent.click(mood4Button);
      const checkInButton = screen.getByText('Submit');
      userEvent.click(checkInButton);

      expect(screen.getByText('Average mood: 4')).toBeInTheDocument();
    });
    test('I see the check-in I submitted', () => {
      const checkinDate = Date();

      const moodSelector = screen.getByText('My mood:').parentElement;
      const mood4Button = within(moodSelector!).getByText('4');
      userEvent.click(mood4Button);
      const feelingSelector = screen.getByText("I'm feeling:").parentElement;
      const feelingHappyButton = within(feelingSelector!).getByText('happy');
      userEvent.click(feelingHappyButton);
      const checkInButton = screen.getByText('Submit');
      userEvent.click(checkInButton);

      const [head, ...rows] = screen.getAllByRole('row');
      expect(within(head).getByText('Date')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feeling')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(rows[0]).getByText(checkinDate)).toBeInTheDocument();
      expect(within(rows[0]).getByText('4')).toBeInTheDocument();
      expect(within(rows[0]).getByText('happy')).toBeInTheDocument();
    });
  });
});
