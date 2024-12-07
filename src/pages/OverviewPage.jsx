import { Locate, TriangleAlert, LandPlot } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RiskGeoMap from "../components/overview/RiskGeoMap";
import AreaRiskChart from "../components/overview/AreaRiskChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

const OverviewPage = () => {
  return (
    <div
      className="flex-1 overflow-auto relative z-10"
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
            color="#6366F1"
          />
          <StatCard
            name="Maior número de áreas em risco"
            icon={LandPlot}
            value="Manaus, 45 áreas"
            color="#8B5CF6"
            backgroundColor="#1A1A1A"
          />
          <StatCard
            name="Área com maior índice de risco"
            icon={TriangleAlert}
            value="Tefé, 95% de risco"
            color="#EC4899"
            backgroundColor="#1A1A1A"
          />
        </motion.div>
        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RiskGeoMap />
          <AreaRiskChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
