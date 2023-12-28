"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_path_1 = require("node:path");
const standalone_1 = require("@adonisjs/core/build/standalone");
const assert_1 = require("@japa/assert");
const runner_1 = require("@japa/runner");
const spec_reporter_1 = require("@japa/spec-reporter");
const dev_utils_1 = require("@poppinss/dev-utils");
const fs = new dev_utils_1.Filesystem((0, node_path_1.resolve)(__dirname, '__app'));
(0, runner_1.configure)({
    ...(0, runner_1.processCliArgs)(process.argv.slice(2)),
    files: ['tests/**/*.spec.ts'],
    plugins: [(0, assert_1.assert)()],
    reporters: [(0, spec_reporter_1.specReporter)()],
    importer: (filePath) => Promise.resolve(`${filePath}`).then(s => __importStar(require(s))),
    forceExit: true,
    setup: [
        async () => {
            await fs.add('.env', '');
            await fs.add('config/app.ts', `
          export const profiler = { enabled: true }
          export const appKey = 'averylong32charsrandomsecretkey',
          export const http = {
            cookie: {},
            trustProxy: () => true,
          }
        `);
            const app = new standalone_1.Application(fs.basePath, 'test', {
                providers: ['@adonisjs/core', '../../providers/scheduler_provider'],
            });
            await app.setup();
            await app.registerProviders();
            await app.bootProviders();
            return async () => {
                await app.shutdown();
                await fs.cleanup();
            };
        },
    ],
});
runner_1.TestContext.getter('app', () => require('@adonisjs/core/build/services/app.js').default);
(0, runner_1.run)();
