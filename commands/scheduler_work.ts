import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class ProcessSchedule extends BaseCommand {
  public static commandName = 'scheduler:work'

  public static description = 'Process the scheduled tasks'

  public static settings = {
    loadApp: true,
    stayAlive: true,
  }

  public async run() {
    this.application.container.use('Verful/Scheduler').start()
  }
}
