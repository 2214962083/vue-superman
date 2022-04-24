import {JsxFn} from '@/utils/types-helper'
import {defineComponent, h, nextTick, ref} from 'vue-demi'
import XJsx from '../'
import {mount} from '@test/mount'
import {useJsx} from '@/hooks'
import {createFunctionComponent, getSlots, setProps} from '@test/helper'

const createXJsxComponent = () =>
  defineComponent({
    setup() {
      const count = ref(0)
      const countIncrement = () => count.value++

      const SubTitle = createFunctionComponent(() =>
        h('h3', {class: 'sub-title'}, [`subTitle: count realtime value: ${count.value}`])
      )

      const Title = createFunctionComponent((props, ctx) =>
        h('div', {class: 'title'}, [h('h1', [`title: count realtime value: ${count.value}`]), getSlots(ctx, 'default')])
      )

      const Card: JsxFn = props => {
        return h('div', {class: 'card'}, [
          h('h1', ['Card component, create in setup useJsx, use in template']),
          h(Title, [h(SubTitle)]),
          props.children
        ])
      }

      return {
        count,
        countIncrement,
        SubTitle,
        Title,
        Card
      }
    },
    render() {
      const Card = this.Card
      return h(XJsx, {...setProps({jsx: Card})}, [
        h('div', {class: 'card-children'}, ['Card components children from template'])
      ])
    }
  })

const createXJsxWithUseJsxComponent = () =>
  defineComponent({
    setup() {
      const count = ref(0)
      const countIncrement = () => count.value++

      const SubTitle = useJsx(h('h3', {class: 'sub-title'}, [`subTitle: count first frame value: ${count.value}`]))

      const Title = useJsx(props =>
        h('div', {class: 'title'}, [h('h1', [`title: count realtime value: ${count.value}`]), props.children])
      )

      const Card: JsxFn = props => {
        return h('div', {class: 'card'}, [
          h('h1', ['Card component, create in setup useJsx, use in template']),
          h(Title, [h(SubTitle)]),
          props.children
        ])
      }

      return {
        count,
        countIncrement,
        SubTitle,
        Title,
        Card
      }
    },
    render() {
      const Card = this.Card
      return h(XJsx, {...setProps({jsx: Card})}, [
        h('div', {class: 'card-children'}, ['Card components children from template'])
      ])
    }
  })

describe('XJsx Component', () => {
  test('should render jsx', async () => {
    const vm = mount(createXJsxComponent())

    const subTitle = vm.find('.sub-title')
    const title = vm.find('.title')
    const card = vm.find('.card')
    vm.countIncrement()

    await nextTick()

    expect(subTitle.text()).toBe('subTitle: count realtime value: 1')

    expect(title.find('h1').text()).toBe('title: count realtime value: 1')
    expect(title.find('.sub-title').text()).toBe('subTitle: count realtime value: 1')

    expect(card.find('h1').text()).toBe('Card component, create in setup useJsx, use in template')
    expect(card.find('.title').find('h1').text()).toBe('title: count realtime value: 1')
    expect(card.find('.card-children').text()).toBe('Card components children from template')
    vm.toSnap()
  })

  test('should working with useJsx', async () => {
    const vm = mount(createXJsxWithUseJsxComponent())

    const subTitle = vm.find('.sub-title')
    const title = vm.find('.title')
    const card = vm.find('.card')
    vm.countIncrement()

    await nextTick()

    expect(subTitle.text()).toBe('subTitle: count first frame value: 0')

    expect(title.find('h1').text()).toBe('title: count realtime value: 1')
    expect(title.find('.sub-title').text()).toBe('subTitle: count first frame value: 0')

    expect(card.find('h1').text()).toBe('Card component, create in setup useJsx, use in template')
    expect(card.find('.title').find('h1').text()).toBe('title: count realtime value: 1')
    expect(card.find('.card-children').text()).toBe('Card components children from template')
    vm.toSnap()
  })
})
