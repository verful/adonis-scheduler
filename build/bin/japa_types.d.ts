/// <reference path="../adonis-typings/container.d.ts" />
/// <reference types="@adonisjs/application/build/adonis-typings" />
/// <reference types=".pnpm/@adonisjs+application@5.3.0/node_modules/@adonisjs/application/build/adonis-typings/application" />
/// <reference types=".pnpm/@adonisjs+drive@2.3.0_@adonisjs+application@5.3.0_@adonisjs+http-server@5.12.0/node_modules/@adonisjs/drive/build/adonis-typings/container" />
/// <reference types=".pnpm/@adonisjs+http-server@5.12.0_@adonisjs+application@5.3.0_@adonisjs+encryption@4.0.8/node_modules/@adonisjs/http-server/build/adonis-typings/container" />
/// <reference types="@adonisjs/core/build/adonis-typings/container" />
/// <reference types=".pnpm/@adonisjs+events@7.2.1_@adonisjs+application@5.3.0/node_modules/@adonisjs/events/build/adonis-typings/container" />
/// <reference types=".pnpm/@adonisjs+hash@7.2.2_@adonisjs+application@5.3.0/node_modules/@adonisjs/hash/build/adonis-typings/container" />
/// <reference types=".pnpm/@adonisjs+encryption@4.0.8_@adonisjs+application@5.3.0/node_modules/@adonisjs/encryption/build/adonis-typings/container" />
/// <reference types=".pnpm/@adonisjs+validator@12.5.0_@adonisjs+application@5.3.0_@adonisjs+bodyparser@8.1.9_@adonisjs+http-server@5.12.0/node_modules/@adonisjs/validator/build/adonis-typings/container" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import '@japa/runner';
declare module '@japa/runner' {
    interface TestContext {
        app: ApplicationContract;
    }
    interface Test<TestData> {
    }
}
