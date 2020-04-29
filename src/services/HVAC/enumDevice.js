
import baseUrl from '../config'

const currUrl = baseUrl + 'HVAC/enumDevice/'
const arr = [
  {
    name: '滤网零级',
    url: currUrl + 'Filter_Single_0.svg',
    rect: {
      width: 80,
      height: 90
    }
  },
  {
    name: '冷段零级',
    url: currUrl + 'Coils_Cooling_2Way_Bottom_0.svg',
    rect: {
      width: 80,
      height: 120
    }
  },
  {
    name: '热段零级',
    url: currUrl + 'Coils_Heating_3Way_Bottom_0.svg',
    rect: {
      width: 80,
      height: 120
    }
  },

  {
    name: '新风阀零级',
    url: currUrl + 'Damper_Horz_Parallel_0.svg',
    rect: {
      width: 80,
      height: 90
    }
  },

  {
    name: '回风阀零级',
    url: currUrl + 'Damper_Vert_Parallel_0.svg',
    rect: {
      width: 100,
      height: 70
    }
  },

]

const pipeImg = {
  group: '多态设备',
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
          legendType: 'enumDevice' // 普通图片
        }
      }
    }
  })
}
export default pipeImg