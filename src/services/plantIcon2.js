const arr = [
  {
    "name": "FCU",
    "font_class": "FCUfengjipanguanfuben",
    "unicode": "\ued25",
  },
  {
    "name": "VRF",
    "font_class": "VRFduolianjizufuben",
    "unicode": "\ued26",
  },
  {
    "name": "UPS",
    "font_class": "UPSbujianduandianyuanfuben",
    "unicode": "\ued27",
  },
  {
    "name": "VAV",
    "font_class": "VAVduolianjizufuben",
    "unicode": "\ued28",
  },
  {
    "name": "空调机组",
    "font_class": "diaodingshikongtiaojizufuben",
    "unicode": "\ued29",
  },
  {
    "name": "公共广播",
    "font_class": "gonggongguangbofuben",
    "unicode": "\ued2a",
  },
  {
    "name": "环境传感器",
    "font_class": "huanjingchuanganqifuben",
    "unicode": "\ued2b",
  },
  {
    "name": "给水系统",
    "font_class": "geishuixitongfuben",
    "unicode": "\ued2c",
  },
  {
    "name": "电梯",
    "font_class": "diantifuben",
    "unicode": "\ued2d",
  },
  {
    "name": "火警",
    "font_class": "huojingfuben",
    "unicode": "\ued2e",
  },
  {
    "name": "集水井",
    "font_class": "jishuijingfuben",
    "unicode": "\ued2f",
  },
  {
    "name": "门禁",
    "font_class": "menjinfuben",
    "unicode": "\ued30",
  },
  {
    "name": "空调机组",
    "font_class": "kongtiaojizufuben",
    "unicode": "\ued31",
  },
  {
    "name": "扶梯",
    "font_class": "futifuben",
    "unicode": "\ued32",
  },
  {
    "name": "电表",
    "font_class": "bianpeidian-dianbiaofuben",
    "unicode": "\ued33",
  },
  {
    "name": "排风机",
    "font_class": "paifengjifuben",
    "unicode": "\ued34",
  },
  {
    "name": "全热交换机",
    "font_class": "quanrejiaohuanjifuben",
    "unicode": "\ued35",
  },
  {
    "name": "双鉴探测",
    "font_class": "shuangjiantancefuben",
    "unicode": "\ued36",
  },
  {
    "name": "枪机",
    "font_class": "qiangjifuben",
    "unicode": "\ued37",
  },
  {
    "name": "温器",
    "font_class": "wenqifuben",
    "unicode": "\ued38",
  },
  {
    "name": "摄像机",
    "font_class": "shexiangjifuben",
    "unicode": "\ued39",
  },
  {
    "name": "手报",
    "font_class": "shoudongbaojinganniufuben",
    "unicode": "\ued3a",
  },
  {
    "name": "智能照明",
    "font_class": "zhinengzhaomingfuben",
    "unicode": "\ued3b",
  },
  {
    "name": "送风机",
    "font_class": "songfengjifuben",
    "unicode": "\ued3c",
  },
  {
    "name": "集水井2",
    "font_class": "jishuijing2fuben",
    "unicode": "\ued3d",
  },
  {
    "name": "新风机组",
    "font_class": "xinfengjizufuben",
    "unicode": "\ued3e",
  },
  {
    "name": "烟感",
    "font_class": "yanganfuben",
    "unicode": "\ued3f",
  },
  {
    "name": "水表",
    "font_class": "shuibiaofuben",
    "unicode": "\ued40",
  },
]

const pipeImg = {
  group: '平面图图标',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: {
          width: 35,
          height: 35
        },
        strokeStyle: 'transparent', // 去除边框
        icon: item.unicode,
        iconFamily: 'iconfont',
        iconColor: '#333',
        iconClass: 'icon-' + item.font_class,
        iconSize: 40,
        name: 'rectangle',
        borderRadius: 18,
        hideAnchor: true,
        hideSizeCP: true,
        hideRotateCP: true,
        data: {
          legendType: 'plane' // 设备平面图
        }
      }
    }
  })
}
export default pipeImg