import {expect, test} from '@jest/globals'
import {Matcher} from '../src/lib/match'

test('should resolves ([]) for unmatched strings', async () => {
  const matcher = new Matcher({
    targetFile: '__tests__/data/gradle.lockfile.test',
    matcher: ['app1:2.0.0', 'app4:1.0.0']
  })

  await expect(matcher.check()).resolves.toHaveLength(0)
})

test('should rejects (array size:1) for matched one strings', async () => {
  const matcher = new Matcher({
    targetFile: '__tests__/data/gradle.lockfile.test',
    matcher: [/app2:1\.\d\.0/, /app4:1\.0\.0/]
  })

  await expect(matcher.check()).resolves.toHaveLength(1)
})

test('should rejects (array size:2) for matched two strings', async () => {
  const matcher = new Matcher({
    targetFile: '__tests__/data/gradle.lockfile.test',
    matcher: [/app1:1\.[0-4]\.0/, /app2:1\.0\.0/]
  })

  await expect(matcher.check()).resolves.toHaveLength(2)
})