# fakerJs 装饰器

[[toc]]

## @Address

生成地址和位置的装饰器模块。

请参考 [faker.address](https://fakerjs.dev/api/address.html)

示例:

```ts
import {Address} from 'class-mock'

class Student {
  @Address.streetAddress()
  address!: string // 5786 Roselyn Throughway
}
```

## @Animal

生成动物相关条目的装饰器模块。

请参考 [faker.animal](https://fakerjs.dev/api/animal.html)

示例:

```ts
import {Animal} from 'class-mock'

class Student {
  @Animal.cat()
  cat!: string // Norwegian Forest Cat
}
```

## @Commerce

生成商业和产品相关条目的装饰器模块。

请参考 [faker.commerce](https://fakerjs.dev/api/commerce.html)

示例:

```ts
import {Commerce} from 'class-mock'

class Product {
  @Commerce.product()
  name!: string // Computer

  @Commerce.price(100, 200)
  price!: number // 154
}
```

## @Company

生成公司相关条目的装饰器模块。

请参考 [faker.company](https://fakerjs.dev/api/company.html)

示例:

```ts
import {Company} from 'class-mock'

class MyCompany {
  @Company.companyName()
  name!: string // Medhurst-Klein

  @Company.bs()
  bs!: string // cultivate synergistic e-markets
}
```

## @Database

生成数据库相关条目的装饰器模块。

请参考 [faker.database](https://fakerjs.dev/api/database.html)

示例:

```ts
import {Database} from 'class-mock'

class MyDatabase {
  @Database.column()
  column!: string // created_at

  @Database.type()
  type!: string // timestamp
}
```

## @Datatype

生成各种原始值和数据类型的装饰器模块。

请参考 [faker.datatype](https://fakerjs.dev/api/datatype.html)

示例:

```ts
import {Datatype} from 'class-mock'

class Student {
  @Datatype.boolean()
  isMale?: boolean // true or false
}
```

## @Date

生成日期的装饰器模块。

请参考 [faker.date](https://fakerjs.dev/api/date.html)

示例:

```ts
import {Date} from 'class-mock'

class Student {
  @Date.past()
  birthday!: Date // 2000-01-01T00:00:00.000Z
}
```

## @Fake

用于组合基于静态字符串输入的伪造方法的生成器。

请参考 [faker.fake](https://fakerjs.dev/api/fake.html)

示例:

```ts
import {Fake} from 'class-mock'

class Student {
  @Fake('Hi, my name is {{name.firstName}} {{name.lastName}}!')
  introduction!: string // Hi, my name is John Doe!
}
```

## @Finance

生成财务相关条目的装饰器模块。

请参考 [faker.finance](https://fakerjs.dev/api/finance.html)

示例:

```ts
import {Finance} from 'class-mock'

class Student {
  @Finance.account()
  account!: string // 987654321

  @Finance.amount(100, 200)
  amount!: number // 154
}
```

## @Git

生成 git 相关条目的装饰器模块。

请参考 [faker.git](https://fakerjs.dev/api/git.html)

示例:

```ts
import {Git} from 'class-mock'

class MyRepo {
  @Git.branch()
  branch!: string // master

  @Git.commitSha()
  commit!: string // ea8f9f9
}
```

## @Hacker

生成黑客/IT 单词和短语的装饰器模块。

请参考 [faker.hacker](https://fakerjs.dev/api/hacker.html)

示例:

```ts
import {Hacker} from 'class-mock'

class TheHacker {
  @Hacker.adjective()
  adjective!: string // innovative

  @Hacker.phrase()
  phrase!: string // Use the wireless HDD pixel, then you can ...
}
```

## @Helpers

具有各种帮助方法的装饰器模块。

请参考 [faker.helpers](https://fakerjs.dev/api/helpers.html)

示例:

```ts
import {Helpers} from 'class-mock'

class Student {
  @Helpers.arrayElement(['cat', 'dog', 'mouse'])
  pet!: string // dog
}
```

## @Image

生成占位符图像的装饰器模块。

请参考 [faker.image](https://fakerjs.dev/api/image.html)

示例:

```ts
import {Image} from 'class-mock'

class Student {
  @Image.avatar()
  avatar!: string // https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg
}
```

## @Internet

生成互联网相关条目的装饰器模块。

请参考 [faker.internet](https://fakerjs.dev/api/internet.html)

示例:

```ts
import {Internet} from 'class-mock'

class Student {
  @Internet.email()
  email!: string // Kassandra4@hotmail.com

  @Internet.password()
  password!: string // 123456
}
```

## @Lorem

生成随机文本和单词的装饰器模块。

请参考 [faker.lorem](https://fakerjs.dev/api/lorem.html)

示例:

```ts
import {Lorem} from 'class-mock'

class Paper {
  @Lorem.paragraph()
  paragraph!: string // Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  @Lorem.sentence()
  sentence!: string // Lorem ipsum dolor sit amet.

  @Lorem.word()
  word!: string // Lorem
}
```

## @Mersenne

生成基于 seed 的随机数的装饰器模块。

请参考 [faker.mersenne](https://fakerjs.dev/api/mersenne.html)

示例:

```ts
import {Mersenne} from 'class-mock'

class Student {
  @Mersenne.number(1, 100)
  age!: number // 86
}
```

## @Music

生成音乐相关条目的装饰器模块。

请参考 [faker.music](https://fakerjs.dev/api/music.html)

示例:

```ts
import {Music} from 'class-mock'

class Song {
  @Music.genre()
  genre!: string // Rock
}
```

## @Name

生成人名和头衔的装饰器模块。

请参考 [faker.name](https://fakerjs.dev/api/name.html)

示例:

```ts
import {Name} from 'class-mock'

class Student {
  @Name.firstName()
  firstName!: string // John

  @Name.lastName()
  lastName!: string // Doe
}
```

## @Phone

生成电话相关数据的装饰器模块。

请参考 [faker.phone](https://fakerjs.dev/api/phone.html)

示例:

```ts
import {Phone} from 'class-mock'

class Student {
  @Phone.phoneNumber('188########')
  phoneNumber!: string // 18812345678

  @Phone.imei()
  imei!: string // 13-850175-913761-7
}
```

## @Random

生成不同种类的随机值。

请参考 [faker.random](https://fakerjs.dev/api/random.html)

示例:

```ts
import {Random} from 'class-mock'

class Student {
  @Random.word()
  name!: string // Montenegro

  @Random.number()
  age!: number // 7
}
```

## @System

为许多计算机系统属性生成虚假数据。

请参考 [faker.system](https://fakerjs.dev/api/system.html)

示例:

```ts
import {System} from 'class-mock'

class MyFile {
  @System.fileName()
  fileName!: string // C:\Users\John\Desktop\test.txt

  @System.directoryPath()
  directoryPath!: string // C:\Users\John\Desktop

  @System.filePath()
  filePath!: string // C:\Users\John\Desktop\test.txt
}
```

## @Vehicle

生成车辆相关条目的装饰器模块。

请参考 [faker.vehicle](https://fakerjs.dev/api/vehicle.html)

示例:

```ts
import {Vehicle} from 'class-mock'

class MyCar {
  @Vehicle.type()
  type!: string // Minivan

  @Vehicle.manufacturer()
  manufacturer!: string // Ford
}
```

## @Word

返回各种类型的单词的装饰器模块。

请参考 [faker.word](https://fakerjs.dev/api/word.html)

示例:

```ts
import {Word} from 'class-mock'

class Student {
  @Word.adjective()
  character!: string // friendly
}
```
