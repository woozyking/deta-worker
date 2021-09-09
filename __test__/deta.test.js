import { Deta } from '../src/index.js'
import { Deta as _Deta } from 'deta'

// afterEach(() => {
// })

describe('Deta instance behavior matches Deta JS', () => {
  it.each([
    '',
    Array.from({ length: Math.floor(Math.random() * 100) + 1 }).map(() => ' ').join(''),
    null,
    undefined,
  ])('invalid project key `Deta("%s")`', (key) => {
    try {
      _Deta(key)
    } catch(e) {
      expect(() => { Deta(key) }).toThrow(e)
    }
  })
})
