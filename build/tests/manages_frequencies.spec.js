"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const sinon_1 = __importDefault(require("sinon"));
const manages_frequencies_1 = __importDefault(require("../src/manages_frequencies"));
runner_1.test.group('ManagesFrequencies', (group) => {
    group.each.setup(() => {
        return () => sinon_1.default.restore();
    });
    (0, runner_1.test)('can create instance', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        assert.instanceOf(managesFrequencies, manages_frequencies_1.default);
    });
    (0, runner_1.test)('can set timezone', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        const timezone = 'America/New_York';
        managesFrequencies.timezone(timezone);
        assert.equal(managesFrequencies['currentTimezone'], timezone);
    });
    (0, runner_1.test)('can set expression with cron', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        const expression = '0 0 * * *';
        managesFrequencies.cron(expression);
        assert.equal(managesFrequencies['expression'], expression);
    });
    (0, runner_1.test)('can set expression for every minute', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyMinute();
        assert.equal(managesFrequencies['expression'], '* * * * *');
    });
    (0, runner_1.test)('can set expression for every two minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyTwoMinutes();
        assert.equal(managesFrequencies['expression'], '*/2 * * * *');
    });
    (0, runner_1.test)('can set expression for every three minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyThreeMinutes();
        assert.equal(managesFrequencies['expression'], '*/3 * * * *');
    });
    (0, runner_1.test)('can set expression for every four minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyFourMinutes();
        assert.equal(managesFrequencies['expression'], '*/4 * * * *');
    });
    (0, runner_1.test)('can set expression for every five minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyFiveMinutes();
        assert.equal(managesFrequencies['expression'], '*/5 * * * *');
    });
    (0, runner_1.test)('can set expression for every ten minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyTenMinutes();
        assert.equal(managesFrequencies['expression'], '*/10 * * * *');
    });
    (0, runner_1.test)('can set expression for every fifteen minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyFifteenMinutes();
        assert.equal(managesFrequencies['expression'], '*/15 * * * *');
    });
    (0, runner_1.test)('can set expression for every thirty minutes', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyThirtyMinutes();
        assert.equal(managesFrequencies['expression'], '0,30 * * * *');
    });
    (0, runner_1.test)('can set expression for hourly', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.hourly();
        assert.equal(managesFrequencies['expression'], '0 * * * *');
    });
    (0, runner_1.test)('can set expression for hourly at offset', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.hourlyAt(3);
        assert.equal(managesFrequencies['expression'], '3 * * * *');
    });
    (0, runner_1.test)('can set expression for hourly at multiple offsets', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.hourlyAt([3, 9]);
        assert.equal(managesFrequencies['expression'], '3,9 * * * *');
    });
    (0, runner_1.test)('can set expression for every two hours', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyTwoHours();
        assert.equal(managesFrequencies['expression'], '0 */2 * * *');
    });
    (0, runner_1.test)('can set expression for every three hours', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyThreeHours();
        assert.equal(managesFrequencies['expression'], '0 */3 * * *');
    });
    (0, runner_1.test)('can set expression for every four hours', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyFourHours();
        assert.equal(managesFrequencies['expression'], '0 */4 * * *');
    });
    (0, runner_1.test)('can set expression for every six hours', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everySixHours();
        assert.equal(managesFrequencies['expression'], '0 */6 * * *');
    });
    (0, runner_1.test)('can set expression for daily', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.daily();
        assert.equal(managesFrequencies['expression'], '0 0 * * *');
    });
    (0, runner_1.test)('can set expression for daily at specific time', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.dailyAt('12:30');
        assert.equal(managesFrequencies['expression'], '30 12 * * *');
    });
    (0, runner_1.test)('can set expression for twice daily', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.twiceDaily();
        assert.equal(managesFrequencies['expression'], '0 0,12 * * *');
    });
    (0, runner_1.test)('can set expression for twice daily at specific times', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.twiceDailyAt(1, 13);
        assert.equal(managesFrequencies['expression'], '0 1,13 * * *');
    });
    (0, runner_1.test)('can set expression for weekly', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.weekly();
        assert.equal(managesFrequencies['expression'], '0 0 * * 0');
    });
    (0, runner_1.test)('can set expression for weekly on specific days', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.weeklyOn([2, 5], '15:00');
        assert.equal(managesFrequencies['expression'], '0 15 * * 2,5');
    });
    (0, runner_1.test)('can set days of the week', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        const daysOfWeek = [1, 2, 3];
        managesFrequencies.days(daysOfWeek);
        assert.equal(managesFrequencies['expression'], '* * * * 1,2,3');
    });
    (0, runner_1.test)('can set weekdays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.weekdays();
        assert.equal(managesFrequencies['expression'], '* * * * 1-5');
    });
    (0, runner_1.test)('can set weekends', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.weekends();
        assert.equal(managesFrequencies['expression'], '* * * * 6,7');
    });
    (0, runner_1.test)('can set specific day of the week', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.sundays();
        assert.equal(managesFrequencies['expression'], '* * * * 7');
    });
    (0, runner_1.test)('can set expression for mondays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.mondays();
        assert.equal(managesFrequencies['expression'], '* * * * 1');
    });
    (0, runner_1.test)('can set expression for tuesdays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.tuesdays();
        assert.equal(managesFrequencies['expression'], '* * * * 2');
    });
    (0, runner_1.test)('can set expression for wednesdays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.wednesdays();
        assert.equal(managesFrequencies['expression'], '* * * * 3');
    });
    (0, runner_1.test)('can set expression for thursdays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.thursdays();
        assert.equal(managesFrequencies['expression'], '* * * * 4');
    });
    (0, runner_1.test)('can set expression for fridays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.fridays();
        assert.equal(managesFrequencies['expression'], '* * * * 5');
    });
    (0, runner_1.test)('can set expression for saturdays', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.saturdays();
        assert.equal(managesFrequencies['expression'], '* * * * 6');
    });
    (0, runner_1.test)('can combine frequency methods', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.everyTwoHours().weekdays();
        assert.equal(managesFrequencies['expression'], '0 */2 * * 1-5');
    });
    (0, runner_1.test)('can combine frequency methods for specific days', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.weeklyOn([2, 4], '12:00');
        assert.equal(managesFrequencies['expression'], '0 12 * * 2,4');
    });
    (0, runner_1.test)('can set expression for monthly', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.monthly();
        assert.equal(managesFrequencies['expression'], '0 0 1 * *');
    });
    (0, runner_1.test)('can set expression for monthly on specific day and time', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.monthlyOn(15, '14:30');
        assert.equal(managesFrequencies['expression'], '30 14 15 * *');
    });
    (0, runner_1.test)('can set expression for twice monthly', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.twiceMonthly();
        assert.equal(managesFrequencies['expression'], '0 0 1,16 * *');
    });
    (0, runner_1.test)('can set expression for last day of month', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.lastDayOfMonth();
        const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        const expectedExpression = `0 0 ${lastDayOfMonth.getDate()} * *`;
        assert.equal(managesFrequencies['expression'], expectedExpression);
    });
    (0, runner_1.test)('can set expression for quarterly', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.quarterly();
        assert.equal(managesFrequencies['expression'], '0 0 1 1-12/3 *');
    });
    (0, runner_1.test)('can set expression for yearly', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.yearly();
        assert.equal(managesFrequencies['expression'], '0 0 1 1 *');
    });
    (0, runner_1.test)('can set expression for yearly on specific month and day', ({ assert }) => {
        const managesFrequencies = new manages_frequencies_1.default();
        managesFrequencies.yearlyOn(6, 20, '10:45');
        assert.equal(managesFrequencies['expression'], '45 10 20 6 *');
    });
});
