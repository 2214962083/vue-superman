import {BaseClass, MockPropertyDecorator, MockPropertyDecoratorConfig, MockPropertyMetadata} from '@/utils/types-helper'
import {ConfigDecorator} from './config.decorator'

export const Entity = <T extends BaseClass>(getEntity: () => T): MockPropertyDecorator<MockPropertyDecoratorConfig> => {
  return ConfigDecorator<MockPropertyDecoratorConfig>({
    entityFn: getEntity
  } as MockPropertyMetadata)
}
