import {
  getInterviewerForId,
  getDayWithName,
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors";

const state = {
  interviewers: [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
  ],
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 4],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [3, 5, 2],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
};

/* getInterviewerForId */
test("getInterviewerForId returns the expected interviewer", () => {
  const result = getInterviewerForId(state.interviewers, 1);
  expect(result).toMatchObject(state.interviewers[0]);
});

test("getInterviewerForId returns null for invalid interviewers", () => {
  const result = getInterviewerForId(state.interviewers, 1000);
  expect(result).toBe(null);
});

/* getDayWithName */
test("getInterviewerForId returns the expected day", () => {
  const result = getDayWithName(state.days, "Tuesday");
  expect(result).toMatchObject(state.days[1]);
});

test("getInterviewerForId returns null for invalid interviewers", () => {
  const result = getDayWithName(state.days, "Friday");
  expect(result).toBe(false);
});

/* getAppointmentsForDay */
test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

/* getInterviewersForDay */
test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(2);
});

test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  const [first, second, third] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["3"]);
  expect(second).toEqual(state.interviewers["5"]);
  expect(third).toEqual(state.interviewers["2"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});
