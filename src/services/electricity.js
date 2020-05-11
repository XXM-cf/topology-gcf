const arr = [
  {
    class: 'icon-peidian_diankangqi',
    unicode: '\uecf8',
    name: '电抗'
  },

  {
    class: 'icon-peidian_dianlidianrongqi',
    unicode: '\uecf9',
    name: '电力电容'
  },

  {
    class: 'icon-peidian_dianyahuganqi',
    unicode: '\uecfa',
    name: '电压互感'
  },

  {
    class: 'icon-peidian_bianyaqi',
    unicode: '\uecfb',
    name: '变压器'
  },

  {
    class: 'icon-peidian_daidianxianshijiedi',
    unicode: '\uecfc',
    name: '电容接地'
  },

  {
    class: 'icon-peidian_bileiqi',
    unicode: '\uecfd',
    name: '避雷器'
  },

  {
    class: 'icon-peidian_daidianxianshiqi',
    unicode: '\uecfe',
    name: '带电显示'
  },

  {
    class: 'icon-peidian_dianrong',
    unicode: '\uecff',
    name: '电容'
  },

  {
    class: 'icon-peidian_jiedi',
    unicode: '\ued00',
    name: '地线'
  },

  {
    class: 'icon-peidian_rongduanqi',
    unicode: '\ued01',
    name: '熔断器'
  },

  {
    class: 'icon-peidian_jingzhaguan',
    unicode: '\ued02',
    name: '晶闸管'
  },

  {
    class: 'icon-peidian_dianliuhuganqi',
    unicode: '\ued03',
    name: '电流互感'
  },

  {
    class: 'icon-peidian_jiedidaokaiguan',
    unicode: '\ued04',
    name: '接地开关'
  },

  {
    class: 'icon-peidian_gelikaiguan',
    unicode: '\ued05',
    name: '隔空开关'
  },

  {
    class: 'icon-peidian_zhenkongduanluqihezhafuben',
    unicode: '\ued06',
    name: '真空断路器'
  },

  {
    class: 'icon-peidian_shuangdianyuanqiehuanzhuangzhizujian',
    unicode: '\ued07',
    name: '电源切换'
  },

  {
    class: 'icon-peidian_shuangdianyuanqiehuanzhuangzhi',
    unicode: '\ued08',
    name: '爽电源切换'
  },

  {
    class: 'icon-peidian_dianyahuganqi2',
    unicode: '\ued09',
    name: '电压互感'
  },

  {
    class: 'icon-peidian_zhenkongduanluqikaizha',
    unicode: '\ued0a',
    name: '断路器开'
  },

  {
    class: 'icon-peidian_zhenkongduanluqihezha',
    unicode: '\ued0b',
    name: '断路器合'
  }
]

const pipeImg = {
  group: '变配电',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: {
          width: 40,
          height: 40
        },
        borderColor: 'rgba(0,0,0,0)',  // 去除边框
        strokeStyle: 'rgba(0,0,0,0)',
        icon: item.unicode,
        iconFamily: 'iconfont',
        iconColor: '#00dc94',
        iconClass: item.class,
        iconSize: 40,
        name: 'rectangle',
        data: {
          legendType: 'electricity' //变配电
        }
      }
    }
  })
}
export default pipeImg