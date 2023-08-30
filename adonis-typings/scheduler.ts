declare module '@ioc:Verful/Scheduler' {
  import { DateTime } from 'luxon'

  export type ScheduleHandler = () => void
  export type Time = `${string}:${string}`
  export type Condition = () => boolean | Promise<Boolean>

  export interface ManagesFrequenciesContract {
    expression: string
    cron(expression: string): this
    everyMinute(): this
    everyTwoMinutes(): this
    everyThreeMinutes(): this
    everyFourMinutes(): this
    everyFiveMinutes(): this
    everyTenMinutes(): this
    everyFifteenMinutes(): this
    everyThirtyMinutes(): this
    hourly(): this
    hourlyAt(offset: number | number[]): this
    everyTwoHours(): this
    everyFourHours(): this
    everySixHours(): this
    daily(): this
    dailyAt(time: Time): this
    twiceDaily(): this
    twiceDailyAt(first: number, second: number, offset: number): this
    weekly(): this
    weeklyOn(daysOfWeek: number | number[] | string, time: Time): this
    monthly(): this
    monthlyOn(dayOfMonth: number, time: Time): this
    twiceMonthly(first: number, second: number, time: Time): this
    lastDayOfMonth(time: Time): this
    yearly(): this
    yearlyOn(month: number, dayOfMonth?: string | number, time?: Time): this
    days(days: number | number[] | string): this
    weekdays(): this
    weekends(): this
    sundays(): this
    mondays(): this
    tuesdays(): this
    wednesdays(): this
    thursdays(): this
    fridays(): this
    saturdays(): this
  }

  export interface ScheduleContract extends ManagesFrequenciesContract {
    command: ScheduleHandler
    filters: Condition[]
    rejects: Condition[]
    skip(condition: Condition): this
    when(condition: Condition): this
    between(start: Time, end: Time): this
    unlessBetween(start: Time, end: Time): this
    environments(environments: Array<'production' | 'development' | 'staging' | 'test'>): this
  }

  export interface SchedulerContract {
    call(handler: ScheduleHandler): ScheduleContract
    command(command: string | string[]): ScheduleContract
    exec(command: string): ScheduleContract
    start(): void
  }

  const Scheduler: SchedulerContract

  export default Scheduler
}
