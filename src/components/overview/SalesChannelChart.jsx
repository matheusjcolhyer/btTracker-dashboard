import { motion } from "framer-motion";
import { AlertCircle, Eye } from "lucide-react";

const RISK_AREAS_DATA = [
  {
    area: "Área 1",
    municipio: "Tefé",
    indice: "95%",
    fator: "Alta temperatura",
    status: "critical",
  },
  {
    area: "Área 2",
    municipio: "Tefé",
    indice: "85%",
    fator: "Alta temperatura",
    status: "critical",
  },
  {
    area: "Área 3",
    municipio: "Manaus",
    indice: "75%",
    fator: "Alta temperatura",
    status: "high",
  },
  {
    area: "Área 4",
    municipio: "Lábrea",
    indice: "70%",
    fator: "Alta temperatura",
    status: "medium",
  },
];

const SalesChannelChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      // className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      style={{ backgroundColor: "#1A1A1A" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Áreas de risco por índice
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2">Área</th>
              <th className="px-4 py-2">Município</th>
              <th className="px-4 py-2">Índice de risco</th>
              <th className="px-4 py-2">Principal fator contribuinte</th>
              <th className="px-4 py-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {RISK_AREAS_DATA.map((item, index) => (
              <tr
                key={index}
                style={
                  index % 2 === 0
                    ? { backgroundColor: "#191919" }
                    : { backgroundColor: "#1C1C1C" }
                }
              >
                <td className="px-4 py-2">{item.area}</td>
                <td className="px-4 py-2">{item.municipio}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {item.status === "critical" && (
                    <AlertCircle className="text-red-500" size={16} />
                  )}
                  {item.status === "high" && (
                    <AlertCircle className="text-orange-500" size={16} />
                  )}
                  {item.status === "medium" && (
                    <AlertCircle className="text-yellow-500" size={16} />
                  )}
                  {item.indice}
                </td>
                <td className="px-4 py-2">{item.fator}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-400 transition">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
