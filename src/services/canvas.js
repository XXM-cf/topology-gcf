import { register as registerFlow } from '@topology/flow-diagram';
registerFlow()

import plantIcon from './plantIcon'
import plantIcon2 from './plantIcon2'
import electricity from './electricity'
import Ductwork from './HVAC/Ductwork'
import Water from './HVAC/Water'
import Sensors from './HVAC/Sensors'
import Cunstom from './custom'

export const Tools = [
  plantIcon,
  plantIcon2,
  electricity,
  Ductwork,
  Water,
  Sensors,
  Cunstom,
  {
    group: '基本形状',
    children: [
      {
        name: '文字',
        icon: 'icon-text',
        data: {
          text: '示例文字',
          rect: {
            width: 60,
            height: 30
          },
          data: {
            legendType: 'text'
          },
          name: 'text'
        }
      },
      {
        name: '矩形',
        icon: 'icon-rect',
        data: {
          rect: {
            width: 100,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'rectangle',
        }
      },
      {
        name: '圆角矩形',
        icon: 'icon-rectangle',
        data: {
          text: '圆角矩形',
          rect: {
            width: 200,
            height: 50
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 0.1,
          name: 'rectangle'
        }
      },
      {
        name: '圆',
        icon: 'icon-circle',
        data: {
          text: '圆',
          rect: {
            width: 100,
            height: 100
          },
          name: 'circle',
          textMaxLine: 1
        }
      },
      {
        name: '三角形',
        icon: 'icon-triangle',
        data: {
          text: '三角形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'triangle'
        }
      },
      {
        name: '菱形',
        icon: 'icon-diamond',
        data: {
          text: '菱形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'diamond'
        }
      },
      {
        name: '五边形',
        icon: 'icon-pentagon',
        data: {
          text: '五边形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'pentagon'
        }
      },
      {
        name: '六边形',
        icon: 'icon-hexagon',
        data: {
          text: '六边形',
          rect: {
            width: 100,
            height: 100
          },
          paddingTop: 10,
          paddingBottom: 10,
          name: 'hexagon'
        }
      },
      {
        name: '五角星',
        icon: 'icon-pentagram',
        data: {
          text: '五角星',
          rect: {
            width: 100,
            height: 100
          },
          name: 'pentagram'
        }
      },
      {
        name: '左箭头',
        icon: 'icon-arrow-left',
        data: {
          text: '左箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'leftArrow'
        }
      },
      {
        name: '右箭头',
        icon: 'icon-arrow-right',
        data: {
          text: '右箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'rightArrow'
        }
      },
      {
        name: '双向箭头',
        icon: 'icon-twoway-arrow',
        data: {
          text: '双向箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'twowayArrow'
        }
      },
      {
        name: '直线',
        icon: 'icon-line',
        data: {
          text: '直线',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'line'
        }
      },
      {
        name: '云',
        icon: 'icon-cloud',
        data: {
          text: '云',
          rect: {
            width: 100,
            height: 100
          },
          name: 'cloud'
        }
      },
      {
        name: '消息框',
        icon: 'icon-msg',
        data: {
          text: '消息框',
          rect: {
            width: 100,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'message'
        }
      },
      {
        name: '文档',
        icon: 'icon-file',
        data: {
          rect: {
            width: 80,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'file'
        }
      },
      {
        name: '视频/网页',
        icon: 'icon-pc',
        data: {
          text: '视频/网页',
          rect: {
            width: 200,
            height: 200
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'div'
        }
      }
    ]
  }
]
