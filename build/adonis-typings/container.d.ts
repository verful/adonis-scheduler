/// <reference path="scheduler.d.ts" />
declare module '@ioc:Adonis/Core/Application' {
    import { SchedulerContract } from '@ioc:Verful/Scheduler';
    interface ContainerBindings {
        'Verful/Scheduler': SchedulerContract;
    }
}
