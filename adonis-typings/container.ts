declare module '@ioc:Adonis/Core/Application' {
  import { SchedulerContract } from '@ioc:Verful/Scheduler'

  export interface ContainerBindings {
    'Verful/Scheduler': SchedulerContract
  }
}
