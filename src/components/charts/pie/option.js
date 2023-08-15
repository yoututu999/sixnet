const basicOption = {
  title: {
    text: "",
    subtext: "",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  toolbox: {
    show: false,
    left: "right",
    top: "top",
    feature: {
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    left: "center",
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ['0%', '80%'],
      emphasis: {
        itemStyle: {
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: {
        formatter: '{b}: {c}'
      },
      labelLine: { length: 7, length2: 9 },
      data: [], // 这里在使用的时候会被业务数据替换
    },
  ],
}
export { basicOption }