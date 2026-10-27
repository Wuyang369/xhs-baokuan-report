(function() {
  var s = getComputedStyle(document.documentElement);
  var accent = s.getPropertyValue('--accent').trim();
  var accent2 = s.getPropertyValue('--accent2').trim();
  var ink = s.getPropertyValue('--ink').trim();
  var muted = s.getPropertyValue('--muted').trim();
  var rule = s.getPropertyValue('--rule').trim();
  var bg2 = 'rgba(255,255,255,0.7)';

  var palette = [accent, accent2, muted, accent+'99', accent2+'99', accent+'66', accent2+'66'];

  var baseTooltip = {
    trigger: 'axis',
    appendToBody: true,
    textStyle: { fontFamily: '-apple-system,"PingFang SC",sans-serif', color: ink },
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: rule, borderWidth: 1, padding: [10,14]
  };

  function init(id) { return echarts.init(document.getElementById(id), null, { renderer: 'svg' }); }

  /* ============================================
   * CHART 1: 样本构成
   * ============================================ */
  var c1 = init('chart-sample');
  c1.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: muted } },
    grid: { top: 20, right: 20, bottom: 60, left: 60 },
    xAxis: {
      type: 'category',
      data: ['面部精华', '男士护肤'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 14 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    series: [
      {
        name: '图文', type: 'bar', stack: 'total',
        itemStyle: { color: accent, borderRadius: [0,0,0,0] },
        data: [158, 818], barWidth: 60,
        label: { show: true, position: 'inside', color: '#fff', fontWeight: 600, formatter: '{c}' }
      },
      {
        name: '视频', type: 'bar', stack: 'total',
        itemStyle: { color: accent2, borderRadius: [4,4,0,0] },
        data: [114, 87],
        label: { show: true, position: 'inside', color: '#fff', fontWeight: 600, formatter: '{c}' }
      }
    ]
  });

  /* ============================================
   * CHART 2: 互动量分布 (分组柱)
   * ============================================ */
  var c2 = init('chart-interaction');
  c2.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: muted } },
    grid: { top: 30, right: 20, bottom: 60, left: 70 },
    xAxis: {
      type: 'category',
      data: ['面精·图文', '面精·视频', '男士·图文', '男士·视频'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 13 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    series: [
      {
        name: '平均互动', type: 'bar', barGap: '10%',
        itemStyle: { color: accent, borderRadius: [4,4,0,0] },
        data: [673, 1196, 463, 1050]
      },
      {
        name: '中位互动', type: 'bar',
        itemStyle: { color: accent2, borderRadius: [4,4,0,0] },
        data: [503, 345, 181, 531]
      }
    ]
  });

  /* ============================================
   * CHART 3: 品牌 TOP 对比（分组柱）
   * ============================================ */
  var brands12 = [
    'FREI OL福来','林清轩','CLARINS娇韵诗','The Ordinary','Oshadhi','BLEY',
    'LAB SERIES朗仕','欧莱雅男士','CHANDO自然堂','OIU','碧欧泉','Otto Hahn'
  ];
  var brandColorMap = {
    'FREI OL福来': accent, '林清轩': accent, 'CLARINS娇韵诗': accent,
    'The Ordinary': accent, 'Oshadhi': accent, 'BLEY': accent,
    'LAB SERIES朗仕': accent2, '欧莱雅男士': accent2, 'CHANDO自然堂': accent2,
    'OIU': accent2, '碧欧泉': accent2, 'Otto Hahn': accent2
  };
  var essenceData = [25,23,21,11,9,8,0,0,0,0,0,0];
  var maleData    = [0,0,0,0,0,0,108,98,93,79,51,48];

  var c3 = init('chart-brand-compare');
  c3.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    grid: { top: 20, right: 30, bottom: 80, left: 128 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: brands12.reverse(),
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 13 }
    },
    series: [
      {
        name: '面精', type: 'bar',
        itemStyle: { color: accent, borderRadius: [0,4,4,0] },
        data: essenceData.reverse(),
        label: { show: true, position: 'right', color: accent, fontWeight: 600, formatter: function(p){return p.value>0?p.value:'';} }
      },
      {
        name: '男士', type: 'bar',
        itemStyle: { color: accent2, borderRadius: [0,4,4,0] },
        data: maleData.reverse(),
        label: { show: true, position: 'right', color: accent2, fontWeight: 600, formatter: function(p){return p.value>0?p.value:'';} }
      }
    ]
  });

  /* ============================================
   * CHART 4: 男士护肤 图文 vs 视频 品牌差异（热力图）
   * ============================================ */
  var c4 = init('chart-brand-form');
  var brandNames = ['LAB SERIES朗仕','欧莱雅男士','CHANDO自然堂','OIU','Otto Hahn','碧欧泉','珂岸','HBN','gf高夫','谷雨'];
  var formTypes = ['图文条数','视频条数','视频占比%'];
  var brandHeatData = [];
  [
    [102, 6, 6.9],
    [98, 0, 0.0],
    [93, 0, 0.0],
    [76, 3, 3.4],
    [48, 0, 0.0],
    [39, 12, 13.8],
    [1, 12, 13.8],
    [21, 10, 11.5],
    [21, 9, 10.3],
    [26, 8, 9.2]
  ].forEach(function(row, yi) {
    row.forEach(function(v, xi) { brandHeatData.push([xi, yi, v]); });
  });

  c4.setOption({
    animation: false,
    tooltip: { ...baseTooltip,
      formatter: function(p) {
        var b = brandNames[p.value[1]];
        var f = formTypes[p.value[0]];
        return b + '<br>' + f + ': <strong>' + p.value[2] + '</strong>';
      }
    },
    grid: { top: 30, right: 30, bottom: 40, left: 110 },
    xAxis: {
      type: 'category', data: formTypes,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink }, splitArea: { show: false }
    },
    yAxis: {
      type: 'category', data: brandNames,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 12 }, splitArea: { show: false }
    },
    visualMap: {
      min: 0, max: 110, calculable: false, orient: 'horizontal', left: 'center', bottom: 5,
      inRange: { color: ['rgba(255,255,255,0.3)', accent2, accent] },
      outOfRange: { color: 'transparent' },
      textStyle: { color: muted }, show: false
    },
    series: [{
      type: 'heatmap', data: brandHeatData,
      label: { show: true, color: ink, fontWeight: 600, formatter: function(p){return p.value[2]===0?'-':p.value[2];} },
      itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 3 }
    }]
  });

  /* ============================================
   * CHART 5: 达人粉丝分布（饼图）
   * ============================================ */
  var c5 = init('chart-fans');
  c5.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: muted }, itemGap: 16 },
    series: [
      {
        name: '面部精华', type: 'pie', radius: ['40%','70%'], center: ['28%','45%'],
        label: { formatter: '{b}\n{d}%', color: ink, fontSize: 11 },
        labelLine: { length: 8, length2: 6 },
        itemStyle: { borderRadius: 3, borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 66,  name: '<5k',     itemStyle: { color: palette[4] } },
          { value: 174, name: '5k-5w',   itemStyle: { color: accent } },
          { value: 20,  name: '5w-20w',  itemStyle: { color: accent2 } },
          { value: 10,  name: '20w-100w',itemStyle: { color: palette[3] } },
          { value: 2,   name: '>100w',   itemStyle: { color: palette[5] } }
        ]
      },
      {
        name: '男士护肤', type: 'pie', radius: ['40%','70%'], center: ['72%','45%'],
        label: { formatter: '{b}\n{d}%', color: ink, fontSize: 11 },
        labelLine: { length: 8, length2: 6 },
        itemStyle: { borderRadius: 3, borderColor: '#fff', borderWidth: 2 },
        data: [
          { value: 382, name: '<5k',     itemStyle: { color: palette[4] } },
          { value: 469, name: '5k-5w',   itemStyle: { color: accent } },
          { value: 49,  name: '5w-20w',  itemStyle: { color: accent2 } },
          { value: 5,   name: '20w-100w',itemStyle: { color: palette[3] } },
          { value: 0,   name: '>100w',   itemStyle: { color: palette[5] } }
        ]
      }
    ]
  });

  /* ============================================
   * CHART 6: 面精热搜词 TOP20
   * ============================================ */
  var c6 = init('chart-hotword-essence');
  var hwE = [
    ['精华油',75],['面部精华油',73],['以油养肤',60],['皮肤',47],['抗老',34],
    ['林清轩',34],['精华',32],['娇韵诗',25],['眼霜',23],['面部精华',22],
    ['脸上',22],['面部',21],['换季',21],['双萃',19],['护肤',19],
    ['双萃精华',18],['眼周',17],['山茶花',17],['身体乳',16],['抗皱',16]
  ].reverse();
  c6.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    grid: { top: 10, right: 40, bottom: 20, left: 100 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: hwE.map(function(d){return d[0];}),
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 12 }
    },
    series: [{
      type: 'bar',
      data: hwE.map(function(d){return d[1];}),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0,0,1,0,[
          {offset:0,color: accent2+'55'},{offset:1,color: accent}
        ]),
        borderRadius: [0,3,3,0]
      },
      barWidth: 14,
      label: { show: true, position: 'right', color: accent, fontSize: 11 }
    }]
  });

  /* ============================================
   * CHART 7: 男士热搜词 TOP20
   * ============================================ */
  var c7 = init('chart-hotword-male');
  var hwM = [
    ['男士护肤',304],['洁面',138],['男士水乳',118],['双十一',114],['男士护肤品',112],
    ['男生护肤',102],['碧欧泉',102],['自然堂',96],['脸上',91],['油痘肌',91],
    ['面霜',89],['水乳',89],['护肤',84],['礼盒',82],['控油',81],
    ['这套',80],['男士护肤套装',78],['欧莱雅',76],['保湿',72],['男士洗面奶',66]
  ].reverse();
  c7.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    grid: { top: 10, right: 40, bottom: 20, left: 120 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: hwM.map(function(d){return d[0];}),
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 12 }
    },
    series: [{
      type: 'bar',
      data: hwM.map(function(d){return d[1];}),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0,0,1,0,[
          {offset:0,color: accent2+'55'},{offset:1,color: accent2}
        ]),
        borderRadius: [0,3,3,0]
      },
      barWidth: 14,
      label: { show: true, position: 'right', color: accent2, fontSize: 11 }
    }]
  });

  /* ============================================
   * CHART 8: 面精 评论热词
   * ============================================ */
  var c8 = init('chart-comment-essence');
  var cE = [
    ['不错',46],['感觉',43],['以油养肤',43],['效果',37],['试试',36],
    ['喜欢',35],['适合',28],['精华油',27],['眼霜',22],['干皮',21],
    ['精华',20],['好用',20],['皮肤',20],['吸收',15],['秋冬',15]
  ].reverse();
  c8.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    grid: { top: 10, right: 20, bottom: 10, left: 90 },
    xAxis: { type: 'value', axisLine:{show:false}, axisTick:{show:false}, splitLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
    yAxis: { type: 'category', data: cE.map(function(d){return d[0];}), axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink,fontSize:11} },
    series: [{
      type: 'bar', data: cE.map(function(d){return d[1];}), barWidth: 10,
      itemStyle: { color: accent, borderRadius:[0,3,3,0] },
      label: { show: true, position:'right', color: accent, fontSize:10 }
    }]
  });

  /* ============================================
   * CHART 9: 男士 评论热词
   * ============================================ */
  var c9 = init('chart-comment-male');
  var cM = [
    ['不错',118],['男朋友',115],['男生',108],['适合',102],['控油',88],
    ['对象',87],['油皮',84],['男士',80],['安排',76],['老公',70],
    ['感觉',62],['保湿',62],['喜欢',60],['好用',60],['清爽',59]
  ].reverse();
  c9.setOption({
    animation: false,
    tooltip: { ...baseTooltip, trigger: 'axis' },
    grid: { top: 10, right: 20, bottom: 10, left: 90 },
    xAxis: { type: 'value', axisLine:{show:false}, axisTick:{show:false}, splitLine:{lineStyle:{color:rule}}, axisLabel:{color:muted} },
    yAxis: { type: 'category', data: cM.map(function(d){return d[0];}), axisLine:{lineStyle:{color:rule}}, axisLabel:{color:ink,fontSize:11} },
    series: [{
      type: 'bar', data: cM.map(function(d){return d[1];}), barWidth: 10,
      itemStyle: {
        color: function(p) {
          var words = ['男朋友','老公','对象','适合','安排','控油'];
          var w = cM[cM.length-1-p.dataIndex][0];
          return words.indexOf(w) >= 0 ? accent : accent2+'cc';
        },
        borderRadius:[0,3,3,0]
      },
      label: { show: true, position:'right', color: ink, fontSize:10, fontWeight: function(p){ return cM[cM.length-1-p.dataIndex][0]==='男朋友'?700:400; } }
    }]
  });

  /* ============================================
   * CHART 10: 珂岸定位图（散点矩阵）
   * ============================================ */
  var c10 = init('chart-position');
  c10.setOption({
    animation: false,
    tooltip: {
      trigger: 'item', appendToBody: true,
      textStyle: { fontFamily: '-apple-system,"PingFang SC",sans-serif', color: ink },
      backgroundColor: 'rgba(255,255,255,0.95)', borderColor: rule, borderWidth: 1, padding: [10,14],
      formatter: function(p) {
        return p.name + '<br>图文: <strong>' + p.data[2] + '</strong>条<br>视频: <strong>' + p.data[3] + '</strong>条<br>视频占比: <strong>' + p.data[4] + '%</strong>';
      }
    },
    grid: { top: 30, right: 60, bottom: 50, left: 70 },
    xAxis: {
      name: '图文笔记条数 →', nameTextStyle: { color: muted, padding: [0,0,0,40] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: rule } }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    yAxis: {
      name: '视频笔记条数 ↑', nameTextStyle: { color: muted, padding: [0,0,0,50] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: rule } }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    series: [{
      type: 'scatter',
      symbolSize: function(v) { return Math.max(20, v[4] * 1.5 + 10); },
      data: [
        { name: 'LAB SERIES朗仕', value: [102, 6, 102, 6, 6.9], itemStyle:{ color: muted } },
        { name: '欧莱雅男士', value: [98, 0, 98, 0, 0], itemStyle:{ color: muted } },
        { name: 'CHANDO自然堂', value: [93, 0, 93, 0, 0], itemStyle:{ color: muted } },
        { name: 'OIU', value: [76, 3, 76, 3, 3.4], itemStyle:{ color: muted } },
        { name: 'Otto Hahn', value: [48, 0, 48, 0, 0], itemStyle:{ color: muted } },
        { name: '碧欧泉', value: [39, 12, 39, 12, 13.8], itemStyle:{ color: accent2 } },
        { name: 'HBN', value: [21, 10, 21, 10, 11.5], itemStyle:{ color: accent2 } },
        { name: 'gf高夫', value: [21, 9, 21, 9, 10.3], itemStyle:{ color: accent2 } },
        { name: '谷雨', value: [26, 8, 26, 8, 9.2], itemStyle:{ color: accent2 } },
        { name: '珂岸 ★', value: [1, 12, 1, 12, 13.8], itemStyle:{ color: accent, borderColor:'#fff', borderWidth:2 } }
      ],
      label: {
        show: true, formatter: function(p) { return p.name; }, position: 'right',
        color: function(p) { return p.name.indexOf('珂岸') >= 0 ? accent : ink; },
        fontWeight: function(p) { return p.name.indexOf('珂岸') >= 0 ? 700 : 400; },
        fontSize: 11
      },
      emphasis: { focus: 'self', itemStyle: { shadowBlur: 10, shadowColor: accent+'66' } }
    }]
  });

  /* ============================================
   * CHART 11: 封面 hook 类型分布（07章）
   * ============================================ */
  var c11 = init('chart-hook');
  var hookCats = ['场景/故事型','功效直给型','攻略/教程型','测评/对比型','大促/优惠型','反常识/揭秘型','送礼/人群定向型'];
  var hookE = [9,7,2,2,2,2,0];
  var hookM = [6,2,4,1,0,1,2];
  c11.setOption({
    animation: false,
    tooltip: Object.assign({}, baseTooltip, { trigger: 'axis' }),
    legend: { bottom: 0, textStyle: { color: muted } },
    grid: { top: 20, right: 20, bottom: 60, left: 60 },
    xAxis: { type: 'category', data: hookCats,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 11, interval: 0, rotate: 18 } },
    yAxis: { type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } }, axisLabel: { color: muted } },
    series: [
      { name: '面部精华', type: 'bar', barGap: '10%', barWidth: 22,
        itemStyle: { color: accent, borderRadius: [4,4,0,0] }, data: hookE,
        label: { show: true, position: 'top', color: accent, fontSize: 11 } },
      { name: '男士护肤', type: 'bar', barWidth: 22,
        itemStyle: { color: accent2, borderRadius: [4,4,0,0] }, data: hookM,
        label: { show: true, position: 'top', color: accent2, fontSize: 11 } }
    ]
  });

  /* ============================================
   * CHART 12: 正文开场句式（07章）
   * ============================================ */
  var c12 = init('chart-opening');
  var openData = [['直入主题',25],['提问开场',5],['时令/场景',4],['数字/数据',3],['称呼/问候',2],['亲历自述',1]].reverse();
  c12.setOption({
    animation: false,
    tooltip: Object.assign({}, baseTooltip, { trigger: 'axis' }),
    grid: { top: 10, right: 46, bottom: 20, left: 96 },
    xAxis: { type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } }, axisLabel: { color: muted } },
    yAxis: { type: 'category', data: openData.map(function(d){return d[0];}),
      axisLine: { lineStyle: { color: rule } }, axisLabel: { color: ink, fontSize: 12 } },
    series: [{ type: 'bar', barWidth: 16,
      data: openData.map(function(d,i){ return d[1]; }),
      itemStyle: { color: function(p){ return p.dataIndex >= openData.length-2 ? accent : accent2+'cc'; }, borderRadius: [0,3,3,0] },
      label: { show: true, position: 'right', color: ink, fontSize: 11, fontWeight: 600 } }]
  });

  /* ============================================
   * CHART 13: 高/低互动组内容特征（07章）
   * ============================================ */
  var c13 = init('chart-hilo');
  c13.setOption({
    animation: false,
    tooltip: Object.assign({}, baseTooltip, { trigger: 'axis' }),
    legend: { bottom: 0, textStyle: { color: muted } },
    grid: { top: 20, right: 30, bottom: 60, left: 60 },
    xAxis: { type: 'category', data: ['正文字数','emoji数/篇','图片数','话题标签数'],
      axisLine: { lineStyle: { color: rule } }, axisLabel: { color: ink, fontSize: 12 } },
    yAxis: { type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: rule } }, axisLabel: { color: muted } },
    series: [
      { name: '高互动组 (n=20)', type: 'bar', barGap: '10%', barWidth: 26,
        itemStyle: { color: accent, borderRadius: [4,4,0,0] },
        data: [376, 1.3, 4.2, 8.2],
        label: { show: true, position: 'top', color: accent, fontSize: 11 } },
      { name: '低互动组 (n=20)', type: 'bar', barWidth: 26,
        itemStyle: { color: accent2+'99', borderRadius: [4,4,0,0] },
        data: [520, 0.6, 3.5, 8.7],
        label: { show: true, position: 'top', color: muted, fontSize: 11 } }
    ]
  });

  /* ============================================
   * Resize all
   * ============================================ */
  var charts = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13];
  window.addEventListener('resize', function() {
    charts.forEach(function(c) { c.resize(); });
  });
})();
