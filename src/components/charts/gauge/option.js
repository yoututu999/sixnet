const basicOption = {
  series: [
    {
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      center: ['50%', '65%'],
      radius: '90%',
      min: 0,
      max: 1,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-40%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 5,
        lineStyle: {
          color: 'auto',
          width: 1
        }
      },
      splitLine: {
        length: 8,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      title: {
        offsetCenter: [0, '0%'],
        fontSize: 14
      },
      detail: {
        fontSize: 20,
        offsetCenter: [0, '-25%'],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value) + '(t)'
        },
        color: 'inherit'
      }
    }
  ]
}
export { basicOption }
