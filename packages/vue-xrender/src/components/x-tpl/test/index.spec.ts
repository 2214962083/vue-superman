import {defineComponent, h, nextTick, ref} from 'vue-demi'
import XTpl from '../'
import {mount} from '@test/mount'
import {setProps} from '@test/helper'

const createComponent = () =>
  defineComponent({
    setup() {
      const count = ref(0)
      const countIncrement = () => count.value++

      const cardTpl = ref(`
        <div class="card">
          <h1>CardTpl component, create in setup template string, use in template</h1>
          <h2>CardTpl real count: {{count}}</h2>
          <slot></slot>
        </div>
      `)

      const setCardTpl = (tpl: string) => {
        cardTpl.value = tpl
      }

      return {
        count,
        countIncrement,
        cardTpl,
        setCardTpl
      }
    },
    render() {
      return h(XTpl, {...setProps({tpl: this.cardTpl})}, [
        h('div', {class: 'card-children'}, ['Card components children from template'])
      ])
    }
  })

describe('XTpl Component', () => {
  test('should render dynamic template string', async () => {
    const vm = mount(createComponent())

    let card = vm.find('.card')
    let cardChildren = vm.find('.card-children')
    vm.countIncrement()

    await nextTick()

    expect(card.find('h1').text()).toBe('CardTpl component, create in setup template string, use in template')
    expect(card.find('h2').text()).toBe('CardTpl real count: 1')
    expect(cardChildren.text()).toBe('Card components children from template')

    vm.toSnap()

    vm.setCardTpl(`<div class="card">Hello, real count: {{count}}</div>`)

    await nextTick()

    card = vm.find('.card')
    cardChildren = vm.find('.card-children')

    expect(card.text()).toBe('Hello, real count: 1')
    expect(cardChildren.el).toBeFalsy()

    vm.toSnap()
  })
})
