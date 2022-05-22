# Entity decorator

[[toc]]

## @Entity

When a property under your `mock class` is also a `mock class`, then should use `@Entity`

```ts
function Entity<T>(getEntity: () => T): PropertyDecorator
```

Example:

```ts
import {Entity, Random, IsArray} from 'class-mock'

class User {
  @Random.words(2)
  name!: string

  @IsArray()
  @Entity(() => Post) // Because this property is also a mock class, use `@Entity`
  posts?: Post[]
}

class Post {
  @Random.words(2)
  title!: string

  @Random.words(10)
  content!: string
}
```
