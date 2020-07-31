import React from 'react';
import moment from 'moment';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
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

const getFeelingButton = async (matcher: string) => {
  const feelingSelector = (await screen.findByText(Label.Feeling))
    .parentElement!.parentElement;
  return within(feelingSelector!).getByText(matcher);
};

const getMoodSlider = () => screen.findByRole('slider');

const getCommentBox = () => screen.findByRole('textbox');

const getCheckInButton = () => screen.findByText(Label.Submit);

describe('App - as a user', () => {
  beforeEach(async () => {
    render(<App />);
  });
  describe('when I load the page', () => {
    test('I see the Check In title', async () => {
      expect(await screen.findByText(Label.CheckIn)).toBeInTheDocument();
    });
    test('I see a way to leave an optional comment', async () => {
      expect(await screen.findByRole('textbox')).toBeInTheDocument();
    });
    test('I see the Mood Insights title link disabled (because there are no insights yet)', async () => {
      const insightsTitle = await screen.findByText(Label.Insights);
      expect(insightsTitle).toBeInTheDocument();
      expect(insightsTitle.closest('a')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });
    test('I see a way to select my mood on a scale of 1-7, and a default of 4', async () => {
      const slider = await getMoodSlider();
      expect(slider).toHaveAttribute('min', '1');
      expect(slider).toHaveAttribute('max', '7');
      expect(slider).toHaveValue('4');
    });
    test("I see a way to select how I'm feeling", async () => {
      const feelingSelector = (await screen.findByText(Label.Feeling))
        .parentElement;
      expect(feelingSelector).toBeInTheDocument();
      expect(
        within(feelingSelector!).getByText(Label.Feeling),
      ).toBeInTheDocument();
      expect(await getFeelingButton(Feeling.Depressed)).toBeInTheDocument();
      expect(await getFeelingButton(Feeling.Optimistic)).toBeInTheDocument();
      expect(await getFeelingButton(Feeling.Bored)).toBeInTheDocument();
      expect(await getFeelingButton(Feeling.Happy)).toBeInTheDocument();
    });
    test('I see a way to leave an optional comment', async () => {
      expect(await getCommentBox()).toBeInTheDocument();
    });
    test('I see a button to check in only after I select a feeling', async () => {
      expect(screen.queryByText(Label.Submit)).not.toBeInTheDocument();

      userEvent.click(await getFeelingButton(Feeling.Happy));

      expect(
        screen.getByText(Label.Submit).closest('button'),
      ).toBeInTheDocument();
    });
    test("I can de-select how I'm feeling", async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      expect(
        screen.getByText(Label.Submit).closest('button'),
      ).toBeInTheDocument();

      userEvent.click(await getFeelingButton(Feeling.Happy));

      expect(screen.queryByText(Label.Submit)).toBeNull();
    });
  });
  describe.skip('when I check in my mood and view my mood insights', () => {
    test('I can see Mood Insights and hide the Check In page', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());

      await waitFor(() =>
        expect(
          screen.getByText(Label.Insights).closest('a'),
        ).not.toHaveAttribute('aria-disabled'),
      );
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.queryByText(Label.Feeling)).toBeNull();
    });
    test.skip('I can see my Mood Insights then return to the Check In page', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      userEvent.click(screen.getByText(Label.CheckIn));

      expect(screen.getByText(Label.Feeling)).toBeInTheDocument();
    });
    test.skip('I see the check-ins count appear', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText('1 check-in')).toBeInTheDocument();
    });
    test.skip('I see my average mood matches what I submitted', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText(`${Label.AverageMood}: 4`)).toBeInTheDocument();
    });
    test.skip('I see the check-in I submitted', async () => {
      const checkInDate = moment().format('D MMMM, h:mm a');

      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.type(await getCommentBox(), 'Comment 1');
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      const [head, row1] = screen.getAllByRole('row');
      expect(within(head).getByText('Date and Time')).toBeInTheDocument();
      expect(within(head).getByText('Mood')).toBeInTheDocument();
      expect(within(head).getByText('Feelings')).toBeInTheDocument();
      expect(within(head).getByText('Comment')).toBeInTheDocument();

      expect(within(row1).getByText(checkInDate)).toBeInTheDocument();
      expect(within(row1).getByText('4')).toBeInTheDocument();
      expect(within(row1).getByText(Feeling.Happy)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 1')).toBeInTheDocument();
    });
    test.skip('I see a different check-in I submitted', async () => {
      userEvent.click(await getFeelingButton(Feeling.Optimistic));
      fireEvent.change(await getMoodSlider(), { target: { value: '2' } });
      userEvent.type(await getCommentBox(), 'Comment 2');
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      const [, row1] = screen.getAllByRole('row');
      expect(within(row1).getByText('2')).toBeInTheDocument();
      expect(within(row1).getByText(Feeling.Optimistic)).toBeInTheDocument();
      expect(within(row1).getByText('Comment 2')).toBeInTheDocument();
    });
    test.skip('I can see a check-in with multiple feelings', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getFeelingButton(Feeling.Optimistic));
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      const [, row1] = screen.getAllByRole('row');
      expect(
        within(row1).getByText(`${Feeling.Happy}, ${Feeling.Optimistic}`),
      ).toBeInTheDocument();
    });
    test.skip('I see selected feelings de-select after I check them in', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());

      expect(await getFeelingButton(Feeling.Happy)).not.toHaveClass('active');
    });
  });
  describe.skip('when I check in my mood twice and view my mood insights', () => {
    test('I see the check-ins count increase twice', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());
      userEvent.click(await getFeelingButton(Feeling.Optimistic));
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText('2 check-ins')).toBeInTheDocument();
    });
    test('I see my average mood matches what I submitted those 2 times', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.click(await getCheckInButton());
      userEvent.click(await getFeelingButton(Feeling.Optimistic));
      fireEvent.change(await getMoodSlider(), { target: { value: '2' } });
      userEvent.click(await getCheckInButton());
      userEvent.click(screen.getByText(Label.Insights));

      expect(screen.getByText(`${Label.AverageMood}: 3`)).toBeInTheDocument();
    });
    test('I see the 2 check-ins I submit, ordered by most recently submitted', async () => {
      userEvent.click(await getFeelingButton(Feeling.Happy));
      userEvent.type(await getCommentBox(), 'Comment 1');
      userEvent.click(await getCheckInButton());

      fireEvent.change(await getMoodSlider(), { target: { value: '2' } });
      userEvent.click(await getFeelingButton(Feeling.Optimistic));
      userEvent.type(await getCommentBox(), 'Comment 2');
      userEvent.click(await getCheckInButton());

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
