import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'fileUploadController'
export default {
  /**
   * 下载文件
   */
  file: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'file',
    type: requestType.Get
  },
  /**
  * 查询文件信息
  */
  getAllUploadFileByIdList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllUploadFileByIdList',
    type: requestType.Get
  },
  /**
  * 上传压缩文件，后台进行解压缩
  */
  unZipCaseFile: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'unZipCaseFile',
    type: requestType.Post
  },
  /**
  * Grid方式上传文件
  */
  uploadFileGrid: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'uploadFileGrid',
    type: requestType.Post
  },
  /**
   * 根据条件查询审批原因
   */
  view: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'view',
    type: requestType.Get
  },
  /**
   * 删除文件
   */
  delect: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'delect',
    type: requestType.Delete
  }
}