import loginController from './login.controller'
import sysDictController from './sys-dict.controller'
import resourceController from './resource.controller'
import orderController from './order.controller'
import orderQueryController from './order.query.controller'
import applyQueryController from './apply.query.controller'
import roleController from './role.controller'

export const businessService = {
  loginController,
  sysDictController,
  resourceController,
  orderController,
  orderQueryController,
  applyQueryController,
  roleController
}
