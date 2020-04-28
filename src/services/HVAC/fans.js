
import baseUrl from '../config'

const currUrl = baseUrl + 'HVAC/fans/'
const arr = [
  {
    name: '风机外框_左',
    url: currUrl + 'fans_left_base_normal.svg',
    rect: {
      width: 130,
      height: 90
    }

  },
  {
    name: '风机外框_右',
    url: currUrl + 'fans_right_base_normal.svg',
    rect: {
      width: 130,
      height: 90
    }
  },
  {
    name: '风机扇叶_左',
    url: currUrl + 'fans_left_center.svg',
    rect: {
      width: 45,
      height: 45
    }
  },
  {
    name: '风机扇叶_右',
    url: currUrl + 'fans_right_center.svg',
    rect: {
      width: 45,
      height: 45
    }
  },
]

const pipeImg = {
  group: '风机',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: item.rect,
        name: 'image',
        image: item.url
      }
    }
  })
}
export default pipeImg