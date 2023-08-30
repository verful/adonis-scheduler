import { test } from '@japa/runner'

import Scheduler from '../src/scheduler'

test.group('SchedulerProvider', () => {
  test('Bindings registered correctly', ({ assert, app }) => {
    assert.instanceOf(app.container.resolveBinding('Verful/Scheduler'), Scheduler)
  })
})
