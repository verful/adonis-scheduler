import { test } from '@japa/runner'
import execa from 'execa'
import cron from 'node-cron'
import sinon from 'sinon'

import Scheduler from '../src/scheduler'

test.group('Scheduler', (group) => {
  group.each.setup(() => {
    return () => sinon.restore()
  })

  test('calls a callback on scheduling', ({ app, assert }) => {
    const scheduler = new Scheduler(app)
    const callback = sinon.stub()

    scheduler.call(callback)

    assert.lengthOf(scheduler['events'], 1)
  })

  test('schedules a command to be executed', ({ app, assert }) => {
    sinon.stub(execa, 'node')

    const scheduler = new Scheduler(app)
    const command = 'some:command'
    scheduler.command(command)

    assert.lengthOf(scheduler['events'], 1)
  })

  test('schedules an execution of a command', ({ app, assert }) => {
    sinon.stub(execa, 'node')

    const scheduler = new Scheduler(app)
    const command = 'some:command'
    scheduler.exec(command)

    assert.lengthOf(scheduler['events'], 1)
  })

  test('the scheduler executes scheduled functions', async ({ app, assert }) => {
    assert.plan(3)

    const scheduler = new Scheduler(app)
    const mockFilter = sinon.stub().resolves(true)
    const mockReject = sinon.stub().resolves(false)
    const mockCommand = sinon.stub().resolves('Command executed')

    scheduler.call(mockCommand).when(mockFilter).skip(mockReject).everyMinute()

    // @ts-ignore: Simulate cron triggering the callback
    sinon.stub(cron, 'schedule').callsFake((expression, cronCallback) => {
      // @ts-ignore
      cronCallback().then(() => {
        assert.isTrue(mockFilter.called)
        assert.isTrue(mockReject.called)
        assert.isTrue(mockCommand.called)
      })
    })

    await scheduler.start()
  })

  test('the scheduler executes scheduled ace commands', async ({ app, assert }) => {
    assert.plan(3)

    const scheduler = new Scheduler(app)
    const mockFilter = sinon.stub().resolves(true)
    const mockReject = sinon.stub().resolves(false)

    scheduler.command('make:user').when(mockFilter).skip(mockReject).everyMinute()

    // @ts-ignore: stub execa.node to avoid executing the command
    const execaStub = sinon.stub(execa, 'node').resolves({ stdout: 'Command executed' })

    // @ts-ignore: Simulate cron triggering the callback
    sinon.stub(cron, 'schedule').callsFake((expression, cronCallback) => {
      // @ts-ignore
      cronCallback().then(() => {
        assert.isTrue(mockFilter.called)
        assert.isTrue(mockReject.called)
        assert.isTrue(execaStub.called)
      })
    })

    await scheduler.start()
  })

  test('the scheduler executes scheduled shell commands', async ({ app, assert }) => {
    assert.plan(3)

    const scheduler = new Scheduler(app)
    const mockFilter = sinon.stub().resolves(true)
    const mockReject = sinon.stub().resolves(false)

    scheduler.exec('node ace make:user').when(mockFilter).skip(mockReject).everyMinute()

    // @ts-ignore: stub execa.node to avoid executing the command
    const execaStub = sinon.stub(execa, 'command').resolves({ stdout: 'Command executed' })

    // @ts-ignore: Simulate cron triggering the callback
    sinon.stub(cron, 'schedule').callsFake((expression, cronCallback) => {
      // @ts-ignore
      cronCallback().then(() => {
        assert.isTrue(mockFilter.called)
        assert.isTrue(mockReject.called)
        assert.isTrue(execaStub.called)
      })
    })

    await scheduler.start()
  })
})
