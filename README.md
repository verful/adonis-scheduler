<div align="center">
  <img src="https://github.com/verful/adonis-scheduler/raw/main/.github/banner.png" width="1200px">
</div>


<div align="center">
  <h2><b>Adonis Scheduler</b></h2>
  <p>Schedule tasks in AdonisJS with ease</p>
</div>

<div align="center">

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

</div>


## **Pre-requisites**
The `@verful/scheduler` package requires `@adonisjs/core >= 5.9.0`

## **Setup**

Install the package from the npm registry as follows.

```
npm i @verful/scheduler
# or
yarn add @verful/scheduler
```

Next, configure the package by running the following ace command.

```
node ace configure @verful/scheduler
```

## **Defining Scheduled Tasks**
You may define all of your scheduled tasks in the `start/tasks.ts` preloaded file. To get started, let's take a look at an example. In this example, we will schedule a closure to be called every day at midnight. Within the closure we will execute a database query to clear a table:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'
import Database from '@ioc:Adonis/Lucid/Database'

Scheduler.call(async () => {
  Database.from('recent_users').delete()
}).daily()

```

### Scheduling Ace Commands

In addition to scheduling closures, you may also schedule Ace commands and system commands. For example, you may use the command method to schedule an Ace command using the commands name.

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('queue:flush').everyFiveMinutes()
```

### Scheduling Shell Commands

The `exec` method may be used to issue a command to the operating system:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.exec('node script.js').daily()
```

### Schedule Frequency Options

We've already seen a few examples of how you may configure a task to run at specified intervals. However, there are many more task schedule frequencies that you may assign to a task:

| Method                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `.cron('* * * * *')`            | Run the task on a custom cron schedule                  |
| `.everyMinute()`                | Run the task every minute                               |
| `.everyTwoMinutes()`            | Run the task every two minutes                          |
| `.everyThreeMinutes()`          | Run the task every three minutes                        |
| `.everyFourMinutes()`           | Run the task every four minutes                         |
| `.everyFiveMinutes()`           | Run the task every five minutes                         |
| `.everyTenMinutes()`            | Run the task every ten minutes                          |
| `.everyFifteenMinutes()`        | Run the task every fifteen minutes                      |
| `.everyThirtyMinutes()`         | Run the task every thirty minutes                       |
| `.hourly()`                     | Run the task every hour                                 |
| `.hourlyAt(17)`                 | Run the task every hour at 17 minutes past the hour     |
| `.everyOddHour(minutes)`        | Run the task every odd hour                             |
| `.everyTwoHours(minutes)`       | Run the task every two hours                            |
| `.everyThreeHours(minutes)`     | Run the task every three hours                          |
| `.everyFourHours(minutes)`      | Run the task every four hours                           |
| `.everySixHours(minutes)`       | Run the task every six hours                            |
| `.daily()`                      | Run the task every day at midnight                      |
| `.dailyAt('13:00')`             | Run the task every day at 13:00                         |
| `.twiceDaily(1, 13)`            | Run the task daily at 1:00 & 13:00                      |
| `.twiceDailyAt(1, 13, 15)`      | Run the task daily at 1:15 & 13:15                      |
| `.weekly()`                     | Run the task every Sunday at 00:00                      |
| `.weeklyOn(1, '8:00')`          | Run the task every week on Monday at 8:00               |
| `.monthly()`                    | Run the task on the first day of every month at 00:00   |
| `.monthlyOn(4, '15:00')`        | Run the task every month on the 4th at 15:00            |
| `.twiceMonthly(1, 16, '13:00')` | Run the task monthly on the 1st and 16th at 13:00       |
| `.lastDayOfMonth('15:00')`      | Run the task on the last day of the month at 15:00      |
| `.quarterly()`                  | Run the task on the first day of every quarter at 00:00 |
| `.quarterlyOn(4, '14:00')`      | Run the task every quarter on the 4th at 14:00          |
| `.yearly()`                     | Run the task on the first day of every year at 00:00    |
| `.yearlyOn(6, 1, '17:00')`      | Run the task every year on June 1st at 17:00            |

These methods may be combined with additional constraints to create even more finely tuned schedules that only run on certain days of the week. For example, you may schedule a command to run weekly on Monday:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

// Run once per week on Monday at 1 PM...
Scheduler.call(() => {
    // ...
}).weekly().mondays().at('13:00')
 
// Run hourly from 8 AM to 5 PM on weekdays...
Scheduler.command('foo')
         .weekdays()
         .hourly()
         .between('8:00', '17:00')
```

A list of additional schedule constraints may be found below:

| Method                        | Description                                           |
| ----------------------------- | ----------------------------------------------------- |
| `.weekdays()`                 | Limit the task to weekdays                            |
| `.weekends()`                 | Limit the task to weekends                            |
| `.sundays()`                  | Limit the task to Sunday                              |
| `.mondays()`                  | Limit the task to Monday                              |
| `.tuesdays()`                 | Limit the task to Tuesday                             |
| `.wednesdays()`               | Limit the task to Wednesday                           |
| `.thursdays()`                | Limit the task to Thursday                            |
| `.fridays()`                  | Limit the task to Friday                              |
| `.saturdays()`                | Limit the task to Saturday                            |
| `.days(days)`                 | Limit the task to specific days                       |
| `.between(start, end)`        | Limit the task to run between start and end times     |
| `.unlessBetween(start, end)`  | Limit the task to not run between start and end times |
| `.when(Closure)`              | Limit the task based on a truth test                  |
| `.environments(environments)` | Limit the task to specific environments               |


#### Day Constraints

The `days` method may be used to limit the execution of a task to specific days of the week. For example, you may schedule a command to run hourly on Sundays and Wednesdays:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('emails:send')
         .hourly()
         .days([0, 3])
```

#### Between Time Constraints

The `between` method may be used to limit the execution of a task based on the time of day:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('emails:send')
         .hourly()
         .between('7:00', '22:00')
```

Similarly, the `unlessBetween` method can be used to exclude the execution of a task for a period of time:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('emails:send')
         .hourly()
         .unlessBetween('23:00', '4:00')
```

#### Truth Test Constraints

The `when` method may be used to limit the execution of a task based on the result of a given truth test. In other words, if the given closure returns `true`, the task will execute as long as no other constraining conditions prevent the task from running:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('emails:send')
         .daily()
         .when(() => true);
```

The `skip` method may be seen as the inverse of `when`. If the `skip` method returns `true`, the scheduled task will not be executed:

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('emails:send')
         .daily()
         .skip(() => true);
```

When using chained when methods, the scheduled command will only execute if all when conditions return true.

#### Environment Constraints

The environments method may be used to execute tasks only on the given environments (as defined by the NODE_ENV environment variable):

```typescript
import Scheduler from '@ioc:Verful/Scheduler'

Scheduler.command('emails:send')
         .daily()
         .environments(['staging', 'production']);
```

## Running the Scheduler

Run the `scheduler:work` ace command, it doesn't need to be put into a cron job, as the scheduler will process the jobs as the time passes

[npm-image]: https://img.shields.io/npm/v/@verful/scheduler.svg?style=for-the-badge&logo=**npm**
[npm-url]: https://npmjs.org/package/@verful/scheduler "npm"

[license-image]: https://img.shields.io/npm/l/@verful/scheduler?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
