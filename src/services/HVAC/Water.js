
import baseUrl from '../config'

const currUrl = baseUrl + 'HVAC/Water/'
const arr = [
  {
    name: '风冷热泵',
    url: currUrl + 'air_cooled_heat_pump_normal.svg',
    rect: {
      width: 300,
      height: 200
    },
    legendType: 'statusImg'
  },
  {
    name: '锅炉',
    url: currUrl + 'boiler_normal.svg',
    rect: {
      width: 300,
      height: 200
    },
    legendType: 'statusImg'
  },
  {
    name: '冷水机组',
    url: currUrl + 'chiller_normal.svg',
    rect: {
      width: 300,
      height: 200
    },
    legendType: 'statusImg'
  },
  {
    name: '循环水泵',
    url: currUrl + 'circulating_pump_normal.svg',
    rect: {
      width: 150,
      height: 100
    },
    legendType: 'statusImg'
  },
  {
    name: '冷却塔',
    url: currUrl + 'cooling_tower_normal.svg',
    rect: {
      width: 200,
      height: 200
    },
    legendType: 'statusImg'
  },
  {
    name: '潜污泵',
    url: currUrl + 'submersible_sewang_pump_normal.svg',
    rect: {
      width: 100,
      height: 150
    },
    legendType: 'statusImg'
  },
  {
    name: '集水井',
    url: currUrl + 'snmp_0.svg',
    rect: {
      width: 300,
      height: 300
    },
    legendType: 'enumImg'
  },
  {
    name: '集分水器',
    url: currUrl + 'water_collect.svg',
    rect: {
      width: 300,
      height: 80
    },
  },
  {
    name: '全热交换器',
    url: currUrl + 'HeatExchanger_Plate.svg',
    rect: {
      width: 300,
      height: 200
    },
  },
  {
    name: '生活水箱',
    url: currUrl + 'living_water_tank.svg',
    rect: {
      width: 300,
      height: 300
    },
  },
]

const pipeImg = {
  group: '给排水',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: item.rect || {
          width: 200,
          height: 200
        },
        name: 'image',
        image: item.url,
        data: {
          legendType: item.legendType || 'normalImg'
        }
      }
    }
  })
}
export default pipeImg