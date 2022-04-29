/* eslint-disable @typescript-eslint/no-explicit-any */
import {mergeConfig, getTarget} from '@/utils/common'
import {MetadataStorage} from '@/utils/meta-storage'
import {
  MockPropertyDecoratorConfig,
  MockPropertyMetadata,
  MockPropertyDecorator,
  ArrayConfig,
  MockPropertyDecoratorProps
} from '@/utils/types-helper'

export function ConfigDecorator<T extends MockPropertyDecoratorConfig = MockPropertyDecoratorConfig>(
  config: T = <T>{}
): MockPropertyDecorator<T> {
  const createConfigDecorator = (config: T = <T>{}) => {
    const decorator = (target: any, propertyKey: string | symbol) => {
      const propertyName = propertyKey as string
      const _target = getTarget(target)
      const preMetadata = MetadataStorage.instance.findMockMetadata(_target, propertyName)
      const metadata: MockPropertyMetadata = mergeConfig(preMetadata, {
        target: _target,
        propertyName,
        ...config
      })

      MetadataStorage.instance.addMockMetadata(metadata)
    }

    const createMergeConfigDecorator = (newConfig: T = <T>{}) => createConfigDecorator(mergeConfig(config, newConfig))

    const decoratorProto: MockPropertyDecoratorProps<T> = {
      config: (_config: T = <T>{}) => createMergeConfigDecorator(_config),
      isPartial: () => createMergeConfigDecorator(<T>{partial: 'partial'}),
      isInclude: () => createMergeConfigDecorator(<T>{partial: 'include'}),
      isExclude: () => createMergeConfigDecorator(<T>{partial: 'exclude'}),
      isAlwaysRandom: () => createMergeConfigDecorator(<T>{alwaysRandom: true}),
      isNotAlwaysRandom: () => createMergeConfigDecorator(<T>{alwaysRandom: false}),
      isArray: (arrayConfig?: ArrayConfig) => createMergeConfigDecorator(<T>{array: true, ...arrayConfig}),
      isNotArray: () => createMergeConfigDecorator(<T>{array: false}),
      groups: (groups: string[]) => createMergeConfigDecorator(<T>{groups})
    }

    Object.assign(decorator, decoratorProto)

    return decorator as MockPropertyDecorator<T>
  }

  return createConfigDecorator(config)
}
