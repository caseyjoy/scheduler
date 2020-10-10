import React from "react";

import { render, cleanup } from "@testing-library/react";

import List from "components/List";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<List />);
});