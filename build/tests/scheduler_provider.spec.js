"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const scheduler_1 = __importDefault(require("../src/scheduler"));
runner_1.test.group('SchedulerProvider', () => {
    (0, runner_1.test)('Bindings registered correctly', ({ assert, app }) => {
        assert.instanceOf(app.container.resolveBinding('Verful/Scheduler'), scheduler_1.default);
    });
});
