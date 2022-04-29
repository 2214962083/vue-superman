/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import faker from '@faker-js/faker'
import {Random, Name, Phone, Address} from './decorators/faker.decorator'
import {createMock} from './utils/create-mock'

faker.setLocale('zh_CN')

class User {
  @Name.firstName()
  name!: string

  @Random.number({min: 0, max: 100})
  age!: number
}

class Student extends User {
  @Address.streetAddress().isArray({length: 3})
  address!: string[]

  @Phone.phoneNumber('188########')
  tel!: number
}

const mockStudent = createMock(Student)

console.log('mockStudent: ', mockStudent)

// 比如提供一个 webpack 插件或者 vite 插件，配置一下，axios 或 fetch 访问该 url 就可以自动响应 mock 数据了
// const serverPluginConfig = [
//   {
//     url: '/api/users',
//     res: () => createMock(Student, {array: true})
//   },
//   {
//     url: '/api/user/:id',
//     res: () => createMock(Student, {array: false})
//   }
// ]
