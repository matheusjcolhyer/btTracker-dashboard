import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, TriangleAlert, Eye, X, CircleCheck } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Não esqueça de importar o CSS do Leaflet
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "src/assets/marker-48.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [45, 45], // Tamanho padrão do ícone
  iconAnchor: [12, 41], // Ponto de ancoragem
  popupAnchor: [1, -34], // Posição do popup
  shadowSize: [41, 41], // Tamanho da sombra
});

L.Marker.prototype.options.icon = DefaultIcon;

const RISK_AREAS_DATA = [
  {
    area: "Área 1",
    municipio: "Tefé",
    indice: "95%",
    fator: "Alta temperatura",
    status: "high",
    estado: "Amazonas",
    regiao: "Tefé",
    latitude: "-3,32073",
    longitude: "-64,7236",
    temperatura: "37°",
    umidade: "10%",
    precipitacao: "6,7 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 2",
    municipio: "Tefé",
    indice: "85%",
    fator: "Alta temperatura",
    status: "high",
    estado: "Amazonas",
    regiao: "Tefé",
    latitude: "-3,32073",
    longitude: "-64,7236",
    temperatura: "36°",
    umidade: "12%",
    precipitacao: "7,2 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 3",
    municipio: "Manaus",
    indice: "75%",
    fator: "Alta temperatura",
    status: "high",
    estado: "Amazonas",
    regiao: "Manaus",
    latitude: "-3,10000",
    longitude: "-60,00000",
    temperatura: "35°",
    umidade: "15%",
    precipitacao: "5,5 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 4",
    municipio: "Lábrea",
    indice: "70%",
    fator: "Alta temperatura",
    status: "medium",
    estado: "Amazonas",
    regiao: "Lábrea",
    latitude: "-7,25000",
    longitude: "-64,80000",
    temperatura: "34°",
    umidade: "20%",
    precipitacao: "8,0 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 5",
    municipio: "Jutaí",
    indice: "65%",
    fator: "Baixa umidade",
    status: "medium",
    estado: "Amazonas",
    regiao: "Jutaí",
    latitude: "-2,75000",
    longitude: "-66,90000",
    temperatura: "33°",
    umidade: "22%",
    precipitacao: "4,5 mm",
    variaveis: "Baixa umidade",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 6",
    municipio: "Autazes",
    indice: "60%",
    fator: "Alta temperatura",
    status: "medium",
    estado: "Amazonas",
    regiao: "Autazes",
    latitude: "-3,57920",
    longitude: "-59,13000",
    temperatura: "32°",
    umidade: "25%",
    precipitacao: "6,0 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 7",
    municipio: "Novo Airão",
    indice: "55%",
    fator: "Baixa umidade",
    status: "low",
    estado: "Amazonas",
    regiao: "Novo Airão",
    latitude: "-2,62000",
    longitude: "-60,93000",
    temperatura: "31°",
    umidade: "30%",
    precipitacao: "7,5 mm",
    variaveis: "Baixa umidade",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 8",
    municipio: "Careiro",
    indice: "50%",
    fator: "Alta temperatura",
    status: "low",
    estado: "Amazonas",
    regiao: "Careiro",
    latitude: "-3,78420",
    longitude: "-60,36100",
    temperatura: "30°",
    umidade: "35%",
    precipitacao: "8,2 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
  {
    area: "Área 9",
    municipio: "Humaitá",
    indice: "45%",
    fator: "Alta temperatura",
    status: "low",
    estado: "Amazonas",
    regiao: "Humaitá",
    latitude: "-7,51110",
    longitude: "-63,03230",
    temperatura: "29°",
    umidade: "40%",
    precipitacao: "9,0 mm",
    variaveis: "Precipitação",
    lastUpdate: "24/11/2024, 14:54 (UTC/GMT -04:00)",
    mapImage: "https://via.placeholder.com/400x300",
  },
];

const RiskAreasTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div
      className="p-6 rounded-xl lg:col-span-2"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Áreas de risco por índice
      </h2>
      <div className="overflow-y-auto max-h-64 scrollbar-thin overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2">Área</th>
              <th className="px-4 py-2">Município</th>
              <th className="px-4 py-2">Índice de risco</th>
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
                <td className="px-4 py-2">
                  <div
                    className={`flex w-fit items-center justify-center gap-2 text-white font-bold py-1 px-3 rounded-md ${
                      item.status === "high"
                        ? "bg-red-700 text-red-100"
                        : item.status === "medium"
                        ? "bg-yellow-600 text-yellow-100"
                        : item.status === "low"
                        ? "bg-gray-500 text-gray-100"
                        : ""
                    }`}
                    style={{
                      color:
                        item.status === "high"
                          ? "#FF6773"
                          : item.status === "medium"
                          ? "#FF7E00"
                          : item.status === "low"
                          ? "#FFFFFF"
                          : "",
                      backgroundColor:
                        item.status === "high"
                          ? "#3A181B"
                          : item.status === "medium"
                          ? "#3A2D1A"
                          : item.status === "low"
                          ? "#2A2A2A"
                          : "",
                    }}
                  >
                    {item.status === "high" && (
                      <TriangleAlert className="w-4 h-4" />
                    )}
                    {item.status === "medium" && (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {item.status === "low" && (
                      <CircleCheck className="w-4 h-4" />
                    )}
                    {item.indice}
                  </div>
                </td>

                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:text-blue-400 transition"
                    onClick={() => openModal(item)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Sidebar */}
            <motion.div
              className="ml-auto bg-gray-900 text-gray-300 w-[450px] max-w-full h-full shadow-lg relative"
              style={{ backgroundColor: "#1A1A1A" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-lg font-medium">
                  {selectedItem?.area || "Detalhes"}
                </h2>
                <button onClick={closeModal}>
                  <X className="text-gray-400 hover:text-gray-200" size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Índice de risco */}
                <div
                  className="flex flex-col items-start justify-between bg-gray-800 rounded-md py-4 pr-4 w-fit"
                  style={{ backgroundColor: "#1A1A1A" }}
                >
                  <span className="text-sm font-medium text-gray-400">
                    Índice de risco
                  </span>
                  <div
                    className="mt-2 flex items-center space-x-2 px-2 py-1 rounded"
                    style={{
                      color:
                        selectedItem?.status === "high"
                          ? "#FF6773"
                          : selectedItem?.status === "medium"
                          ? "#FF7E00"
                          : selectedItem?.status === "low"
                          ? "#FFFFFF"
                          : "",
                      backgroundColor:
                        selectedItem?.status === "high"
                          ? "#3A181B"
                          : selectedItem?.status === "medium"
                          ? "#3A2D1A"
                          : selectedItem?.status === "low"
                          ? "#2A2A2A"
                          : "",
                    }}
                  >
                    <AlertCircle className="text-red-500" size={16} />
                    <span className="text-lg font-semibold text-red-500">
                      {selectedItem?.indice}
                    </span>
                  </div>
                </div>
                {/* Informações em caixas */}
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Estado</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.estado}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Município</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.municipio}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">
                      Região geográfica intermediária
                    </p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.regiao}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Latitude</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.latitude}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Longitude</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.longitude}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Temperatura</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.temperatura}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Umidade</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.umidade}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">Precipitação</p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.precipitacao}
                    </p>
                  </div>
                  <div
                    className="bg-gray-800 rounded-md p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <p className="text-xs text-gray-400">
                      Variáveis influentes
                    </p>
                    <p className="text-sm font-semibold text-gray-100">
                      {selectedItem?.variaveis}
                    </p>
                  </div>
                </div>
                {/* Fator contribuinte */}
                <div
                  className="bg-gray-800 rounded-md p-4 w-fit"
                  style={{ backgroundColor: "#111111" }}
                >
                  <p className="text-xs text-gray-400">
                    Principal fator contribuinte
                  </p>
                  <p className="text-sm font-semibold text-gray-100">
                    {selectedItem?.fator}
                  </p>
                </div>
                {/* Mapa */}

                <div style={{ height: "250px", width: "100%" }}>
                  {selectedItem?.latitude && selectedItem?.longitude ? (
                    <MapContainer
                      center={[
                        parseFloat(selectedItem.latitude),
                        parseFloat(selectedItem.longitude),
                      ]}
                      zoom={15} // Ajuste do zoom para visualizar a área
                      scrollWheelZoom={false}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, Earthstar Geographics'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      />
                      <Circle
                        center={[
                          parseFloat(selectedItem.latitude),
                          parseFloat(selectedItem.longitude),
                        ]}
                        radius={500} // Define o raio da área (em metros)
                        color="red" // Cor da borda
                        fillColor="rgba(255, 0, 0, 0.5)" // Cor do preenchimento
                        fillOpacity={0.5} // Opacidade do preenchimento
                      />
                      <Marker
                        position={[
                          parseFloat(selectedItem.latitude),
                          parseFloat(selectedItem.longitude),
                        ]}
                      >
                        <Popup>
                          {selectedItem?.area} - {selectedItem?.municipio}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                    <p className="text-gray-400">
                      Coordenadas indisponíveis para o mapa.
                    </p>
                  )}
                </div>
                {/* Última atualização */}
                <p className="text-xs text-gray-400">
                  <strong>Última atualização:</strong>{" "}
                  {selectedItem?.lastUpdate}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RiskAreasTable;
