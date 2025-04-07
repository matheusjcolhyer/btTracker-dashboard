import { LayoutDashboard, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#F32D18",
    href: "/",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fecha automaticamente em telas menores
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // ou false se quiser fixo só em mobile
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Botão de abrir menu (mobile) */}
      <button
        className={`fixed top-4 z-50 bg-gray-800 text-white p-2 rounded-md transition-all duration-300 ${
          isSidebarOpen ? "left-64" : "left-4"
        } md:hidden`}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay escuro */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar modal */}
      <motion.div
        className="fixed top-0 left-0 h-full z-50 bg-[#2E2E2E] border-r border-gray-700 overflow-hidden"
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        style={{ width: 256 }}
      >
        <div className="p-4 flex flex-col h-full">
          <img
            src="/logo.svg"
            alt="Logo"
            className="object-contain w-44 h-10 cursor-pointer mb-6"
            onClick={() => setIsSidebarOpen(false)}
          />

          <nav className="flex-grow">
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                  <item.icon
                    size={28}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <span
                    className="ml-4 text-lg whitespace-nowrap"
                    style={{ color: item.color }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
