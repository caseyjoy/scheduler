function getDayWithName(days, day){
  return days.filter(checkday => checkday.name === day);
}

function getAppointmentsForDay(state, newDay) {
  const search = getDayWithName(state.days, newDay);

  if (search.length > 0) {
    const appList = search[0].appointments;
    return appList.reduce(function (result, a) {
      if (a !== []) result.push(state.appointments[a]);
      return result;
    }, []);
    
  } else {
    return [];
  }
}

function getInterviewersForDay(state, newDay){
  const search = getDayWithName(state.days, newDay);

  if (search.length > 0) {
    const appList = search[0].interviewers;
    return appList.reduce(function (result, a) {
      if (a !== []) result.push(state.interviewers[a]);
      return result;
    }, []);
    
  } else {
    return [];
  }
}




export { getAppointmentsForDay, getInterviewersForDay };
