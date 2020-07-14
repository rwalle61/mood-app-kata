import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('renders Hello World text', () => {
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
