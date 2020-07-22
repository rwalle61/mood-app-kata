import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

const labels = {
  CHECK_IN: 'Check In',
  MOOD: 'My mood',
  FEELING: "I'm feeling:",
  COMMENT: 'Comment?',
  INSIGHTS: 'Mood Insights',
  AVE_MOOD: 'Average mood',
  CHECK_INS: 'check-ins',
  SUBMIT: 'Submit',
};

const getFeelingButton = (matcher: string) => {
  const feelingSelector = screen.getByText(labels.FEELING).parentElement;
  return within(feelingSelector!).getByText(matcher);
};

const getMoodSlider = () => {
  const moodSelector = screen.getByText(labels.MOOD).parentElement;
  return within(moodSelector!).getByRole('slider');
};

const getCommentBox = () => {
  const commentSection = screen.getByText(labels.COMMENT).parentElement!
    .parentElement;
  return within(commentSection!).getByRole('textbox');
};

const getCheckInButton = () => screen.getByText(labels.SUBMIT);

describe('App - as a user', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('when I load the page', () => {
    test('I see the Check In title', () => {
      expect(screen.getByText(labels.CHECK_IN)).toBeInTheDocument();
    });
    test('I see a way to select my mood on a scale of 1-7', () => {
      const slider = getMoodSlider();
      expect(slider).toHaveAttribute('min', '1');
      expect(slider).toHaveAttribute('max', '7');
    });
    test("I see a way to select how I'm feeling", () => {
      const feelingSelector = screen.getByText(labels.FEELING).parentElement;
      expect(feelingSelector).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText(labels.FEELING),
      ).toBeInTheDocument();
      expect(getFeelingButton('depressed')).toBeInTheDocument();
      expect(getFeelingButton('optimistic')).toBeInTheDocument();
      expect(getFeelingButton('bored')).toBeInTheDocument();
      expect(getFeelingButton('happy')).toBeInTheDocument();
    });
    test('I see a way to leave an optional comment', () => {
      expect(screen.getByText(labels.COMMENT)).toBeInTheDocument();
      expect(getCommentBox()).toBeInTheDocument();
    });
    test('I see a button to check in only after I select a feeling', () => {
      expect(screen.queryByText(labels.SUBMIT)).toBeNull();

      userEvent.click(getFeelingButton('happy'));

      expect(
        screen.getByText(labels.SUBMIT).closest('button'),
      ).toBeInTheDocument();
    });
    test("I can de-select how I'm feeling", () => {
      userEvent.click(getFeelingButton('happy'));
      expect(
        screen.getByText(labels.SUBMIT).closest('button'),
      ).toBeInTheDocument();

      userEvent.click(getFeelingButton('happy'));

      expect(screen.queryByText(labels.SUBMIT)).toBeNull();
    });
    test('I see the Mood insights information', () => {
      expect(screen.getByText(labels.INSIGHTS)).toBeInTheDocument();
      expect(screen.getByText(labels.AVE_MOOD)).toBeInTheDocument();
      expect(screen.getByText('0 check-ins')).toBeInTheDocument();
    });
  });
  describe('when I check in my mood', () => {
    test('I see the check-ins count increase', () => {
      userEvent.click(getFeelingButton('happy'));
      userEvent.click(getCheckInButton());

      expect(screen.getByText('1 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted', () => {
      userEvent.click(getFeelingButton('happy'));
      userEvent.click(getCheckInButton());

      expect(screen.getByText(`${labels.AVE_MOOD}: 4`)).toBeInTheDocument();
    });
    test('I see the check-in I submitted', async () => {
      const checkinDate = Date();

      userEvent.click(getFeelingButton('happy'));
      userEvent.type(getCommentBox(), 'Comment 1');
      userEvent.click(getCheckInButton());

      const [head, row1] = screen.getAllByRole('row');
      expect(within(head).getByText('Date')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feelings')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(row1).getByText(checkinDate)).toBeInTheDocument();
      expect(within(row1).getByText('4')).toBeInTheDocument();
      expect(within(row1).getByText('happy')).toBeInTheDocument();
      expect(within(row1).getByText('Comment 1')).toBeInTheDocument();
    });
    test('I see a different check-in I submitted', () => {
      userEvent.click(getFeelingButton('optimistic'));
      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.type(getCommentBox(), 'Comment 2');
      userEvent.click(getCheckInButton());

      const [, row1] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText('optimistic')).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();
    });
    test('I can see a check-in with multiple feelings', () => {
      userEvent.click(getFeelingButton('happy'));
      userEvent.click(getFeelingButton('optimistic'));
      userEvent.click(getCheckInButton());

      const [, row1] = screen.getAllByRole('row');
      expect(within(row1).getByText('happy, optimistic')).toBeInTheDocument();
    });
  });
  describe('when I check in my mood twice', () => {
    test('I see the check-ins count increase twice', () => {
      userEvent.click(getFeelingButton('happy'));
      userEvent.click(getCheckInButton());
      userEvent.click(getFeelingButton('optimistic'));
      userEvent.click(getCheckInButton());

      expect(screen.getByText('2 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted those 2 times', () => {
      userEvent.click(getFeelingButton('happy'));
      userEvent.click(getCheckInButton());
      userEvent.click(getFeelingButton('optimistic'));
      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.click(getCheckInButton());

      expect(screen.getByText(`${labels.AVE_MOOD}: 3`)).toBeInTheDocument();
    });
    test('I see the 2 check-ins I submit, ordered by most recently submitted', () => {
      userEvent.click(getFeelingButton('happy'));
      userEvent.type(getCommentBox(), 'Comment 1');
      userEvent.click(getCheckInButton());

      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.click(getFeelingButton('optimistic'));
      userEvent.type(getCommentBox(), 'Comment 2');
      userEvent.click(getCheckInButton());

      const [, row1, row2] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText('optimistic')).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();

      expect(within(row2).getByText('4')).toBeInTheDocument();
      expect(within(row2).getByText('happy')).toBeInTheDocument();
      expect(within(row2).getByText('Comment 1')).toBeInTheDocument();
    });
  });
});
