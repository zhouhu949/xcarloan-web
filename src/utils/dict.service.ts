import store from '~/store'

export class DictService {
    /**
     * 获取字典数据
     * @param id
     */
    static getDictData(...ids) {
        let results: Array<string> = []

        // 获取字典项
        ids.forEach(id => {
            let items = store.state.dictData
                .filter(x => x.dictId === id)
                .map(x => ({
                    value: x.id,
                    label: x.dictItemName,
                }))

            results.push(...items)
        })

        return results
    }

    static getDictName(value) {
        let data = store.state.dictData.find(x => value === x.id)
        if (data) {
            return data.dictItemName
        } else {
            return value
        }
    }
}
