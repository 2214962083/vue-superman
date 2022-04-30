import 'reflect-metadata'
import faker from '@faker-js/faker'
import {Random, Name, Phone, Address, Datatype} from './decorators/faker.decorator'
import {createMock} from './utils/create-mock'
import {IsArray, IsExclude, IsNotAlwaysRandom, IsPartial} from './decorators/config.decorator'
import {DefaultAlwaysRandom} from './decorators/class.decorator'
import {Entity} from './decorators/entity.decorator'

faker.setLocale('zh_CN')

@DefaultAlwaysRandom()
class User {
  @Name.firstName()
  name!: string

  @IsNotAlwaysRandom()
  @Datatype.number({min: 0, max: 30})
  age?: number
}

class Skill {
  @Random.words(5)
  name!: string
}

class Student extends User {
  @IsArray(2)
  @Address.streetAddress()
  address!: string[]

  @Phone.phoneNumber('188########')
  tel!: number

  @IsPartial()
  @Entity(() => Skill)
  skills!: Skill[]

  @IsExclude()
  privateKey!: string
}

const mockStudent = createMock(Student)
console.log('mockStudent: ', mockStudent)

const mockStudentList = createMock(Student, {array: true, length: 3})
console.log('\n\nmockStudentList: ', mockStudentList)

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
