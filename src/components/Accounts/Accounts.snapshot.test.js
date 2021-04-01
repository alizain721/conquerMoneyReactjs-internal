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
        className="center"
      >
        <div
          className="tile_no_btn bg-white my-2"
        >
          <div
            className="container"
          >
            <div
              className="row"
            >
              <div
                className="col-12"
              >
                <div
                  className="tile_no_btn_top"
                >
                  <h4
                    className="financial_title proxima-bold text-capitalize mb-2 mt-3"
                  >
                    Get Started with Plaid!
                  </h4>
                  <div>
                    <button
                      className="test"
                      disabled={false}
                      onClick={[Function]}
                      style={
                        Object {
                          "background": "#FFFFFF",
                          "border": "2px solid #F1F1F1",
                          "borderRadius": "4px",
                          "outline": "none",
                          "padding": "6px 4px",
                        }
                      }
                      type="button"
                    >
                      Click this link and connect your bank!
                    </button>
                    <h5>
                      <b>
                        Your Accounts
                      </b>
                    </h5>
                    <div
                      className="accountListContainer"
                    >
                      <div
                        className="accountListDiv"
                      />
                    </div>
                    <div
                      className="text-center"
                    />
                    <div
                      className="alert alert-success mt-2"
                      role="alert"
                      style={
                        Object {
                          "display": "none",
                        }
                      }
                    />
                    <div>
                      <div
                        className="viewTrans"
                        onClick={[Function]}
                      >
                        View Transactions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
