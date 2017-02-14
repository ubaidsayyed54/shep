import inquirer from 'inquirer'
import { generateFunction } from '../../index'
import merge from 'lodash.merge'

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Function name'
  }
]

export const command = 'function [name]'
export const desc = 'Generate a new function'
export function builder (yargs) {
  return yargs
  .pkgConf('shep', process.cwd())
  .describe('name', 'Function name')
  .describe('quiet', 'Don\'t log anything')
  .default('quiet', false)
  .alias('q', 'quiet')
  .example('shep generate function', 'Launch an interactive CLI')
  .example('shep generate function foo', 'Genereate a new functon called "foo"')
}

export function handler (opts) {
  inquirer.prompt(questions.filter((q) => !opts[q.name]))
  .then((inputs) => merge({}, inputs, opts))
  .then(generateFunction)
}
