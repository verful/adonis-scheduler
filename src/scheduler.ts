import execa from 'execa'
import cron from 'node-cron'

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ScheduleContract, SchedulerContract } from '@ioc:Verful/Scheduler'

import Schedule from './schedule'

export default class Scheduler implements SchedulerContract {
  private events: Schedule[] = []

  constructor(private app: ApplicationContract) {}

  public call(callback: () => void): ScheduleContract {
    const schedule = new Schedule(this.app, callback)

    this.events.push(schedule)

    return schedule
  }

  public command(command: string | string[]) {
    const commandArguments = Array.isArray(command) ? command : command.split(' ')
    const callback = async () => {
      try {
        const result = await execa.node('ace', commandArguments)
        return result.stdout
      } catch (error) {
        return error
      }
    }

    return this.call(callback)
  }

  public exec(command: string) {
    const callback = async () => {
      try {
        const result = await execa.command(command)
        return result.stdout
      } catch (error) {
        return error
      }
    }

    return this.call(callback)
  }

  public start() {
    this.app.logger.info('Schedule processing started')
    for (const event of this.events)
      cron.schedule(event.expression, async () => {
        for (const filter of event.filters) {
          if (!(await filter())) return
        }

        for (const reject of event.rejects) {
          if (await reject()) return
        }

        return await event.command()
      })
  }
}
