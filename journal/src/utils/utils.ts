function leapYear(year: number): number {
  if (year % 4 === 0) {
    return 29;
  }
  return 28;
}

export function getNumberOfDaysInMonth(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  let days = 0;
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      days = 31;
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      days = 30;
      break;
    default:
      days = leapYear(year);
      break;
  }
  return days;
}

export interface DayType {
  // Previous month days: GRAY
  // Current month days: BLACK
  // Holidays in current month
  color: string,
  date: Date,
}

export const getMonthArray = (date: Date): DayType[][] => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth: number = getNumberOfDaysInMonth(date);
  const firstDayOfMonth: Date = new Date(year, month, 1);
  const dayOne: number = firstDayOfMonth.getDay();
  const dayArray: DayType[][] = [[]];
  let index = 0;

  // Populating days before the 1st of the month with the last few days of the previous month
  const prevMonth = new Date(date.toString());
  prevMonth.setDate(0);
  const daysInPrevMonth = getNumberOfDaysInMonth(prevMonth);
  for (let i = 0; i < dayOne; i++) {
    dayArray[index].push({
      color: 'gray',
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - (dayOne - i - 1)),
    });
  }

  // Populating the days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    if (dayArray[index].length === 7) {
      dayArray.push([]);
      index += 1;
    }
    dayArray[index].push({
      color: 'black',
      date: new Date(year, month, i),
    });
  }

  // Populating the days after the end of the current month with the first few days
  // of the next month
  let count = 1;
  const nextMonth = new Date(date.toString());
  nextMonth.setDate(1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  while (dayArray[index].length !== 7) {
    dayArray[index].push({
      color: 'gray',
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), count),
    });
    count += 1;
  }
  return dayArray;
};

export const getWeekArray = (date: Date): DayType[] => {
  const daysInMonth: number = getNumberOfDaysInMonth(date);
  const dayOfWeek: number = date.getDay();
  const dayArray: DayType[] = [];
  let currDay = date.getDate() - dayOfWeek;

  // Populating days before the 1st of the month with the last few days of the previous month
  const prevMonth = new Date(date.toString());
  prevMonth.setDate(0);
  const daysInPrevMonth = getNumberOfDaysInMonth(prevMonth);
  while (currDay <= 0) {
    dayArray.push({
      color: 'gray',
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth + currDay),
    });
    currDay += 1;
  }

  // Populating the days of the current month
  while (currDay <= daysInMonth && dayArray.length !== 7) {
    dayArray.push({
      color: 'black',
      date: new Date(date.getFullYear(), date.getMonth(), currDay),
    });
    currDay += 1;
  }

  // Populating the days after the end of the current month with the first few days
  // of the next month
  const nextMonth = new Date(date.toString());
  nextMonth.setDate(1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  while (currDay >= daysInMonth && dayArray.length !== 7) {
    dayArray.push({
      color: 'gray',
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), currDay - daysInMonth),
    });
    currDay += 1;
  }

  return dayArray;
};

export const isValidYear = (year: number): boolean => {
  if (Number.isNaN(year)) return false;
  if (year.toString().includes('.')) return false;
  if (year < 1970) return false;
  if (year > 275760) return false;
  return true;
};

export const isValidDay = (day: number, month: number, year: number): boolean => {
  if (Number.isNaN(day)) return false;
  if (day.toString().includes('.')) return false;
  if (!isValidYear(year)) return false;
  if (day < 0) return false;
  const currentMonth = new Date(year, month, 1);
  const numberOfDaysInMonth = getNumberOfDaysInMonth(currentMonth);
  if (day > numberOfDaysInMonth) return false;
  return true;
};

export const isValidHour = (hour: number): boolean => {
  if (Number.isNaN(hour)) return false;
  if (hour.toString().includes('.')) return false;
  if (hour < 0) return false;
  if (hour > 23) return false;
  return true;
};

export const populateDateLabel = (date: string): string => {
  const currentDate: Date = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const dateLabel: string = currentDate.toLocaleString('default', options);
  const weekdayLabel: string = currentDate.toLocaleString('default', { weekday: 'long' });
  return `${weekdayLabel} ${dateLabel}`;
};

export const getFormattedDateString = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month
  let day: string | number = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`
}

export const getISOStringLocal = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDateString = getFormattedDateString(dateString);
  let hours: string | number = date.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes: string | number = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds: string | number = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedDateString}T${hours}:${minutes}:${seconds}`
}