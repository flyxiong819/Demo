
// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('main'));


const option = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, 'Matcha Latte'],
      [57.1, 78254, 'Milk Tea'],
      [74.4, 41032, 'Cheese Cocoa'],
      [50.1, 12755, 'Cheese Brownie'],
      [89.7, 20145, 'Matcha Cocoa'],
      [68.1, 79146, 'Tea'],
      [19.6, 91852, 'Orange Juice'],
      [10.6, 101852, 'Lemon Juice'],
      [32.7, 20112, 'Walnut Brownie']
    ]
  },
  xAxis: { type: 'category' },
  yAxis: { type: 'category' },
  series: [
    {
      type: 'bar',
      encode: {
        // 将 "amount" 列映射到 X 轴。
        x: 'amount',
        // 将 "product" 列映射到 Y 轴。
        y: 'score'
      }
    }
  ]
};


// 绘制图表
myChart.setOption(option);