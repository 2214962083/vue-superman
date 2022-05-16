/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineComponent, VNode} from 'vue'

const createComponent = (name: string, render: (props: Record<string, any>) => VNode) =>
  defineComponent({
    name,
    render() {
      const props = {...this.$props, ...this.$attrs}
      return render(props)
    }
  })

export const EditorLeftPreviewRightIcon = createComponent('EditorLeftPreviewRightIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      d="M12 5v14h7V5h-7zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      fill="currentColor"
    ></path>
  </svg>
))

export const EditorTopPreviewBottomIcon = createComponent('EditorTopPreviewBottomIcon', props => (
  <EditorLeftPreviewRightIcon {...props} style={{transform: 'rotate(90deg)'}} />
))

export const EditorRightPreviewLeftIcon = createComponent('EditorRightPreviewLeftIcon', props => (
  <EditorLeftPreviewRightIcon {...props} style={{transform: 'rotate(180deg)'}} />
))

export const EditorBottomPreviewTopIcon = createComponent('EditorBottomPreviewTopIcon', props => (
  <EditorLeftPreviewRightIcon {...props} style={{transform: 'rotate(270deg)'}} />
))

export const ErrorIcon = createComponent('ErrorIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
      fill="currentColor"
    ></path>
  </svg>
))

export const FullscreenIcon = createComponent('FullscreenIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path d="M5 5h5v2H7v3H5V5m9 0h5v5h-2V7h-3V5m3 9h2v5h-5v-2h3v-3m-7 3v2H5v-5h2v3h3z" fill="currentColor"></path>
  </svg>
))

export const ExitFullscreenIcon = createComponent('ExitFullscreenIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path d="M14 14h5v2h-3v3h-2v-5m-9 0h5v5H8v-3H5v-2m3-9h2v5H5V8h3V5m11 3v2h-5V5h2v3h3z" fill="currentColor"></path>
  </svg>
))

export const ShowCodeIcon = createComponent('ShowCodeIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      d="M8.7 15.9L4.8 12l3.9-3.9a.984.984 0 0 0 0-1.4a.984.984 0 0 0-1.4 0l-4.59 4.59a.996.996 0 0 0 0 1.41l4.59 4.6c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4zm6.6 0l3.9-3.9l-3.9-3.9a.984.984 0 0 1 0-1.4a.984.984 0 0 1 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6a.984.984 0 0 1-1.4 0a.984.984 0 0 1 0-1.4z"
      fill="currentColor"
    ></path>
  </svg>
))

export const HideCodeIcon = createComponent('HideCodeIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      d="M19.17 12l-3.88-3.88a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41l-2.88 2.88L17 14.17L19.17 12zM2.1 4.93l3.49 3.49l-2.88 2.88a.996.996 0 0 0 0 1.41L7.3 17.3a.996.996 0 1 0 1.41-1.41L4.83 12L7 9.83L19.07 21.9a.996.996 0 1 0 1.41-1.41L3.51 3.51a.996.996 0 0 0-1.41 0c-.39.4-.39 1.03 0 1.42z"
      fill="currentColor"
    ></path>
  </svg>
))

export const DisconnectedIcon = createComponent('DisconnectedIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M21.707 3.707a1 1 0 0 0-1.414-1.414L18.496 4.09a4.252 4.252 0 0 0-5.251.604l-1.068 1.069a1.75 1.75 0 0 0 0 2.474l3.585 3.586a1.75 1.75 0 0 0 2.475 0l1.068-1.068a4.252 4.252 0 0 0 .605-5.25l1.797-1.798Zm-11 8a1 1 0 0 0-1.414-1.414l-1.47 1.47l-.293-.293a.75.75 0 0 0-1.06 0l-1.775 1.775a4.252 4.252 0 0 0-.605 5.25l-1.797 1.798a1 1 0 1 0 1.414 1.414l1.798-1.797a4.252 4.252 0 0 0 5.25-.605l1.775-1.775a.75.75 0 0 0 0-1.06l-.293-.293l1.47-1.47a1 1 0 0 0-1.414-1.414l-1.47 1.47l-1.586-1.586l1.47-1.47Z"
    />
  </svg>
))

export const ConnectedIcon = createComponent('ConnectedIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M17.78 3.28a.75.75 0 0 0-1.06-1.06l-2.446 2.445a4.037 4.037 0 0 0-5.128.481l-.3.3a1.49 1.49 0 0 0 0 2.108l3.6 3.6a1.49 1.49 0 0 0 2.107 0l.3-.3a4.037 4.037 0 0 0 .482-5.128L17.78 3.28ZM7.554 8.846a1.49 1.49 0 0 0-2.107 0l-.3.3a4.037 4.037 0 0 0-.481 5.128L2.22 16.72a.75.75 0 1 0 1.06 1.06l2.446-2.446a4.037 4.037 0 0 0 5.128-.48l.3-.3a1.49 1.49 0 0 0 0-2.108l-3.6-3.6Z"
    />
  </svg>
))

export const LightIcon = createComponent('LightIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path>
    <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
    <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
    <path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path>
    <path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path>
    <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
    <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
    <path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path>
    <path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>
  </svg>
))

export const DarkIcon = createComponent('DarkIcon', props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"></path>
  </svg>
))

export const LoadingIcon = createComponent('LoadingIcon', props => (
  <svg
    focusable="false"
    class="anticon-spin"
    data-icon="loading"
    aria-hidden="true"
    viewBox="0 0 1024 1024"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
  </svg>
))
