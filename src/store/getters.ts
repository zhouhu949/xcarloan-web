
import { CommonService } from "~/utils/common.service";

export default {
  /**
   * 获取当前用户名
   * @param param0 
   */
  userName(state) {
    return (state.userData || {}).userName
  }
}
