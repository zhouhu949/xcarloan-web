

const unit = 25

/**
 * 公共服务类
 */
export class CommonService {
  /**
   * 获取组件名称
   * @param path
   */
  public static getComponentName(path): string {
    let pathArray = path.split('.')[0].split('/')
    return `-${pathArray[pathArray.length - 1]}`.replace(/\-(\w)/g, ($0, $1) => $1.toUpperCase())
  }

  /**
   * 下载文件
   */
  static downloadFile(url, filename) {
    let a = document.createElement('a')
    a.href = url
    a.download = filename || (+new Date())
    a.click()
  }

  /**
   * 批量下载文件
   * @param pathList 需要下载的文件列表，需要包含 url,filename
   */
  static downloadAll(pathList) {
    let download = async () => {
      for (let index = 0; index < pathList.length; index++) {
        let v = pathList[index];
        await new Promise((reslove) => {
          CommonService.downloadFile(v.url, v.filename)
          setTimeout(() => {
            reslove()
          }, 100);
        })

      }
    }
    download()
  }



  /**
  * 用户部门数据
  * @param sourece
  */
  static departmentData(sourece) {
    if (!sourece) {
      return
    }

    // 生成部门结构数据
    let fun = node => {
      // 递归对象子元素
      let children = sourece.filter(x => node.id === x.pid).map(fun);

      if (children && children.length) {
        return Object.assign({}, node, { children })
      } else {
        return node
      }
    };

    // 过滤父节点
    let rootList = sourece.filter(x => {
      if (!x.deptPid) {
        return true;
      }

      return !sourece.find(item => item.id === x.pid);
    });

    // 生成树形结构
    return rootList.map(fun)
  }

  static getColumnWidth(count) {
    return count * unit
  }

  static reset(target, options?) {
    let check = (item, key, value) => {
      switch (typeof value) {
        case 'number': {
          item[key] = 0
          break;
        }
        case 'string': {
          item[key] = ""
          break;
        }
        case 'object': {
          if (value instanceof Array) {
            item[key] = []
          } else {
            clearObject(value)
          }
          break;
        }
      }
    }

    let clearObject = (object) => {
      if (!object) return
      Object.entries(object).forEach(([key, value]) => {
        check(object, key, value)
      })
    }

    let clearArray = (array) => {
      array.forEach((value, index) => {
        check(array, index, value)
      })
    }

    if (target instanceof Array) {
      clearArray(target)
    } else {
      clearObject(target)
    }
  }

  static revert(source, ...values) {
    let sourceType = typeof source

    if (!values.every(x => typeof x === sourceType)) {
      return
    }

    if (source instanceof Array) {
      source.length = 0
      values.forEach(item => {
        item.forEach(x => source.push(x))
      })
    } else {
      values.forEach(item => {
        for (let key in item) {
          if (key in source) {
            source[key] = item[key]
          }
        }
      })
    }


    return source
  }
}
