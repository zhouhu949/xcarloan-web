import store from '~/store'

export class DictService {
    /**
     * 获取字典数据
     * @param codes
     */
    static getDictData(...codes) {
        let results: Array<string> = []

        // 获取字典项
        codes.forEach(code => {
            let items = store.state.dictData
                .filter(x => x.typeCode === code)
                .map(x => ({
                    value: x.id,
                    label: x.name
                }))

            results.push(...items)
        })

        return results
    }

    static getDictName(value) {
        let data = store.state.dictData.find(x => value === x.id)
        if (data) {
            return data.name
        } else {
            return value
        }
    }
}
