import p1 from '@/assets/images/water/工业传感器.png'
import p2 from '@/assets/images/water/工业水泵.png'
import p3 from '@/assets/images/water/管道直.png'
import p4 from '@/assets/images/water/接头弯.png'
import p5 from '@/assets/images/water/T形接头.png'
import p6 from '@/assets/images/water/水阀.png'
import p7 from '@/assets/images/water/冷却器.png'
import p8 from '@/assets/images/water/冷却塔.png'
import p9 from '@/assets/images/water/水仓.png'
import p10 from '@/assets/images/water/水槽.png'
import p11 from '@/assets/images/water/消化池.png'

import p12 from '@/assets/images/baseImg/b.gif'
import p13 from '@/assets/images/baseImg/a.svg'

import p14 from '@/assets/images/water/测-02.svg'
import p15 from '@/assets/images/water/测-03.svg'
import p16 from '@/assets/images/water/测-04.svg'
import p17 from '@/assets/images/water/测-02.png'
import p18 from '@/assets/images/water/测-03.png'
import p19 from '@/assets/images/water/测-04.png'

const arr = [
  { name: '工业传感器', url: p1 },
  { name: '工业水泵', url: p2 },
  { name: '管道直', url: p3 },
  { name: '接头弯', url: p4 },
  { name: 'T形接头', url: p5 },
  { name: '水阀', url: p6 },
  { name: '冷却器', url: p7 },
  { name: '冷却塔', url: p8 },
  { name: '水仓', url: p9 },
  { name: '水槽', url: p10 },
  { name: '消化池', url: p11 },
  { name: 'gif', url: p12 },
  { name: 'svg动图', url: p13 },

  { name: '测2svg', url: p14 },
  { name: '测3svg', url: p15 },
  { name: '测4svg', url: p16 },
  { name: '测2pnng', url: p17 },
  { name: '测3pnng', url: p18 },
  { name: '测4pnng', url: p19 },
]

const pipeImg = {
  group: '管道',
  children: arr.map(item => {
    return {
      name: item.name,
      data: {
        rect: {
          width: 100,
          height: 100
        },
        name: 'image',
        image: item.url
      }
    }
  })
}
export default pipeImg