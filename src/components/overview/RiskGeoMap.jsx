import { ResponsiveContainer } from "recharts";
import ReactEcharts from "echarts-for-react";
import { motion } from "framer-motion";
import amMap from "../../assets/am.json"; // Importe o arquivo GeoJSON
import { useEffect } from "react";
import * as echarts from "echarts";

// Dados das regiões intermediárias do Amazonas
const regioesIntermediarias = [
  {
    nome: "Manaus",
    cor: "#56565c",
    riskAreas: 45,
    municipios: [
      "Autazes",
      "Borba",
      "Careiro",
      "Careiro da Várzea",
      "Iranduba",
      "Manaquiri",
      "Manaus",
      "Nova Olinda do Norte",
      "Presidente Figueiredo",
      "Rio Preto da Eva",
      "Barcelos",
      "Santa Isabel do Rio Negro",
      "São Gabriel da Cachoeira",
      "Anori",
      "Beruri",
      "Coari",
      "Codajás",
      "Anamã",
      "Caapiranga",
      "Manacapuru",
      "Novo Airão",
    ],
  },
  {
    nome: "Tefé",
    riskAreas: 30,
    cor: "#636363",
    municipios: [
      "Alvarães",
      "Carauari",
      "Fonte Boa",
      "Japurá",
      "Juruá",
      "Jutaí",
      "Maraã",
      "Tefé",
      "Uarini",
      "Amaturá",
      "Atalaia do Norte",
      "Benjamin Constant",
      "Santo Antônio do Içá",
      "São Paulo de Olivença",
      "Tabatinga",
      "Tonantins",
      "Eirunepé",
      "Envira",
      "Guajará",
      "Ipixuna",
      "Itamarati",
    ],
  },
  {
    nome: "Lábrea",
    cor: "#888585",
    riskAreas: 60,
    municipios: [
      "Boca do Acre",
      "Canutama",
      "Lábrea",
      "Pauini",
      "Tapauá",
      "Apuí",
      "Humaitá",
      "Manicoré",
      "Novo Aripuanã",
    ],
  },
  {
    nome: "Parintins",
    cor: "#39393d",
    riskAreas: 90,
    municipios: [
      "Barreirinha",
      "Boa Vista do Ramos",
      "Maués",
      "Nhamundá",
      "Parintins",
      "Itacoatiara",
      "Itapiranga",
      "São Sebastião do Uatumã",
      "Silves",
      "Urucará",
      "Urucurituba",
    ],
  },
];

const generateRegionsData = () => {
  return regioesIntermediarias.flatMap((regiao) => {
    return regiao.municipios.map((municipio) => ({
      name: municipio,
      itemStyle: {
        areaColor: regiao.cor,
        borderColor: "#000", // Faz as bordas ficarem invisíveis
        borderWidth: 0, // Remove a largura das bordas
      },
      emphasis: {
        itemStyle: {
          areaColor: "#B13B2F",
          borderWidth: 4,
          borderColor: "#B13B2F",
        },
        label: {
          show: false,
          color: "#ffffff",
        },
      },
      select: {
        itemStyle: {
          areaColor: "#eb695b",
        },
        label: {
          show: true,
          color: "#ffffff",
        },
      },
      tooltip: {
        formatter: `
          <strong>Região: ${regiao.nome}</strong><br>Município: ${municipio}<br>
          <span style="font-size: 12px;">${regiao.riskAreas} áreas de risco na região</span>
		    `,
      },
      label: { show: false },
    }));
  });
};

const RiskGeoMap = () => {
  const regionsData = generateRegionsData();

  const option = {
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
      backgroundColor: "#642C12",
      borderWidth: 0,
      textStyle: { color: "#FFF" },
    },
    series: [
      {
        name: "Regiões do Amazonas",
        type: "map",
        map: "amazonas",
        aspectScale: 1.0,
        selectedMode: "single",
        roam: true,
        itemStyle: {
          areaColor: "#444", // cor de fundo da região
          borderColor: "#aaaaaa", // borda clara
          borderWidth: 1.5, // espessura da linha
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowBlur: 6,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#B13B2F", // ao passar o mouse
            borderColor: "#FFF",
            borderWidth: 2,
          },
        },
        select: {
          itemStyle: {
            areaColor: "#eb695b",
            borderColor: "#FFF",
          },
        },
        data: regionsData,
      },
    ],
  };

  // Registrar o mapa ao carregar
  useEffect(() => {
    if (!echarts.getMap("amazonas")) {
      echarts.registerMap("amazonas", amMap); // Registra o mapa apenas se ainda não estiver registrado
    }
  }, []);

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 "
      style={{ backgroundColor: "#1A1A1A" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Regiões do Amazonas
      </h2>

      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={1.2}>
          <ReactEcharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: "320%", width: "100%" }}
          />
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RiskGeoMap;
