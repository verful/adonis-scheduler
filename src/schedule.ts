import { DateTime } from 'luxon'

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Condition, ScheduleContract, ScheduleHandler } from '@ioc:Verful/Scheduler'

import ManagesFrequencies from './manages_frequencies'

export default class Schedule extends ManagesFrequencies implements ScheduleContract {
  constructor(
    private app: ApplicationContract,
    public command: ScheduleHandler
  ) {
    super()
  }

  protected inTimeInterval(startTime: DateTime, endTime: DateTime) {
    const [now, start, end] = [
      DateTime.now().setZone(this.currentTimezone),
      startTime.setZone(this.currentTimezone),
      endTime.setZone(this.currentTimezone),
    ]

    return () => now > start && now < end
  }

  public between(start: DateTime, end: DateTime) {
    return this.when(this.inTimeInterval(start, end))
  }

  public unlessBetween(start: DateTime, end: DateTime) {
    return this.skip(this.inTimeInterval(start, end))
  }

  public filters: Condition[] = []

  public rejects: Condition[] = []

  public skip(condition: Condition) {
    this.rejects.push(condition)

    return this
  }

  public when(condition: Condition) {
    this.filters.push(condition)

    return this
  }

  public environments(environments: Array<'production' | 'development' | 'staging' | 'test'>) {
    this.when(() => environments.includes(this.app.nodeEnvironment as any))

    return this
  }
}
