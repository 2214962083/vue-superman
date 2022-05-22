# 实体装饰器

[[toc]]

## @Entity

当你的 `mock class` 下某个属性也是 `mock class`，那就要用到 `@Entity`

```ts
function Entity<T>(getEntity: () => T): PropertyDecorator
```

示例:

```ts
import {Entity, Random, IsArray} from 'class-mock'

class User {
  @Random.words(2)
  name!: string

  @IsArray()
  @Entity(() => Post) // 因为这个属性也是 mock class，所以要用到 `@Entity`
  posts?: Post[]
}

class Post {
  @Random.words(2)
  title!: string

  @Random.words(10)
  content!: string
}
```
