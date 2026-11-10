/**
 * date.utils
 */

/**
 * Creates a date with the given year, month, date, hour, minute and second. Does not allow over/under-flow of the
 * month and date.
 */
export function createDate(
    year: number,
    month: number,
    date: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
): Date {
    if (month < 0 || month > 11) {
        throw Error(
            `Invalid month index "${month}". Month index has to be between 0 and 11.`
        );
    }

    if (date < 1) {
        throw Error(
            `Invalid date "${date}". Date has to be greater than 0.`
        );
    }

    if (hours < 0 || hours > 23) {
        throw Error(
            `Invalid hours "${hours}". Hours has to be between 0 and 23.`
        );
    }

    if (minutes < 0 || minutes > 59) {
        throw Error(
            `Invalid minutes "${minutes}". Minutes has to between 0 and 59.`
        );
    }

    if (seconds < 0 || seconds > 59) {
        throw Error(
            `Invalid seconds "${seconds}". Seconds has to be between 0 and 59.`
        );
    }

    const result = createDateWithOverflow(
        year,
        month,
        date,
        hours,
        minutes,
        seconds
    );

    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
    if (result.getMonth() !== month) {
        throw Error(
            `Invalid date "${date}" for month with index "${month}".`
        );
    }

    return result;
}

/**
 * Gets the number of days in the month of the given date.
 */
export function getNumDaysInMonth(date: Date): number {
    const lastDateOfMonth = createDateWithOverflow(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    );

    return lastDateOfMonth.getDate();
}

/**
 * Creates a date but allows the month and date to overflow.
 */
function createDateWithOverflow(
    year: number,
    month: number,
    date: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
): Date {
    const result = new Date(year, month, date, hours, minutes, seconds);

    if (year >= 0 && year < 100) {
        result.setFullYear(result.getFullYear() - 1900);
    }
    return result;
}

/**
 * Checks whether the text matches the Intl format of the locale,
 * e.g. `11/9/2026, 1:05 PM` for `en-US` and the full input format.
 * Whitespace in the format literals matches any whitespace,
 * since Intl puts non-breaking spaces where the user types plain ones.
 */
export function isValidIntlFormat(
    value: string,
    locale: string,
    format: Intl.DateTimeFormatOptions
): boolean {
    const dtf = new Intl.DateTimeFormat(locale, { ...format, timeZone: 'utc' });
    let pattern = '^';
    for (const part of dtf.formatToParts()) {
        switch (part.type) {
            case 'day':
                pattern += '(0?[1-9]|[12][0-9]|3[01])';
                break;
            case 'month':
                pattern += '(0?[1-9]|1[0-2])';
                break;
            case 'year':
                pattern += '([0-9]{1,4})';
                break;
            case 'hour':
                pattern += dtf.resolvedOptions().hour12
                    ? '(0?[1-9]|1[0-2])'
                    : '([01]?[0-9]|2[0-3])';
                break;
            case 'minute':
            case 'second':
                pattern += '([0-5]?[0-9])';
                break;
            case 'dayPeriod':
                pattern += '([ap]m?)';
                break;
            case 'literal':
                pattern += part.value
                    .replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
                    .replace(/\s+/g, '\\s+');
                break;
        }
    }
    pattern += '$';
    return new RegExp(pattern, 'i').test(value);
}
