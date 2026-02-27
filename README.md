# SuperStorys Analytics Dashboard

![SuperStorys](https://img.shields.io/badge/Status-Active-brightgreen)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Vanilla-blue)

**SuperStorys Analytics Dashboard** é uma plataforma analítica interativa com foco em inteligência de negócios. O projeto consolida métricas complexas como Análise de Cohort, Segmentação RFM e Análises Descritivas através de uma interface de alto padrão orientada a dados.

## ✨ Características Principais

- **100% Vanilla:** Construído utilizando exclusivamente HTML5, CSS3, e JavaScript puríssimos. Zero dependências de frameworks como React, Angular, ou bibliotecas utilitárias como Tailwind CSS.
- **Design de Alto Padrão:** Uma interface moderna e limpa, utilizando *glassmorphism*, micro-animações, e um esquema de cores harmonioso. Apresenta uma experiência de usuário (UX) inspirada nas melhores práticas de design contemporâneo.
- **Visualização de Dados Avançada:** Gráficos interativos impressionantes gerados via Chart.js, e mapeamento geográfico alimentado por D3.js & TopoJSON.
- **Módulos Analíticos Integrados:**
  - **Problema de Negócio:** Contexto e desafios enfrentados pela empresa.
  - **Análise de Cohort:** Mapas de calor (Heatmaps) de retenção ao longo do ciclo de vida dos clientes.
  - **Segmentação RFM:** Gráficos de dispersão e treemaps relacionando Recência, Frequência e Monetarização.
  - **Análise Descritiva & Histórica:** Distribuição de vendas por categoria, estado geográfico (EUA) e avaliação de devoluções.
  - **Performance:** Indicadores e KPIs de crescimento YoY (Year on Year), Margem Líquida, LTV vs CAC, etc.

## 🛠️ Tecnologias Utilizadas

* [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) - Marcação semântica.
* [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) - Estilos globais e componentes visuais (sem uso de pré-processadores).
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Lógica de página, manipulação de abas e montagem dos gráficos.
* [Chart.js (v4.4.0)](https://www.chartjs.org/) - Renderização dos gráficos em tela.
* [D3.js](https://d3js.org/) & [TopoJSON](https://github.com/topojson/topojson) - Geração de mapas geográficos complexos (Mapa de calor dos EUA).
* Fontes: Inter, Plus Jakarta Sans, JetBrains Mono.

## 🚀 Como Executar Localmente

Sendo uma aplicação estruturada primariamente em arquivos estáticos (Client-Side), a execução do projeto local não exige configurações pesadas de ambiente.

1. **Clone este repositório**
   ```bash
   git clone https://github.com/SEU_USUARIO/Dash-12.git
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd Dash-12
   ```

3. **Inicie o servidor local (Recomendado)**
   Embora você possa abrir o arquivo `index.html` diretamente no navegador, é altamente recomendado iniciar um pequeno servidor local devido a possíveis restrições de CORS impostas pelos navegadores (como quando o D3 tenta carregar os arquivos TopoJSON ou para a correta importação de módulos JS/CSS).
   
   Você pode usar extensões como o **Live Server** (do VSCode), ou o Node.js:
   ```bash
   npx serve .
   ```
   *Ou com Python:*
   ```bash
   python -m http.server 8000
   ```

4. **Acesse via navegador:**
   Vá até `http://localhost:8000` (ou a porta atribuída pelo seu host local).

## 📄 Regras do Projeto Estruturais (RULES.md)

Este repositório possui um documento rigoroso de regras (`RULES.md`) voltado para manter a sanidade e estética de alto nível do código. Se você deseja fazer modificações — seja de forma manual ou por intermédio de IAs atuando no projeto — **é obrigatória a leitura do RULES.md**.

## ⚖️ Licença

Este projeto está sob a licença MIT. Para mais detalhes, veja o arquivo [LICENSE](LICENSE).
