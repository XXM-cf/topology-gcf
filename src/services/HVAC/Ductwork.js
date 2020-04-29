
import baseUrl from '../config'

const currUrl = baseUrl + 'HVAC/Ductwork/'
const arr = [
  {
    name: '左上弯管',
    url: currUrl + 'Duct_Connector_Corner_NW.svg',
    rect: {
      width: 140,
      height: 120
    },
  },
  {
    name: '右下弯管',
    url: currUrl + 'Duct_Connector_Corner_SE.svg',
    rect: {
      width: 130,
      height: 120
    },
  },
  {
    name: '左三通',
    url: currUrl + 'Duct_Connector_T_Left.svg',
    rect: {
      width: 130,
      height: 170
    },
  },
  {
    name: '上三通',
    url: currUrl + 'Duct_Connector_T_Up.svg',
    rect: {
      width: 150,
      height: 140
    },
  },
  {
    name: '二汇一管',
    url: currUrl + 'Duct_Horz_Dual_Split_Right.svg',
    rect: {
      width: 280,
      height: 241
    },
  },
  {
    name: '左边连管',
    url: currUrl + 'Duct_Horz_End_Left.svg',
    rect: {
      width: 120,
      height: 90
    },
  },
  {
    name: '右边连管',
    url: currUrl + 'Duct_Horz_End_Right.svg',
    rect: {
      width: 130,
      height: 90
    },
  },
  {
    name: '左边界管',
    url: currUrl + 'Duct_Horz_EndCap_Left.svg',
    rect: {
      width: 110,
      height: 90
    },
  },
  {
    name: '右边界管',
    url: currUrl + 'Duct_Horz_EndCap_Right.svg',

    rect: {
      width: 70,
      height: 90
    },
  },
  {
    name: '直管',
    url: currUrl + 'Duct_Horz_Long.svg',
    rect: {
      width: 200,
      height: 90
    },
  },
  {
    name: '垂直连管',
    url: currUrl + 'Duct_Vert_End_Down.svg',
    rect: {
      width: 100,
      height: 120
    },
    legendType: 'enumImg' // enumDevice: 枚举切换 statusImg: 状态图片
  },
]

const pipeImg = {
  group: '风管',
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
          legendType: 'image' // 普通图片
        }
      }
    }
  })
}
export default pipeImg