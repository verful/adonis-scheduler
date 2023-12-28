"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScheduleProvider {
    app;
    constructor(app) {
        this.app = app;
    }
    register() {
        this.app.container.singleton('Verful/Scheduler', () => {
            const { default: Scheduler } = require('../src/scheduler');
            return new Scheduler(this.app);
        });
    }
}
exports.default = ScheduleProvider;
