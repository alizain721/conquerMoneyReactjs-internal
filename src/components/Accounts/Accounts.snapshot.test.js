import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Accounts from "./Accounts";

test("render is the same as last snapshot", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Accounts />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="accountsPage"
    >
      <div
        className="split left"
      />
      <div
        className="split right"
      >
        <div
          className="cashCard text-center card"
        >
          <div
            className="card-header"
          >
            <div
              className="largeText2"
            >
              <div
                className="leftText"
              >
                Total Cash
              </div>
              <div
                className="rightText"
              >
                $
              </div>
            </div>
          </div>
          <div
            className="largeText"
          >
            <div
              className="leftText"
            >
              Checking
            </div>
            <div
              className="rightText"
            >
              $
            </div>
          </div>
          <div
            className="largeText"
          >
            <div
              className="leftText"
            >
              Savings
            </div>
            <div
              className="rightText"
            >
              $
            </div>
          </div>
          <div
            className="text-muted card-footer"
          >
            2 days ago
          </div>
        </div>
        <div
          className="creditCard text-center card"
        >
          <div
            className="card-header"
          >
            <div
              className="largeText2"
            >
              <div
                className="leftText"
              >
                Credit Cards
              </div>
              <div
                className="rightText"
              >
                -$
              </div>
            </div>
          </div>
          <div
            className="text-muted card-footer"
          >
            2 days ago
          </div>
        </div>
        <div
          className="loanCard text-center card"
        >
          <div
            className="card-header"
          >
            <div
              className="largeText2"
            >
              <div
                className="leftText"
              >
                Loans
              </div>
              <div
                className="rightText"
              />
            </div>
          </div>
          <div
            className="text-muted card-footer"
          />
        </div>
      </div>
    </div>
  `);
});
