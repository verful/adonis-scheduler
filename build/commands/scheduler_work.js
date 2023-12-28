"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
class ProcessSchedule extends standalone_1.BaseCommand {
    static commandName = 'scheduler:work';
    static description = 'Process the scheduled tasks';
    static settings = {
        loadApp: true,
        stayAlive: true,
    };
    async run() {
        this.application.container.use('Verful/Scheduler').start();
    }
}
exports.default = ProcessSchedule;
