import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import '@japa/runner'

declare module '@japa/runner' {
  interface TestContext {
    app: ApplicationContract
  }

  interface Test<TestData> {
    // notify TypeScript about custom test properties
  }
}
