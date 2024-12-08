---

# BTTracker Dashboard

---

**Descrição do Projeto**\
O BTTracker Dashboard é uma aplicação web que fornece monitoramento e visualização interativa de dados relacionados a queimadas e qualidade do ar. Ele combina gráficos dinâmicos, mapas interativos e uma interface de usuário intuitiva para facilitar a análise e o entendimento dos dados em tempo real.

---

**Objetivo**\
Proporcionar uma solução centralizada para monitoramento de risco ambiental e suporte à tomada de decisão com base em dados precisos e acessíveis.

---

**Tecnologias Utilizadas**

1.  **React**: Framework para construção de interfaces de usuário.
2.  **Vite**: Ferramenta moderna para build e desenvolvimento rápido.
3.  **Axios**: Biblioteca para requisições HTTP, usada na comunicação com APIs.
4.  **Leaflet**: Biblioteca para renderização de mapas interativos.
5.  **ECharts**: Biblioteca de gráficos para exibição de dados dinâmicos.
6.  **TailwindCSS**: Framework para estilização responsiva.

---

**Principais Funcionalidades**

- **Exibição de Dados de Risco**: Representação visual de áreas de risco por meio de gráficos e tabelas.
- **Mapa Interativo**: Exibição geográfica de áreas afetadas com integração ao Leaflet.
- **Autenticação de Usuário**: Gerenciamento de sessões com Firebase.
- **Dashboard Consolidado**: Painel intuitivo para acesso rápido às informações.

---

**Estrutura do Projeto**

- **public**: Arquivos estáticos do projeto.
- **src**
  - **assets**: Recursos estáticos, como imagens e ícones.
  - **components**
    - **common**: Componentes reutilizáveis, como `Header`, `Sidebar` e `StatCard`.
    - **overview**: Componentes específicos do painel principal, como `AreaRiskChart`, `RiskAreasTable` e `RiskGeoMap`.
  - **contexts**: Gerenciamento de contexto com React Context API (e.g., `AuthContext`).
  - **pages**: Páginas principais, incluindo `LoginPage` e `OverviewPage`.
  - **services**: Lógica de integração com APIs, como `api.js`.
  - **firebase.jsx**: Configuração e integração com o Firebase.
  - **main.jsx**: Arquivo de entrada principal da aplicação.
  - **App.jsx**: Componente raiz que define as rotas e layout.

---

**Instalação e Configuração**

1.  **Pré-requisitos**

    - Node.js (v16 ou superior)
    - Gerenciador de pacotes (npm ou yarn)

2.  **Passos para Instalação**

    - Clone o repositório:\
      `git clone https://github.com/usuario/btTracker-dashboard.git`
    - Acesse o diretório do projeto:\
      `cd btTracker-dashboard`
    - Instale as dependências:\
      `npm install` ou `yarn`

3.  **Execução do Projeto**

    - Para rodar o projeto em ambiente de desenvolvimento:\
      `npm run dev` ou `yarn dev`
    - Para gerar a versão de produção:\
      `npm run build` ou `yarn build`
    - Para pré-visualizar a versão de produção:\
      `npm run preview` ou `yarn preview`

---

**APIs Integradas**

- **Firebase Authentication**: Gerenciamento de autenticação do usuário.

---

**Contribuições**

Contribuições são bem-vindas! Para contribuir:

1.  Faça um fork do repositório.
2.  Crie uma branch para sua feature: `git checkout -b minha-feature`.
3.  Faça suas modificações e commit: `git commit -m "Minha nova feature"`.
4.  Envie suas alterações: `git push origin minha-feature`.
5.  Abra um Pull Request.

---

**Equipe**\
Desenvolvedores:

- Gabrielle Alves
- Fernando Filho
- Matheus Colhyêr

---

**Contato**\
Para dúvidas ou sugestões, entre em contato pelo e-mail: <matheusjcolhyer@gmail.com>
