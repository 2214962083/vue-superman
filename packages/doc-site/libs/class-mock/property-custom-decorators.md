# Custom decorator

[[toc]]

## @MockDecorator

For custom decorators

```ts
function MockDecorator<T extends Function>(mockFn: T, ...mockParams: Parameters<T>): PropertyDecorator
```

Example:

```ts
import {MockDecorator} from 'class-mock'
import {random} from '@faker-js/faker'

class User {
  @MockDecorator(random.number, {min: 1, max: 10})
  age!: number
}

class User2 {
  @MockDecorator((name: string) => `i am ${name}`, 'John')
  name!: string
}

const MyRandomNumber = (min: number, max: number) => MockDecorator(random.number, {min, max})

class User3 {
  @MyRandomNumber(1, 10)
  age!: number
}
```
