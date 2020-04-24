const arr = [
  {
    name: '湿度',
    class: 'icon-shidu',
    unicode: '\uecd5'
  },

]

const pipeImg = {
  group: '设备图标',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        text: '湿度',
        rect: {
          width: 60,
          height: 60
        },
        borderColor: 'rgba(0,0,0,0)',  // 去除边框
        strokeStyle: 'rgba(0,0,0,0)',
        icon: item.unicode,
        iconFamily: 'iconfont',
        iconClass: item.class,
        iconSize: 30,
        name: 'circle',
      }
    }
  })
}
export default pipeImg