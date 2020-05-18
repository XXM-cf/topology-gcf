
import baseUrl from '../config'
const currUrl = baseUrl + 'HVAC/Sensors2/'
const arr = [
  {
    name: '风管一氧化碳',
    url: 'sensor_CO.svg'
  },
  {
    name: '风管二氧化碳',
    url: 'sensor_CO2.svg'
  },
  {
    name: '风机压差',
    url: 'sensor_dp_down.svg',
    rect: {
      width: 120,
      height: 80
    }
  },
  {
    name: '滤网压差',
    url: 'sensor_dp_up.svg',
    rect: {
      width: 80,
      height: 80
    }
  },
  {
    name: '防冻开关',
    url: 'sensor_frost.svg'
  },
  {
    name: '风管湿度',
    url: 'sensor_hum.svg'
  },
  {
    name: '风管温度',
    url: 'sensor_temp.svg'
  },
  {
    name: '风管温湿度',
    url: 'sensor_temp_hum.svg'
  },
  {
    name: '左风管风速',
    url: 'sensor_wind_left.svg'
  },
  {
    name: '右风管风速',
    url: 'sensor_wind_right.svg'
  },
  {
    name: '电动蝶阀',
    url: 'electric_butterfly_valve.svg',
    rect: {
      width: 30,
      height: 60
    },
  },


  {
    name: '水管压力',
    url: 'pipe_pressure.svg',
    rect: {
      width: 30,
      height: 60
    },
  },
  {
    name: '比例调节阀',
    url: 'proportionning_valve.svg',
    rect: {
      width: 30,
      height: 60
    },
  },
  {
    name: '流量计',
    url: 'flowmeter.svg',
    rect: {
      width: 60,
      height: 40
    },
  },
  {
    name: '光照度',
    url: 'illuminance.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '一氧化碳',
    url: 'sensor_duct_CO_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '二氧化碳',
    url: 'sensor_duct_CO2_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '温度',
    url: 'sensor_duct_temp_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '湿度',
    url: 'sensor_humidity_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '左风速',
    url: 'sensor_pipe_wtrflowmtr_left_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '右风速',
    url: 'sensor_pipe_wtrflowmtr_right_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '温湿度',
    url: 'sensor_temp-hyg_top.svg',
    rect: {
      width: 30,
      height: 30
    },
  },
  {
    name: '自定义',
    url: 'sensor_space_top.svg',
    rect: {
      width: 30,
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
          width: 30,
          height: 60
        },
        name: 'image',
        image: currUrl + item.url,
        data: {
          legendType: item.legendType || 'normalImg'
        }
      }
    }
  })
}
export default pipeImg