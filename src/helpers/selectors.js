function getAppointmentsForDay(state, newDay) {
  const search = state.days.filter((day) => day.name === newDay);

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

export { getAppointmentsForDay };
