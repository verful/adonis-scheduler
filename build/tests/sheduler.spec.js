"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const execa_1 = __importDefault(require("execa"));
const node_cron_1 = __importDefault(require("node-cron"));
const sinon_1 = __importDefault(require("sinon"));
const scheduler_1 = __importDefault(require("../src/scheduler"));
runner_1.test.group('Scheduler', (group) => {
    group.each.setup(() => {
        return () => sinon_1.default.restore();
    });
    (0, runner_1.test)('calls a callback on scheduling', ({ app, assert }) => {
        const scheduler = new scheduler_1.default(app);
        const callback = sinon_1.default.stub();
        scheduler.call(callback);
        assert.lengthOf(scheduler['events'], 1);
    });
    (0, runner_1.test)('schedules a command to be executed', ({ app, assert }) => {
        sinon_1.default.stub(execa_1.default, 'node');
        const scheduler = new scheduler_1.default(app);
        const command = 'some:command';
        scheduler.command(command);
        assert.lengthOf(scheduler['events'], 1);
    });
    (0, runner_1.test)('schedules an execution of a command', ({ app, assert }) => {
        sinon_1.default.stub(execa_1.default, 'node');
        const scheduler = new scheduler_1.default(app);
        const command = 'some:command';
        scheduler.exec(command);
        assert.lengthOf(scheduler['events'], 1);
    });
    (0, runner_1.test)('the scheduler executes scheduled functions', async ({ app, assert }) => {
        assert.plan(3);
        const scheduler = new scheduler_1.default(app);
        const mockFilter = sinon_1.default.stub().resolves(true);
        const mockReject = sinon_1.default.stub().resolves(false);
        const mockCommand = sinon_1.default.stub().resolves('Command executed');
        scheduler.call(mockCommand).when(mockFilter).skip(mockReject).everyMinute();
        sinon_1.default.stub(node_cron_1.default, 'schedule').callsFake((expression, cronCallback) => {
            cronCallback().then(() => {
                assert.isTrue(mockFilter.called);
                assert.isTrue(mockReject.called);
                assert.isTrue(mockCommand.called);
            });
        });
        await scheduler.start();
    });
    (0, runner_1.test)('the scheduler executes scheduled ace commands', async ({ app, assert }) => {
        assert.plan(3);
        const scheduler = new scheduler_1.default(app);
        const mockFilter = sinon_1.default.stub().resolves(true);
        const mockReject = sinon_1.default.stub().resolves(false);
        scheduler.command('make:user').when(mockFilter).skip(mockReject).everyMinute();
        const execaStub = sinon_1.default.stub(execa_1.default, 'node').resolves({ stdout: 'Command executed' });
        sinon_1.default.stub(node_cron_1.default, 'schedule').callsFake((expression, cronCallback) => {
            cronCallback().then(() => {
                assert.isTrue(mockFilter.called);
                assert.isTrue(mockReject.called);
                assert.isTrue(execaStub.called);
            });
        });
        await scheduler.start();
    });
    (0, runner_1.test)('the scheduler executes scheduled shell commands', async ({ app, assert }) => {
        assert.plan(3);
        const scheduler = new scheduler_1.default(app);
        const mockFilter = sinon_1.default.stub().resolves(true);
        const mockReject = sinon_1.default.stub().resolves(false);
        scheduler.exec('node ace make:user').when(mockFilter).skip(mockReject).everyMinute();
        const execaStub = sinon_1.default.stub(execa_1.default, 'command').resolves({ stdout: 'Command executed' });
        sinon_1.default.stub(node_cron_1.default, 'schedule').callsFake((expression, cronCallback) => {
            cronCallback().then(() => {
                assert.isTrue(mockFilter.called);
                assert.isTrue(mockReject.called);
                assert.isTrue(execaStub.called);
            });
        });
        await scheduler.start();
    });
});
