import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import App from './App';

// about before and after
// https://jestjs.io/docs/en/setup-teardown

// use fake timers in tests and return to real timers after
beforeEach(() => {
  jest.useFakeTimers();
})

afterEach(() => {
  // must flush pending timers before returning to real timers
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup();
})

describe('SplashScreen', () => {
  it('contains wait message', () => {
    render(<App />);
    // look for wait message
    const loadingText = screen.queryByText(/Wait a moment/i);
    // assert wait message exists
    expect(loadingText).toBeInTheDocument();
  });
  it('goes away after 2 seconds', () => {
    render(<App />);
    // pass 2 seconds
    act(() => jest.advanceTimersByTime(2000));
    // look for wait message
    const loadingText = screen.queryByText(/Wait a moment/i);
    // assert wait message disappears
    expect(loadingText).not.toBeInTheDocument();
  })
});
