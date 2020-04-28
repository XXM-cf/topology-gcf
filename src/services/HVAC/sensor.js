
import baseUrl from '../config'
const currUrl = baseUrl + 'HVAC/Sensors/'
const arr = [
  {
    name: '风速_左',
    url: currUrl + 'sensor_wind_left.svg'
  },
  {
    name: '风速_右',
    url: currUrl + 'sensor_wind_right.svg'
  },
  {
    name: '温度',
    url: currUrl + 'sensor_temp.svg'
  },
  {
    name: '湿度',
    url: currUrl + 'sensor_hum.svg'
  },
  {
    name: '温湿度',
    url: currUrl + 'sensor_temp_hum.svg'
  },
  {
    name: 'CO',
    url: currUrl + 'sensor_CO.svg'
  },
  {
    name: 'CO2',
    url: currUrl + 'sensor_CO2.svg'
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