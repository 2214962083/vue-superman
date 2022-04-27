import {say} from './index'

describe('class-mock', () => {
  test('say', () => {
    expect(say()).toBe('hello mock')
  })
})
