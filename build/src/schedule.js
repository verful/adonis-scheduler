"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const manages_frequencies_1 = __importDefault(require("./manages_frequencies"));
class Schedule extends manages_frequencies_1.default {
    app;
    command;
    constructor(app, command) {
        super();
        this.app = app;
        this.command = command;
    }
    inTimeInterval(startTime, endTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        let [now, start, end] = [
            luxon_1.DateTime.now().setZone(this.currentTimezone),
            luxon_1.DateTime.now()
                .set({ minute: startMinutes, hour: startHours, second: 0, millisecond: 0 })
                .setZone(this.currentTimezone),
            luxon_1.DateTime.now()
                .set({ minute: endMinutes, hour: endHours, second: 0, millisecond: 0 })
                .setZone(this.currentTimezone),
        ];
        if (end < start) {
            if (start > now) {
                start = start.minus({ days: 1 });
            }
            else {
                end = end.plus({ days: 1 });
            }
        }
        return () => now > start && now < end;
    }
    between(start, end) {
        return this.when(this.inTimeInterval(start, end));
    }
    unlessBetween(start, end) {
        return this.skip(this.inTimeInterval(start, end));
    }
    filters = [];
    rejects = [];
    skip(condition) {
        this.rejects.push(condition);
        return this;
    }
    when(condition) {
        this.filters.push(condition);
        return this;
    }
    environments(environments) {
        this.when(() => environments.includes(this.app.nodeEnvironment));
        return this;
    }
}
exports.default = Schedule;
