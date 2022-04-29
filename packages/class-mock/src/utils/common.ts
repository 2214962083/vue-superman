/* eslint-disable @typescript-eslint/no-explicit-any */
import {ArrayConfig, BasePropertyConfig, MetadataTarget} from './types-helper'

export function getTarget(target: any): MetadataTarget {
  return target instanceof Function ? target : target.constructor
}

export function randomNumber(min: number, max: number): number {
  if (min === max) return min
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export interface getGenerateArrayLengthOptions extends ArrayConfig {
  defaultLength?: number
  defaultMax?: number
  defaultMin?: number
}

export function getGenerateArrayLength(options: getGenerateArrayLengthOptions): number {
  const {length, min, max, defaultLength = 10, defaultMax = 50, defaultMin = 0} = options
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
