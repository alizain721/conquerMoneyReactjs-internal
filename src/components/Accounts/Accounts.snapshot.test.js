import React from "react";
import renderer from "react-test-renderer";

import Accounts from "./Accounts";

test("render is the same as last snapshot", () => {
  const tree = renderer.create(<Accounts />).toJSON();

  expect(tree).toMatchInlineSnapshot();
});
