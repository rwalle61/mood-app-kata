import React from 'react';
import moment from 'moment';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

const labels = {
  CHECK_IN: 'Check In',
  MOOD: 'My mood',
  FEELING: "I'm feeling",
  INSIGHTS: 'Mood Insights',
  AVE_MOOD: 'Average mood',
  CHECK_INS: 'check-ins',
  SUBMIT: 'Submit',
};

enum feelings {
  DEPRESSED = 'Depressed',
  OPTIMISTIC = 'Optimistic',
  BORED = 'Bored',
  HAPPY = 'Happy',
}

const getFeelingButton = (matcher: string) => {
  const feelingSelector = screen.getByText(labels.FEELING).parentElement
    .parentElement;
  return within(feelingSelector!).getByText(matcher);
};

const getMoodSlider = () => screen.getByRole('slider');

const getCommentBox = () => screen.getByRole('textbox');

const getCheckInButton = () => screen.getByText(labels.SUBMIT);

describe('App - as a user', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('when I load the page', () => {
    test('I see the Check In title', () => {
      expect(screen.getByText(labels.CHECK_IN)).toBeInTheDocument();
    });
    test('I see the Mood Insights title link disabled (because there are no insights yet)', () => {
      const insightsTitle = screen.getByText(labels.INSIGHTS);
      expect(insightsTitle).toBeInTheDocument();
      expect(insightsTitle.closest('a')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
    test('I see a way to select my mood on a scale of 1-7, and a default of 4', () => {
      const slider = getMoodSlider();
      expect(slider).toHaveAttribute('min', '1');
      expect(slider).toHaveAttribute('max', '7');
      expect(slider).toHaveValue('4');
    });
    test("I see a way to select how I'm feeling", () => {
      const feelingSelector = screen.getByText(labels.FEELING).parentElement;
      expect(feelingSelector).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText(labels.FEELING),
      ).toBeInTheDocument();
      expect(getFeelingButton(feelings.DEPRESSED)).toBeInTheDocument();
      expect(getFeelingButton(feelings.OPTIMISTIC)).toBeInTheDocument();
      expect(getFeelingButton(feelings.BORED)).toBeInTheDocument();
      expect(getFeelingButton(feelings.HAPPY)).toBeInTheDocument();
    });
    test('I see a way to leave an optional comment', () => {
      expect(getCommentBox()).toBeInTheDocument();
    });
    test('I see a button to check in only after I select a feeling', () => {
      expect(screen.queryByText(labels.SUBMIT)).toBeNull();

      userEvent.click(getFeelingButton(feelings.HAPPY));

      expect(
        screen.getByText(labels.SUBMIT).closest('button'),
      ).toBeInTheDocument();
    });
    test("I can de-select how I'm feeling", () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      expect(
        screen.getByText(labels.SUBMIT).closest('button'),
      ).toBeInTheDocument();

      userEvent.click(getFeelingButton(feelings.HAPPY));

      expect(screen.queryByText(labels.SUBMIT)).toBeNull();
    });
  });
  describe('when I check in my mood and view my mood insights', () => {
    test('I can see Mood Insights and hide the Check In page', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      expect(screen.queryByText(labels.FEELING)).toBeNull();
    });
    test('I can see my Mood Insights then return to the Check In page', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      userEvent.click(screen.getByText(labels.CHECK_IN));

      expect(screen.getByText(labels.FEELING)).toBeInTheDocument();
    });
    test('I see the check-ins count appear', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      expect(screen.getByText('1 check-in')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      expect(screen.getByText(`${labels.AVE_MOOD}: 4`)).toBeInTheDocument();
    });
    test('I see the check-in I submitted', async () => {
      const checkinDate = moment().format('dddd, D MMMM YYYY, h:mma');

      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.type(getCommentBox(), 'Comment 1');
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      const [head, row1] = screen.getAllByRole('row');
      expect(within(head).getByText('Date')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feelings')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(row1).getByText(checkinDate)).toBeInTheDocument();
      expect(within(row1).getByText('4')).toBeInTheDocument();
      expect(within(row1).getByText(feelings.HAPPY)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 1')).toBeInTheDocument();
    });
    test('I see a different check-in I submitted', () => {
      userEvent.click(getFeelingButton(feelings.OPTIMISTIC));
      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.type(getCommentBox(), 'Comment 2');
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      const [, row1] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText(feelings.OPTIMISTIC)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();
    });
    test('I can see a check-in with multiple feelings', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getFeelingButton(feelings.OPTIMISTIC));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      const [, row1] = screen.getAllByRole('row');
      expect(
        within(row1).getByText(`${feelings.HAPPY}, ${feelings.OPTIMISTIC}`),
      ).toBeInTheDocument();
    });
    test('I see selected feelings de-select after I check them in', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());

      expect(getFeelingButton(feelings.HAPPY)).not.toHaveClass('active');
    });
  });
  describe('when I check in my mood twice and view my mood insights', () => {
    test('I see the check-ins count increase twice', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());
      userEvent.click(getFeelingButton(feelings.OPTIMISTIC));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      expect(screen.getByText('2 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted those 2 times', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.click(getCheckInButton());
      userEvent.click(getFeelingButton(feelings.OPTIMISTIC));
      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(labels.INSIGHTS));

      expect(screen.getByText(`${labels.AVE_MOOD}: 3`)).toBeInTheDocument();
    });
    test('I see the 2 check-ins I submit, ordered by most recently submitted', () => {
      userEvent.click(getFeelingButton(feelings.HAPPY));
      userEvent.type(getCommentBox(), 'Comment 1');
      userEvent.click(getCheckInButton());

      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.click(getFeelingButton(feelings.OPTIMISTIC));
      userEvent.type(getCommentBox(), 'Comment 2');
      userEvent.click(getCheckInButton());

      userEvent.click(screen.getByText(labels.INSIGHTS));

      const [, row1, row2] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText(feelings.OPTIMISTIC)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();

      expect(within(row2).getByText('4')).toBeInTheDocument();
      expect(within(row2).getByText(feelings.HAPPY)).toBeInTheDocument();
      expect(within(row2).getByText('Comment 1')).toBeInTheDocument();
    });
  });
});
