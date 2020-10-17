import React from "react";
import { render, wait, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import Accounts from "./Accounts";

jest.mock("axios");

describe("Accoount", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls axios once", async () => {
    const showError = jest.fn();
    const { getByText } = render(<Accounts showError={showError} />, { wrapper: MemoryRouter });

    expect(showError).not.toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledTimes(4);
  });
});
