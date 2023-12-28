"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const luxon_1 = require("luxon");
const sinon_1 = __importDefault(require("sinon"));
const schedule_1 = __importDefault(require("../src/schedule"));
runner_1.test.group('Schedule', (group) => {
    group.each.setup(() => {
        sinon_1.default.stub(luxon_1.DateTime, 'now').returns(luxon_1.DateTime.fromObject({
            year: 2021,
            month: 7,
            day: 31,
            hour: 7,
            minute: 30,
        }));
        return () => {
            sinon_1.default.restore();
        };
    });
    (0, runner_1.test)('can set between condition', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        const start = '7:00';
        const end = '8:00';
        schedule.between(start, end);
        assert.lengthOf(schedule.filters, 1);
        assert.isFunction(schedule.filters[0]);
    });
    (0, runner_1.test)('can set unlessBetween condition', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        const start = '7:00';
        const end = '8:00';
        schedule.unlessBetween(start, end);
        assert.lengthOf(schedule.rejects, 1);
        assert.isFunction(schedule.rejects[0]);
    });
    (0, runner_1.test)('can set between condition that wraps midnight', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        const start = '23:00';
        const end = '1:00';
        schedule.between(start, end);
        assert.lengthOf(schedule.filters, 1);
        assert.isFunction(schedule.filters[0]);
    });
    (0, runner_1.test)('can set unlessBetween condition that wraps midnight', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        const start = '23:00';
        const end = '1:00';
        schedule.unlessBetween(start, end);
        assert.lengthOf(schedule.rejects, 1);
        assert.isFunction(schedule.rejects[0]);
    });
    (0, runner_1.test)('time interval check is correct', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        assert.isTrue(schedule['inTimeInterval']('7:00', '8:00')());
        assert.isTrue(schedule['inTimeInterval']('23:00', '8:00')());
        assert.isFalse(schedule['inTimeInterval']('6:00', '7:00')());
        assert.isFalse(schedule['inTimeInterval']('23:00', '1:00')());
    });
    (0, runner_1.test)('can set skip condition', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        schedule.skip(() => true);
        assert.lengthOf(schedule.rejects, 1);
        assert.isFunction(schedule.rejects[0]);
    });
    (0, runner_1.test)('can set when condition', ({ assert }) => {
        const schedule = new schedule_1.default({}, () => { });
        schedule.when(() => true);
        assert.lengthOf(schedule.filters, 1);
        assert.isFunction(schedule.filters[0]);
    });
    (0, runner_1.test)('can set environments condition', ({ assert }) => {
        const schedule = new schedule_1.default({ nodeEnvironment: 'test' }, () => { });
        schedule.environments(['test']);
        assert.lengthOf(schedule.filters, 1);
        assert.isFunction(schedule.filters[0]);
    });
});
