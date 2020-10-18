import React from 'react';
import { render, screen, act, cleanup, waitForDomChange } from '@testing-library/react';

import withSplashScreen from "./withSplashScreen";
function EmptyDiv() {
  return (<div></div>);
}
const TestComponent = withSplashScreen(EmptyDiv);

// about before and after
// https://jestjs.io/docs/en/setup-teardown
afterEach(() => {
  cleanup();
})

describe('SplashScreen', () => {
  it('contains wait message', () => {
    render(<TestComponent />);
    // look for wait message
    const loadingText = screen.queryByText(/Wait a moment/i);
    // assert wait message exists
    expect(loadingText).toBeInTheDocument();
  });
  it('goes away after 2 seconds', async () => {
    render(<TestComponent />);
    await act(async () => {
      await waitForDomChange();
    })
    // look for wait message
    const loadingText = screen.queryByText(/Wait a moment/i);
    // assert wait message disappears
    expect(loadingText).not.toBeInTheDocument();
  })
});