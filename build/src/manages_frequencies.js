"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Weekdays = Object.freeze({
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
});
class ManagesFrequencies {
    expression = '* * * * *';
    currentTimezone = 'UTC';
    timezone(timezone) {
        this.currentTimezone = timezone;
        return this;
    }
    spliceIntoPosition(position, value) {
        const segments = this.expression.split(' ');
        segments[position] = String(value);
        return this.cron(segments.join(' '));
    }
    everyMinute() {
        return this.spliceIntoPosition(0, '*');
    }
    everyTwoMinutes() {
        return this.spliceIntoPosition(0, '*/2');
    }
    everyThreeMinutes() {
        return this.spliceIntoPosition(0, '*/3');
    }
    everyFourMinutes() {
        return this.spliceIntoPosition(0, '*/4');
    }
    everyFiveMinutes() {
        return this.spliceIntoPosition(0, '*/5');
    }
    everyTenMinutes() {
        return this.spliceIntoPosition(0, '*/10');
    }
    everyFifteenMinutes() {
        return this.spliceIntoPosition(0, '*/15');
    }
    everyThirtyMinutes() {
        return this.spliceIntoPosition(0, '0,30');
    }
    hourly() {
        return this.spliceIntoPosition(0, 0);
    }
    hourlyAt(offset) {
        const offsetString = Array.isArray(offset) ? offset.join(',') : offset;
        return this.spliceIntoPosition(0, offsetString);
    }
    everyTwoHours() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/2');
    }
    everyThreeHours() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/3');
    }
    everyFourHours() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/4');
    }
    everySixHours() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/6');
    }
    daily() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, 0);
    }
    dailyAt(time) {
        const [hour, minute] = time.split(':').map((value) => String(Number(value)));
        return this.spliceIntoPosition(0, minute).spliceIntoPosition(1, hour);
    }
    twiceDaily() {
        return this.twiceDailyAt(0, 12, 0);
    }
    twiceDailyAt(first, second, offset = 0) {
        const hours = `${first},${second}`;
        return this.spliceIntoPosition(0, offset).spliceIntoPosition(1, hours);
    }
    weekly() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, 0).spliceIntoPosition(4, 0);
    }
    weeklyOn(daysOfWeek, time) {
        return this.days(daysOfWeek).dailyAt(time);
    }
    monthly() {
        return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, 0).spliceIntoPosition(2, 1);
    }
    monthlyOn(dayOfMonth, time = '00:00') {
        return this.dailyAt(time).spliceIntoPosition(2, dayOfMonth);
    }
    twiceMonthly(first = 1, second = 16, time = '00:00') {
        const daysOfMonth = `${first},${second}`;
        return this.spliceIntoPosition(2, daysOfMonth).dailyAt(time);
    }
    lastDayOfMonth(time = '00:00') {
        return this.spliceIntoPosition(2, luxon_1.DateTime.now().setZone(this.currentTimezone).endOf('month').day).dailyAt(time);
    }
    quarterly() {
        return this.spliceIntoPosition(0, 0)
            .spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 1)
            .spliceIntoPosition(3, '1-12/3');
    }
    yearly() {
        return this.spliceIntoPosition(0, 0)
            .spliceIntoPosition(1, 0)
            .spliceIntoPosition(2, 1)
            .spliceIntoPosition(3, 1);
    }
    yearlyOn(month, dayOfMonth = 1, time = '00:00') {
        return this.spliceIntoPosition(2, dayOfMonth).spliceIntoPosition(3, month).dailyAt(time);
    }
    days(days) {
        const daysString = Array.isArray(days) ? days.join(',') : days;
        return this.spliceIntoPosition(4, daysString);
    }
    weekdays() {
        return this.days(`${Weekdays.MONDAY}-${Weekdays.FRIDAY}`);
    }
    weekends() {
        return this.days(`${Weekdays.SATURDAY},${Weekdays.SUNDAY}`);
    }
    sundays() {
        return this.days(Weekdays.SUNDAY);
    }
    mondays() {
        return this.days(Weekdays.MONDAY);
    }
    tuesdays() {
        return this.days(Weekdays.TUESDAY);
    }
    wednesdays() {
        return this.days(Weekdays.WEDNESDAY);
    }
    thursdays() {
        return this.days(Weekdays.THURSDAY);
    }
    fridays() {
        return this.days(Weekdays.FRIDAY);
    }
    saturdays() {
        return this.days(Weekdays.SATURDAY);
    }
    cron(expression) {
        this.expression = expression;
        return this;
    }
}
exports.default = ManagesFrequencies;
