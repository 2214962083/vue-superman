import {CLASS_META_KEY} from '@/constants/meta.constants'
import {ConfigDecorator} from './config.decorator'

const _decoratorProto = ConfigDecorator(
  {},
  {
    overridePropertyKey: CLASS_META_KEY,
    isClass: true
  }
)

export const DefaultPartial = _decoratorProto.DefaultPartial
export const DefaultInclude = _decoratorProto.DefaultInclude
export const DefaultExclude = _decoratorProto.DefaultExclude
export const DefaultAlwaysRandom = _decoratorProto.DefaultAlwaysRandom
export const DefaultNotAlwaysRandom = _decoratorProto.DefaultNotAlwaysRandom
