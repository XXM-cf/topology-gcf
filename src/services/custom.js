const custom = {
  group: '定制组件',
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
      name: '电梯轨道',
      icon: 'icon-rect',
      data: {
        rect: {
          width: 25,
          height: 400
        },
        fillStyle: 'rgba(217,225,232, 0.63)',
        strokeStyle: 'rgba(237, 233, 233, 0.2)',
        name: 'rectangle',
        data: {
          elevatorStep: 0,
          legendType: 'elevatorTrack'
        }
      }
    },
    {
      name: '液位',
      icon: 'icon-rect',
      data: {
        rect: {
          width: 156,
          height: 144
        },
        fillStyle: 'rgba(217,225,232, 0.63)',
        strokeStyle: 'rgba(237, 233, 233, 0.2)',
        name: 'rectangle',
        data: {
          legendType: 'waterTrack'
        }
      }
    },
    {
      name: '防区',
      icon: 'icon-rect',
      data: {
        rect: {
          width: 200,
          height: 100
        },
        dash: 1,
        lineWidth: 2,
        fillStyle: 'rgba(255,179,0,0.4)',
        strokeStyle: 'rgba(241, 104, 6, 1)',
        name: 'rectangle',
        data: {
          legendType: 'defenseArea'
        }
      }
    },

  ]
}

export default custom