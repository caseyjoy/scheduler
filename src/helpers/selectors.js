// Takes a list of days, and returns the one with the right name
function getDayWithName(days, day){
  const search = days.filter(checkday => checkday.name === day);
  if (search.length > 0){
    return search[0]
  }
    else {
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

function getInterviewersForDay(state, newDay){
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

export { getAppointmentsForDay, getInterviewersForDay, getDayWithName };
