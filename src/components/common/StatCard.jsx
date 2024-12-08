import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color, iconColor }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl flex items-center p-6"
      style={{ backgroundColor: "#1A1A1A" }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      {/* Ícone em círculo */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: color }}
      >
        <Icon size={20} style={{ color: iconColor }} />
      </div>

      {/* Texto e valor */}
      <div className="ml-6">
        <span className="block text-sm font-medium text-gray-400">{name}</span>
        <p className="mt-1 text-xl font-semibold text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
