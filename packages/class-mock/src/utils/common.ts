/* eslint-disable @typescript-eslint/no-explicit-any */
import {FakerPropertyMetadata} from './types-helper'

export function valueIsFakerMeta(value: any): value is FakerPropertyMetadata {
  return value && typeof value.fakerFn === 'function'
}
