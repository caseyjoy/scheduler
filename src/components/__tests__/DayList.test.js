import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayList from "components/DayListItem";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<DayList />);
});