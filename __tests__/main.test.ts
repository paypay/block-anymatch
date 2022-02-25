import {expect, test} from '@jest/globals'
import {Matcher} from '../src/lib/match'

test('should resolves ([]) for unmatched strings', async () => {
  const matcher = new Matcher({
    targetFile: '__tests__/data/gradle.lockfile.test',
    matchersFile: '__tests__/data/matcher.01.test'
  })

  await expect(matcher.check()).resolves.toHaveLength(0)
})

test('should rejects (array size:1) for matched one strings', async () => {
  const matcher = new Matcher({
    targetFile: '__tests__/data/gradle.lockfile.test',
    matchersFile: '__tests__/data/matcher.02.test'
  })

  await expect(matcher.check()).resolves.toHaveLength(1)
})

test('should rejects (array size:2) for matched two strings', async () => {
  const matcher = new Matcher({
    targetFile: '__tests__/data/gradle.lockfile.test',
    matchersFile: '__tests__/data/matcher.03.test'
  })

  await expect(matcher.check()).resolves.toHaveLength(2)
})