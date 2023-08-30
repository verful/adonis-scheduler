import { test } from '@japa/runner'
import sinon from 'sinon'

import ManagesFrequencies from '../src/manages_frequencies'

test.group('ManagesFrequencies', (group) => {
  group.each.setup(() => {
    return () => sinon.restore()
  })

  test('can create instance', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    assert.instanceOf(managesFrequencies, ManagesFrequencies)
  })

  test('can set timezone', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()
    const timezone = 'America/New_York'

    managesFrequencies.timezone(timezone)

    assert.equal(managesFrequencies['currentTimezone'], timezone)
  })

  test('can set expression with cron', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()
    const expression = '0 0 * * *'

    managesFrequencies.cron(expression)

    assert.equal(managesFrequencies['expression'], expression)
  })

  test('can set expression for every minute', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyMinute()

    assert.equal(managesFrequencies['expression'], '* * * * *')
  })

  test('can set expression for every two minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyTwoMinutes()

    assert.equal(managesFrequencies['expression'], '*/2 * * * *')
  })

  test('can set expression for every three minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyThreeMinutes()

    assert.equal(managesFrequencies['expression'], '*/3 * * * *')
  })

  test('can set expression for every four minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyFourMinutes()

    assert.equal(managesFrequencies['expression'], '*/4 * * * *')
  })

  test('can set expression for every five minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyFiveMinutes()

    assert.equal(managesFrequencies['expression'], '*/5 * * * *')
  })

  test('can set expression for every ten minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyTenMinutes()

    assert.equal(managesFrequencies['expression'], '*/10 * * * *')
  })

  test('can set expression for every fifteen minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyFifteenMinutes()

    assert.equal(managesFrequencies['expression'], '*/15 * * * *')
  })

  test('can set expression for every thirty minutes', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyThirtyMinutes()

    assert.equal(managesFrequencies['expression'], '0,30 * * * *')
  })

  test('can set expression for hourly', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.hourly()

    assert.equal(managesFrequencies['expression'], '0 * * * *')
  })

  test('can set expression for hourly at offset', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.hourlyAt(3)

    assert.equal(managesFrequencies['expression'], '3 * * * *')
  })

  test('can set expression for hourly at multiple offsets', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.hourlyAt([3, 9])

    assert.equal(managesFrequencies['expression'], '3,9 * * * *')
  })

  test('can set expression for every two hours', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyTwoHours()

    assert.equal(managesFrequencies['expression'], '0 */2 * * *')
  })

  test('can set expression for every three hours', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyThreeHours()

    assert.equal(managesFrequencies['expression'], '0 */3 * * *')
  })

  test('can set expression for every four hours', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyFourHours()

    assert.equal(managesFrequencies['expression'], '0 */4 * * *')
  })

  test('can set expression for every six hours', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everySixHours()

    assert.equal(managesFrequencies['expression'], '0 */6 * * *')
  })

  test('can set expression for daily', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.daily()

    assert.equal(managesFrequencies['expression'], '0 0 * * *')
  })

  test('can set expression for daily at specific time', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.dailyAt('12:30')

    assert.equal(managesFrequencies['expression'], '30 12 * * *')
  })

  test('can set expression for twice daily', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.twiceDaily()

    assert.equal(managesFrequencies['expression'], '0 0,12 * * *')
  })

  test('can set expression for twice daily at specific times', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.twiceDailyAt(1, 13)

    assert.equal(managesFrequencies['expression'], '0 1,13 * * *')
  })

  test('can set expression for weekly', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.weekly()

    assert.equal(managesFrequencies['expression'], '0 0 * * 0')
  })

  test('can set expression for weekly on specific days', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.weeklyOn([2, 5], '15:00')

    assert.equal(managesFrequencies['expression'], '0 15 * * 2,5')
  })

  test('can set days of the week', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()
    const daysOfWeek = [1, 2, 3] // Monday, Tuesday, Wednesday

    managesFrequencies.days(daysOfWeek)

    assert.equal(managesFrequencies['expression'], '* * * * 1,2,3')
  })

  test('can set weekdays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.weekdays()

    assert.equal(managesFrequencies['expression'], '* * * * 1-5')
  })

  test('can set weekends', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.weekends()

    assert.equal(managesFrequencies['expression'], '* * * * 6,7')
  })

  test('can set specific day of the week', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.sundays()

    assert.equal(managesFrequencies['expression'], '* * * * 7')
  })

  test('can set expression for mondays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.mondays()

    assert.equal(managesFrequencies['expression'], '* * * * 1')
  })

  test('can set expression for tuesdays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.tuesdays()

    assert.equal(managesFrequencies['expression'], '* * * * 2')
  })

  test('can set expression for wednesdays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.wednesdays()

    assert.equal(managesFrequencies['expression'], '* * * * 3')
  })

  test('can set expression for thursdays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.thursdays()

    assert.equal(managesFrequencies['expression'], '* * * * 4')
  })

  test('can set expression for fridays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.fridays()

    assert.equal(managesFrequencies['expression'], '* * * * 5')
  })

  test('can set expression for saturdays', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.saturdays()

    assert.equal(managesFrequencies['expression'], '* * * * 6')
  })

  test('can combine frequency methods', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.everyTwoHours().weekdays()

    assert.equal(managesFrequencies['expression'], '0 */2 * * 1-5')
  })

  test('can combine frequency methods for specific days', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.weeklyOn([2, 4], '12:00')

    assert.equal(managesFrequencies['expression'], '0 12 * * 2,4')
  })

  test('can set expression for monthly', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.monthly()

    assert.equal(managesFrequencies['expression'], '0 0 1 * *')
  })

  test('can set expression for monthly on specific day and time', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.monthlyOn(15, '14:30')

    assert.equal(managesFrequencies['expression'], '30 14 15 * *')
  })

  test('can set expression for twice monthly', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.twiceMonthly()

    assert.equal(managesFrequencies['expression'], '0 0 1,16 * *')
  })

  test('can set expression for last day of month', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.lastDayOfMonth()

    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    const expectedExpression = `0 0 ${lastDayOfMonth.getDate()} * *`

    assert.equal(managesFrequencies['expression'], expectedExpression)
  })

  test('can set expression for quarterly', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.quarterly()

    assert.equal(managesFrequencies['expression'], '0 0 1 1-12/3 *')
  })

  test('can set expression for yearly', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.yearly()

    assert.equal(managesFrequencies['expression'], '0 0 1 1 *')
  })

  test('can set expression for yearly on specific month and day', ({ assert }) => {
    const managesFrequencies = new ManagesFrequencies()

    managesFrequencies.yearlyOn(6, 20, '10:45')

    assert.equal(managesFrequencies['expression'], '45 10 20 6 *')
  })
})
