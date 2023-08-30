import { DateTime } from 'luxon'

import { ManagesFrequenciesContract, Time } from '@ioc:Verful/Scheduler'

const Weekdays = Object.freeze({
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
} as const)

export default class ManagesFrequencies implements ManagesFrequenciesContract {
  public expression = '* * * * *'

  protected currentTimezone = 'UTC'

  public timezone(timezone: string) {
    this.currentTimezone = timezone

    return this
  }

  protected spliceIntoPosition(position: number, value: string | number) {
    const segments = this.expression.split(' ')

    segments[position] = String(value)

    return this.cron(segments.join(' '))
  }

  public everyMinute() {
    return this.spliceIntoPosition(0, '*')
  }

  public everyTwoMinutes() {
    return this.spliceIntoPosition(0, '*/2')
  }

  public everyThreeMinutes() {
    return this.spliceIntoPosition(0, '*/3')
  }

  public everyFourMinutes() {
    return this.spliceIntoPosition(0, '*/4')
  }

  public everyFiveMinutes() {
    return this.spliceIntoPosition(0, '*/5')
  }

  public everyTenMinutes() {
    return this.spliceIntoPosition(0, '*/10')
  }

  public everyFifteenMinutes() {
    return this.spliceIntoPosition(0, '*/15')
  }

  public everyThirtyMinutes() {
    return this.spliceIntoPosition(0, '0,30')
  }

  public hourly() {
    return this.spliceIntoPosition(0, 0)
  }

  public hourlyAt(offset: number | number[]) {
    const offsetString = Array.isArray(offset) ? offset.join(',') : offset

    return this.spliceIntoPosition(0, offsetString)
  }

  public everyTwoHours() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/2')
  }

  public everyThreeHours() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/3')
  }

  public everyFourHours() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/4')
  }

  public everySixHours() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, '*/6')
  }

  public daily() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, 0)
  }

  public dailyAt(time: Time) {
    const [hour, minute] = time.split(':').map((value) => String(Number(value)))

    return this.spliceIntoPosition(0, minute).spliceIntoPosition(1, hour)
  }

  public twiceDaily() {
    return this.twiceDailyAt(0, 12, 0)
  }

  public twiceDailyAt(first: number, second: number, offset: number = 0) {
    const hours = `${first},${second}`

    return this.spliceIntoPosition(0, offset).spliceIntoPosition(1, hours)
  }

  public weekly() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, 0).spliceIntoPosition(4, 0)
  }

  public weeklyOn(daysOfWeek: number | number[] | string, time: Time) {
    return this.days(daysOfWeek).dailyAt(time)
  }

  public monthly() {
    return this.spliceIntoPosition(0, 0).spliceIntoPosition(1, 0).spliceIntoPosition(2, 1)
  }

  public monthlyOn(dayOfMonth: number, time: Time = '00:00') {
    return this.dailyAt(time).spliceIntoPosition(2, dayOfMonth)
  }

  public twiceMonthly(first = 1, second = 16, time: Time = '00:00') {
    const daysOfMonth = `${first},${second}`

    return this.spliceIntoPosition(2, daysOfMonth).dailyAt(time)
  }

  public lastDayOfMonth(time: Time = '00:00') {
    return this.spliceIntoPosition(
      2,
      DateTime.now().setZone(this.currentTimezone).endOf('month').day
    ).dailyAt(time)
  }

  public quarterly() {
    return this.spliceIntoPosition(0, 0)
      .spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 1)
      .spliceIntoPosition(3, '1-12/3')
  }

  public yearly() {
    return this.spliceIntoPosition(0, 0)
      .spliceIntoPosition(1, 0)
      .spliceIntoPosition(2, 1)
      .spliceIntoPosition(3, 1)
  }

  public yearlyOn(month: number, dayOfMonth: string | number = 1, time: Time = '00:00') {
    return this.spliceIntoPosition(2, dayOfMonth).spliceIntoPosition(3, month).dailyAt(time)
  }

  public days(days: number | number[] | string) {
    const daysString = Array.isArray(days) ? days.join(',') : days

    return this.spliceIntoPosition(4, daysString)
  }

  public weekdays() {
    return this.days(`${Weekdays.MONDAY}-${Weekdays.FRIDAY}`)
  }

  public weekends() {
    return this.days(`${Weekdays.SATURDAY},${Weekdays.SUNDAY}`)
  }

  public sundays() {
    return this.days(Weekdays.SUNDAY)
  }

  public mondays() {
    return this.days(Weekdays.MONDAY)
  }

  public tuesdays() {
    return this.days(Weekdays.TUESDAY)
  }

  public wednesdays() {
    return this.days(Weekdays.WEDNESDAY)
  }

  public thursdays() {
    return this.days(Weekdays.THURSDAY)
  }

  public fridays() {
    return this.days(Weekdays.FRIDAY)
  }

  public saturdays() {
    return this.days(Weekdays.SATURDAY)
  }

  public cron(expression: string) {
    this.expression = expression

    return this
  }
}
