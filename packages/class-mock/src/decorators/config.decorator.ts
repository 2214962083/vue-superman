/* eslint-disable @typescript-eslint/no-explicit-any */
import {mergeConfig, getTarget} from '@/utils/common'
import {MetadataStorage} from '@/utils/meta-storage'
import {
  MockPropertyDecoratorConfig,
  MockPropertyMetadata,
  MockPropertyDecorator,
  ArrayConfig,
  MockPropertyDecoratorProps,
  MockClassDecorator,
  MockClassDecoratorProps
} from '@/utils/types-helper'

export interface ConfigDecoratorOptions<IsClass extends boolean = false> {
  /**
   * for class decorator
   */
  overridePropertyKey?: string

  /**
   * for class decorator
   */
  isClass?: IsClass
}
export function ConfigDecorator<
  T extends MockPropertyDecoratorConfig = MockPropertyDecoratorConfig,
  IsClass extends boolean = false
>(
  config: T = <T>{},
  options: ConfigDecoratorOptions<IsClass> = {}
): IsClass extends true ? MockClassDecorator<T> : MockPropertyDecorator<T> {
  const {overridePropertyKey, isClass} = options

  const createConfigDecorator = <IsClass extends boolean = false>(
    config: T = <T>{}
  ): IsClass extends true ? MockClassDecorator<T> : MockPropertyDecorator<T> => {
    const decorator = (target: any, propertyKey: string | symbol) => {
      const propertyName = overridePropertyKey ? overridePropertyKey : (propertyKey as string)
      const _target = getTarget(target)
      if (!isClass) {
        const preMetadata = MetadataStorage.instance.findMockMetadata(_target, propertyName)
        const metadata: MockPropertyMetadata = mergeConfig(preMetadata, {
          target: _target,
          propertyName,
          ...config
        })

        MetadataStorage.instance.setMockMetadata(metadata)
      } else {
        MetadataStorage.instance.mergeAllPropertyMockMetadata(_target, config, (oldMeta, mergeMeta) => {
          const finalPartial =
            oldMeta.partial === undefined || oldMeta.partial === null || oldMeta.partial === 'auto'
              ? mergeMeta?.partial ?? oldMeta.partial
              : oldMeta.partial

          const finalAlwaysRandom =
            oldMeta.alwaysRandom === undefined || oldMeta.alwaysRandom === null
              ? mergeMeta?.alwaysRandom ?? oldMeta.alwaysRandom
              : oldMeta.alwaysRandom

          MetadataStorage.instance.updateMockMetadata(oldMeta.target, oldMeta.propertyName, {
            partial: finalPartial,
            alwaysRandom: finalAlwaysRandom
          })
        })
      }
    }

    const createMergeConfigDecorator = <IsClass extends boolean = false>(newConfig: T = <T>{}) =>
      createConfigDecorator<IsClass>(mergeConfig(config, newConfig))

    const propertyDecoratorProto: MockPropertyDecoratorProps<T> = {
      config: (_config: T = <T>{}) => createMergeConfigDecorator(_config),
      isPartial: () => createMergeConfigDecorator(<T>{partial: 'partial'}),
      isInclude: () => createMergeConfigDecorator(<T>{partial: 'include'}),
      isExclude: () => createMergeConfigDecorator(<T>{partial: 'exclude'}),
      isAlwaysRandom: () => createMergeConfigDecorator(<T>{alwaysRandom: true}),
      isNotAlwaysRandom: () => createMergeConfigDecorator(<T>{alwaysRandom: false}),
      isArray: (arrayConfig?: ArrayConfig | number) =>
        createMergeConfigDecorator(<T>{
          array: true,
          ...(typeof arrayConfig === 'number' ? {length: arrayConfig} : arrayConfig)
        }),
      isNotArray: () => createMergeConfigDecorator(<T>{array: false}),
      groups: (groups: string[]) => createMergeConfigDecorator(<T>{groups})
    }

    const classDecoratorProto: MockClassDecoratorProps<T> = {
      DefaultPartial: () => createMergeConfigDecorator<true>(<T>{partial: 'partial'}),
      DefaultInclude: () => createMergeConfigDecorator<true>(<T>{partial: 'include'}),
      DefaultExclude: () => createMergeConfigDecorator<true>(<T>{partial: 'exclude'}),
      DefaultAlwaysRandom: () => createMergeConfigDecorator<true>(<T>{alwaysRandom: true}),
      DefaultNotAlwaysRandom: () => createMergeConfigDecorator<true>(<T>{alwaysRandom: false})
    }

    Object.assign(decorator, isClass ? classDecoratorProto : propertyDecoratorProto)

    return decorator as IsClass extends true ? MockClassDecorator<T> : MockPropertyDecorator<T>
  }

  return createConfigDecorator(config)
}

const _decoratorProto = ConfigDecorator()
export const Config = _decoratorProto.config
export const IsPartial = _decoratorProto.isPartial
export const IsInclude = _decoratorProto.isInclude
export const IsExclude = _decoratorProto.isExclude
export const IsAlwaysRandom = _decoratorProto.isAlwaysRandom
export const IsNotAlwaysRandom = _decoratorProto.isNotAlwaysRandom
export const IsArray = _decoratorProto.isArray
export const IsNotArray = _decoratorProto.isNotArray
export const Groups = _decoratorProto.groups
