import React from 'react';
import { render, screen } from '@testing-library/react';
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
      expect(screen.getByText('My mood:')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
    });
    test("I can select how I'm feeling", () => {
      expect(screen.getByText("I'm feeling:")).toBeInTheDocument();
      expect(screen.getByText('depressed')).toBeInTheDocument();
      expect(screen.getByText('optimistic')).toBeInTheDocument();
      expect(screen.getByText('bored')).toBeInTheDocument();
      expect(screen.getByText('happy')).toBeInTheDocument();
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
});
