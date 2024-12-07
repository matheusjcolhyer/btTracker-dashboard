import {
  LayoutDashboard,
  //   DollarSign,
  //   Settings,
  //   ShoppingBag,
  //   ShoppingCart,
  //   TrendingUp,
  //   Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#F32D18",
    href: "/",
  },
  // { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
  // { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  // { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  // { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  // { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  // { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div
        className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700"
        style={{ backgroundColor: "#2E2E2E" }}
      >
        <img
          src="/logo.svg"
          alt="Social img"
          style={{ width: "180px", height: "40px" }}
          className="object-contain size-36 mr-6 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={28}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 text-lg whitespace-nowrap"
                      style={{ color: "#F32D18" }}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
