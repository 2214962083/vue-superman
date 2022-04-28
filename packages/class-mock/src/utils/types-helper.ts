export type Nil = null | undefined

export interface PropertyDecoratorConfig {
  partial?: boolean | Nil
  alwaysRandom?: boolean | Nil
  groups?: string[] | Nil
  array?: boolean
  length?: number | Nil
  max?: number | Nil
  min?: number | Nil
}

export interface ClassDecoratorConfig {
  partial?: boolean | Nil
  alwaysRandom?: boolean | Nil
}
