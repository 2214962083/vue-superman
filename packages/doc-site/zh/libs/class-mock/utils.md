# 工具函数

[[toc]]

## createMock

用于生成 mock 结果的工具函数

```ts
interface CreateMockOptions {
  /**
   * 默认为 undefined
   * 是否复用 js runtime 第一次生成的随机值
   * 级别最低的默认值
   */
  alwaysRandom?: boolean | undefined

  /**
   * 默认为 undefined
   * 若属性设置了 groups，则属性的 groups 和此处的 groups 存在交集时，才生成该属性
   */
  groups?: string[] | undefined | null
  /**
   * 默认为 false
   * true: 创建多个 mock class 实例
   * false: 创建一个 mock class 实例
   */
  array?: boolean
  /**
   * 默认为 10
   * 数组长度
   * 在 array 为 true 时生效
   * 若 min 或 max 存在，则本属性无效
   */
  length?: number | undefined | null

  /**
   * 默认为 undefined
   * 数组的最小长度，如果定义了 max ，则 min 默认为 0
   * 在 array 为 true 时生效
   */
  min?: number | undefined | null

  /**
   * 默认为 undefined
   * 数组的最大长度，如果定义了 min ，则 max 默认为 50
   * 在 array 为 true 时生效
   */
  max?: number | undefined | null

  /**
   * 用于总是生成相同随机值的 faker seed
   */
  seed?: number | number[]
}

function createMock<T>(Entity: T, options?: CreateMockOptions): T
```

## setLocale

设置生成语言，需要注意 fakerJs 对中文适配比较少

```ts
type KnownLocale =
  | 'af_ZA'
  | 'ar'
  | 'az'
  | 'cz'
  | 'de'
  | 'de_AT'
  | 'de_CH'
  | 'el'
  | 'en'
  | 'en_AU'
  | 'en_AU_ocker'
  | 'en_BORK'
  | 'en_CA'
  | 'en_GB'
  | 'en_GH'
  | 'en_IE'
  | 'en_IND'
  | 'en_NG'
  | 'en_US'
  | 'en_ZA'
  | 'es'
  | 'es_MX'
  | 'fa'
  | 'fi'
  | 'fr'
  | 'fr_BE'
  | 'fr_CA'
  | 'fr_CH'
  | 'ge'
  | 'he'
  | 'hr'
  | 'hu'
  | 'hy'
  | 'id_ID'
  | 'it'
  | 'ja'
  | 'ko'
  | 'lv'
  | 'mk'
  | 'nb_NO'
  | 'ne'
  | 'nl'
  | 'nl_BE'
  | 'pl'
  | 'pt_BR'
  | 'pt_PT'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'tr'
  | 'uk'
  | 'ur'
  | 'vi'
  | 'zh_CN'
  | 'zh_TW'
  | 'zu_ZA'

function setLocale(locale: KnownLocale): void
```

请参考 [faker.setLocale](https://fakerjs.dev/api/localization.html#localization)
