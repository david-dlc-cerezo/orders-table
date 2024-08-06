import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(
    date: Date,
    displayFormat: { year?: string; month?: string; day?: string }
  ): string {
    if (
      displayFormat.day === 'numeric' &&
      displayFormat.month === 'numeric' &&
      displayFormat.year === 'numeric'
    ) {
      const days = date.getDate();
      const months = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${days}.${months}.${year}`;
    }

    return super.format(date, displayFormat);
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
