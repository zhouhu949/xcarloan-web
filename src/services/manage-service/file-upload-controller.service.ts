import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class FileUploadControllerService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 下载文件
   */
  file({ id }) {
    return this.netService.send({
      server: manageService.fileUploadController.file,
      data: {
        id: id
      }
    })
  }
  /**
   * 查询文件信息
   */
  getAllUploadFileByIdList() {
    return this.netService.send({
      server: manageService.fileUploadController.getAllUploadFileByIdList,
    })
  }
  /**
   * 上传压缩文件，后台进行解压缩
   */
  unZipCaseFile(data) {
    return this.netService.send({
      server: manageService.fileUploadController.unZipCaseFile,
      data: data
    })
  }
  /**
 * Grid方式上传文件
 */
  uploadFileGrid() {
    return this.netService.send({
      server: manageService.fileUploadController.uploadFileGrid,
    })
  }
  /**
* 在线显示文件
*/
  view({ id }) {
    return this.netService.send({
      server: manageService.fileUploadController.view,
      data: {
        id: id
      }
    })
  }
  /**
   * 删除文件
   */
  delect({ id }) {
    return this.netService.send({
      server: manageService.fileUploadController.delect,
      data: {
        id: id
      }
    })
  }
}