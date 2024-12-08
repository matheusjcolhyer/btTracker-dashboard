import { Locate, TriangleAlert, LandPlot } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RiskGeoMap from "../components/overview/RiskGeoMap";
import AreaRiskChart from "../components/overview/AreaRiskChart";
import RiskAreasTable from "../components/overview/RiskAreasTable";

import api from "../services/api";
import { useEffect, useState } from "react";

const OverviewPage = () => {
  const [metrics, setMetrics] = useState();

  useEffect(() => {
    api
      .get("/fireRisk")
      .then((response) => {
        const dataWithPercentage = calculateAndAddPercentage(
          response.data?.items
        );
        setMetrics(dataWithPercentage);
      })
      .catch((err) => {
        console.error("Ops! ocorreu um erro: " + err);
      });
  }, []);

  const calculateAndAddPercentage = (data) => {
    if (!data || data.length === 0) {
      return { items: data, percentage: 0 }; // Retorna estrutura com porcentagem 0 se o array estiver vazio
    }
    const soma = data.reduce(
      (acumulador, item) => acumulador + Number(item.result),
      0
    );
    const porcentagem = (soma / data.length) * 100;
    return {
      items: data, // Array original
      percentage: porcentagem.toFixed(2), // Porcentagem com duas casas decimais
    };
  };

  return (
    <div
      className="flex-1 overflow-auto relative z-10 scrollbar-thin"
      style={{ backgroundColor: "#2E2E2E" }}
    >
      <Header title="" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <h1 className="flex-1 overflow-auto relative z-10 text-3xl font-bold pb-10">
          Dashboard
        </h1>
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total de áreas em risco no Amazonas"
            icon={Locate}
            value="255"
            color="#2B1C1A"
            iconColor="#F32D18"
          />
          <StatCard
            name="Maior número de áreas em risco"
            icon={LandPlot}
            value="Manaus, 45 áreas"
            color="#332B1E"
            iconColor="#FFB855"
          />
          <StatCard
            name="Área com maior índice de risco"
            icon={TriangleAlert}
            value="Tefé, 95% de risco"
            color="#332527"
            iconColor="#FF7E00"
          />
        </motion.div>
        {/* CHARTS */}
        <motion.div
          className="grid grid-cols-1 gap-5 w-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RiskGeoMap />
            <AreaRiskChart />
            <RiskAreasTable metrics={{ metrics }} />
          </div>
        </motion.div>
      </main>
    </div>
  );
};
export default OverviewPage;
