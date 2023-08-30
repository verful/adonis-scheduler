import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import sinon from 'sinon'

import Schedule from '../src/schedule'

test.group('Schedule', (group) => {
  group.each.setup(() => {
    // Stub DateTime.now() to a fixed value for consistent testing
    sinon.stub(DateTime, 'now').returns(DateTime.fromMillis(1_627_651_200_000)) // July 31, 2021

    return () => {
      // Restore the stubs
      sinon.restore()
    }
  })

  test('can set between condition', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    const start = DateTime.fromObject({ year: 2021, month: 8, day: 1, hour: 12 })
    const end = DateTime.fromObject({ year: 2021, month: 8, day: 2, hour: 12 })

    schedule.between(start, end)

    assert.lengthOf(schedule.filters, 1)
    assert.isFunction(schedule.filters[0])
  })

  test('can set unlessBetween condition', ({ assert }) => {
    const schedule = new Schedule({} as any, () => {})

    const start = DateTime.fromObject({ year: 2021, month: 8, day: 1, hour: 12 })
    const end = DateTime.fromObject({ year: 2021, month: 8, day: 2, hour: 12 })

    schedule.unlessBetween(start, end)

    assert.lengthOf(schedule.rejects, 1)
    assert.isFunction(schedule.rejects[0])
  })

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
