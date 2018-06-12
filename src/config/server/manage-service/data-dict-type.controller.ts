// 数字字典controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'dataDictType'

export default {
    /**
     * 查询所有数据字典类型
     */
    getAllDictType: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllDictType',
        type: requestType.Get
    },
    /**
   * 新增或修改数据字典类型
   */
    createOrModifyDataDictType: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createOrModifyDataDictType',
        type: requestType.Post
    }
}