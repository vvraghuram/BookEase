import { format, addDays, addMinutes, isWeekend, parseISO, isBefore, startOfDay } from 'date-fns';

/**
 * Generate the next N working days starting from today
 */
export function getWorkingDays(count = 7) {
  const days = [];
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (days.length < count) {
    if (!isWeekend(cursor)) {
      days.push(new Date(cursor));
    }
    cursor = addDays(cursor, 1);
  }
  return days;
}

/**
 * Generate time slots for a given day
 * e.g. startHour=9, endHour=17, intervalMin=30  →  9:00, 9:30, …, 16:30
 */
export function generateSlots(date, startHour = 9, endHour = 17, intervalMin = 30) {
  const slots = [];
  let current = new Date(date);
  current.setHours(startHour, 0, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, 0, 0, 0);

  while (isBefore(current, end)) {
    slots.push(format(current, 'HH:mm'));
    current = addMinutes(current, intervalMin);
  }
  return slots;
}

/**
 * Format a date object to a readable string
 */
export function formatDate(date) {
  return format(date, 'EEE, dd MMM yyyy');
}

export function formatDateShort(date) {
  return format(date, 'dd MMM');
}

export function formatDay(date) {
  return format(date, 'EEE');
}

export function formatDateKey(date) {
  return format(date, 'yyyy-MM-dd');
}
