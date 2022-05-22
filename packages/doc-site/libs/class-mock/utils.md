# Utils

[[toc]]

## createMock

Utility function for generating mock results

```ts
interface CreateMockOptions {
  /**
   * @default undefined
   * Whether to reuse the first random value of js runtime
   * lowest level default
   */
  alwaysRandom?: boolean | undefined

  /**
   * @default undefined
   * If the property is set to groups, the property is generated only when the groups of the property and the groups here have an intersection.
   */
  groups?: string[] | undefined | null
  /**
   * @default false
   * true: Create multiple mock class instances
   * false: Create a mock class instance
   */
  array?: boolean
  /**
   * @default 10
   * array length
   * Takes effect when array is true
   * If min or max exist, this attribute has no effect
   */
  length?: number | undefined | null

  /**
   * @default undefined
   * The minimum length of the array, if max is defined, min defaults to 0
   * Takes effect when array is true
   */
  min?: number | undefined | null

  /**
   * @default undefined
   * The maximum length of the array, if min is defined, max defaults to 50
   * Takes effect when array is true
   */
  max?: number | undefined | null

  /**
   * Faker seed used to always generate the same random value
   */
  seed?: number | number[]
}

function createMock<T>(Entity: T, options?: CreateMockOptions): T
```

## setLocale

To set the generated language

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

Please refer to [faker.setLocale](https://fakerjs.dev/api/localization.html#localization)
