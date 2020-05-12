const arr = [
  {
    "name": "UPS",
    "font_class": "UPSbujianduandianyuan",
    "unicode": "\uecf5"
  },
  {
    "name": "VAV",
    "font_class": "VAVduolianjizu",
    "unicode": "\uecf6"
  },
  {
    "name": "扶梯",
    "font_class": "futi",
    "unicode": "\uecf7"
  },
  {
    "name": "空调机组",
    "font_class": "diaodingshikongtiaojizu",
    "unicode": "\ued0c"
  },
  {
    "name": "环境传感器",
    "font_class": "huanjingchuanganqi",
    "unicode": "\ued0d"
  },
  {
    "name": "FCU",
    "font_class": "FCUfengjipanguan",
    "unicode": "\ued0e"
  },
  {
    "name": "火警",
    "font_class": "huojing",
    "unicode": "\ued0f"
  },
  {
    "name": "公共广播",
    "font_class": "gonggongguangbo",
    "unicode": "\ued10"
  },
  {
    "name": "给水系统",
    "font_class": "geishuixitong",
    "unicode": "\ued11"
  },
  {
    "name": "集水井",
    "font_class": "jishuijing",
    "unicode": "\ued12"
  },
  {
    "name": "VRF",
    "font_class": "VRFduolianjizu",
    "unicode": "\ued13"
  },
  {
    "name": "电梯",
    "font_class": "dianti",
    "unicode": "\ued14"
  },
  {
    "name": "排风机",
    "font_class": "paifengji",
    "unicode": "\ued15"
  },
  {
    "name": "摄像机",
    "font_class": "shexiangji",
    "unicode": "\ued16"
  },
  {
    "name": "水表",
    "font_class": "shuibiao",
    "unicode": "\ued17"
  },
  {
    "name": "手报",
    "font_class": "shoudongbaojinganniu",
    "unicode": "\ued18"
  },
  {
    "name": "送风机",
    "font_class": "songfengji",
    "unicode": "\ued19"
  },
  {
    "name": "双鉴探测",
    "font_class": "shuangjiantance",
    "unicode": "\ued1a"
  },
  {
    "name": "枪机",
    "font_class": "qiangji",
    "unicode": "\ued1b"
  },
  {
    "name": "空调机组",
    "font_class": "kongtiaojizu",
    "unicode": "\ued1c"
  },
  {
    "name": "温器",
    "font_class": "wenqi",
    "unicode": "\ued1d"
  },
  {
    "name": "全热交换机",
    "font_class": "quanrejiaohuanji",
    "unicode": "\ued1e"
  },
  {
    "name": "新风机组",
    "font_class": "xinfengjizu",
    "unicode": "\ued1f"
  },
  {
    "name": "门禁",
    "font_class": "menjin",
    "unicode": "\ued20"
  },
  {
    "name": "智能照明",
    "font_class": "zhinengzhaoming",
    "unicode": "\ued21"
  },
  {
    "name": "烟感",
    "font_class": "yangan",
    "unicode": "\ued22"
  },
  {
    "name": "电表",
    "font_class": "bianpeidian-dianbiao",
    "unicode": "\ued23"
  },
  {
    "name": "集水井2",
    "font_class": "jishuijing2",
    "unicode": "\ued24"
  },
]

const pipeImg = {
  group: '设备图标',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: {
          width: 36,
          height: 36
        },
        borderColor: 'rgba(0,0,0,0)',  // 去除边框
        strokeStyle: 'rgba(0,0,0,0)',
        icon: item.unicode,
        iconFamily: 'iconfont',
        iconColor: '#999',
        iconClass: 'icon-' + item.font_class,
        iconSize: 40,
        name: 'rectangle',
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