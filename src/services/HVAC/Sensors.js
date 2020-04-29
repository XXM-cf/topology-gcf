
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
    url: currUrl + 'sensor_dp_down.svg'
  },
  {
    name: '滤网压差',
    url: currUrl + 'sensor_dp_up.svg'
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
        image: item.url
      }
    }
  })
}
export default pipeImg