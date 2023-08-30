import * as sink from '@adonisjs/sink'
import { string } from '@poppinss/utils/build/helpers'
import execa from 'execa'
import path from 'node:path'
import fs from 'node:fs/promises'

const prettier = require('prettier')

const format = (text: string): string =>
  prettier.format(text, {
    trailingComma: 'es5',
    semi: false,
    singleQuote: true,
    useTabs: false,
    quoteProps: 'consistent',
    bracketSpacing: true,
    arrowParens: 'always',
    printWidth: 100,
    parser: 'typescript',
  })

const providerTemplate = (name: string) =>
  format(`
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class ${name} {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
`)

const scripts = {
  yarn: {
    pretest: 'yarn lint',
    compile: 'yarn lint && yarn clean && tsc',
    build: 'yarn compile && yarn copyfiles',
    version: 'yarn build',
    prepublishOnly: 'yarn build',
  },
  npm: {
    pretest: 'npm run lint',
    compile: 'npm run lint && npm run clean && tsc',
    build: 'npm run compile && npm run copyfiles',
    version: 'npm run build',
    prepublishOnly: 'npm run build',
  },
  pnpm: {
    pretest: 'pnpm lint',
    compile: 'pnpm lint && pnpm clean && tsc',
    build: 'pnpm compile && pnpm copyfiles',
    version: 'pnpm build',
    prepublishOnly: 'pnpm build',
  },
} as const

async function run(command: string, ...args: string[]): Promise<string> {
  return execa(command, args).then(({ stdout }) => stdout)
}

async function configure() {
  const pkg = new sink.files.PackageJsonFile(__dirname).useClient('yarn')
  const prompt = sink.getPrompt()

  const gitName = await run('git', 'config', 'user.name')
  const authorName = await prompt.ask('Author name', { default: gitName })

  const gitEmail = await run('git', 'config', 'user.email')
  const authorEmail = await prompt.ask('Author email', { default: gitEmail })

  const gitUrl = await prompt.ask('Git repository url')
  const pkgName = await prompt.ask('Package name', { default: path.basename(process.cwd()) })

  const providerNameGuess = string.pascalCase(pkgName) + 'Provider'
  const providerName = await prompt.ask('Provider name', { default: providerNameGuess })

  const pkgDescription = await prompt.ask('Package description', { default: 'My awesome package!' })

  const useEslint = await prompt.confirm('Setup eslint?')
  const usePrettier = await prompt.confirm('Setup prettier?')
  const useHusky = await prompt.confirm('Setup commit hooks? (Husky)')
  let useCommitlint = false
  let useLintStaged = false
  if (useHusky) {
    useLintStaged = await prompt.confirm('Setup lint staged?')
    useCommitlint = await prompt.confirm('Setup commit lint?')
  }
  const selfDelete = await prompt.confirm('Delete the configure script?')

  const packageManager = sink.utils.getPackageManager(process.cwd())

  for (const [scriptName, script] of Object.entries(scripts[packageManager])) {
    pkg.setScript(scriptName, script)
  }

  pkg.uninstall('@adonisjs/sink')
  pkg.uninstall('@poppinss/utils')
  pkg.uninstall('execa')

  pkg.set('name', pkgName)
  pkg.set('description', pkgDescription)
  pkg.set('author', {
    name: authorName,
    email: authorEmail,
  })
  pkg.set('repository', {
    type: 'git',
    url: `git+${gitUrl}.git`,
  })
  pkg.set('bugs', {
    url: `${gitUrl}/issues`,
  })
  pkg.set('homepage', `${gitUrl}#readme`)
  pkg.set('main', `./build/providers/${providerName}.js`)

  pkg.set('adonisjs.commands', [`${pkgName}/build/commands`])
  pkg.set('adonisjs.types', pkgName)
  pkg.set('adonisjs.providers', [pkgName])
  pkg.set('adonisjs.templates', {
    config: [
      {
        src: 'config.txt',
        dest: pkgName,
      },
    ],
    contracts: [
      {
        src: 'contract.txt',
        dest: pkgName,
      },
    ],
  })

  await fs.writeFile(`./providers/${providerName}.ts`, providerTemplate(providerName))
  await fs.unlink('./providers/.gitkeep')
  await fs.unlink('./src/.gitkeep')
  await fs.unlink('./.github/banner.png')

  if (!useEslint) {
    pkg.removeScript('pretest')
    pkg.removeScript('lint')
    pkg.setScript('compile', 'yarn clean && tsc')
    pkg.unset('eslintConfig')
    pkg.unset('eslintIgnore')
    pkg.uninstall('eslint')
    pkg.uninstall('eslint-config-prettier')
    pkg.uninstall('eslint-plugin-adonis')
    pkg.uninstall('eslint-plugin-prettier')
  }

  if (!usePrettier) {
    pkg.unset('prettier')
    await fs.unlink('.prettierignore')
  }

  if (useEslint && !usePrettier) {
    pkg.uninstall('eslint-config-prettier')
    pkg.uninstall('eslint-plugin-prettier')
    pkg.set('eslint.extends', ['plugin:adonis/typescriptPackage'])
    pkg.unset('eslint.plugins')
    pkg.unset('eslint.rules.prettier/prettier')
  }

  if (!useHusky) {
    pkg.uninstall('husky')
    await fs.rm('.husky', { force: true, recursive: true })
  }

  if (!useLintStaged) {
    pkg.uninstall('lint-staged')
    pkg.unset('lint-staged')
    await fs.unlink('.husky/pre-commit')
  }

  if (!useCommitlint) {
    pkg.uninstall('@commitlint/cli')
    pkg.uninstall('@commitlint/config-conventional')
    pkg.unset('commitlint')
    await fs.unlink('.github/workflows/commitlint.yml')
    await fs.unlink('.husky/commit-msg')
  }

  if (selfDelete) {
    await fs.unlink('./configure.ts')
    pkg.removeScript('configure')
  }

  pkg.commit()
  sink.logger.info('Configuration complete, please update your .gitignore file')
}

configure()
