import React from 'react';
import moment from 'moment';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';
import { Feeling } from '../../types';

enum Label {
  CheckIn = 'Check In',
  Mood = 'My mood',
  Feeling = "I'm feeling",
  Insights = 'Mood Insights',
  AverageMood = 'Average mood',
  Submit = 'Submit',
}

const getFeelingButton = (matcher: string) => {
  const feelingSelector = screen.getByText(Label.Feeling).parentElement
    .parentElement;
  return within(feelingSelector!).getByText(matcher);
};

const getMoodSlider = () => screen.getByRole('slider');

const getCommentBox = () => screen.getByRole('textbox');

const getCheckInButton = () => screen.getByText(Label.Submit);

describe('App - as a user', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('when I load the page', () => {
    test('I see the Check In title', () => {
      expect(screen.getByText(Label.CheckIn)).toBeInTheDocument();
    });
    test('I see the Mood Insights title link disabled (because there are no insights yet)', () => {
      const insightsTitle = screen.getByText(Label.Insights);
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
      const feelingSelector = screen.getByText(Label.Feeling).parentElement;
      expect(feelingSelector).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText(Label.Feeling),
      ).toBeInTheDocument();
      expect(getFeelingButton(Feeling.Depressed)).toBeInTheDocument();
      expect(getFeelingButton(Feeling.Optimistic)).toBeInTheDocument();
      expect(getFeelingButton(Feeling.Bored)).toBeInTheDocument();
      expect(getFeelingButton(Feeling.Happy)).toBeInTheDocument();
    });
    test('I see a way to leave an optional comment', () => {
      expect(getCommentBox()).toBeInTheDocument();
    });
    test('I see a button to check in only after I select a feeling', () => {
      expect(screen.queryByText(Label.Submit)).toBeNull();

      userEvent.click(getFeelingButton(Feeling.Happy));

      expect(
        screen.getByText(Label.Submit).closest('button'),
      ).toBeInTheDocument();
    });
    test("I can de-select how I'm feeling", () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      expect(
        screen.getByText(Label.Submit).closest('button'),
      ).toBeInTheDocument();

      userEvent.click(getFeelingButton(Feeling.Happy));

      expect(screen.queryByText(Label.Submit)).toBeNull();
    });
  });
  describe('when I check in my mood and view my mood insights', () => {
    test('I can see Mood Insights and hide the Check In page', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.queryByText(Label.Feeling)).toBeNull();
    });
    test('I can see my Mood Insights then return to the Check In page', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      userEvent.click(screen.getByText(Label.CheckIn));

      expect(screen.getByText(Label.Feeling)).toBeInTheDocument();
    });
    test('I see the check-ins count appear', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText('1 check-in')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText(`${Label.AverageMood}: 4`)).toBeInTheDocument();
    });
    test('I see the check-in I submitted', async () => {
      const checkinDate = moment().format('dddd, D MMMM YYYY, h:mma');

      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.type(getCommentBox(), 'Comment 1');
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      const [head, row1] = screen.getAllByRole('row');
      expect(within(head).getByText('Date')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feelings')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(row1).getByText(checkinDate)).toBeInTheDocument();
      expect(within(row1).getByText('4')).toBeInTheDocument();
      expect(within(row1).getByText(Feeling.Happy)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 1')).toBeInTheDocument();
    });
    test('I see a different check-in I submitted', () => {
      userEvent.click(getFeelingButton(Feeling.Optimistic));
      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.type(getCommentBox(), 'Comment 2');
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      const [, row1] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText(Feeling.Optimistic)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();
    });
    test('I can see a check-in with multiple feelings', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getFeelingButton(Feeling.Optimistic));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      const [, row1] = screen.getAllByRole('row');
      expect(
        within(row1).getByText(`${Feeling.Happy}, ${Feeling.Optimistic}`),
      ).toBeInTheDocument();
    });
    test('I see selected feelings de-select after I check them in', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());

      expect(getFeelingButton(Feeling.Happy)).not.toHaveClass('active');
    });
  });
  describe('when I check in my mood twice and view my mood insights', () => {
    test('I see the check-ins count increase twice', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());
      userEvent.click(getFeelingButton(Feeling.Optimistic));
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText('2 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted those 2 times', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.click(getCheckInButton());
      userEvent.click(getFeelingButton(Feeling.Optimistic));
      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.click(getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText(`${Label.AverageMood}: 3`)).toBeInTheDocument();
    });
    test('I see the 2 check-ins I submit, ordered by most recently submitted', () => {
      userEvent.click(getFeelingButton(Feeling.Happy));
      userEvent.type(getCommentBox(), 'Comment 1');
      userEvent.click(getCheckInButton());

      fireEvent.change(getMoodSlider(), { target: { value: '2' } });
      userEvent.click(getFeelingButton(Feeling.Optimistic));
      userEvent.type(getCommentBox(), 'Comment 2');
      userEvent.click(getCheckInButton());

      userEvent.click(screen.getByText(Label.Insights));

      const [, row1, row2] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText(Feeling.Optimistic)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();

      expect(within(row2).getByText('4')).toBeInTheDocument();
      expect(within(row2).getByText(Feeling.Happy)).toBeInTheDocument();
      expect(within(row2).getByText('Comment 1')).toBeInTheDocument();
    });
  });
});
