# FakerJs decorators

[[toc]]

## @Address

Decorator module to generate addresses and locations.

Please refer to [faker.address](https://fakerjs.dev/api/address.html)

Example:

```ts
import {Address} from 'class-mock'

class Student {
  @Address.streetAddress()
  address!: string // 5786 Roselyn Throughway
}
```

## @Animal

Decorator module to generate animal related entries.

Please refer to [faker.animal](https://fakerjs.dev/api/animal.html)

Example:

```ts
import {Animal} from 'class-mock'

class Student {
  @Animal.cat()
  cat!: string // Norwegian Forest Cat
}
```

## @Commerce

Decorator module to generate commerce and product related entries.

Please refer to [faker.commerce](https://fakerjs.dev/api/commerce.html)

Example:

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

Decorator module to generate company related entries.

Please refer to [faker.company](https://fakerjs.dev/api/company.html)

Example:

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

Decorator module to generate database related entries.

Please refer to [faker.database](https://fakerjs.dev/api/database.html)

Example:

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

Decorator module to generate various primitive values and data types.

Please refer to [faker.datatype](https://fakerjs.dev/api/datatype.html)

Example:

```ts
import {Datatype} from 'class-mock'

class Student {
  @Datatype.boolean()
  isMale?: boolean // true or false
}
```

## @Date

Decorator module to generate dates.

Please refer to [faker.date](https://fakerjs.dev/api/date.html)

Example:

```ts
import {Date} from 'class-mock'

class Student {
  @Date.past()
  birthday!: Date // 2000-01-01T00:00:00.000Z
}
```

## @Fake

A decorator for generated combining faker methods based on a static string input.

Please refer to [faker.fake](https://fakerjs.dev/api/fake.html)

Example:

```ts
import {Fake} from 'class-mock'

class Student {
  @Fake('Hi, my name is {{name.firstName}} {{name.lastName}}!')
  introduction!: string // Hi, my name is John Doe!
}
```

## @Finance

Decorator module to generate finance related entries.

Please refer to [faker.finance](https://fakerjs.dev/api/finance.html)

Example:

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

Decorator module to generate git related entries.

Please refer to [faker.git](https://fakerjs.dev/api/git.html)

Example:

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

Decorator module to generate hacker/IT words and phrases.

Please refer to [faker.hacker](https://fakerjs.dev/api/hacker.html)

Example:

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

Decorator module with various helper methods。

Please refer to [faker.helpers](https://fakerjs.dev/api/helpers.html)

Example:

```ts
import {Helpers} from 'class-mock'

class Student {
  @Helpers.arrayElement(['cat', 'dog', 'mouse'])
  pet!: string // dog
}
```

## @Image

Decorator module to generate placeholder images.

Please refer to [faker.image](https://fakerjs.dev/api/image.html)

Example:

```ts
import {Image} from 'class-mock'

class Student {
  @Image.avatar()
  avatar!: string // https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg
}
```

## @Internet

Decorator module to generate internet related entries.

Please refer to [faker.internet](https://fakerjs.dev/api/internet.html)

Example:

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

Decorator module to generate random texts and words.

Please refer to [faker.lorem](https://fakerjs.dev/api/lorem.html)

Example:

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

Decorator module to generate seed based random numbers.

Please refer to [faker.mersenne](https://fakerjs.dev/api/mersenne.html)

Example:

```ts
import {Mersenne} from 'class-mock'

class Student {
  @Mersenne.number(1, 100)
  age!: number // 86
}
```

## @Music

Decorator module to generate music related entries.

Please refer to [faker.music](https://fakerjs.dev/api/music.html)

Example:

```ts
import {Music} from 'class-mock'

class Song {
  @Music.genre()
  genre!: string // Rock
}
```

## @Name

Decorator module to generate people's names and titles.

Please refer to [faker.name](https://fakerjs.dev/api/name.html)

Example:

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

Decorator module to generate phone-related data.

Please refer to [faker.phone](https://fakerjs.dev/api/phone.html)

Example:

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

Decorator module to generates random values of different kinds.

Please refer to [faker.random](https://fakerjs.dev/api/random.html)

Example:

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

Decorator module to generates fake data for many computer systems properties.

Please refer to [faker.system](https://fakerjs.dev/api/system.html)

Example:

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

Decorator module to generate vehicle related entries.

Please refer to [faker.vehicle](https://fakerjs.dev/api/vehicle.html)

Example:

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

Decorator module to return various types of words.

Please refer to [faker.word](https://fakerjs.dev/api/word.html)

Example:

```ts
import {Word} from 'class-mock'

class Student {
  @Word.adjective()
  character!: string // friendly
}
```
