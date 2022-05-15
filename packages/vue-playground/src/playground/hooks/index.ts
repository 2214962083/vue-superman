import {useDark, useToggle} from '@vueuse/core'

export const isDark = useDark({
  // do not add .dark class name to html
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChanged: () => {}
})
export const toggleDark = useToggle(isDark)
