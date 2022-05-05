/* eslint-disable @typescript-eslint/no-explicit-any */
import {Nil, ArrayConfig, BasePropertyConfig, MetadataTarget} from './types-helper'
import {DEFAULT_ARRAY_LENGTH, DEFAULT_ARRAY_MAX, DEFAULT_ARRAY_MIN} from '@/constants/meta.constants'
import faker, {UsableLocale} from '@faker-js/faker'

export function getTarget(target: any): MetadataTarget {
  return target instanceof Function ? target : target.constructor
}

export function randomNumber(min: number, max: number): number {
  if (min === max) return min
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomBoolean() {
  return Math.random() < 0.5
}

export interface getGenerateArrayLengthOptions extends ArrayConfig {
  defaultLength?: number
  defaultMax?: number
  defaultMin?: number
}

export function getGenerateArrayLength(options: getGenerateArrayLengthOptions): number {
  const {
    length,
    min,
    max,
    defaultLength = DEFAULT_ARRAY_LENGTH,
    defaultMax = DEFAULT_ARRAY_MAX,
    defaultMin = DEFAULT_ARRAY_MIN
  } = options
  const arrayLength =
    (length ?? min ?? max ?? undefined) === undefined
      ? defaultLength
      : length ?? randomNumber(min ?? defaultMin, max ?? defaultMax)
  return arrayLength
}

export function mergeConfig<Config extends BasePropertyConfig>(
  oldMeta: Config | undefined,
  newMeta: Config | undefined
) {
  return {
    ...(oldMeta || {}),
    ...(newMeta || {})
  } as Config
}

export function IsGroupsIntersect(source: any[] | Nil, target: any[] | Nil) {
  if (!source && !target) return true
  if (!source) return false
  if (!target) return true
  return source?.some(item => target?.includes(item))
}

export function setLocale(locale: UsableLocale) {
  return faker.setLocale(locale)
}

export function seed(seedArray: number[]): number[]
export function seed(seed: number): number
export function seed(seed?: number | number[]): number | number[] {
  return faker.seed(seed as number)
}
