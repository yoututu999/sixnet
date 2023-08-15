const basicOption = {
  title: {
    text: "",
    subtext: "",
    left: "center",
  },
  legend: {
    show: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    //formatter: '{b0}: {c0}条'
  },
  toolbox: {
    show: false,
    left: "right",
    top: "top",
    feature: {
      dataZoom: {
        show: false,
        yAxisIndex: 'none'
      },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },

  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barMaxWidth: '30px',
      data: [],
      itemStyle: { borderRadius: 20, },
      label: {
        show: true,
        position: "top",
        fontStyle: "normal",
        fontWeight: "bold",
        color: "rgba(45, 125, 222, 1)"
      }
    }
  ]
}
export { basicOption }