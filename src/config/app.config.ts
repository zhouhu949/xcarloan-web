declare var __REGISTER_PAGE_LIST__: Array<any>
const customConfig = require("app-config")
const env: any = process.env

let appConfig = {
  name: '汽车金融',
  version: '3.0.0',
  url: {
    server: process.env.URL_SERVER
  },
  mock: process.env.MOCK,
  timeout: 60000,
  debug: process.env.ENV === 'dev',
  registerPageList: __REGISTER_PAGE_LIST__
}

// 如果存在自定义配置则启用自定义配置
if (customConfig && customConfig.enable) {
  appConfig = Object.assign(appConfig, customConfig.config)
}

export default appConfig