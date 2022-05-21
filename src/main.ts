import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  try {
    const tag: string = core.getInput('tag')
    const sha: string = core.getInput('commit-sha')
    const githubToken: string = core.getInput('token', {required: true})
    const octokit = getOctokit(githubToken)

    octokit.rest.git.createRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `refs/tags/${tag}`,
      sha
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('Unknown error occurred')
    }
  }
}

run()
