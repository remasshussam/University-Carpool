import type { RideFormErrors, RideFormValues } from '@/features/driver/types';

export const MIN_SEATS = 1;
export const MAX_SEATS = 6;

export function parseFare(raw: string): number {
  return Number(raw.trim().replace(',', '.'));
}

export function formatDateInput(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatTimeInput(date: Date): string {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${minutes} ${suffix}`;
}

export function parseDateInput(text: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return { year, month, day };
}

export function parseTimeInput(text: string): { hours: number; minutes: number } | null {
  const twelveHour = /^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/.exec(text.trim());
  if (twelveHour) {
    let hours = Number(twelveHour[1]);
    const minutes = Number(twelveHour[2]);
    if (hours < 1 || hours > 12 || minutes > 59) {
      return null;
    }

    const suffix = twelveHour[3].toUpperCase();
    if (suffix === 'AM') {
      hours = hours === 12 ? 0 : hours;
    } else if (hours !== 12) {
      hours += 12;
    }

    return { hours, minutes };
  }

  const twentyFourHour = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(text.trim());
  if (!twentyFourHour) {
    return null;
  }

  return { hours: Number(twentyFourHour[1]), minutes: Number(twentyFourHour[2]) };
}

export function combineDeparture(dateText: string, timeText: string): Date | null {
  const date = parseDateInput(dateText);
  const time = parseTimeInput(timeText);
  if (!date || !time) {
    return null;
  }

  return new Date(date.year, date.month - 1, date.day, time.hours, time.minutes, 0, 0);
}

export function validateRideForm(values: RideFormValues, now = new Date()): RideFormErrors {
  const errors: RideFormErrors = {};
  const pickup = values.pickupPoint.trim();
  const dropoff = values.dropoffPoint.trim();

  if (!pickup) {
    errors.pickupPoint = 'Pickup point is required.';
  }

  if (!dropoff) {
    errors.dropoffPoint = 'Drop-off point is required.';
  }

  if (pickup && dropoff && pickup.toLowerCase() === dropoff.toLowerCase()) {
    errors.dropoffPoint = 'Pickup and destination cannot be identical.';
  }

  if (!parseDateInput(values.departureDate)) {
    errors.departureDate = 'Use the date format YYYY-MM-DD.';
  }

  if (!parseTimeInput(values.departureTime)) {
    errors.departureTime = 'Use a time like 8:00 AM.';
  }

  const departure = combineDeparture(values.departureDate, values.departureTime);
  if (!errors.departureDate && !errors.departureTime && departure && departure.getTime() <= now.getTime()) {
    errors.departureTime = 'Departure date and time must be in the future.';
  }

  if (!Number.isInteger(values.totalSeats) || values.totalSeats < MIN_SEATS || values.totalSeats > MAX_SEATS) {
    errors.totalSeats = `Seats must be an integer from ${MIN_SEATS} to ${MAX_SEATS}.`;
  }

  const fare = parseFare(values.fare);
  if (!Number.isFinite(fare) || fare <= 0) {
    errors.fare = 'Fare must be a positive number in EGP.';
  }

  return errors;
}

export function hasFormErrors(errors: RideFormErrors): boolean {
  return Object.values(errors).some((message) => Boolean(message));
}
