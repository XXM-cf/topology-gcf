
import baseUrl from '../config'

const currUrl = baseUrl + 'HVAC/Ductwork/'
const arr = [
  {
    name: '动态箭头',
    url: 'Duct_Airflow_Short_Left.gif',
    rect: {
      width: 160,
      height: 30
    }
  },
  {
    name: '风机外框_左',
    url: 'Fans_Left_normal.svg',
    rect: {
      width: 130,
      height: 90
    },
    legendType: 'statusImg'
  },
  {
    name: '风机外框_右',
    url: 'Fans_Right_normal.svg',
    rect: {
      width: 130,
      height: 90
    },
    legendType: 'statusImg'
  },
  {
    name: '风机扇叶',
    url: 'Fans_center.svg',
    rect: {
      width: 46,
      height: 46
    }
  },
  {
    name: '滤网零级',
    url: 'Filter_Single_0.svg',
    rect: {
      width: 80,
      height: 90
    },
    legendType: 'enumImg'
  },
  {
    name: '冷段零级',
    url: 'Coils_Cooling_2Way_Bottom_0.svg',
    rect: {
      width: 80,
      height: 120
    },
    legendType: 'enumImg'
  },
  {
    name: '热段零级',
    url: 'Coils_Heating_3Way_Bottom_0.svg',
    rect: {
      width: 80,
      height: 120
    },
    legendType: 'enumImg'
  },
  {
    name: '新风阀零级',
    url: 'Damper_Horz_Parallel_0.svg',
    rect: {
      width: 80,
      height: 90
    },
    legendType: 'enumImg'
  },

  {
    name: '回风阀零级',
    url: 'Damper_Vert_Parallel_0.svg',
    rect: {
      width: 100,
      height: 70
    },
    legendType: 'enumImg'
  },
  {
    name: '转轮',
    url: 'reel_normal.svg',
    rect: {
      width: 300,
      height: 300
    },
    legendType: 'statusImg'
  },
  {
    name: '左上弯管',
    url: 'Duct_Connector_Corner_NW.svg',
    rect: {
      width: 140,
      height: 120
    },
  },
  {
    name: '右下弯管',
    url: 'Duct_Connector_Corner_SE.svg',
    rect: {
      width: 130,
      height: 120
    },
  },
  {
    name: '左三通',
    url: 'Duct_Connector_T_Left.svg',
    rect: {
      width: 130,
      height: 170
    },
  },
  {
    name: '上三通',
    url: 'Duct_Connector_T_Up.svg',
    rect: {
      width: 150,
      height: 140
    },
  },
  {
    name: '二汇一管',
    url: 'Duct_Horz_Dual_Split_Right.svg',
    rect: {
      width: 280,
      height: 241
    },
  },
  {
    name: '左边连管',
    url: 'Duct_Horz_End_Left.svg',
    rect: {
      width: 120,
      height: 90
    },
  },
  {
    name: '右边连管',
    url: 'Duct_Horz_End_Right.svg',
    rect: {
      width: 130,
      height: 90
    },
  },
  {
    name: '左边界管',
    url: 'Duct_Horz_EndCap_Left.svg',
    rect: {
      width: 110,
      height: 90
    },
  },
  {
    name: '右边界管',
    url: 'Duct_Horz_EndCap_Right.svg',

    rect: {
      width: 70,
      height: 90
    },
  },
  {
    name: '直管',
    url: 'Duct_Horz_Long.svg',
    rect: {
      width: 200,
      height: 90
    },
  },
  {
    name: '垂直连管',
    url: 'Duct_Vert_End_Down.svg',
    rect: {
      width: 100,
      height: 120
    },
    legendType: 'enumImg' // enumImg: 枚举切换 statusImg: 状态图片
  },
]

const pipeImg = {
  group: '空调末端',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: item.rect || {
          width: 200,
          height: 200
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