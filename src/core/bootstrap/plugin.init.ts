import Vue from 'vue'
import iView from 'iview'
import AMap from 'vue-amap'

export default async function ({ store }) {
  AMap.initAMapApiLoader({
    key: '0240ff10dd31d192c04ae9e0d4c76561',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
  });

  Vue.use(AMap);
  Vue.use(iView)
}
