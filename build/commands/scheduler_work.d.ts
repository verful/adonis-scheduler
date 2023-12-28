import { BaseCommand } from '@adonisjs/core/build/standalone';
export default class ProcessSchedule extends BaseCommand {
    static commandName: string;
    static description: string;
    static settings: {
        loadApp: boolean;
        stayAlive: boolean;
    };
    run(): Promise<void>;
}
