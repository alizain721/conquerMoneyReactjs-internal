import React from 'react';
import { render, screen, act, cleanup, waitForDomChange } from '@testing-library/react';
import App from './App';

// about before and after
// https://jestjs.io/docs/en/setup-teardown
afterEach(() => {
  cleanup();
})

describe('App', () => {
  it('shows LoginForm after SplashScreen', async () => {
    render(<App />);
    await act(async () => {
      await waitForDomChange();
    })
    const usernameField = screen.queryByText(/Username/i);
    expect(usernameField).toBeInTheDocument();
  });
});
