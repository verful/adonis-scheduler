import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import sinon from 'sinon'

import Schedule from '../src/schedule'

test.group('Schedule', (group) => {
  group.each.setup(() => {
    // Stub DateTime.now() to a fixed value for consistent testing
    sinon.stub(DateTime, 'now').returns(
      DateTime.fromObject({
        year: 2021,
        month: 7,
        day: 31,
        hour: 7,
        minute: 30,
      })
    ) // July 31, 2021 7:30

    return () => {
      // Restore the stubs
      sinon.restore()
    }
  })

  test('can set between condition', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    const start = '7:00'
    const end = '8:00'

    schedule.between(start, end)

    assert.lengthOf(schedule.filters, 1)
    assert.isFunction(schedule.filters[0])
  })

  test('can set unlessBetween condition', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    const start = '7:00'
    const end = '8:00'

    schedule.unlessBetween(start, end)

    assert.lengthOf(schedule.rejects, 1)
    assert.isFunction(schedule.rejects[0])
  })

  test('can set between condition that wraps midnight', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    const start = '23:00'
    const end = '1:00'

    schedule.between(start, end)

    assert.lengthOf(schedule.filters, 1)
    assert.isFunction(schedule.filters[0])
  })

  test('can set unlessBetween condition that wraps midnight', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    const start = '23:00'
    const end = '1:00'

    schedule.unlessBetween(start, end)

    assert.lengthOf(schedule.filters, 1)
    assert.isFunction(schedule.filters[0])
  })

  test('time interval check is correct', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    assert.isTrue(schedule['inTimeInterval']('7:00', '8:00')())
    assert.isTrue(schedule['inTimeInterval']('23:00', '8:00')())

    assert.isFalse(schedule['inTimeInterval']('6:00', '7:00')())
    assert.isFalse(schedule['inTimeInterval']('23:00', '1:00')())
  }).pin()

  test('can set skip condition', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    schedule.skip(() => true)

    assert.lengthOf(schedule.rejects, 1)
    assert.isFunction(schedule.rejects[0])
  })

  test('can set when condition', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    schedule.when(() => true)

    assert.lengthOf(schedule.filters, 1)
    assert.isFunction(schedule.filters[0])
  })

  test('can set environments condition', ({ assert }) => {
    const schedule = new Schedule({ nodeEnvironment: 'test' } as any, () => {})

    schedule.environments(['test'])

    assert.lengthOf(schedule.filters, 1)
    assert.isFunction(schedule.filters[0])
  })
})
