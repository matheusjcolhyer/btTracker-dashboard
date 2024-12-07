import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";

const riskData = [
  { name: "Manaus", value: 100 },
  { name: "Lábrea", value: 80 },
  { name: "Novo Aripuanã", value: 60 },
  { name: "Humaitá", value: 50 },
  { name: "Manicoré", value: 40 },
  { name: "Autazes", value: 70 },
  { name: "Boa Vista do Ramos", value: 45 },
  { name: "Santa Isabel do Rio Negro", value: 55 },
  { name: "Nhamundá", value: 90 },
  { name: "Jutaí", value: 85 },
  { name: "Manacapuru", value: 65 },
  { name: "Iranduba", value: 75 },
  { name: "São Sebastião do Uatumã", value: 35 },
];

const AreaRiskChart = () => {
  const sortedRiskData = riskData.sort((a, b) => a.value - b.value);
  const options = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
      backgroundColor: "#642C12",
      borderWidth: 0,
      textStyle: { color: "#FFF" },
      formatter: (item) => `
        <strong>Região: ${item.name}</strong><br>
        <span style="font-size: 12px;">${item.value} áreas de risco na região</span>
      `,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#444",
        },
      },
    },
    yAxis: {
      type: "category",
      data: sortedRiskData.map((item) => item.name),
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
      },
    },
    series: [
      {
        name: "Risco",
        type: "bar",
        data: sortedRiskData.map((item) => item.value),
        itemStyle: {
          color: "#B13B2F",
        },
      },
    ],
  };

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      style={{ backgroundColor: "#1A1A1A" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Áreas de risco por município
      </h2>
      <ReactECharts option={options} style={{ height: "400px" }} />
    </motion.div>
  );
};

export default AreaRiskChart;
