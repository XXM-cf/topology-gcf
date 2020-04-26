const arr = [
  {
    name: '带电显示器',
    class: 'icon-peidian_daidianxianshiqi',
    unicode: "\uecf8"
  },

  {
    name: '避雷器',
    class: 'icon-peidian_bileiqi',
    unicode: "\uecf9"
  },

  {
    name: '电流互感器',
    class: 'icon-peidian_dianliuhuganqi',
    unicode: "\uecfa"
  },
  {
    name: '隔离开关',
    class: 'icon-peidian_gelikaiguan',
    unicode: "\uecfb"
  },

  {
    name: '断路器-开',
    class: 'icon-peidian_zhenkongduanluqikaizha',
    unicode: "\uecfc"
  },

  {
    name: '断路器-合',
    class: 'icon-peidian_zhenkongduanluqihezha',
    unicode: "\uecfd"
  },

  {
    name: '电压互感器',
    class: 'icon-peidian_dianyahuganqi',
    unicode: "\uecfe"
  },

  {
    name: '接地开关-开',
    class: 'icon-peidian_jiedidaokaiguan',
    unicode: "\uecff"
  },

  {
    name: '电容器',
    class: 'icon-peidian_dianlidianrongqi',
    unicode: "\ued01"
  },

  {
    name: '变压器',
    class: 'icon-peidian_bianyaqi',
    unicode: "\ued02"
  },

  {
    name: '接地开关-合',
    class: 'icon-peidian_zhenkongduanluqihezhafuben',
    unicode: "\ued03"
  },

  {
    name: '双电源切换',
    class: 'icon-peidian_shuangdianyuanqiehuanzhuangzhi',
    unicode: "\ued04"
  },

  {
    name: '电压互感器',
    class: 'icon-peidian_dianyahuganqifuben',
    unicode: "\ued05"
  },

  {
    name: '配电接地',
    class: 'icon-peidian_jiedi',
    unicode: "\ued06"
  }
]

const pipeImg = {
  group: '变配电',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: {
          width: 50,
          height: 50
        },
        borderColor: 'rgba(0,0,0,0)',  // 去除边框
        strokeStyle: 'rgba(0,0,0,0)',
        icon: item.unicode,
        iconFamily: 'iconfont',
        iconColor: '#00dc94',
        iconClass: item.class,
        iconSize: 50,
        name: 'circle',
        data: {
          legendType: 'electricity' //变配电
        }
      }
    }
  })
}
export default pipeImg