/* eslint-disable */

const rtConfig = window['rdi-todo'] || {}

__webpack_require__.p = rtConfig.AssetsConfig
    ? (rtConfig.AssetsConfig.baseUrl + '/')
    : ''

export default rtConfig
