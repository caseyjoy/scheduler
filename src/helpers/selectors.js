function getInterviewerForId(interviewers, id) {
  // find the first interviewer in the list of interviewers that has id
  const search = interviewers.filter((i) => i.id === id);

  if (search.length > 0) {
    // if we found one, return it
    return search[0];
  } else {
    // returns null if it can't find them, because the components expect that for an empty interviewer
    return null;
  }
}

function getDayWithName(days, day) {
  // Takes a list of days, and returns the one with the right name
  const search = days.filter((checkday) => checkday.name === day);
  if (search.length > 0) {
    return search[0];
  } else {
    return false;
  }
}

function getAppointmentsForDay(state, newDay) {
  const search = getDayWithName(state.days, newDay);

  if (search) {
    // looks through each appointment, makes a list of the ones on the right day, then returns them
    return search.appointments.reduce(function (result, a) {
      if (a !== []) result.push(state.appointments[a]);
      return result;
    }, []);
  } else {
    // if the search for the day failed, just return an empty list
    return [];
  }
}

function getInterviewersForDay(state, newDay) {
  const search = getDayWithName(state.days, newDay);

  if (search) {
    // looks through each interviewer, makes a list of the ones on the right day, then returns them
    return search.interviewers.reduce(function (result, a) {
      if (a !== []) result.push(state.interviewers[a]);
      return result;
    }, []);
  } else {
    // if the search for the day failed, just return an empty list
    return [];
  }
}

export {
  getInterviewerForId,
  getAppointmentsForDay,
  getInterviewersForDay,
  getDayWithName,
};
