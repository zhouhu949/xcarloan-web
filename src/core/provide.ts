const NetService = () => require('~/utils/net.service')
const PageService = () => require('~/utils/page.service')
const SortService = () => require('~/utils/sort.service')
// const DataDictSerivce = () => require('~/services/business-service/data-dict.service')
// const ResourceSerivce = () => require('~/services/business-service/resource.service')
// const LoginSerivce = () => require('~/services/business-service/login.service')

export default function () {
  return {
    'netService': [NetService, 'none'],
    'pageService': [PageService, 'none'],
    'sortService': [SortService, 'none'],
    // 'dataDictSerivce': DataDictSerivce,
    // 'resourceSerivce': ResourceSerivce,
    // 'loginSerivce': LoginSerivce
  }
}
