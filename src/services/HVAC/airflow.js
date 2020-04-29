
import baseUrl from '../config'

const currUrl = baseUrl + 'HVAC/airflow/'
const arr = [
  {
    name: '下行箭头',
    url: currUrl + 'Duct_Airflow_Short_Down.svg'
  },
  {
    name: '左行箭头',
    url: currUrl + 'Duct_Airflow_Short_Left.svg'
  },
  {
    name: '右行箭头',
    url: currUrl + 'Duct_Airflow_Short_Right.svg'
  },
]

const pipeImg = {
  group: '箭头',
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