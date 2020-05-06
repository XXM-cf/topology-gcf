# topology-gcf

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 设计思想
工具化、与业务解耦

### 核心功能
动态图例（支持png、svg、gif、文字、线条多种图例，与设备状态实时联动）
属性自定义（用户可自定义图片、连线、文字、节点样式）
离线存储（离线储存画布，多项目可直接复用）
高性能低耦合（画布分层渲染，单画布支持千级节点；完全解耦业务，适合多场景使用）

### 待完成
- [ ] 图片上传
- [ ] 音频、视频嵌入播放
- [ ] 动画联动
- [ ] 电梯效果
- [ ] 水槽液位变化



### 完成功能点

画布配置
- [x] 底图配置
- [x] 禁用滚轮缩放
- [x] 还原画布大小
- [x] 缩放适配画布

节点
- [x] 位置坐标、大小（宽高）
- [x] 边框属性（样式、颜色、宽度）
- [x] 背景色
- [x] 透明度
- [x] 多节点对齐

线条
- [x] 连接样式（直线、曲线、线段）
- [x] 起始点箭头样式
- [x] 起始点位置
- [x] 连线颜色、宽度
- [x] 边框颜色、宽度
- [x] 整体透明度

图片
- [x] 图片修改（本地）
- [x] 使用svg文件
- [x] gif图

文字
- [x] 颜色
- [x] 字号
- [x] 样式（加粗、倾斜）
- [x] 对齐（水平、垂直）

动画效果
- [x] 旋转（顺时针、逆时针）
- [x] 告警
- [x] 自定义
- [x] 水流（流速、颜色可修改）
- [x] 圆点移动

媒体
- [x] iframe 嵌入

定制需求
- [x] 水管绘制


