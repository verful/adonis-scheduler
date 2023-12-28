"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const node_cron_1 = __importDefault(require("node-cron"));
const schedule_1 = __importDefault(require("./schedule"));
class Scheduler {
    app;
    events = [];
    constructor(app) {
        this.app = app;
    }
    call(callback) {
        const schedule = new schedule_1.default(this.app, callback);
        this.events.push(schedule);
        return schedule;
    }
    command(command) {
        const commandArguments = Array.isArray(command) ? command : command.split(' ');
        const callback = async () => {
            try {
                const result = await execa_1.default.node('ace', commandArguments);
                return result.stdout;
            }
            catch (error) {
                return error;
            }
        };
        return this.call(callback);
    }
    exec(command) {
        const callback = async () => {
            try {
                const result = await execa_1.default.command(command);
                return result.stdout;
            }
            catch (error) {
                return error;
            }
        };
        return this.call(callback);
    }
    start() {
        this.app.logger.info('Schedule processing started');
        for (const event of this.events)
            node_cron_1.default.schedule(event.expression, async () => {
                for (const filter of event.filters) {
                    if (!(await filter()))
                        return;
                }
                for (const reject of event.rejects) {
                    if (await reject())
                        return;
                }
                return await event.command();
            });
    }
}
exports.default = Scheduler;
