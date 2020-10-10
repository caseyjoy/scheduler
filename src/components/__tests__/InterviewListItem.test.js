import React from "react";

import { render, cleanup } from "@testing-library/react";

import InterviewerListItem from "components/InterviewerListItem";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<InterviewerListItem />);
});