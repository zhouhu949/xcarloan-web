import { Observable } from "rxjs";
import axios from 'axios'
import Qs from 'qs'
import app from '~/config/app.config'
import { StorageService } from '~/utils/storage.service'
import { resolve } from "url";
import { LoadingService } from "~/utils/loading.service";
// import cookie from 'js-cookie'

const getType = ['GET', 'DELETE'] // 使用GET请求类型

export class NetService {
  // 使用GET请求类型
  private axiosInstance
  private userToken

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: app.url.server,
      timeout: app.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (app.mock) {
      let MockAdapter = require('axios-mock-adapter')
      let mock = new MockAdapter(this.axiosInstance, { delayResponse: 300 });
      this.createMock(mock)
    }
  }


  /**
   * 创建mock服务
   * @param mock
   */
  createMock(mock) {
    let mockServices = require('../../mock')

    Object.values(mockServices).forEach(mockItem => {
      Object.values(mockItem).forEach(items => {
        Object.values(items).forEach(({ server, data }) => {
          let url = NetService.generateRequestUrl(server)

          mock.onAny(url).reply(200, data)
        })
      })
    })
  }

  public static generateRequestUrl({ service, controller, action, url }: { service: string, controller: string, action: string, url?: string }, append = [], sort?): String {
    // 自定义url优先级最高
    if (url) return url

    // 进行url拼接
    if (controller) {
      let targetUrl = [
        service,
        controller,
        action,
        ...append].filter(x => x).join('/')

      if (sort) {
        console.log(sort)
        targetUrl += '?'
        targetUrl += Object.entries(sort.sort).map(([k, v]) => `sort=${k},${v}`).join('&')
      }

      return targetUrl
    } else {
      throw new Error('server配置异常,请检查对应server配置')
    }
  }

  /**
   * 生成头部信息
   */
  private generateRequestHeader(headers): Object {
    let token = StorageService.getItem('userToken') || ''
    if (token) {
      return Object.assign({
        'authorization': token
      }, headers)
    } else {
      return headers || {}
    }
  }


  /**
   * 过滤空数据
   * @param data
   */
  private filterEmptyData(data) {
    Object.entries(data)
      .filter(([key, value]) => {
        // 过滤空字符串
        if (value === undefined || value === "") {
          return true
        }

        // 过滤空数组
        // if (value instanceof Array && (value.length === 0 || value.every(x => x === ''))) {
        //   return true
        // }
      })
      .forEach(([key, value]) => {
        delete data[key]
      });
    return data
  }

  /**
   * 发送网络请求信息
   * @param param0
   */
  send(options: any): Observable<any> {
    let data = Object.assign({}, options.data)
    let postData
    let getData

    let url = NetService.generateRequestUrl(options.server, options.append, options.sort)
    let method = options.server.type || 'GET'
    let headers = this.generateRequestHeader(options.headers)

    if (options.page) {
      data = Object.assign(data, options.page.getConfig())
    }

    // 判断参数类型
    getType.indexOf(method) > -1 ? (getData = this.filterEmptyData(data)) : (postData = this.filterEmptyData(data))

    let loadingPromise = new Promise((resolve, reject) => {
      if (options.loading) {
        let loading = LoadingService.show();
        resolve(loading)
      } else {
        resolve()
      }
    })

    // 发送通讯结果
    let emitResult = (fn) => {
      return function (loading) {
        if (loading) {
          loading.remove()
        }

        if (fn && typeof fn === 'function') {
          fn.call(this)
        }
      }
    }


    // 创建待观察对象
    var observable = Observable.create((observer) => {
      this.axiosInstance.request({
        method,
        url,
        headers,
        data: postData,
        params: getData,
        paramsSerializer: (params) =>
          Qs.stringify(params, {
            arrayFormat: 'repeat',
            skipNulls: true,
            allowDots: true
          })
      }).then(({ data }) => {
        if (data.status === "SUCCESS") {
          let { object } = data

          if (options.page && object.list) {
            options.page.update(object)
            object = object.list
          }
          loadingPromise.then(emitResult(() => {
            observer.next(object)
          }))
        } else {
          loadingPromise.then(emitResult(() => {
            observer.error({
              msg: data.msg
            })
          }))
        }
      }).catch((ex) => {
        // 错误信息
        let error: any = {
          msg: "",
          params: ""
        }


        // 逻辑异常检测
        if (!ex.response && !ex.request) {
          error.msg = ex.message
          error.params = ex.stack
          console.error(ex.stack)
          loadingPromise.then(emitResult(() => { }))
          return Observable.empty()
        }

        // 通讯状态检测
        if (!ex.response) {
          let error = {
            msg: "服务端连接异常，请检查服务端状态.",
          }
          console.error(error.msg)
          return loadingPromise.then(emitResult(() => {
            observer.error(error)
          }))
        }

        // 错误类型检测
        switch (ex.response.status) {
          case 403:
            {
              //
            }
            break;
        }
      })
    })

    return observable
  }
}
