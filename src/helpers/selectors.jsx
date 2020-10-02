export function getAppointmentsForDay(state, day) {
  console.log(state)
  if (state.days){
    return state.users.filter(day => state.days === day);
  }
  return [];
}


 