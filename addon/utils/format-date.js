import LOCALE_EN from './locales/en';

function replacer(str, reg, data) {
  return str.replace(reg, function (match, p1, p2, p3) {
    return p1 + data + p3;
  });
}

/**
 * Get detailed date object
 * @param {Date} date
 * @return {{
 *  date: number,
 *  hours: number,
 *  fullDate: (string|*),
 *  month: number,
 *  fullHours: (string|*),
 *  year: number,
 *  minutes: number,
 *  fullMonth: string,
 *  day: number,
 *  fullMinutes: (string|*),
 *  hours12: number,
 *  dayPeriod: 'am' | 'pm'
 * }}
 */
function getParsedDate(date) {
  let hours = date.getHours(),
    { hours: hours12, dayPeriod } = getDayPeriodFromHours24(hours);

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    fullMonth:
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1, // One based
    date: date.getDate(),
    fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    day: date.getDay(),
    hours,
    fullHours: getLeadingZeroNum(hours),
    hours12,
    dayPeriod,
    fullHours12: getLeadingZeroNum(hours12),
    minutes: date.getMinutes(),
    fullMinutes:
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
  };
}

function getDayPeriodFromHours24(hours) {
  let hours12 = hours % 12 === 0 ? 12 : hours % 12;
  let dayPeriod = hours > 11 ? 'pm' : 'am';

  return {
    dayPeriod,
    hours: hours12,
  };
}

/**
 * Converts 1 -> 01
 * @param {Number} num
 * @return {String|Number}
 */
function getLeadingZeroNum(num) {
  return num < 10 ? '0' + num : num;
}

/**
 * Calculates current decade
 * @param {Date} date
 * @return {number[]} - array of two years, decade start - decade end
 */
function getDecade(date) {
  let firstYear = Math.floor(date.getFullYear() / 10) * 10;
  return [firstYear, firstYear + 9];
}

function createDate(date) {
  let resultDate = date;

  if (!(date instanceof Date)) {
    resultDate = new Date(date);
  }

  if (isNaN(resultDate.getTime())) {
    console.log(`Unable to convert value "${date}" to Date object`);
    resultDate = false;
  }

  return resultDate;
}

function getWordBoundaryRegExp(sign) {
  let symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';

  return new RegExp(
    '(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')',
    'g'
  );
}

export default function formatDate(date, formatString) {
  date = createDate(date);

  if (!(date instanceof Date)) return;

  let result = formatString,
    locale = LOCALE_EN,
    parsedDate = getParsedDate(date),
    dayPeriod = parsedDate.dayPeriod,
    decade = getDecade(date);

  let formats = {
    // Time in ms
    T: date.getTime(),

    // Minutes
    m: parsedDate.minutes,
    mm: parsedDate.fullMinutes,

    // Hours
    h: parsedDate.hours12,
    hh: parsedDate.fullHours12,
    H: parsedDate.hours,
    HH: parsedDate.fullHours,

    // Day period
    aa: dayPeriod,
    AA: dayPeriod.toUpperCase(),

    // Day of week
    E: locale.daysShort[parsedDate.day],
    EEEE: locale.days[parsedDate.day],

    // Date of month
    d: parsedDate.date,
    dd: parsedDate.fullDate,

    // Months
    M: parsedDate.month + 1,
    MM: parsedDate.fullMonth,
    MMM: locale.monthsShort[parsedDate.month],
    MMMM: locale.months[parsedDate.month],

    // Years
    yy: parsedDate.year.toString().slice(-2),
    yyyy: parsedDate.year,
    yyyy1: decade[0],
    yyyy2: decade[1],
  };

  for (let [format, data] of Object.entries(formats)) {
    result = replacer(result, getWordBoundaryRegExp(format), data);
  }

  return result;
}
