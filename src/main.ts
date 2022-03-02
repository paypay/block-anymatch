import * as core from '@actions/core'
import {Matcher} from './lib/match'

async function run(): Promise<void> {
  try {
    const matcher = new Matcher({
      targetFile: core.getInput('target_file'),
      matcher: core.getMultilineInput('matcher').map(x => new RegExp(x))
    })
    const failure: boolean =
      (core.getInput('allow_failure') || 'false').toUpperCase() === 'TRUE'
    const result = await matcher.check()

    if (result.length === 0) {
      core.info('🎉 None found')
    } else {
      if (failure) {
        core.setFailed('❗Matching lines:')
      } else {
        core.info('❗Matching lines:')
      }
      for (const line of result) {
        core.info(line)
      }
    }
    core.setOutput('match_count', result.length)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
