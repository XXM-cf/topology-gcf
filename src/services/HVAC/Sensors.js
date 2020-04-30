
import baseUrl from '../config'
const currUrl = baseUrl + 'HVAC/Sensors/'
const arr = [
  {
    name: '风管一氧化碳',
    url: currUrl + 'sensor_CO.svg'
  },
  {
    name: '风管二氧化碳',
    url: currUrl + 'sensor_CO2.svg'
  },
  {
    name: '风机压差',
    url: currUrl + 'sensor_dp_down.svg',
    rect: {
      width: 120,
      height: 80
    }
  },
  {
    name: '滤网压差',
    url: currUrl + 'sensor_dp_up.svg',
    rect: {
      width: 80,
      height: 80
    }
  },
  {
    name: '防冻开关',
    url: currUrl + 'sensor_frost.svg'
  },
  {
    name: '风管湿度',
    url: currUrl + 'sensor_hum.svg'
  },
  {
    name: '风管温度',
    url: currUrl + 'sensor_temp.svg'
  },
  {
    name: '风管温湿度',
    url: currUrl + 'sensor_temp_hum.svg'
  },
  {
    name: '左风管风速',
    url: currUrl + 'sensor_wind_left.svg'
  },
  {
    name: '右风管风速',
    url: currUrl + 'sensor_wind_right.svg'
  },
  {
    name: '电动蝶阀',
    url: currUrl + 'electric_butterfly_valve.svg',
    rect: {
      width: 123,
      height: 150
    },
  },
  {
    name: '光照度',
    url: currUrl + 'illuminance.svg',
    rect: {
      width: 78,
      height: 74
    },
  },

  {
    name: '水管压力',
    url: currUrl + 'pipe_pressure.svg',
    rect: {
      width: 79,
      height: 146
    },
  },
  {
    name: '比例调节阀',
    url: currUrl + 'proportionning_valve.svg',
    rect: {
      width: 100,
      height: 175
    },
  },
  {
    name: '流量计',
    url: currUrl + 'flowmeter.svg',
    rect: {
      width: 100,
      height: 30
    },
  },

]

const pipeImg = {
  group: '传感器',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: item.rect || {
          width: 20,
          height: 60
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