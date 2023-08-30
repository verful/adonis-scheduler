import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class ScheduleProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Verful/Scheduler', () => {
      const { default: Scheduler } =
        require('../src/scheduler') as typeof import('../src/scheduler')
      return new Scheduler(this.app)
    })
  }
}
