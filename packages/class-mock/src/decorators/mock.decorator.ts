/* eslint-disable @typescript-eslint/no-explicit-any */
import {MockPropertyMetadata, Fn, MockPropertyDecorator, MockPropertyDecoratorConfig} from '@/utils/types-helper'
import {ConfigDecorator} from './config.decorator'

export function MockDecorator<T extends Fn>(
  mockFn: T,
  ...mockParams: Parameters<T>
): MockPropertyDecorator<MockPropertyDecoratorConfig> {
  return ConfigDecorator<MockPropertyDecoratorConfig>({
    mockFn,
    mockParams
  } as MockPropertyMetadata<T>)
}
